
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import RecipeDisplay from '@/components/RecipeDisplay';
import { Recipe, UserPreferences } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateRecipe = async () => {
      try {
        // Get preferences from session storage
        const preferencesString = sessionStorage.getItem('userPreferences');
        
        if (!preferencesString) {
          toast.error("No preferences found. Please select your preferences first.");
          navigate('/');
          return;
        }
        
        const preferences: UserPreferences = JSON.parse(preferencesString);
        
        toast.info("Generating your personalized recipe...");
        
        // Call our AI function to generate the recipe
        const { data, error } = await supabase.functions.invoke('generate-recipe', {
          body: { preferences }
        });

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          throw new Error("No recipe data returned");
        }

        setRecipe(data);
        setLoading(false);
        toast.success("Recipe generated successfully!");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error('Failed to generate recipe:', error);
        setError(errorMessage);
        toast.error(`Failed to generate recipe: ${errorMessage}`);
        setLoading(false);
      }
    };

    generateRecipe();
  }, [navigate]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const generateRecipe = async () => {
      try {
        const preferencesString = sessionStorage.getItem('userPreferences');
        if (!preferencesString) {
          navigate('/');
          return;
        }
        
        const preferences: UserPreferences = JSON.parse(preferencesString);
        
        toast.info("Retrying recipe generation...");
        
        const { data, error } = await supabase.functions.invoke('generate-recipe', {
          body: { preferences }
        });

        if (error) {
          throw new Error(error.message);
        }

        setRecipe(data);
        setLoading(false);
        toast.success("Recipe generated successfully!");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error('Failed to generate recipe:', error);
        setError(errorMessage);
        toast.error(`Failed to generate recipe: ${errorMessage}`);
        setLoading(false);
      }
    };

    generateRecipe();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        {loading ? (
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-80 w-full mb-6" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-6" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700">Failed to generate recipe</h2>
            <p className="mt-2 text-gray-600 mb-6">{error}</p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-recipe-primary text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 ml-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Change Preferences
            </button>
          </div>
        ) : recipe ? (
          <RecipeDisplay recipe={recipe} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700">No recipe found</h2>
            <p className="mt-2 text-gray-600">Something went wrong. Please try again.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 mt-4 bg-recipe-primary text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Back to Preferences
            </button>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container text-center text-gray-500">
          <p>© {new Date().getFullYear()} Healthy Recipe Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RecipePage;
