import React, { useContext, useRef, useState } from "react";
import "../Wheel/Wheel.css";
import { useDailyRewardHook } from "../context/DailyRewardContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalTokens, spinGame } from "../../store/features/gameSlice";
import { RecallContext } from "../DailyRewardSection/RecallContext";

function Wheel() {
  const { reCallData } = useContext(RecallContext);
  const dispatch = useDispatch();
  const wheelRef = useRef(null);
  const innerRef = useRef(null);
  const [value1] = useState(Math.ceil(Math.random() * -360));
  const [value2] = useState(Math.ceil(Math.random() * 360));
  const [totalReward, setTotalReward] = useState(0); // State to track total reward

  const { spinResult, error } = useSelector((state) => state.game);
  const { handleReward } = useDailyRewardHook();

  const handleSpin = () => {
    const spinAmount1 = Math.ceil(Math.random() * 3600);
    const spinAmount2 = Math.ceil(Math.random() * 3600);

    const newValue1 = (value1 + spinAmount1) % 360; // Normalize to 0-360
    const newValue2 = (value2 + spinAmount2) % 360; // Normalize to 0-360

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s ease-out";
      wheelRef.current.style.transform = `rotate(${newValue1}deg)`;
    }
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 4s ease-out";
      innerRef.current.style.transform = `rotate(${newValue2}deg)`;
    }

    setTimeout(() => {
      // Calculate the value based on the angle
      const loggedValue = newValue1 * 1000; // Multiply angle by 1000

      // Log the angle multiplied by 1000
      // console.log(`Logged Value: ${loggedValue}`);

      // Update total reward (you may want to keep this if needed)
      setTotalReward((prevTotal) => prevTotal + loggedValue); // Example to update total reward
      handleReward(loggedValue); // If needed, call handleReward to update the reward state
      reCallData(loggedValue); // Pass the logged value to reCallData if needed

      // console.log("spinResult", spinResult);
      dispatch(spinGame(loggedValue)); // Dispatch with the logged value
      dispatch(fetchTotalTokens());
    }, 1000); // Match the timeout duration with the CSS transition
  };

  if (error) {
    console.error("Error fetching total tokens", error);
  }

  return (
    <>
      <div className="h-[42vh] w-full my-5 flex justify-center items-center">
        <div className="container">
          <div className="spinbtn" onClick={handleSpin}>
            Spin
          </div>
          <div className="wheel" ref={wheelRef}>
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
            <div className="number">
              <b style={{ "--i": 0 }}>180000</b>
              <b style={{ "--i": 1 }}>135000</b>
              <b style={{ "--i": 2 }}>90000</b>
              <b style={{ "--i": 3 }}>45000</b>
              <b style={{ "--i": 4 }}>0</b>
              <b style={{ "--i": 5 }}>315000</b>
              <b style={{ "--i": 6 }}>270000</b>
              <b style={{ "--i": 7 }}>225000</b>
            </div>
          </div>
          <div className="wheel inner" ref={innerRef}>
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
            <div className="number">
              <b style={{ "--i": 0 }}>5</b>
              <b style={{ "--i": 1 }}>3</b>
              <b style={{ "--i": 2 }}>8</b>
              <b style={{ "--i": 3 }}>9</b>
              <b style={{ "--i": 4 }}>5</b>
              <b style={{ "--i": 5 }}>2</b>
              <b style={{ "--i": 6 }}>1</b>
              <b style={{ "--i": 7 }}>8</b>
            </div>
          </div>
          <div className="reward-display">
            <p>Total Reward: {totalReward}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wheel;
