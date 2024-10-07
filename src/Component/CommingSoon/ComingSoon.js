import React from "react";
import { CiBitcoin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdOutlineClear } from "react-icons/md";

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-screen w-screen bg-[#0C0C20] text-white">
      <MdOutlineClear
        className="text-white text-[40px] py-2"
        onClick={() => navigate("/home", { state: {} })}
      />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 flex-col lg:flex-row">
            <p className="text-5xl">🚀</p>
            <h1 className="text-5xl font-bold mb-4">
              Coming <span className="">Soon!</span>
            </h1>
          </div>
          <p className="text-lg mb-6 flex-wrap px-4">
            Get ready for an exciting new crypto launching game market.
          </p>
          <div className="flex justify-center mb-6">
            <CiBitcoin className="text-5xl font-semibold  bg-[#e9a830] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
