
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Recipe } from "@/types";
import { supabase } from "@/integrations/supabase/client";

interface RecipeDisplayProps {
  recipe: Recipe;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const [isGeneratingList, setIsGeneratingList] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSaveRecipe = async () => {
    try {
      setIsSaving(true);
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast.error("Please log in to save recipes");
        navigate('/login');
        return;
      }
      
      const { error } = await supabase
        .from('saved_recipes')
        .insert({
          user_id: sessionData.session.user.id,
          recipe_id: recipe.name
        });
        
      if (error) {
        if (error.code === '23505') {
          // Unique violation - recipe already saved
          toast.error("You've already saved this recipe");
        } else {
          throw error;
        }
      } else {
        toast.success("Recipe saved to your profile!");
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error("Failed to save recipe");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyShoppingList = () => {
    setIsGeneratingList(true);
    
    // Create a shopping list from the recipe ingredients
    const shoppingList = recipe.ingredients
      .map(ing => `• ${ing.amount} ${ing.unit} ${ing.name}`)
      .join("\n");
      
    const fullList = `Shopping List for ${recipe.name}:\n\n${shoppingList}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(fullList)
      .then(() => {
        toast.success("Shopping list copied to clipboard!");
        setIsGeneratingList(false);
      })
      .catch(err => {
        toast.error("Failed to copy shopping list");
        setIsGeneratingList(false);
      });
  };

  const handleDownloadShoppingList = () => {
    setIsGeneratingList(true);
    
    // Create a shopping list from the recipe ingredients
    const shoppingList = recipe.ingredients
      .map(ing => `• ${ing.amount} ${ing.unit} ${ing.name}`)
      .join("\n");
      
    const fullList = `Shopping List for ${recipe.name}:\n\n${shoppingList}`;
    
    // Create a download link
    const element = document.createElement("a");
    const file = new Blob([fullList], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${recipe.name.replace(/\s+/g, '-').toLowerCase()}-shopping-list.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    
    setIsGeneratingList(false);
    toast.success("Shopping list downloaded!");
  };

  const openYouTubeVideo = () => {
    // Fixed YouTube search URL
    const searchQuery = encodeURIComponent(`${recipe.name} recipe`);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    window.open(youtubeUrl, "_blank");
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={handleGoBack} className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </Button>
        <Button 
          onClick={handleSaveRecipe} 
          className="bg-recipe-primary hover:bg-green-600"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Recipe'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-gray-200 shadow-md">
            <div className="relative h-64 sm:h-80">
              <img
                src={recipe.image_url}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="border-b border-gray-200">
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-recipe-light text-recipe-primary border-recipe-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-2xl font-bold">{recipe.name}</CardTitle>
              <p className="text-gray-600 mt-1">{recipe.description}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Prep: {recipe.prep_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                  <span>Cook: {recipe.cook_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.6.4-4.8-.3-1.6-1-2.4-2.4-2.5-4.4S5.6 5 8 5.1c2.4.1 4.2 1.4 5.7 3.9"/><path d="M16.7 8c1.1 1.9 1.8 4.1 1.8 6.5 0 1.9-1.5 3.5-3.5 3.5-1.9 0-3.5-1.6-3.5-3.5 0-1.9 1.5-3.5 3.5-3.5.7 0 1.2.2 2.1.7"/></svg>
                  <span>Serves: {recipe.servings}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18-3v3a2 2 0 0 0 2 2h3M3 16v3a2 2 0 0 0 2 2h3m8-5v3a2 2 0 0 0 2 2h3"/></svg>
                  <span>Difficulty: {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="instructions">
                <TabsList className="mb-4">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                </TabsList>
                
                <TabsContent value="instructions" className="space-y-6">
                  <ol className="list-decimal list-inside space-y-4">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium text-gray-900">Step {index + 1}: </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </TabsContent>
                
                <TabsContent value="ingredients" className="space-y-4">
                  <ul className="list-disc list-inside space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium text-gray-900">
                          {ingredient.amount} {ingredient.unit}
                        </span>{" "}
                        {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="nutrition" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-recipe-primary">Calories</p>
                      <p className="text-2xl">{recipe.nutritional_info.calories}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-recipe-primary">Protein</p>
                      <p className="text-2xl">{recipe.nutritional_info.protein}g</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-recipe-primary">Carbs</p>
                      <p className="text-2xl">{recipe.nutritional_info.carbs}g</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-recipe-primary">Fat</p>
                      <p className="text-2xl">{recipe.nutritional_info.fat}g</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-recipe-primary">Fiber</p>
                      <p className="text-2xl">{recipe.nutritional_info.fiber}g</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-recipe-primary">Sugar</p>
                      <p className="text-2xl">{recipe.nutritional_info.sugar}g</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-recipe-primary">Sodium</p>
                      <p className="text-2xl">{recipe.nutritional_info.sodium}mg</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-gray-200 shadow-md">
            <CardHeader className="bg-recipe-light">
              <CardTitle className="text-xl font-bold text-recipe-primary">Shopping List</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 mb-4">
                Get the ingredients you need for this recipe. You can copy or download the list.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleCopyShoppingList}
                  variant="outline"
                  className="w-full"
                  disabled={isGeneratingList}
                >
                  Copy to Clipboard
                </Button>
                <Button
                  onClick={handleDownloadShoppingList}
                  variant="outline"
                  className="w-full"
                  disabled={isGeneratingList}
                >
                  Download List
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-md">
            <CardHeader className="bg-recipe-light">
              <CardTitle className="text-xl font-bold text-recipe-primary">Video Tutorial</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 mb-4">
                Not sure how to prepare this recipe? Watch a video tutorial on YouTube.
              </p>
              <Button
                onClick={openYouTubeVideo}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Watch on YouTube
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
