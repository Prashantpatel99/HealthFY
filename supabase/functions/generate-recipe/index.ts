
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences } = await req.json();
    
    console.log("Processing request with preferences:", JSON.stringify(preferences));

    const prompt = `Generate a detailed recipe that meets these requirements:
    - Dietary preferences: ${preferences.dietaryPreferences.join(', ')}
    - Allergies to avoid: ${preferences.allergies.join(', ')}
    - Nutritional focus: ${preferences.nutritionalDeficiencies.join(', ')}
    - Cuisine type: ${preferences.cuisineType}
    - Cooking level: ${preferences.cookingLevel || 'any'}
    
    Return the recipe in this exact JSON format:
    {
      "name": "Recipe Name",
      "description": "Brief description",
      "ingredients": [{"name": "ingredient", "amount": "1", "unit": "cup"}],
      "instructions": ["Step 1", "Step 2"],
      "cuisine_type": "type",
      "nutritional_info": {
        "calories": 500,
        "protein": 20,
        "carbs": 30,
        "fat": 25,
        "fiber": 5,
        "sugar": 10,
        "sodium": 400
      },
      "prep_time": "20 mins",
      "cook_time": "30 mins",
      "total_time": "50 mins",
      "servings": 4,
      "difficulty": "easy/medium/hard",
      "tags": ["tag1", "tag2"],
      "image_url": "Use a relevant unsplash URL"
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a professional chef and nutritionist who creates personalized recipes.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    
    // Log the response for debugging
    console.log("OpenAI API Status:", response.status);
    
    // Check if the API returned an error
    if (!response.ok) {
      console.error("OpenAI API Error:", data);
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }
    
    // Check if choices array exists
    if (!data.choices || data.choices.length === 0) {
      console.error("No choices returned from OpenAI:", data);
      throw new Error("No recipe was generated");
    }

    // Check if message content exists
    const content = data.choices[0].message?.content;
    if (!content) {
      console.error("No content in response:", data.choices[0]);
      throw new Error("Empty recipe content");
    }
    
    // Try to parse the JSON content
    try {
      const generatedRecipe = JSON.parse(content);
      
      // Add id to recipe
      generatedRecipe.id = crypto.randomUUID();
      
      return new Response(JSON.stringify(generatedRecipe), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error("Failed to parse recipe JSON:", content);
      throw new Error("Invalid recipe format returned");
    }
  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
