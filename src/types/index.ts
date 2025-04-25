
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cuisine_type: string;
  nutritional_info: NutritionalInfo;
  image_url: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  youtube_url?: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface UserPreferences {
  dietaryPreferences: string[];
  allergies: string[];
  nutritionalDeficiencies: string[];
  cuisineType: string;
  cookingLevel?: string;
  age?: string;
}

export interface User {
  id: string;
  email: string;
  preferences: UserPreferences;
  saved_recipes: string[];
}
