import { FoodRecognitionRepository } from "../../domain/repositories/food-recognition-repository";
import { Food } from "../../domain/entities/food";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { Base64Util } from "../../utils/base64-util";

export class GeminiFoodRecognitionRepository
  implements FoodRecognitionRepository
{
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async recognizeFood(imageData: ArrayBuffer): Promise<Food[]> {
    try {
      const imageBase64 = Base64Util.arrayBufferToBase64(imageData);

      const model = this.genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const prompt = `
この画像に写っている食べ物をすべて認識し、日本語で名前だけを返してください。
回答は必ず以下のJSON形式だけで返してください。前後の説明文などは不要です：

[
  {"name": "食べ物1"}, 
  {"name": "食べ物2"}
]
`;

      const parts: Part[] = [
        { text: prompt },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64,
          },
        },
      ];

      const result = await model.generateContent(parts);
      const responseText = result.response.text();
      const extractedJson = this.extractJsonFromMarkdown(responseText);

      // JSONとしてパースできない場合は、テキストから食べ物名を抽出
      try {
        const jsonResponse = JSON.parse(extractedJson);
        if (Array.isArray(jsonResponse)) {
          return jsonResponse as Food[];
        } else if (typeof jsonResponse === "object" && jsonResponse !== null) {
          // オブジェクトの場合は配列に変換
          return [jsonResponse as Food];
        }
      } catch {
        // 最後の手段として、テキストから食べ物のリストを抽出
        return this.extractFoodsFromText(responseText);
      }

      // どの方法でも抽出できなかった場合のフォールバック
      return [{ name: "不明な食べ物" }];
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("食べ物の認識に失敗しました");
    }
  }

  /**
   * マークダウンテキストからJSON部分を抽出
   */
  private extractJsonFromMarkdown(text: string): string {
    // パターン1: マークダウンのコードブロック内のJSONを抽出
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      return codeBlockMatch[1].trim();
    }

    // パターン2: 角括弧で囲まれた配列形式のJSONを抽出
    const arrayMatch = text.match(/\[\s*\{\s*"name"[\s\S]*?\}\s*\]/);
    if (arrayMatch) {
      return arrayMatch[0];
    }

    // パターン3: 中括弧で囲まれたオブジェクト形式のJSONを抽出
    const objectMatch = text.match(/\{\s*"name"[\s\S]*?\}/);
    if (objectMatch) {
      return `[${objectMatch[0]}]`; // 配列形式に変換
    }

    // どのパターンにもマッチしない場合は元のテキストを返す
    return text;
  }

  /**
   * テキストから食べ物のリストを抽出（JSONパースに失敗した場合のフォールバック）
   */
  private extractFoodsFromText(text: string): Food[] {
    const foods: Food[] = [];

    // パターン1: "name"属性を持つJSONライクな部分を抽出
    const nameMatches = text.match(/"name"\s*:\s*"([^"]*)"/g);
    if (nameMatches && nameMatches.length > 0) {
      for (const match of nameMatches) {
        const nameMatch = match.match(/"name"\s*:\s*"([^"]*)"/);
        if (nameMatch && nameMatch[1]) {
          foods.push({ name: nameMatch[1] });
        }
      }
      return foods;
    }

    // パターン2: 箇条書きリスト
    const bulletMatches = text.match(/[•*-]\s*([^\n,.:;]+)/g);
    if (bulletMatches && bulletMatches.length > 0) {
      for (const match of bulletMatches) {
        const itemMatch = match.match(/[•*-]\s*([^\n,.:;]+)/);
        if (itemMatch && itemMatch[1]) {
          foods.push({ name: itemMatch[1].trim() });
        }
      }
      return foods;
    }

    // パターン3: 「食べ物は/が...」というフレーズの後に続く名前
    const foodNamePatterns = [
      /(?:食べ物|料理)は「?([^」\n,.]+)」?(?:です|でしょう|と思われます)/,
      /「?([^」\n,.]+)」?(?:という|と呼ばれる)(?:食べ物|料理)/,
      /画像には「?([^」\n,.]+)」?が(?:写っています|映っています|見えます)/,
    ];

    for (const pattern of foodNamePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        foods.push({ name: match[1].trim() });
        return foods;
      }
    }

    // パターン4: 「、」や「,」で区切られたリスト
    const commaSeparatedList = text.match(/([^。\n:：]+(?:、|,)[^。\n:：]+)/);
    if (commaSeparatedList) {
      const items = commaSeparatedList[1].split(/[、,]/);
      for (const item of items) {
        const trimmed = item.trim();
        if (trimmed && trimmed.length > 1) {
          foods.push({ name: trimmed });
        }
      }
      if (foods.length > 0) {
        return foods;
      }
    }

    // パターン5: 引用符で囲まれた部分を抽出
    const quotedItems = text.match(/「([^」]+)」/g);
    if (quotedItems && quotedItems.length > 0) {
      for (const item of quotedItems) {
        const match = item.match(/「([^」]+)」/);
        if (match && match[1]) {
          foods.push({ name: match[1].trim() });
        }
      }
      return foods;
    }

    // どのパターンにもマッチしない場合
    return [{ name: "不明な食べ物" }];
  }
}
