import { Context } from "hono";
import { AnalyzeNutritionUseCase } from "../../domain/use-cases/analyze-nutrition-use-case";
import { BaseController } from "./base-controller";

export class NutritionController extends BaseController {
  constructor(private analyzeNutritionUseCase: AnalyzeNutritionUseCase) {
    super();
  }

  async analyzeNutrition(c: Context): Promise<Response> {
    try {
      // ミドルウェアでセットされたBase64画像を取得
      const base64Image = c.get("base64Image");

      const nutrition = await this.analyzeNutritionUseCase.execute(base64Image);

      return this.createSuccessResponse(c, { nutrition });
    } catch (error) {
      return this.createErrorResponse(
        c,
        error,
        "栄養分析中にエラーが発生しました"
      );
    }
  }
}
