import React, { useContext, useState } from "react";
import { FaGift } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendDollars } from "../../store/features/gameSlice";
import { RecallContext } from "../DailyRewardSection/RecallContext";

function Gift() {
  const dispatch = useDispatch();
  const [isOpened] = useState(false);
  const navigate = useNavigate();
  const { reCallData } = useContext(RecallContext);
  const { data } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.game);
  const dollars = data?.totalDollar;

  // Redirect to home if user data is not available
  if (!data?._id) {
    navigate("/");
  }

  const handleGiftClick = () => {
    if (!isOpened) {
      dispatch(sendDollars());
      reCallData(10);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center  bg-[#0c0c20] p-5">
      <MdOutlineClear
        className="text-white p-3 text-5xl cursor-pointer hover:text-red-400 transition duration-300"
        onClick={() => navigate("/home")}
      />
      <p className="text-white text-4xl text-center py-5 font-bold">
        Your Gift
      </p>

      {/* Gift Box */}
      <div
        className={`gift-box ${
          isOpened ? "opened" : ""
        } transition-all duration-500 cursor-pointer`}
        onClick={handleGiftClick}
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "10px",
          border: "2px dashed #fff",
          position: "relative",
        }}
      >
        <FaGift
          className={`text-gray-300 text-8xl m-auto ${
            isOpened ? "hidden" : "block"
          }`}
        />
        {isOpened && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e] bg-opacity-80 rounded-lg">
            <p className="text-yellow-400 text-3xl font-bold">
              🎉 Congratulations! 🎉
            </p>
          </div>
        )}
      </div>

      {/* Gift Reveal */}
      <div className="gift-reveal text-center transition-opacity duration-1000 ease-in">
        {isOpened ? (
          <p className="text-white text-2xl mt-4">
            You've unlocked your special gift!
          </p>
        ) : (
          <>
            <p className="text-yellow-400 text-3xl font-bold mt-8">
              🎁 Tap to open your gift! 🎁
            </p>
            {error && <h1 className="text-red-400">{error}</h1>}
          </>
        )}
      </div>
    </div>
  );
}

export default Gift;
