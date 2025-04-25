
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-recipe-primary">Your Profile</h1>
          
          <Card className="mb-8 border-gray-200 shadow-md">
            <CardHeader className="bg-recipe-light border-b border-gray-200">
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                View and manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> user@example.com
                </p>
                <Button variant="outline">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8 border-gray-200 shadow-md">
            <CardHeader className="bg-recipe-light border-b border-gray-200">
              <CardTitle>Your Preferences</CardTitle>
              <CardDescription>
                Your saved dietary preferences and restrictions
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Dietary Preferences</h3>
                  <p className="text-gray-700">None saved yet</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Allergies</h3>
                  <p className="text-gray-700">None saved yet</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Nutritional Focus</h3>
                  <p className="text-gray-700">None saved yet</p>
                </div>
                <Button variant="outline">Update Preferences</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 shadow-md">
            <CardHeader className="bg-recipe-light border-b border-gray-200">
              <CardTitle>Saved Recipes</CardTitle>
              <CardDescription>
                Your recipe collection
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                You haven't saved any recipes yet. Generate recipes to start building your collection.
              </p>
              <Button className="bg-recipe-primary hover:bg-green-600" asChild>
                <a href="/">Generate New Recipe</a>
              </Button>
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
