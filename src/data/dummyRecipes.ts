
import { Recipe } from "../types";

export const dummyRecipes: Recipe[] = [
  {
    id: "1",
    name: "Mediterranean Quinoa Bowl",
    description: "A protein-packed quinoa bowl full of Mediterranean flavors with roasted vegetables and a zesty lemon dressing.",
    ingredients: [
      { name: "quinoa", amount: "1", unit: "cup" },
      { name: "cherry tomatoes", amount: "1", unit: "cup" },
      { name: "cucumber", amount: "1", unit: "medium" },
      { name: "red onion", amount: "1/2", unit: "" },
      { name: "bell pepper", amount: "1", unit: "medium" },
      { name: "chickpeas", amount: "1", unit: "can" },
      { name: "feta cheese", amount: "1/2", unit: "cup" },
      { name: "olive oil", amount: "3", unit: "tbsp" },
      { name: "lemon juice", amount: "2", unit: "tbsp" },
      { name: "garlic", amount: "2", unit: "cloves" },
      { name: "oregano", amount: "1", unit: "tsp" },
      { name: "salt", amount: "1/2", unit: "tsp" },
      { name: "black pepper", amount: "1/4", unit: "tsp" }
    ],
    instructions: [
      "Rinse quinoa under cold water and drain well.",
      "In a medium saucepan, combine quinoa with 2 cups of water and a pinch of salt. Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes.",
      "Remove from heat and let stand, covered, for 5 minutes. Fluff with a fork.",
      "While quinoa cooks, chop all vegetables and drain and rinse chickpeas.",
      "In a small bowl, whisk together olive oil, lemon juice, minced garlic, oregano, salt, and pepper to create the dressing.",
      "In a large bowl, combine cooked quinoa, chickpeas, and all vegetables.",
      "Pour the dressing over the salad and toss gently to combine.",
      "Sprinkle crumbled feta cheese on top before serving."
    ],
    cuisine_type: "Mediterranean",
    nutritional_info: {
      calories: 380,
      protein: 12,
      carbs: 45,
      fat: 18,
      fiber: 7,
      sugar: 4,
      sodium: 620
    },
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prep_time: "15 mins",
    cook_time: "20 mins",
    total_time: "35 mins",
    servings: 4,
    difficulty: "easy",
    tags: ["vegetarian", "high-protein", "gluten-free", "healthy"],
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "2",
    name: "Japanese Miso Salmon",
    description: "Delicate salmon fillets marinated in a savory miso glaze and baked to perfection. Served with steamed rice and vegetables.",
    ingredients: [
      { name: "salmon fillets", amount: "4", unit: "(6 oz each)" },
      { name: "white miso paste", amount: "3", unit: "tbsp" },
      { name: "mirin", amount: "2", unit: "tbsp" },
      { name: "soy sauce", amount: "1", unit: "tbsp" },
      { name: "honey", amount: "1", unit: "tbsp" },
      { name: "ginger", amount: "1", unit: "tbsp" },
      { name: "garlic", amount: "2", unit: "cloves" },
      { name: "sesame oil", amount: "1", unit: "tsp" },
      { name: "green onions", amount: "2", unit: "" },
      { name: "sesame seeds", amount: "1", unit: "tsp" },
      { name: "brown rice", amount: "2", unit: "cups" },
      { name: "bok choy", amount: "4", unit: "small" }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "In a small bowl, mix miso paste, mirin, soy sauce, honey, grated ginger, minced garlic, and sesame oil until smooth.",
      "Place salmon fillets on a lined baking sheet and brush generously with the miso mixture.",
      "Let salmon marinate for at least 15 minutes at room temperature.",
      "Bake in the preheated oven for 12-15 minutes, or until salmon flakes easily with a fork.",
      "While salmon is cooking, prepare brown rice according to package instructions.",
      "Steam bok choy for 3-5 minutes until tender-crisp.",
      "Serve salmon over rice with bok choy on the side.",
      "Garnish with sliced green onions and sesame seeds."
    ],
    cuisine_type: "Japanese",
    nutritional_info: {
      calories: 420,
      protein: 32,
      carbs: 36,
      fat: 16,
      fiber: 4,
      sugar: 6,
      sodium: 850
    },
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    prep_time: "20 mins",
    cook_time: "15 mins",
    total_time: "35 mins",
    servings: 4,
    difficulty: "medium",
    tags: ["high-protein", "dairy-free", "pescatarian", "omega-3"],
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "3",
    name: "Mexican Black Bean Sweet Potato Tacos",
    description: "Hearty vegetarian tacos filled with spiced black beans, roasted sweet potatoes, and topped with a creamy avocado sauce.",
    ingredients: [
      { name: "sweet potatoes", amount: "2", unit: "large" },
      { name: "black beans", amount: "1", unit: "can" },
      { name: "corn tortillas", amount: "8", unit: "small" },
      { name: "olive oil", amount: "2", unit: "tbsp" },
      { name: "chili powder", amount: "2", unit: "tsp" },
      { name: "cumin", amount: "1", unit: "tsp" },
      { name: "garlic powder", amount: "1/2", unit: "tsp" },
      { name: "paprika", amount: "1/2", unit: "tsp" },
      { name: "red onion", amount: "1", unit: "small" },
      { name: "lime", amount: "1", unit: "" },
      { name: "avocado", amount: "1", unit: "ripe" },
      { name: "cilantro", amount: "1/4", unit: "cup" },
      { name: "Greek yogurt", amount: "1/4", unit: "cup" },
      { name: "salt", amount: "1", unit: "tsp" },
      { name: "black pepper", amount: "1/2", unit: "tsp" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Peel and dice sweet potatoes into 1/2-inch cubes. Toss with 1 tbsp olive oil, 1 tsp chili powder, 1/2 tsp cumin, 1/2 tsp salt, and 1/4 tsp black pepper.",
      "Spread sweet potatoes on a baking sheet and roast for 25-30 minutes, tossing halfway through, until tender and slightly caramelized.",
      "While sweet potatoes roast, drain and rinse black beans. In a saucepan over medium heat, add remaining olive oil and finely diced red onion. Sauté for 3-4 minutes.",
      "Add beans to the pan along with remaining chili powder, cumin, garlic powder, paprika, salt and pepper. Cook for 5-7 minutes, gently mashing some beans.",
      "For the avocado sauce, blend ripe avocado, Greek yogurt, cilantro, lime juice, and a pinch of salt until smooth.",
      "Warm tortillas in a dry skillet or directly over a gas flame.",
      "Assemble tacos by layering beans, sweet potatoes, and topping with avocado sauce, additional diced red onion, and cilantro."
    ],
    cuisine_type: "Mexican",
    nutritional_info: {
      calories: 340,
      protein: 10,
      carbs: 52,
      fat: 12,
      fiber: 12,
      sugar: 6,
      sodium: 580
    },
    image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
    prep_time: "15 mins",
    cook_time: "30 mins",
    total_time: "45 mins",
    servings: 4,
    difficulty: "easy",
    tags: ["vegetarian", "gluten-free", "dairy-free", "high-fiber"],
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "4",
    name: "Indian Lentil Curry",
    description: "A hearty and aromatic red lentil curry simmered with tomatoes, coconut milk, and fragrant spices. Served with basmati rice or naan bread.",
    ingredients: [
      { name: "red lentils", amount: "1", unit: "cup" },
      { name: "coconut milk", amount: "1", unit: "can" },
      { name: "diced tomatoes", amount: "1", unit: "can" },
      { name: "onion", amount: "1", unit: "large" },
      { name: "garlic", amount: "3", unit: "cloves" },
      { name: "ginger", amount: "1", unit: "inch" },
      { name: "curry powder", amount: "2", unit: "tbsp" },
      { name: "turmeric", amount: "1", unit: "tsp" },
      { name: "cumin", amount: "1", unit: "tsp" },
      { name: "coriander", amount: "1", unit: "tsp" },
      { name: "vegetable broth", amount: "2", unit: "cups" },
      { name: "olive oil", amount: "2", unit: "tbsp" },
      { name: "spinach", amount: "2", unit: "cups" },
      { name: "lemon", amount: "1", unit: "" },
      { name: "cilantro", amount: "1/4", unit: "cup" },
      { name: "basmati rice", amount: "1", unit: "cup" }
    ],
    instructions: [
      "Rinse lentils until water runs clear, then drain.",
      "Heat oil in a large pot over medium heat. Add diced onion and cook until translucent, about 5 minutes.",
      "Add minced garlic and grated ginger, cook for 1 minute until fragrant.",
      "Add curry powder, turmeric, cumin, and coriander. Stir and cook for 30 seconds to bloom the spices.",
      "Add lentils, diced tomatoes with their juice, and vegetable broth. Bring to a boil, then reduce heat to low and simmer for 20 minutes, or until lentils are tender.",
      "Stir in coconut milk and simmer for another 10 minutes.",
      "Add spinach and stir until wilted.",
      "Season with salt, pepper, and fresh lemon juice to taste.",
      "Meanwhile, cook basmati rice according to package instructions.",
      "Serve curry over rice, garnished with fresh cilantro."
    ],
    cuisine_type: "Indian",
    nutritional_info: {
      calories: 410,
      protein: 15,
      carbs: 60,
      fat: 14,
      fiber: 11,
      sugar: 5,
      sodium: 520
    },
    image_url: "https://images.unsplash.com/photo-1631452180539-96eca67254b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    prep_time: "15 mins",
    cook_time: "40 mins",
    total_time: "55 mins",
    servings: 4,
    difficulty: "easy",
    tags: ["vegetarian", "vegan", "dairy-free", "gluten-free", "high-fiber"],
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "5",
    name: "Greek Chicken Souvlaki Bowl",
    description: "Grilled lemon garlic chicken skewers served over a Mediterranean-inspired bowl with tzatziki, quinoa, and fresh vegetables.",
    ingredients: [
      { name: "chicken breast", amount: "1", unit: "lb" },
      { name: "lemon", amount: "2", unit: "" },
      { name: "olive oil", amount: "1/4", unit: "cup" },
      { name: "garlic", amount: "4", unit: "cloves" },
      { name: "oregano", amount: "2", unit: "tbsp" },
      { name: "quinoa", amount: "1", unit: "cup" },
      { name: "cucumber", amount: "1", unit: "medium" },
      { name: "cherry tomatoes", amount: "1", unit: "cup" },
      { name: "red onion", amount: "1/2", unit: "medium" },
      { name: "kalamata olives", amount: "1/3", unit: "cup" },
      { name: "feta cheese", amount: "1/2", unit: "cup" },
      { name: "Greek yogurt", amount: "1", unit: "cup" },
      { name: "dill", amount: "2", unit: "tbsp" },
      { name: "mint", amount: "2", unit: "tbsp" },
      { name: "salt", amount: "1", unit: "tsp" },
      { name: "pepper", amount: "1/2", unit: "tsp" }
    ],
    instructions: [
      "Cut chicken into 1-inch cubes. In a bowl, combine juice of 1 lemon, 3 tbsp olive oil, 3 minced garlic cloves, 1 tbsp oregano, 1/2 tsp salt and 1/4 tsp pepper.",
      "Add chicken to the marinade, toss to coat, and refrigerate for at least 30 minutes (or up to 3 hours).",
      "Meanwhile, rinse quinoa and cook according to package directions. Fluff with a fork and let cool slightly.",
      "Make tzatziki sauce: Grate cucumber and squeeze out excess moisture. Mix with Greek yogurt, remaining minced garlic, dill, mint, juice of half a lemon, salt, and pepper.",
      "Preheat grill or grill pan to medium-high. Thread marinated chicken onto skewers and grill for 10-12 minutes, turning occasionally, until cooked through.",
      "Assemble bowls: Place quinoa as base, top with grilled chicken, diced cucumber, halved cherry tomatoes, thinly sliced red onion, kalamata olives, and crumbled feta cheese.",
      "Drizzle with tzatziki sauce and remaining olive oil. Garnish with fresh herbs and lemon wedges."
    ],
    cuisine_type: "Greek",
    nutritional_info: {
      calories: 460,
      protein: 35,
      carbs: 30,
      fat: 22,
      fiber: 5,
      sugar: 4,
      sodium: 790
    },
    image_url: "https://images.unsplash.com/photo-1562967915-6ba607ff7238?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    prep_time: "25 mins",
    cook_time: "20 mins",
    total_time: "45 mins",
    servings: 4,
    difficulty: "medium",
    tags: ["high-protein", "Mediterranean", "gluten-free"],
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

// Function to "generate" a recipe based on preferences
export const generateRecipeFromPreferences = (preferences: any): Recipe => {
  // In a real app, this would use the preferences to filter recipes or make an API call
  // For now, just return a random recipe from our dummy data
  const randomIndex = Math.floor(Math.random() * dummyRecipes.length);
  return dummyRecipes[randomIndex];
};
