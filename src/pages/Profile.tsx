
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/AuthProvider';
import { signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedRecipes, setSavedRecipes] = React.useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchSavedRecipes = async () => {
      const { data, error } = await supabase
        .from('saved_recipes')
        .select('*')
        .eq('user_id', user.id);

      if (!error && data) {
        setSavedRecipes(data);
      }
    };

    fetchSavedRecipes();
  }, [user, navigate]);

  const handleSignOut = async () => {
    if (await signOut()) {
      navigate('/login');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-recipe-primary">Your Profile</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                View and manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Saved Recipes</CardTitle>
              <CardDescription>
                Your recipe collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedRecipes.length > 0 ? (
                <div className="space-y-4">
                  {savedRecipes.map((recipe) => (
                    <div key={recipe.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{recipe.recipe_id}</h3>
                      <p className="text-sm text-gray-500">
                        Saved on {new Date(recipe.saved_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">
                  You haven't saved any recipes yet. Generate recipes to start building your collection.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container text-center text-gray-500">
          <p>© {new Date().getFullYear()} Healthy Recipe Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
