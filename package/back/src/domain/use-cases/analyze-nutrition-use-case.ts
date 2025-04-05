import { Nutrition } from "../entities/nutrition";
import { NutritionRepository } from "../repositories/nutrition-repository";
import { Base64Util } from "../../utils/base64-util";

export class AnalyzeNutritionUseCase {
  constructor(private nutritionRepository: NutritionRepository) {}

  async execute(imageBase64: string): Promise<Nutrition> {
    if (!Base64Util.isValidBase64(imageBase64)) {
      throw new Error("無効なBase64形式の画像データです");
    }

    const imageData = Base64Util.base64ToArrayBuffer(imageBase64);

    return this.nutritionRepository.analyzeNutrition(imageData);
  }
}
