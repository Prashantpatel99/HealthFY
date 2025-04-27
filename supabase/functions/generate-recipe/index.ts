
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock data for generating recipes
const cuisines = [
  "Italian", "Mexican", "Indian", "Chinese", "Japanese",
  "Mediterranean", "American", "Thai", "French", "Greek"
];

const ingredients = {
  protein: ["chicken", "beef", "tofu", "salmon", "tuna", "chickpeas", "lentils", "eggs", "tempeh", "turkey"],
  vegetables: ["spinach", "broccoli", "kale", "bell peppers", "zucchini", "cauliflower", "carrots", "onions", "garlic", "tomatoes"],
  grains: ["rice", "quinoa", "pasta", "couscous", "barley", "farro", "oats", "tortillas", "bread", "bulgur"],
  spices: ["cumin", "turmeric", "oregano", "basil", "thyme", "rosemary", "paprika", "cinnamon", "ginger", "chili powder"],
};

const difficulties = ["easy", "medium", "hard"];

function generateRandomRecipe(preferences) {
  // Select cuisine based on preference or random if not specified
  const cuisine = preferences.cuisineType || cuisines[Math.floor(Math.random() * cuisines.length)];
  
  // Generate recipe name
  const proteinChoice = ingredients.protein[Math.floor(Math.random() * ingredients.protein.length)];
  const vegetableChoice = ingredients.vegetables[Math.floor(Math.random() * ingredients.vegetables.length)];
  const recipeName = `${cuisine} Style ${proteinChoice.charAt(0).toUpperCase() + proteinChoice.slice(1)} with ${vegetableChoice.charAt(0).toUpperCase() + vegetableChoice.slice(1)}`;
  
  // Generate random ingredients (respecting dietary preferences)
  const recipeIngredients = [];
  
  // Filter out ingredients based on dietary preferences
  const filteredProtein = ingredients.protein.filter(item => {
    if (preferences.dietaryPreferences.includes('vegetarian') && 
        ['chicken', 'beef', 'salmon', 'tuna', 'turkey'].includes(item)) {
      return false;
    }
    if (preferences.dietaryPreferences.includes('vegan') && 
        ['chicken', 'beef', 'salmon', 'tuna', 'eggs', 'turkey'].includes(item)) {
      return false;
    }
    return !preferences.allergies.some(allergy => item.includes(allergy));
  });
  
  // Add protein ingredients
  if (filteredProtein.length > 0) {
    recipeIngredients.push({
      name: filteredProtein[Math.floor(Math.random() * filteredProtein.length)],
      amount: Math.floor(Math.random() * 3) + 1,
      unit: "cup"
    });
  }
  
  // Add vegetable ingredients
  const filteredVeggies = ingredients.vegetables.filter(item => 
    !preferences.allergies.some(allergy => item.includes(allergy))
  );
  for (let i = 0; i < 3; i++) {
    if (filteredVeggies.length > 0) {
      recipeIngredients.push({
        name: filteredVeggies[Math.floor(Math.random() * filteredVeggies.length)],
        amount: Math.floor(Math.random() * 2) + 1,
        unit: "cup"
      });
    }
  }
  
  // Add grain ingredient
  const filteredGrains = ingredients.grains.filter(item => 
    !preferences.allergies.some(allergy => item.includes(allergy))
  );
  if (filteredGrains.length > 0) {
    recipeIngredients.push({
      name: filteredGrains[Math.floor(Math.random() * filteredGrains.length)],
      amount: Math.floor(Math.random() * 2) + 1,
      unit: "cup"
    });
  }
  
  // Add spices
  for (let i = 0; i < 2; i++) {
    recipeIngredients.push({
      name: ingredients.spices[Math.floor(Math.random() * ingredients.spices.length)],
      amount: Math.floor(Math.random() * 2) + 1,
      unit: "teaspoon"
    });
  }
  
  // Generate instructions
  const instructions = [
    `Prepare the ${recipeIngredients[0].name} by washing and cutting into pieces.`,
    `Heat oil in a large pan over medium heat.`,
    `Add ${recipeIngredients[4]?.name || "spices"} and cook until fragrant.`,
    `Add ${recipeIngredients[0].name} and cook until golden brown.`,
    `Add ${recipeIngredients[1]?.name || "vegetables"} and ${recipeIngredients[2]?.name || "vegetables"} and cook for 5 minutes.`,
    `Add ${recipeIngredients[3]?.name || "grains"} and stir well.`,
    `Cover and simmer for 15-20 minutes until fully cooked.`,
    `Garnish with fresh herbs and serve hot.`
  ];
  
  // Select difficulty based on cooking level preference
  let difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  if (preferences.cookingLevel === "beginner") {
    difficulty = "easy";
  } else if (preferences.cookingLevel === "expert") {
    difficulty = "hard";
  }
  
  // Generate nutritional info (with focus on specified deficiencies)
  const nutritionalInfo = {
    calories: Math.floor(Math.random() * 500) + 300,
    protein: Math.floor(Math.random() * 30) + 15,
    carbs: Math.floor(Math.random() * 50) + 20,
    fat: Math.floor(Math.random() * 20) + 5,
    fiber: Math.floor(Math.random() * 8) + 3,
    sugar: Math.floor(Math.random() * 10) + 2,
    sodium: Math.floor(Math.random() * 300) + 100
  };
  
  // Boost nutritional values based on deficiencies
  if (preferences.nutritionalDeficiencies.includes("protein")) {
    nutritionalInfo.protein += 15;
  }
  if (preferences.nutritionalDeficiencies.includes("iron")) {
    // Represent with higher protein and lower sodium
    nutritionalInfo.protein += 8;
    nutritionalInfo.sodium -= 50;
  }
  if (preferences.nutritionalDeficiencies.includes("calcium")) {
    // Represent with lower sodium
    nutritionalInfo.sodium -= 50;
  }
  
  // Generate tags
  const tags = [cuisine.toLowerCase()];
  preferences.dietaryPreferences.forEach(pref => tags.push(pref));
  if (difficulty === "easy") tags.push("quick");
  if (nutritionalInfo.protein > 25) tags.push("high-protein");
  if (nutritionalInfo.fat < 10) tags.push("low-fat");
  
  return {
    id: crypto.randomUUID(),
    name: recipeName,
    description: `A delicious ${cuisine.toLowerCase()} inspired dish perfect for ${preferences.dietaryPreferences.join(', ')} diets.`,
    ingredients: recipeIngredients,
    instructions: instructions,
    cuisine_type: cuisine,
    nutritional_info: nutritionalInfo,
    prep_time: `${Math.floor(Math.random() * 15) + 5} mins`,
    cook_time: `${Math.floor(Math.random() * 30) + 15} mins`,
    total_time: `${Math.floor(Math.random() * 45) + 20} mins`,
    servings: Math.floor(Math.random() * 4) + 2,
    difficulty: difficulty,
    tags: tags,
    image_url: `https://source.unsplash.com/random/?${cuisine.toLowerCase()},food`,
    youtube_url: `https://www.youtube.com/results?search_query=${encodeURIComponent(recipeName + ' recipe')}`
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences } = await req.json();
    
    console.log("Processing request with preferences:", JSON.stringify(preferences));

    // Generate the recipe based on preferences
    const generatedRecipe = generateRandomRecipe(preferences);
    
    return new Response(JSON.stringify(generatedRecipe), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
