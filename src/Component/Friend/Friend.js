import React, { useEffect, useState } from "react";
import { FaGift } from "react-icons/fa";
import { CiBitcoin } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

function Friend() {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);
  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    console.log(data.totalInvites);
    if (!data?._id) {
      navigate("/");
    } else {
      // Fetch the invite link from the backend
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/invite-link`)
        .then((response) => {
          console.log(response);
          setInviteLink(response.data.inviteLink);
        })
        .catch((error) => {
          toast.error("Error fetching invite link");
        });
    }
  }, [data, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied!");
  };

  return (
    <>
      <div className="h-screen flex flex-col overflow-y-auto w-screen bg-[#0c0c20f7]">
        <IoIosArrowBack
          className="text-white text-[40px] py-2"
          onClick={() => navigate("/home", { state: {} })}
        />
        <p className="text-white text-2xl font-semibold text-center py-3">
          Invite friends!
        </p>
        <p className="text-gray-300 text-center">
          You and your friend will receive bonuses
        </p>
        <div className="  w-[90%] rounded-xl m-auto bg-[#171725] py-2 my-3">
          <div className="flex justify-around items-center">
            <FaGift className="text-gray-500 text-3xl" />
            <div className="div">
              <p className="text-white text-lg font-medium py-2">
                Invite a friend
              </p>
              <div className="flex">
                <CiBitcoin className="text-white text-2xl me-2 bg-[#e9a830] rounded-full" />
                <p className="text-gray-300">
                  <span className="text-[#e9a830] font-medium">+100,000</span>{" "}
                  tokens for you and your friend
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleCopyLink}
            className="text-white text-lg font-medium w-[250px] h-[60px] border rounded-lg bg-[#171725] mt-[180px]"
          >
            Copy Invite Link
          </button>
          <MdContentCopy
            className="text-white text-lg bg-[#171725f6] border rounded-lg w-[80px] mt-[180px] p-3 h-[60px]"
            onClick={handleCopyLink} 
          />
        </div>
        <div className="text-3xl w-full text-center  text-white my-28 mt-4 ">
          <span className="text-[#e9a830]">Total invites: </span>
          {data.totalInvites}
        </div>
      </div>
    </>
  );
}

export default Friend;
