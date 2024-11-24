import Lottie from "lottie-react";
import React from "react";

import animationData from "../components/animations/loading.json";

const LottieAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ height: 150, width: 150 }}
    />
  );
};

export default LottieAnimation;
