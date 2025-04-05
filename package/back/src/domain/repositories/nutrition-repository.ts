import { Nutrition } from "../entities/nutrition";

export interface NutritionRepository {
  analyzeNutrition(imageData: ArrayBuffer): Promise<Nutrition>;
}
