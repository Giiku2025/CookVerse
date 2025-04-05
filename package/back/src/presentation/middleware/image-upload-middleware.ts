import { Context, Next } from "hono";
import { Base64Util } from "../../utils/base64-util";

/**
 * form-dataからimageを取得してBase64に変換するミドルウェア
 */
export async function imageUploadMiddleware(c: Context, next: Next) {
  try {
    // form-dataからファイルを取得
    const formData = await c.req.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      c.status(400);
      return c.json({
        error:
          "画像が提供されていません。form-dataのimageフィールドで画像を送信してください。",
      });
    }

    let base64Image: string;

    // ファイルの場合
    if (imageFile instanceof File) {
      const arrayBuffer = await imageFile.arrayBuffer();
      base64Image = Base64Util.arrayBufferToBase64(arrayBuffer);
    }
    // 文字列の場合（すでにBase64エンコードされている可能性）
    else if (typeof imageFile === "string") {
      base64Image = imageFile;
    } else {
      c.status(400);
      return c.json({ error: "サポートされていない画像形式です。" });
    }

    // リクエストにBase64画像データを追加
    c.set("base64Image", base64Image);
    await next();
  } catch (error) {
    console.error("Image upload middleware error:", error);
    c.status(500);
    return c.json({ error: "画像処理中にエラーが発生しました" });
  }
}
