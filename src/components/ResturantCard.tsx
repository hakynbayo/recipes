import Image from "next/image";
import React from "react";

interface RestaurantCardProps {
  id: string;
  name: string;
  address: string;
  rating?: number;
  photo?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, address, rating, photo }) => {
  return (
    <div className="bg-purple-500 text-white rounded-lg shadow-md p-4">
      {photo && (
        <Image
          src={photo}
          alt={name}
          className="w-full h-40 object-cover rounded-md"
          width={100}
          height={100}
        />
      )}
      <h2 className="text-lg font-bold mt-4">{name}</h2>
      <p className="text-sm text-gray-300">{address}</p>
      <p className="text-sm text-gray-800 mt-2">Rating: {rating}/5</p>
    </div>
  );
};

export default RestaurantCard;

