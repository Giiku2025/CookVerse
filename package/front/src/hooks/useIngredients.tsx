import { useState} from "react";
export interface Food {
    name: string;
}

export const useCalculator = () => {
    const [ingredientsData, setIngredientsData] = useState<Food | undefined>(undefined);

    return{
        ingredientsData,
        setIngredientsData,
    }
}