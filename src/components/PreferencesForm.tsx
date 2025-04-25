
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserPreferences } from "@/types";

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "low-carb", label: "Low Carb" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];

const allergyOptions = [
  { id: "nuts", label: "Nuts" },
  { id: "shellfish", label: "Shellfish" },
  { id: "eggs", label: "Eggs" },
  { id: "soy", label: "Soy" },
  { id: "wheat", label: "Wheat" },
];

const deficiencyOptions = [
  { id: "iron", label: "Iron" },
  { id: "vitamin-d", label: "Vitamin D" },
  { id: "vitamin-b12", label: "Vitamin B12" },
  { id: "calcium", label: "Calcium" },
  { id: "omega3", label: "Omega-3" },
];

const cuisineOptions = [
  "Mediterranean", "Asian", "Italian", "Mexican", 
  "Indian", "Japanese", "Greek", "Thai", "American"
];

const cookingLevels = ["Beginner", "Intermediate", "Advanced"];

const PreferencesForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreferences: [],
    allergies: [],
    nutritionalDeficiencies: [],
    cuisineType: "",
    cookingLevel: "",
    age: "",
  });

  const handleCheckboxChange = (category: keyof Pick<UserPreferences, 'dietaryPreferences' | 'allergies' | 'nutritionalDeficiencies'>, itemId: string, checked: boolean) => {
    if (checked) {
      setPreferences({
        ...preferences,
        [category]: [...preferences[category], itemId],
      });
    } else {
      setPreferences({
        ...preferences,
        [category]: preferences[category].filter(id => id !== itemId),
      });
    }
  };

  const handleSelectChange = (value: string, field: keyof Pick<UserPreferences, 'cuisineType' | 'cookingLevel'>) => {
    setPreferences({
      ...preferences,
      [field]: value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least one preference is selected
    if (
      preferences.dietaryPreferences.length === 0 &&
      preferences.allergies.length === 0 &&
      preferences.nutritionalDeficiencies.length === 0 &&
      !preferences.cuisineType
    ) {
      toast({
        title: "Missing preferences",
        description: "Please select at least one preference to generate a recipe.",
        variant: "destructive",
      });
      return;
    }

    // Store preferences in session storage and navigate to recipe page
    sessionStorage.setItem("userPreferences", JSON.stringify(preferences));
    navigate("/recipe");
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card className="border-gray-200 shadow-md">
        <CardHeader className="bg-recipe-light border-b border-gray-200">
          <CardTitle className="text-2xl font-bold text-recipe-primary">Find Your Perfect Recipe</CardTitle>
          <CardDescription>
            Tell us about your preferences, and we'll generate a personalized healthy recipe for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dietary Preferences Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Dietary Preferences</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {dietaryOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`diet-${option.id}`}
                      checked={preferences.dietaryPreferences.includes(option.id)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("dietaryPreferences", option.id, checked === true)
                      }
                    />
                    <Label htmlFor={`diet-${option.id}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Allergies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {allergyOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`allergy-${option.id}`}
                      checked={preferences.allergies.includes(option.id)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("allergies", option.id, checked === true)
                      }
                    />
                    <Label htmlFor={`allergy-${option.id}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutritional Deficiencies Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Nutritional Deficiencies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {deficiencyOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`deficiency-${option.id}`}
                      checked={preferences.nutritionalDeficiencies.includes(option.id)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("nutritionalDeficiencies", option.id, checked === true)
                      }
                    />
                    <Label htmlFor={`deficiency-${option.id}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Cuisine Type */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Preferred Cuisine</h3>
              <Select
                value={preferences.cuisineType}
                onValueChange={(value) => handleSelectChange(value, "cuisineType")}
              >
                <SelectTrigger className="w-full sm:w-1/2">
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Cooking Level */}
              <div className="space-y-2">
                <h3 className="font-medium">Cooking Experience Level (optional)</h3>
                <Select
                  value={preferences.cookingLevel}
                  onValueChange={(value) => handleSelectChange(value, "cookingLevel")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your cooking level" />
                  </SelectTrigger>
                  <SelectContent>
                    {cookingLevels.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Age Range */}
              <div className="space-y-2">
                <Label htmlFor="age" className="font-medium">
                  Age (optional)
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="text"
                  placeholder="e.g., 30-40"
                  value={preferences.age}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-recipe-primary hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Generate Recipe
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesForm;
