import React from "react";
import Lottie from "react-lottie";

import animationData from "../components/animations/loading.json";

// Define the type for Lottie options
interface LottieOptions {
  loop: boolean;
  autoplay: boolean;
  animationData: object;
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

const LottieAnimation: React.FC = () => {
  const defaultOptions: LottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={150}
      width={150}
    />
  );
};

export default LottieAnimation;
