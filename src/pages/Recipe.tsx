
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import RecipeDisplay from '@/components/RecipeDisplay';
import { Recipe, UserPreferences } from '@/types';
import { generateRecipeFromPreferences } from '@/data/dummyRecipes';
import { Skeleton } from '@/components/ui/skeleton';

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Get preferences from session storage
        const preferencesString = sessionStorage.getItem('userPreferences');
        
        if (!preferencesString) {
          navigate('/');
          return;
        }
        
        const preferences: UserPreferences = JSON.parse(preferencesString);
        
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate recipe based on preferences
        const generatedRecipe = generateRecipeFromPreferences(preferences);
        
        setRecipe(generatedRecipe);
        setLoading(false);
      } catch (error) {
        console.error('Failed to generate recipe:', error);
        setLoading(false);
        navigate('/');
      }
    };

    fetchRecipe();
  }, [navigate]);

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
        ) : recipe ? (
          <RecipeDisplay recipe={recipe} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700">No recipe found</h2>
            <p className="mt-2 text-gray-600">Something went wrong. Please try again.</p>
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
