"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import LottieAnimation from "@/components/LottieAnimation";

import RecipeCard from "../components/RecipeCard";
import { generateRandomCost } from "../utils/randomCostGenerator";

// Type for meal data from the API response
type Meal = {
  strMeal: string;
  strMealThumb: string;
};

type Recipe = {
  name: string;
  calories: number;
  image: string;
  cost: number;
};

const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [query, setQuery] = useState(""); // Search query
  const router = useRouter();

  const fetchRecipes = async (query: string) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.meals || !Array.isArray(data.meals)) {
        setRecipes([]); // Clear recipes if no results
        return;
      }

      setRecipes(
        data.meals.map((meal: Meal) => ({
          name: meal.strMeal,
          calories: Math.round(Math.random() * 500 + 100), // Random calories as TheMealDB doesn't provide it
          image: meal.strMealThumb,
          cost: generateRandomCost(),
        }))
      );
    } catch (error) {
      alert("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">Recipe Finder</h1>

        {/* Navigate to Restaurant Page Button */}
        <button
          onClick={() => router.push("/restaurant")}
          className="bg-purple-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Nearby Restaurants
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-2/4 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => fetchRecipes(query)}
          className="ml-2 bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Loading Animation or Recipe Results */}
      {loading ? (
        <LottieAnimation />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => <RecipeCard key={recipe.name} {...recipe} />)
          ) : (
            <p className="col-span-full text-left text-gray-500">
              No recipes found. Try searching for Chicken, Rice, Salad etc....!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
