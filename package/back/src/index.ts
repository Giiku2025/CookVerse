import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

// インポート
import { RecognizeFoodUseCase } from "./domain/use-cases/recognize-food-use-case";
import { GeminiFoodRecognitionRepository } from "./infrastructure/repositories/gemini-food-recognition-repository";
import { FoodRecognitionController } from "./presentation/controllers/food-recognition-controller";

import { AnalyzeNutritionUseCase } from "./domain/use-cases/analyze-nutrition-use-case";
import { GeminiNutritionRepository } from "./infrastructure/repositories/gemini-nutrition-repository";
import { NutritionController } from "./presentation/controllers/nutrition-controller";

import { createRoutes } from "./presentation/routes";
import { rateLimitMiddleware } from "./presentation/middleware/rate-limit-middleware";
import { Environment } from "./config/environment";

export default {
  async fetch(
    request: Request,
    env: Environment,
    ctx: ExecutionContext
  ): Promise<Response> {
    const app = new Hono<{ Bindings: Environment }>();

    // ミドルウェアの設定
    app.use("*", logger());
    app.use(
      "*",
      cors({
        origin: "https://cook-verse-three.vercel.app/",
        allowMethods: ["POST"],
        exposeHeaders: [
          "X-RateLimit-Limit",
          "X-RateLimit-Remaining",
          "X-RateLimit-Reset",
          "Access-Control-Allow-Origin",
        ],
        maxAge: 86400,
      })
    );

    // レート制限ミドルウェアの追加
    // APIエンドポイントに対してのみレート制限を適用
    app.use(
      "/api/*",
      rateLimitMiddleware({
        limit: 100, // 1時間に50リクエストまで
        windowMs: 60 * 60 * 1000,
        statusCode: 429,
        kvNamespace: env.RATE_LIMIT_KV,
        keyPrefix: "rate-limit:",
        message:
          "リクエスト数の制限を超えました。しばらくしてからお試しください。",
      })
    );

    // リポジトリの初期化
    const foodRecognitionRepository = new GeminiFoodRecognitionRepository(
      env.GEMINI_API_KEY
    );
    const nutritionRepository = new GeminiNutritionRepository(
      env.GEMINI_API_KEY
    );

    // ユースケースの初期化
    const recognizeFoodUseCase = new RecognizeFoodUseCase(
      foodRecognitionRepository
    );
    const analyzeNutritionUseCase = new AnalyzeNutritionUseCase(
      nutritionRepository
    );

    // コントローラーの初期化
    const foodRecognitionController = new FoodRecognitionController(
      recognizeFoodUseCase
    );
    const nutritionController = new NutritionController(
      analyzeNutritionUseCase
    );

    // APIルートを設定
    const apiRoutes = createRoutes(
      foodRecognitionController,
      nutritionController
    );
    app.route("/api", apiRoutes);

    // ルートハンドラー
    app.get("/", (c) =>
      c.json({
        message: "Food Recognition & Nutrition Analysis API",
        endpoints: {
          foodRecognition: "/api/food/recognize - 画像から食べ物を認識します",
          nutritionAnalysis:
            "/api/nutrition/analyze - 画像から栄養成分を分析します",
        },
      })
    );

    // エラーハンドラー
    app.onError((err, c) => {
      console.error("Application error:", err);
      return c.json({ error: "Internal Server Error" }, { status: 500 });
    });

    return app.fetch(request, env, ctx);
  },
};

// Honoの型拡張: Context に独自のデータを追加
declare module "hono" {
  interface ContextVariableMap {
    base64Image: string;
  }
}
