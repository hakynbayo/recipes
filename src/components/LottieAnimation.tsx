import Lottie from "lottie-react";
import React from "react";

import animationData from "../components/animations/loading.json";

const LottieAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData} // Pass animationData directly
      loop={true}                   // Specify loop directly
      autoplay={true}               // Specify autoplay directly
      style={{ height: 150, width: 150 }} // Use style for size
    />
  );
};

export default LottieAnimation;
