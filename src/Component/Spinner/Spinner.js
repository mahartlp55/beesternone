import React, { useContext, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
// import { BsEmojiDizzy } from "react-icons/bs";
import { CiBitcoin } from "react-icons/ci";
// import { FaCircleInfo } from "react-icons/fa6";
// import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { useDailyRewardHook } from "../context/DailyRewardContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalTokens } from "../../store/features/gameSlice";
import { RecallContext } from "../DailyRewardSection/RecallContext";

function Spinner() {
  const navigate = useNavigate();
  // const { navAmount, reward } = useDailyRewardHook();
  const { reCall } = useContext(RecallContext);
  const dispatch = useDispatch();
  const { totalTokens, pph } = useSelector((state) => state.game);
  const { data } = useSelector((state) => state.user);

  // Default level properties
  let levelText = "Bronze";
  let helloLevel = "1";
  let clrLevelColor = "bg-yellow-500";
  let clrLevelWidth = "w-[7%]";

  // Update level based on reward value
  if (totalTokens >= 20000000000) {
    levelText = "Winner";
    helloLevel = "15";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[100%]";
  } else if (totalTokens >= 18500000000) {
    levelText = "Clash";
    helloLevel = "14";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[98%]";
  } else if (totalTokens >= 17500000000) {
    levelText = "Brawl";
    helloLevel = "13";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[96%]";
  } else if (totalTokens >= 16500000000) {
    levelText = "Tactics";
    helloLevel = "12";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[94%]";
  } else if (totalTokens >= 15000000000) {
    levelText = "Squad";
    helloLevel = "11";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[92%]";
  } else if (totalTokens >= 12500000000) {
    levelText = "Heroic";
    helloLevel = "10";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[90%]";
  } else if (totalTokens >= 1000000000) {
    levelText = "Master";
    helloLevel = "9";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[80%]";
  } else if (totalTokens >= 750000000) {
    levelText = "Ace";
    helloLevel = "8";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[70%]";
  } else if (totalTokens >= 500000000) {
    levelText = "Diamond";
    helloLevel = "7";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[60%]";
  } else if (totalTokens >= 250000000) {
    levelText = "Crown";
    helloLevel = "6";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[50%]";
  } else if (totalTokens >= 100000000) {
    levelText = "Firster";
    helloLevel = "5";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[40%]";
  } else if (totalTokens >= 10000000) {
    levelText = "Platinium";
    helloLevel = "4";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[30%]";
  } else if (totalTokens >= 5000000) {
    levelText = "Gold";
    helloLevel = "3";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[20%]";
  } else if (totalTokens >= 2500000) {
    levelText = "Silver";
    helloLevel = "2";
    clrLevelColor = "bg-yellow-600";
    clrLevelWidth = "w-[15%]";
  }

  useEffect(() => {
    dispatch(fetchTotalTokens());
  }, [totalTokens, reCall, dispatch]);

  return (
    <>
      <div className="flex">
        <div
          className="h-auto w-[48%]"
          onClick={() => navigate("/level", { state: {} })} // Navigate to level page
        >
          <div className="flex items-center p-3 ms-2">
            <p className="text-white font-medium">{levelText}</p>
            <MdNavigateNext className="text-white text-xl" />
            <p className="text-white ms-12">
              {helloLevel}
              <span className="text-gray-400">/15</span>{" "}
              {/* Updated max level */}
            </p>
          </div>
          <div className="h-[10px] w-[80%] bg-[#494848] rounded-full mx-auto">
            <div
              className={`h-[10px] ${clrLevelColor} ${clrLevelWidth} rounded-full`}
            ></div>
          </div>
        </div>

        {/* Bottom bar with icons */}
        <div className="h-[7vh] w-[50%] bg-[#494848] flex justify-center items-center mt-4  rounded-full">
          <div className="flex items-center justify-evenly">
            <CiBitcoin className="text-white bg-[#e9a830] me-3 rounded-full text-[20px]" />
            <p className="font-medium text-white me-1">
              {pph} <span className="text-[#e9a830]"> - pph </span>
            </p>
          </div>
        </div>
      </div>

      {/* Display reward */}
      <div className="h-[7vh] w-full flex items-center p-2 mt-4 justify-between bg-[#2c2c2c] rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-2">
          <CiBitcoin className="text-white bg-[#e9a830] rounded-full p-2 text-[24px] shadow-lg transition-transform transform hover:scale-110" />
          <p className="font-medium text-white text-lg">{totalTokens}</p>
        </div>
        <h1 className="text-white text-xl font-bold">{data?.totalDollar}$</h1>
      </div>
    </>
  );
}

export default Spinner;
