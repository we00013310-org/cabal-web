import React from "react";
import { useNavigate } from "react-router-dom";
import animationData from "../../assets/images/Lotties/77618-website-404-error-animation.json";
import Lottie from "lottie-react";

export default function FourZeroFour() {
  const navigate = useNavigate();
  const style = {
    width: 600,
    height: 600,
  };
  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#232247]">
      <div>
        <Lottie animationData={animationData} loop={true} style={style} />
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="btn-gradient text-white text-lg w-[150px] h-[50px] rounded-full"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
