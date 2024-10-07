import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Component/Homepage/Homepage";
import Navbar from "./Component/Navbar/Navbar";
import DailyCombo from "./Component/Daily_Combo/DailyCombo";
import DailyReward from "./Component/DailyRewardSection/Daily_reward";
import Login from "./Component/Login/Login.jsx";
import Level from "./Component/Level/Level.js";
import Friend from "./Component/Friend/Friend";
// import Gift from "./Component/Gift/Gift";
import ComingSoon from "./Component/CommingSoon/ComingSoon.js";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./store/features/userSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/reward" element={<DailyReward />} />
        <Route path="/combo" element={<DailyCombo />} />
        <Route path="/level" element={<Level />} />
        <Route path="/friends" element={<Friend />} />
        <Route path="/gift" element={<ComingSoon />} />
        <Route path="/soon" element={<ComingSoon />} />
      </Routes>

      {location.pathname !== "/" && <Navbar />}
    </div>
  );
}

export default App;
