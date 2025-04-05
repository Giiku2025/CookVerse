import { Hono } from "hono";
import { FoodRecognitionController } from "../controllers/food-recognition-controller";

export const createFoodRoutes = (controller: FoodRecognitionController) => {
  const router = new Hono();

  router.post("/recognize", (c) => controller.recognizeFood(c));

  return router;
};
