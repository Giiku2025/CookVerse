import { Food } from "../entities/food";

export interface FoodRecognitionRepository {
  recognizeFood(imageData: ArrayBuffer): Promise<Food[]>;
}
