import { Hono } from "hono";
import { imageUploadMiddleware } from "../middleware/image-upload-middleware";
import { FoodRecognitionController } from "../controllers/food-recognition-controller";
import { NutritionController } from "../controllers/nutrition-controller";

/**
 * すべてのルートを作成
 */
export function createRoutes(
  foodRecognitionController: FoodRecognitionController,
  nutritionController: NutritionController
): Hono {
  const router = new Hono();

  router.post("/food/recognize", imageUploadMiddleware, (c) =>
    foodRecognitionController.recognizeFood(c)
  );

  router.post("/nutrition/analyze", imageUploadMiddleware, (c) =>
    nutritionController.analyzeNutrition(c)
  );

  return router;
}
