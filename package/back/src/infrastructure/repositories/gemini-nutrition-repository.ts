import { NutritionRepository } from "../../domain/repositories/nutrition-repository";
import { Nutrition } from "../../domain/entities/nutrition";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { Base64Util } from "../../utils/base64-util";

export class GeminiNutritionRepository implements NutritionRepository {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async analyzeNutrition(imageData: ArrayBuffer): Promise<Nutrition> {
    try {
      const imageBase64 = Base64Util.arrayBufferToBase64(imageData);

      const model = this.genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const prompt = `
この画像に写っている食べ物すべての合計栄養成分を分析してください。
見える食品すべてを合計した以下の栄養素の値だけを推定して返してください：
- カロリー (kcal)
- たんぱく質 (g)
- 脂質 (g)
- 炭水化物 (g)
- 糖質 (g)
- 食物繊維 (g)
- 塩分 (g)

回答は必ず以下のJSON形式だけで返してください。説明文は一切不要です：

{
  "calories": 数値,
  "protein": 数値,
  "fat": 数値,
  "carbohydrate": 数値,
  "sugar": 数値,
  "fiber": 数値,
  "salt": 数値
}

すべて整数または小数で表し、単位は含めないでください。
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

      try {
        const nutritionData = JSON.parse(extractedJson);

        // 必須フィールドがあるか確認
        const requiredFields = [
          "calories",
          "protein",
          "fat",
          "carbohydrate",
          "sugar",
          "fiber",
          "salt",
        ];
        const missingFields = requiredFields.filter(
          (field) => nutritionData[field] === undefined
        );

        if (missingFields.length > 0) {
          console.log(`不足しているフィールド: ${missingFields.join(", ")}`);
          // 不足フィールドには0を設定
          missingFields.forEach((field) => (nutritionData[field] = 0));
        }

        // 数値型に変換（テキストで返ってくる場合がある）
        requiredFields.forEach((field) => {
          nutritionData[field] = Number(nutritionData[field]);
          // NaNの場合は0に設定
          if (isNaN(nutritionData[field])) nutritionData[field] = 0;
        });

        return nutritionData as Nutrition;
      } catch (e) {
        console.log("栄養JSON解析に失敗しました:", e);
        console.log("抽出を試みたJSON文字列:", extractedJson);

        // JSONパースに失敗した場合、テキストから数値を抽出
        return this.extractNutritionFromText(responseText);
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("栄養成分の分析に失敗しました");
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

    // パターン2: 中括弧で囲まれたオブジェクト形式のJSONを抽出
    const objectMatch = text.match(/\{\s*"[^"]+"\s*:\s*[0-9.]+[\s\S]*?\}/);
    if (objectMatch) {
      return objectMatch[0];
    }

    // どのパターンにもマッチしない場合は元のテキストを返す
    return text;
  }

  /**
   * テキストから栄養成分情報を抽出（JSONパースに失敗した場合のフォールバック）
   */
  private extractNutritionFromText(text: string): Nutrition {
    // デフォルト値
    const nutrition: Nutrition = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrate: 0,
      sugar: 0,
      fiber: 0,
      salt: 0,
    };

    // 栄養素名と単位のマッピング（日本語と英語）
    const patterns = [
      {
        field: "calories",
        regex:
          /(?:カロリー|熱量|エネルギー|Calories)[：:\s]*([0-9.]+)(?:\s*kcal)?/i,
      },
      {
        field: "protein",
        regex: /(?:たんぱく質|タンパク質|Protein)[：:\s]*([0-9.]+)(?:\s*g)?/i,
      },
      { field: "fat", regex: /(?:脂質|脂肪|Fat)[：:\s]*([0-9.]+)(?:\s*g)?/i },
      {
        field: "carbohydrate",
        regex:
          /(?:炭水化物|糖質\+食物繊維|Carbohydrate)[：:\s]*([0-9.]+)(?:\s*g)?/i,
      },
      { field: "sugar", regex: /(?:糖質|Sugar)[：:\s]*([0-9.]+)(?:\s*g)?/i },
      {
        field: "fiber",
        regex: /(?:食物繊維|Fiber)[：:\s]*([0-9.]+)(?:\s*g)?/i,
      },
      {
        field: "salt",
        regex: /(?:塩分|食塩相当量|Salt)[：:\s]*([0-9.]+)(?:\s*g)?/i,
      },
    ];

    // 各パターンに対してマッチングを試みる
    for (const pattern of patterns) {
      const match = text.match(pattern.regex);
      if (match && match[1]) {
        const value = parseFloat(match[1]);
        if (!isNaN(value)) {
          nutrition[pattern.field as keyof Nutrition] = value;
        }
      }
    }

    return nutrition;
  }
}
