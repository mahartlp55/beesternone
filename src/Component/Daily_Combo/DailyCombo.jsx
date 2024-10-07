import React, { useState, useEffect, useContext } from "react";
import { FaRegCircle } from "react-icons/fa";
import { CiBitcoin } from "react-icons/ci";
import { useDailyRewardHook } from "../context/DailyRewardContextProvider";
import { ImCross } from "react-icons/im";
import Hamster1 from "../../images/Hamster1.png";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSingleCard,
  fetchTotalTokens,
  getCardIds,
  getSelectedCard,
} from "../../store/features/gameSlice";
import { RecallContext } from "../DailyRewardSection/RecallContext";
import ComboCard from "../Cards/ComboCard";

function DailyCombo() {
  const { reward, redeemReward, handleRedeem, additionalArray } =
    useDailyRewardHook();
  const { reCall, reCallData } = useContext(RecallContext);
  const navigate = useNavigate();

  const { totalTokens, error, selectedCards, cardIds, pph } = useSelector(
    (state) => state.game
  );
  // console.log(selectedCards);
  const [showCard, setShowCard] = useState(false);
  const [flippedIds, setFlippedIds] = useState([]); // Changed to an array
  const [singleCard, setSingleCard] = useState({});
  const [deductAmount, setDeductAmount] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  // The IDs you want to filter by
  // const filteredArray = additionalArray.filter((item) =>
  //   idsArray.includes(item.id)
  // );
  const openModal = (id) => {
    const findSpecific = redeemReward.find((item) => item.id === id);
    const deductSpecificAmount = findSpecific.deductAmount * 1000;
    setDeductAmount(deductSpecificAmount);
    setSingleCard(findSpecific);
    setShowCard(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedCard());
    dispatch(fetchTotalTokens());
    dispatch(getCardIds());
    reCallData(10);
  }, [reCall, dispatch, reCallData]);
  const { data } = useSelector((state) => state.user);

  if (!data?._id) {
    navigate("/");
  }

  const triggerRedeem = () => {
    // Add the single card ID to flippedIds
    if (!flippedIds.includes(singleCard.id)) {
      setFlippedIds((prev) => [...prev, singleCard.id]);
    }
    const tokenAmount = Number(singleCard.deductAmount) * 1000;
    const selectedCardId = String(singleCard.id);
    dispatch(
      checkSingleCard({
        selectedCardId,
        profitPerHour: singleCard.price.toString(),
        tokenAmount,
      })
    );
    if (error) {
      console.error(error);
    }

    reCallData(8);

    setShowCard(false);
    if (singleCard.id !== undefined) {
      handleRedeem(singleCard.id);
    }
  };

  const uniqueSubcategories = [
    ...new Set(redeemReward.map((item) => item.subCategory)),
  ];

  useEffect(() => {
    if (uniqueSubcategories.length > 0) {
      setSelectedCategory(uniqueSubcategories[0]);
    }
  }, []);

  const filteredRewards = redeemReward.filter(
    (item) => item.subCategory === selectedCategory
  );

  return (
    <div className="h-screen w-screen pb-28 bg-[#0c0c1d] overflow-hidden overflow-y-auto">
      <div className=" flex items-center justify-between mx-2">
        {" "}
        <IoIosArrowBack
          className="text-white text-2xl my-2"
          onClick={() => navigate("/home", { state: {} })}
        />
        <div className="flex items-center gap-1 bg-fuchsia-800 p-1.5 rounded-lg mr-2">
          <CiBitcoin className="text-[20px] text-[#fff] bg-[#e9a830]  rounded-full" />
          <p className="text-[#fff] font-semibold text-[14px]">+{pph}</p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 ">
        <div className="flex bg-[#26263a] justify-between items-center w-[95%] mx-auto p-1.5 px-2 rounded-lg">
          <p className="text-white font-semibold">Daily combo</p>
          <div className="flex gap-1 text-gray-600">
            <FaRegCircle size={12} />
            <FaRegCircle size={12} />
            <FaRegCircle size={12} />
          </div>
          <div className="flex items-center gap-1 bg-fuchsia-800 p-1.5 rounded-lg">
            <CiBitcoin className="text-[20px] text-[#fff] bg-[#e9a830] rounded-full" />
            <p className="text-[#fff] font-semibold text-[14px]">+500000</p>
          </div>
        </div>

        <div className="flex gap-1.5 justify-center items-center w-[95%] mx-auto ">
          <section className="flex justify-center items-center bg-[#26263a] h-[120px] w-[33%] text-white border-yellow-600 shadowdiv1 rounded-lg border-[2px] border-b-0">
            {selectedCards.length > 0 && cardIds.includes(selectedCards[0]) ? (
              <ComboCard
                additionalArray={additionalArray}
                id={selectedCards[0]}
              />
            ) : (
              <ComboCard />
            )}
          </section>
          <section className="flex justify-center items-center bg-[#26263a] h-[120px] w-[33%] text-white border-yellow-600 shadowdiv1 rounded-lg border-[2px] border-b-0">
            {selectedCards.length > 0 && cardIds.includes(selectedCards[1]) ? (
              <ComboCard
                additionalArray={additionalArray}
                id={selectedCards[1]}
              />
            ) : (
              <ComboCard />
            )}
          </section>
          <section className="flex justify-center items-center bg-[#26263a] h-[120px] w-[33%] text-white border-yellow-600 shadowdiv1 rounded-lg border-[2px] border-b-0">
            {selectedCards.length > 0 && cardIds.includes(selectedCards[2]) ? (
              <ComboCard
                additionalArray={additionalArray}
                id={selectedCards[2]}
              />
            ) : (
              <ComboCard />
            )}
          </section>
        </div>
        <div className="flex items-center justify-center gap-2">
          <CiBitcoin className="text-[40px] text-[#fff] bg-[#e9a830] rounded-full" />
          <p className="text-white text-[26px] font-bold">+{totalTokens}</p>
        </div>
        <div className="w-[95%] bg-[#26263a] mx-auto rounded-lg flex text-white items-center justify-center py-2">
          {uniqueSubcategories.map((category) => (
            <div
              key={category}
              className={`w-[19.5%] text-[13px] font-medium flex justify-center items-center py-2 px-3 rounded-lg cursor-pointer ${
                selectedCategory === category ? "bg-[#0C0C1D]" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 w-[95%] mx-auto">
          {filteredRewards.map((item) => {
            const {
              id,
              title,
              image,
              price,
              level,
              deductAmount,
              subCategory,
            } = item;
            if (subCategory === "web3") {
              navigate("/soon");
            } else {
              return (
                <div
                  className="rounded-3xl flex flex-col bg-[#26263a] w-[100%]"
                  key={id}
                  onClick={() => openModal(id)}
                >
                  <div className="flex w-[80%] py-2">
                    <img src={image} className="w-[60px] h-[60px]" alt="" />
                    <div className="flex flex-col text-white">
                      <p className="text-[14px]">{title}</p>
                      <div className="flex flex-col">
                        <p className="text-[12px] text-gray-500">
                          Profit per hour
                        </p>
                        <div className="flex items-center gap-1">
                          <CiBitcoin className="text-[16px] bg-[#e9a830] rounded-full" />
                          <p className="text-[12px] font-medium">{price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] border-t-[1px] border-t-slate-600">
                    <div className="w-[80%] text-white flex gap-2 items-center justify-start py-2 px-4">
                      <p className="text-[12px] font-medium ">lvl {level}</p>
                      <div className="flex gap-1 border-l-[1px] border-l-slate-600 pl-2">
                        <CiBitcoin className="text-[22px] bg-[#e9a830] rounded-full" />
                        <p className="text-[12px] font-medium">
                          {deductAmount}k
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {showCard && (
            <div className="fixed bottom-0 left-0 w-full h-[60%] text-[#fff] bg-[#0c0c1d] border-t-2 rounded-t-3xl border-t-[#e9a830]">
              <div>
                <ImCross
                  className="text-[#fff] text-[22px] bg-slate-500 p-1 rounded-full absolute top-3 right-3"
                  onClick={() => {
                    setShowCard(false);
                    setFlippedIds([]); // Reset flipped IDs if needed
                  }}
                />
                <img
                  src={Hamster1}
                  alt=""
                  className="h-[100px] w-[100px] m-auto my-2"
                />
                {reward > deductAmount ? (
                  <div className="flex flex-col items-center">
                    <p className="text-2xl text-center">{singleCard.title}</p>
                    <p className="text-center">
                      Develop your management skills as a company founder.
                      Improve your leadership skills.
                    </p>
                    <p className="text-center text-lg my-2">Profit per hour</p>
                    <div className="flex gap-1 justify-center items-center mb-1">
                      <CiBitcoin className="text-[22px] bg-[#e9a830] rounded-full" />
                      <p>{singleCard.price}</p>
                    </div>
                    <button
                      className="bg-yellow-500 px-6 py-2 rounded-lg text-white font-bold ms-[100px] me-[100px]"
                      onClick={triggerRedeem}
                    >
                      Collect
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg text-center">
                      You do not have enough amount {deductAmount} to redeem
                      this card.
                    </h2>
                    <p className="text-center">
                      Please complete your daily task to earn more rewards.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyCombo;
