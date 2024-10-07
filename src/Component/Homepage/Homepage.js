import React, { useEffect } from "react";
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

  return (
    <>
      <div className="h-screen  w-screen bg-[#0c0c20]">
        <div className="h-screen w-full rounded-t-3xl usman">
          <div className="flex justify-evenly p-3">
            <div
              className="h-[17vh] w-[23%] bg-[#171725] rounded-xl"
              onClick={() => navigate("/reward", { state: {} })}
            >
              <FaSquareWebAwesome className="text-5xl m-auto py-3 text-gray-400" />
              <p className="text-white text-[13px] font-medium text-center">
                Daily reward
              </p>
              <p className="text-gray-500 text-center text-[14px] py-2">
                16:23
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
                11:18
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
                04:14
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
