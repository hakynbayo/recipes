import Image from "next/image";
import React, { useState } from "react";

import Modal from "./Modal";
import { convertToUSD } from "../utils/currencyConverter";

interface RecipeCardProps {
  name: string;
  calories: number;
  image: string;
  cost: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ name, calories, image, cost }) => {
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleConversion = async () => {
    const converted = await convertToUSD(cost);
    setUsdPrice(converted);
    setModalOpen(true);
  };

  return (
    <div className="bg-purple-400 text-white rounded-lg shadow-md p-4">
      <Image
        width={100}
        height={100}
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-bold mt-4">{name}</h2>
      <p className="text-sm text-gray-600">Calories: {calories} kcal</p>
      <p className="text-sm text-gray-800 mt-2">Cost: ₦{cost}</p>
      <button
        onClick={handleConversion}
        className="mt-4 bg-white text-purple-500 px-4 py-2 rounded-md"
      >
        Click to see USD price
      </button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <p className="text-center">USD Price: ${usdPrice}</p>
        </Modal>
      )}
    </div>
  );
};

export default RecipeCard;