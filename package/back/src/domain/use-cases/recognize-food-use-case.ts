import { Food } from "../entities/food";
import { FoodRecognitionRepository } from "../repositories/food-recognition-repository";
import { Base64Util } from "../../utils/base64-util";

export class RecognizeFoodUseCase {
  constructor(private foodRecognitionRepository: FoodRecognitionRepository) {}

  async execute(imageBase64: string): Promise<Food[]> {
    if (!Base64Util.isValidBase64(imageBase64)) {
      throw new Error("無効なBase64形式の画像データです");
    }

    const imageData = Base64Util.base64ToArrayBuffer(imageBase64);

    return this.foodRecognitionRepository.recognizeFood(imageData);
  }
}
