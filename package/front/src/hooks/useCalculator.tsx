import { useState } from "react";
export interface Nutrition {
  calories: number; // カロリー (kcal)
  protein: number; // たんぱく質 (g)
  fat: number; // 脂質 (g)
  carbohydrate: number; // 炭水化物 (g)
  sugar: number; // 糖質 (g)
  fiber: number; // 食物繊維 (g)
  salt: number; // 塩分 (g)
}

export const useCalculator = () => {
  const [analyzingData, setAnalyzingData] = useState<Nutrition | undefined>(
    undefined
  );

  return {
    analyzingData,
    setAnalyzingData,
  };
};
