
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Recipe } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Define a type for the saved recipe data we receive from Supabase
interface SavedRecipe {
  id: string;
  recipe_id: string;
  saved_at: string;
  user_id: string;
}

const SavedRecipes: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          toast.error("Please log in to view saved recipes");
          navigate('/login');
          return;
        }
        
        if (!sessionData.session) {
          toast.error("Please log in to view saved recipes");
          navigate('/login');
          return;
        }
        
        const { data, error } = await supabase
          .from('saved_recipes')
          .select('*')
          .eq('user_id', sessionData.session.user.id);
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          // Now we're properly typing the data as SavedRecipe[]
          setRecipes(data as SavedRecipe[]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
        toast.error("Failed to load saved recipes");
        setLoading(false);
      }
    };
    
    fetchSavedRecipes();
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-6 text-recipe-primary">Saved Recipes</h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="border border-gray-200">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{recipe.recipe_id}</CardTitle>
                  <CardDescription>
                    Saved on {new Date(recipe.saved_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    This is a saved recipe. View full details for more information.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-recipe-primary hover:bg-green-600"
                    onClick={() => toast.info("View full recipe functionality coming soon!")}
                  >
                    View Full Recipe
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Saved Recipes</h2>
            <p className="text-gray-600 mb-6">
              You haven't saved any recipes yet. Generate new recipes and save them to build your collection.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-recipe-primary hover:bg-green-600"
            >
              Generate New Recipe
            </Button>
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

export default SavedRecipes;
