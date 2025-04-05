import { Context } from "hono";
import { RecognizeFoodUseCase } from "../../domain/use-cases/recognize-food-use-case";
import { BaseController } from "./base-controller";

export class FoodRecognitionController extends BaseController {
  constructor(private recognizeFoodUseCase: RecognizeFoodUseCase) {
    super();
  }

  async recognizeFood(c: Context): Promise<Response> {
    try {
      // ミドルウェアでセットされたBase64画像を取得
      const base64Image = c.get("base64Image");

      const foods = await this.recognizeFoodUseCase.execute(base64Image);

      return this.createSuccessResponse(c, { foods });
    } catch (error) {
      return this.createErrorResponse(
        c,
        error,
        "食べ物の認識処理中にエラーが発生しました"
      );
    }
  }
}
