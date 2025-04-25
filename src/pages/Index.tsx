
import React from 'react';
import Header from '@/components/Header';
import PreferencesForm from '@/components/PreferencesForm';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 text-recipe-primary">Healthy Recipe Generator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate personalized, healthy recipes tailored to your dietary preferences,
            allergies, and nutritional needs.
          </p>
        </div>
        
        <PreferencesForm />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container text-center text-gray-500">
          <p>© {new Date().getFullYear()} Healthy Recipe Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
