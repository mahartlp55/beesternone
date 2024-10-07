import React, { useContext, useEffect, useState } from "react";
import { useDailyRewardHook } from "../context/DailyRewardContextProvider";
import { CiBitcoin } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  claimDailyReward,
  getRewardData,
  spinGame,
} from "../../store/features/gameSlice";
import { RecallContext } from "./RecallContext";
import { getLinks, trackVisit } from "../../store/features/linkSlice";

function Daily_reward() {
  const { dailyrewardarraystate, handleReward } = useDailyRewardHook();

  const { data } = useSelector((state) => state.user);

  const [showcheckcard, setShowCheckCard] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [selectedCardInnerText, setSelectedInnerCardText] = useState("");
  const [selectedCardOuterText, setSelectedOuterCardText] = useState("");
  const [selectedCardOuterIcone, setSelectedOuterCardIcone] = useState("");
  const [selectedCardCoins, setSelectedCardCoins] = useState("");
  const [selectedCardButton, setSelectedCardButton] = useState("");
  const [selectedCardReward, setSelectedCardReward] = useState("");
  const [videodisplayed, setVideoDisplayed] = useState(false);
  const [showCrossIcon, setShowCrossIcon] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reCallData } = useContext(RecallContext);
  const { nextReward } = useSelector((state) => state.game);
  const { links } = useSelector((state) => state.links);
  useEffect(() => {
    dispatch(getRewardData());
    dispatch(getLinks());
  }, []);
  // console.log(links.socialMedia);

  if (!data?._id) {
    navigate("/");
  }

  const [showCoinAnimation, setShowCoinAnimation] = useState(false);

  const [clickedCoin, setClickedCoin] = useState(null);
  const [viewed, setViewed] = useState(false);
  const handleCoinCollect = (coin) => {
    setClickedCoin(coin);

    setShowCoinAnimation(true);
    setTimeout(() => setShowCoinAnimation(false), 1000);
    if (selectedCardId === "yt1") {
      // console.log(coin);
      dispatch(spinGame(coin));
      reCallData(coin);
      setViewed(false);
    }
    if (selectedCardId === "yt2") {
      // console.log(coin);
      dispatch(spinGame(coin));
      reCallData(coin);
    }

    if (selectedCardId === "dr") {
      dispatch(claimDailyReward(coin));
      // toast.success("Reward collected successfully");

      reCallData(coin);
    }
    setTimeout(() => setClickedCoin(null), 1000);
  };

  const coinAnimation = {
    hidden: { opacity: 0, y: 0 },
    visible: (i) => ({
      opacity: 1,
      y: [-50, -100, 0], // Moves the coin upwards and back down
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  const handleWatchVideo = () => {
    if (selectedCardId === "yt1") {
      setVideoDisplayed(true);

      setTimeout(() => {
        setViewed(true);
      }, 1000);
    }
    if (selectedCardId === "instagram") {
      window.location = links.socialMedia.instagram;
      dispatch(trackVisit({ userId: data._id, platform: selectedCardId }));
      console.log(selectedCardId);
    } else if (selectedCardId === "telegram") {
      window.location = links.socialMedia.telegram;
      dispatch(trackVisit({ userId: data._id, platform: selectedCardId }));
    } else if (selectedCardId === "x") {
      window.location = links.socialMedia.x;
      dispatch(trackVisit({ userId: data._id, platform: selectedCardId }));
    } else if (selectedCardId === "facebook") {
      window.location = links.socialMedia.facebook;
      dispatch(trackVisit({ userId: data._id, platform: selectedCardId }));
    }
  };

  return (
    <>
      <div className="h-[100vh] w-screen bg-[#0c0c1d]  overflow-hidden overflow-y-auto">
        <IoIosArrowBack
          className="text-white text-2xl my-2"
          onClick={() => navigate("/home", { state: {} })}
        />
        <div className="w-full h-[100%] flex flex-col text-[#fff]">
          <div className="h-[30%] py-6 flex flex-col gap-10 justify-center items-center">
            <CiBitcoin
              className="text-[50px] bg-[#e9a830] rounded-full"
              style={{
                boxShadow: ` rgba(233, 168, 48, 0.3) 0px 10px 30px 10px,
  rgba(233, 168, 48, 0.3) 0px -10px 30px 10px,
  rgba(233, 168, 48, 0.3) 10px 0px 30px 10px,
  rgba(233, 168, 48, 0.3) -10px 0px 30px 10px,
  rgba(233, 168, 48, 0.3) 0px 0px 30px 10px`,
              }}
            />
            <p className="font-bold text-[26px]">Earn more coins</p>
          </div>

          <div>
            <div className="flex flex-col gap-5  mb-2">
              {dailyrewardarraystate.map((elem, i) => {
                return (
                  <div
                    className="w-[96%] mx-auto flex flex-col gap-5 items-start"
                    key={i}
                  >
                    <p className="font-semibold text-[16px]">{elem.title}</p>
                    <div className="w-[100%] mx-auto flex flex-col gap-2 items-start">
                      {elem.detail.map((curr, i) => {
                        return (
                          <>
                            <div
                              className="p-2 w-[96%] mx-auto flex items-center justify-between bg-[#26263a] rounded-2xl"
                              key={i}
                              onClick={() => {
                                setShowCheckCard(!showcheckcard);
                                setSelectedCardId(curr.id);
                                setSelectedInnerCardText(curr.inner_text);
                                setSelectedOuterCardText(curr.outer_text);
                                setSelectedOuterCardIcone(curr.outer_icone);
                                setSelectedCardCoins(curr.coins);
                                setSelectedCardButton(curr.button);
                                setSelectedCardReward(curr.rewards);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[40px]">
                                  {curr.outer_icone}
                                </span>
                                <div className="flex flex-col gap-1">
                                  <p className="text-[15px]">
                                    {curr.outer_text}
                                  </p>
                                  <div className="flex flex-row items-center gap-1">
                                    <CiBitcoin className="text-2xl bg-[#e9a830] rounded-full" />
                                    <p>+{curr.coins}</p>
                                  </div>
                                </div>
                              </div>

                              {curr.id === "dr" ? (
                                <FaCheck className="bg-green-600 rounded-full text-[22px] p-[3px]" />
                              ) : (
                                <IoIosArrowForward
                                  size={24}
                                  onClick={() => {
                                    setShowCheckCard(!showcheckcard);
                                    setSelectedCardId(curr.id);
                                    setSelectedInnerCardText(curr.inner_text);
                                    setSelectedOuterCardText(curr.outer_text);
                                    setSelectedOuterCardIcone(curr.outer_icone);
                                    setSelectedCardCoins(curr.coins);
                                    setSelectedCardButton(curr.button);
                                  }}
                                />
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {showcheckcard &&
          (selectedCardId === "dr" ? (
            <div className="fixed bottom-0 left-0 w-full h-[60%] text-[#fff] bg-[#0c0c1d] border-t-[6px] rounded-t-3xl border-[#e9a830]">
              <div>
                <ImCross
                  className="text-[#fff] text-[22px] bg-slate-500 p-1 rounded-full absolute  right-3"
                  onClick={() => setShowCheckCard(false)}
                />
              </div>

              <div className="flex flex-col gap-4 items-center w-[100%] h-[100%] justify-center">
                <div className="grid grid-cols-4 gap-2">
                  {selectedCardReward.map((element) => {
                    const isCollectable = element.day === nextReward?.day;
                    const isDisabled = !isCollectable;

                    return (
                      <div
                        key={element.day}
                        className={`relative ${isDisabled ? "opacity-50" : ""}`}
                        onClick={() =>
                          !isDisabled &&
                          handleCoinCollect(
                            element.coins,
                            element.id,
                            element.day
                          )
                        }
                      >
                        <div
                          className={`w-[22vw] py-2 relative flex flex-col justify-center items-center gap-1 bg-[#171725] rounded-lg ${
                            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          <p className="text-[12px]">{element.day}</p>
                          <CiBitcoin className="text-2xl bg-[#e9a830] rounded-full" />
                          <p className="text-[12px]">{element.coins}</p>
                        </div>
                        {clickedCoin === element.day && (
                          <div className="coin-animation">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="coin"></div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="py-4 w-[95%] text-center rounded-2xl bg-[#26263a]">
                  <a className=" text-[#fff] font-bold">Come back tomorrow</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="fixed pb-[120px] bottom-0 left-0 w-full h-[60%] text-[#fff] bg-[#171725] border-t-[6px] rounded-t-3xl border-[#e9a830]">
              <div>
                <ImCross
                  className="text-[#fff] text-[22px] bg-slate-500 p-1 rounded-full absolute top-3 right-3"
                  onClick={() => setShowCheckCard(false)}
                />
              </div>

              <div className="flex flex-col gap-2 items-center h-[100%] justify-center">
                <span className="text-[60px]">{selectedCardOuterIcone}</span>
                <p className="w-[90%] font-bold text-[25px] text-center">
                  {selectedCardOuterText}
                </p>
                <p className="text-center w-[77%]">{selectedCardInnerText}</p>

                <div className="py-2 px-8 rounded-2xl bg-[#0861F2]">
                  <button
                    className=" text-[#fff] font-bold "
                    onClick={() => handleWatchVideo()}
                  >
                    {selectedCardButton}
                  </button>
                </div>

                <div
                  className="flex gap-2"
                  onClick={() => handleReward(100000)}
                >
                  <CiBitcoin className="text-2xl bg-[#e9a830] rounded-full" />
                  <p className="font-bold">+{selectedCardCoins}</p>
                </div>
                {selectedCardId === "yt1" && (
                  <button
                    disabled={selectedCardId === "yt1" && !viewed}
                    className="py-4 w-[95%] disabled:opacity-50 disabled:cursor-not-allowed relative text-center rounded-2xl bg-[#0861F2]"
                    onClick={() => handleCoinCollect(selectedCardCoins)}
                  >
                    <a className=" text-[#fff] font-bold">Check</a>
                    {/* {showCoinAnimation && (
                      <div className="coin-animation">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="coin"></div>
                        ))}
                      </div>
                    )} */}

                    {showCoinAnimation && (
                      <div className="coin-animation absolute inset-0 flex justify-center items-center">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="coin w-1 h-1 bg-yellow-400 rounded-full"
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={coinAnimation}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

        {videodisplayed && (
          <div className="fixed bottom-[13%] left-[1%] w-[98vw] h-[470px] my-auto mx-auto rounded-2xl bg-[#fff]">
            <iframe
              title="YouTube video"
              src={
                links.socialMedia.youtube[
                  Math.floor(
                    Math.random() *
                      Math.min(5, links.socialMedia.youtube.length)
                  )
                ]
                  .replace("watch?v=", "embed/") // Convert to embed URL
                  .split("&")[0] // Remove any additional parameters
              }
              frameBorder="0"
              allowFullScreen
              className="w-[95%] h-[100%] mx-auto my-auto py-0 pb-5 pt-10"
            />
            {setTimeout(() => {
              setShowCrossIcon(true);
            }, 1000)}
            {showCrossIcon && (
              <ImCross
                className="text-[#fff] text-[22px] bg-[#000] p-1 rounded-full absolute top-[5px] right-3"
                onClick={() => setVideoDisplayed(false)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Daily_reward;
