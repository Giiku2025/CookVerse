import { Context } from "hono";

/**
 * 基本的なコントローラー機能を提供する抽象クラス
 */
export abstract class BaseController {
  /**
   * エラーレスポンスを生成
   */
  protected createErrorResponse(
    c: Context,
    error: unknown,
    defaultMessage: string
  ): Response {
    console.error("Controller error:", error);

    if (error instanceof Error) {
      if (error.message.includes("無効なBase64形式")) {
        return c.json({ error: error.message }, { status: 400 });
      }
    }

    return c.json({ error: defaultMessage }, { status: 500 });
  }

  /**
   * 成功レスポンスを生成
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected createSuccessResponse(c: Context, data: any): Response {
    return c.json(data, { status: 200 });
  }
}
