"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import LottieAnimation from "../../components/LottieAnimation";
import RestaurantCard from "../../components/ResturantCard";

// Define the types for the API response
interface Location {
  formatted_address: string;
}

interface Photo {
  prefix: string;
  suffix: string;
}

interface Place {
  fsq_id: string;
  name: string;
  location: Location;
  rating: number;
  photos?: Photo[];
}

interface APIResponse {
  results: Place[];
}

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  photo?: string;
}

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.foursquare.com/v3/places/nearby?ll=${latitude},${longitude}&categories=11144,13000,13065,13377&limit=20`,
        {
          headers: {
            Authorization: "fsq3wYhfD/LvjcPNb2gO4UnusWU0P2F5aI1xJl7+jsEDDns=",
          },
        }
      );

      const data: APIResponse = await response.json();
      const restaurantList = data.results.map((place) => ({
        id: place.fsq_id,
        name: place.name,
        address: place.location.formatted_address || "Address not available",
        rating: place.rating || 0,
        photo: place.photos?.[0]?.prefix
          ? `${place.photos[0].prefix}original${place.photos[0].suffix}`
          : undefined,
      }));

      setRestaurants(restaurantList);
      setLoading(false);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        {/* Back Link with Icon */}
        <Link href="/" className="flex items-center text-purple-700 hover:text-purple-500">
          <FaArrowLeft className="mr-2" />
          <span>Go Back</span>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-purple-700 mb-6">Find Nearby Restaurants</h1>

      <button
        onClick={fetchRestaurants}
        className="bg-purple-500 text-white px-4 py-2 rounded-md"
      >
        Get Nearby Restaurants
      </button>

      {loading ? (
        <LottieAnimation />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
