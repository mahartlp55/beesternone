import React, { createContext, useContext, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

import { AiTwotoneDollar } from "react-icons/ai";
import Hamster1 from "../../images/Hamster1.png";
import { useSelector } from "react-redux";
const createdailyrewardcontext = createContext();
export const useDailyRewardHook = () => {
  const usedailyrewardcontext = useContext(createdailyrewardcontext);
  return usedailyrewardcontext;
};

function DailyRewardContextProvider(props) {
  const { cards } = useSelector((state) => state.game);
  console.log(cards);
  let dailyrewardarray = [
    {
      title: "Hamster Youtube",
      detail: [
        {
          id: "yt1",
          outer_icone: (
            <FaYoutube className=" text-white bg-red-700 rounded-full p-2" />
          ),
          outer_text: "How to verify your identity on OKX",
          inner_text:
            "What is KYC?How to verify your identity(KYC) on OKX.Hamster Academy",
          coins: 100000,
          button: "Watch video",
        },
      ],
    },
    {
      title: "Daily tasks",
      detail: [
        {
          id: "dr",
          outer_icone: <FaCalendar />,
          outer_text: "Daily reward",
          inner_text:
            "Get coins, keys and skins for logging into the gae daily without skipping",
          coins: 6649000,
          rewards: [
            {
              day: "Day 1",
              coins: 500,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 2",
              coins: 1000,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 3",
              coins: 2500,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 4",
              coins: 5000,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 5",
              coins: 15000,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 6",
              coins: 25000,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 7",
              coins: 100000,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 8",
              coins: 500000,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 9",
              coins: 1000000,
              dollar_icon: <AiTwotoneDollar />,
            },
            {
              day: "Day 10",
              coins: 5000000,
              dollar_icon: <AiTwotoneDollar />,
            },
          ],
        },
      ],
    },
    {
      title: "Tasks list",
      title_icone: <FaYoutube />,
      detail: [
        {
          id: "facebook",
          outer_icone: (
            <FaFacebookF className=" text-white bg-sky-400 rounded-full p-2" />
          ),
          outer_text: "Follow us on Facebook",
          coins: 100000,
          button: "Join",
        },
        {
          id: "instagram",
          outer_icone: <FaSquareInstagram />,
          outer_text: "Follow us on Instagram",
          coins: 100000,
          button: "Join",
        },
        {
          id: "telegram",
          outer_icone: (
            <MdOutlineCallMissedOutgoing className=" text-white bg-sky-400 rounded-full p-2" />
          ),
          outer_text: "Join our TG channel",
          coins: 50000,
          button: "Join",
        },
        {
          id: "x",
          outer_icone: (
            <FaXTwitter className=" text-white bg-black rounded-full p-2" />
          ),
          outer_text: "Follow our X account",
          coins: 50000,
          button: "Join",
        },
      ],
    },
  ];
  const additionalArray = cards;
  // const additionalArray = [
  //   {
  //     id: 1,
  //     title: "CEO",
  //     price: 90,
  //     image: Hamster1,
  //     level: 4,
  //     deductAmount: "4.5",
  //     subCategory: "pr&team",
  //   },
  //   {
  //     id: 2,
  //     title: "Employee",
  //     price: 50,
  //     image: Hamster1,
  //     level: 3,
  //     deductAmount: "3",
  //     subCategory: "markets",
  //   },
  //   {
  //     id: 3,
  //     title: "Intern",
  //     price: 20,
  //     image: Hamster1,
  //     level: 2,
  //     deductAmount: "1.5",
  //     subCategory: "legal",
  //   },
  //   {
  //     id: 4,
  //     title: "Manager",
  //     price: 75,
  //     image: Hamster1,
  //     level: 3,
  //     deductAmount: "2.5",
  //     subCategory: "pr&team",
  //   },
  //   {
  //     id: 5,
  //     title: "Director",
  //     price: 90,
  //     image: Hamster1,
  //     level: 4,
  //     deductAmount: "4",
  //     subCategory: "markets",
  //   },
  //   {
  //     id: 6,
  //     title: "Senior Developer",
  //     price: 85,
  //     image: Hamster1,
  //     level: 3,
  //     deductAmount: "3",
  //     subCategory: "legal",
  //   },
  //   {
  //     id: 7,
  //     title: "Junior Developer",
  //     price: 60,
  //     image: Hamster1,
  //     level: 2,
  //     deductAmount: "2",
  //     subCategory: "markets",
  //   },
  //   {
  //     id: 8,
  //     title: "HR Specialist",
  //     price: 55,
  //     image: Hamster1,
  //     level: 2,
  //     deductAmount: "1.8",
  //     subCategory: "pr&team",
  //   },
  //   {
  //     id: 9,
  //     title: "Sales Representative",
  //     price: 65,
  //     image: Hamster1,
  //     level: 3,
  //     deductAmount: "2.2",
  //     subCategory: "Specials",
  //   },
  //   {
  //     id: 10,
  //     title: "Marketing Coordinator",
  //     price: 70,
  //     image: Hamster1,
  //     level: 3,
  //     deductAmount: "2.8",
  //     subCategory: "web3",
  //   },
  // ];
  // All states are here
  const [dailyrewardarraystate, setDailyRewardArrayState] =
    useState(dailyrewardarray);
  const [redeemReward] = useState(additionalArray);

  const [reward, setReward] = useState(500000);
  const [navAmount, setNavAmount] = useState(50000);
  const [idsArray, setIdsArray] = useState([]);
  const [findingRedeemArray] = useState([
    {
      id: 1,
      title: "CEO",
      price: 90,
      image: Hamster1,
      level: 4,
      deductAmount: "4.5",
      subCategory: "pr&team",
    },
    {
      id: 4,
      title: "Manager",
      price: 75,
      image: Hamster1,
      level: 3,
      deductAmount: "2.5",
      subCategory: "pr&team",
    },
    {
      id: 8,
      title: "HR Specialist",
      price: 55,
      image: Hamster1,
      level: 2,
      deductAmount: "1.8",
      subCategory: "pr&team",
    },
  ]);
  const handleReward = (coin) => {
    setReward(() => reward + coin);
  };

  const handleRedeem = (id) => {
    const findRedeem = cards.find((item) => item.id === id).deductAmount;
    const deductSpecificAmount = findRedeem * 1000;

    if (reward <= deductSpecificAmount) {
      // console.log("Amount is lower than required to redeem");
    } else {
      const matchedElement = additionalArray.filter((item1) =>
        findingRedeemArray.some((item2) => item1.id === item2.id)
      );

      const findingIds = matchedElement.map((item) => item.id);
      setIdsArray(findingIds);
      if (matchedElement.length > 0) {
        findingRedeemArray.forEach((matchedElement) => {
          setNavAmount((prevNavAmount) => prevNavAmount + matchedElement.price);
          setReward(() => reward - deductSpecificAmount);
        });
      } else {
        // console.log("No match found");
        setReward((prevReward) => prevReward - deductSpecificAmount);
      }
    }
  };
  return (
    <div>
      <createdailyrewardcontext.Provider
        value={{
          dailyrewardarraystate,
          setDailyRewardArrayState,
          handleReward,
          reward,
          redeemReward,
          handleRedeem,
          findingRedeemArray,
          navAmount,
          idsArray,
          additionalArray,
        }}
      >
        {props.children}
      </createdailyrewardcontext.Provider>
    </div>
  );
}

export default DailyRewardContextProvider;
