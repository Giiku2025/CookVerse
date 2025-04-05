import { Hono } from "hono";
import { NutritionController } from "../controllers/nutrition-controller";

export const createNutritionRoutes = (controller: NutritionController) => {
  const router = new Hono();

  router.post("/analyze", (c) => controller.analyzeNutrition(c));

  return router;
};
