import React, { useEffect, useState } from "react";
import { FaSquareWebAwesome } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";
import { FaCreativeCommonsSamplingPlus } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import Wheel from "../Wheel/Wheel";
import axios from "axios";
import { useSelector } from "react-redux";

function Homepage() {
  const { data } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/data`,
        {
          withCredentials: true,
        }
      );

      // console.log("response", response);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    // getUser();
    if (!data?._id) {
      navigate("/");
    }
  }, [navigate]);

  const [timeLeft, setTimeLeft] = useState("");

  // Function to calculate the time remaining until midnight
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to the next midnight (12:00 AM)

    const diff = midnight.getTime() - now.getTime(); // Time difference in milliseconds

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update the countdown every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="h-screen  w-screen bg-[#0c0c20]">
        <div className="h-screen w-full rounded-t-3xl usman">
          <div className="flex justify-evenly p-3">
            <div
              className="h-[17vh] w-[23%]  bg-[#171725] rounded-xl"
              onClick={() => navigate("/reward", { state: {} })}
            >
              <FaSquareWebAwesome className="text-5xl m-auto py-3 text-gray-400" />
              <p className="text-white text-[13px] font-medium text-center">
                Daily reward
              </p>
              <p className="text-gray-500 text-center text-[14px] py-2">
                <p className="text-xs">{timeLeft}</p>
              </p>
            </div>
            <div
              className="h-[17vh] w-[23%] bg-[#171725] rounded-xl"
              onClick={() => navigate("/gift", { state: {} })}
            >
              <FaGift className="text-5xl m-auto py-3 text-gray-400" />
              <p className="text-white text-[13px] font-medium text-center">
                Daily Gift
              </p>
              <p className="text-gray-500 text-center text-[14px] py-2">
                <p className="text-xs">{timeLeft}</p>
              </p>
            </div>
            <div
              className="h-[17vh] w-[23%] bg-[#171725] rounded-xl"
              onClick={() => navigate("/combo", { state: {} })}
            >
              <FaCreativeCommonsSamplingPlus className="text-5xl m-auto py-3 text-gray-400" />
              <p className="text-white text-[13px] font-medium text-center">
                Daily combo
              </p>
              <p className="text-gray-500 text-center text-[14px] py-2">
                <p className="text-xs">{timeLeft}</p>
              </p>
            </div>
            <div
              className="h-[17vh] w-[23%] bg-[#171725] rounded-xl"
              onClick={() => navigate("/soon", { state: {} })}
            >
              <FaGamepad className="text-5xl m-auto py-3 text-gray-400" />
              <p className="text-white text-[13px] font-medium text-center">
                Lottery scheme
              </p>
            </div>
          </div>

          <Spinner />
          <Wheel />
        </div>
      </div>
    </>
  );
}

export default Homepage;
