import React, { createContext, useState, useContext } from "react";
import { GrNext } from "react-icons/gr";
import bee3 from "../../images/bee3.png";
import bee2 from "../../images/bee2.png";
import bee1 from "../../images/bee1.png";
import { MdOutlineClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LevelContext = createContext();

const LevelProvider = ({ children }) => {
  const levels = [
    { img: bee3, title: "Bronze", description: "From 1" },
    { img: bee2, title: "Silver", description: "From 2500000" },
    { img: bee1, title: "Gold", description: "From 5000000" },
    { img: bee3, title: "Platinium", description: "From 10000000" },
    { img: bee2, title: "Firster", description: "From 100000000" },
    { img: bee1, title: "Crown", description: "From 250000000" },
    { img: bee3, title: "Diamond", description: "From 500000000" },
    { img: bee2, title: "Ace", description: "From 750000000" },
    { img: bee1, title: "Master", description: "From 1000000000" },
    { img: bee3, title: "Heroic", description: "From 12500000000" },
    { img: bee2, title: "Squad", description: "From 15000000000" },
    { img: bee2, title: "Tactics", description: "From 16500000000" },
    { img: bee1, title: "Brawl", description: "From 17500000000" },
    { img: bee3, title: "Clash", description: "From 18500000000" },
    { img: bee2, title: "Winner", description: "From 20000000000" },
  ];

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const nextLevel = () => {
    setCurrentLevelIndex((prevIndex) => (prevIndex + 1) % levels.length);
  };

  return (
    <LevelContext.Provider
      value={{ level: levels[currentLevelIndex], nextLevel }}
    >
      {children}
    </LevelContext.Provider>
  );
};

function Level() {
  const { level, nextLevel } = useContext(LevelContext);
  const navigate = useNavigate();

  return (
    <div className="h-[583px] w-full bg-[#0c0c20] text-white">
      <MdOutlineClear
        className="text-white text-4xl font-medium ms-3 pt-3"
        onClick={() => navigate("/home", { state: {} })}
      />
      <div className="flex items-center justify-evenly py-6">
        <GrNext
          className="text-gray-300 text-2xl cursor-pointer"
          onClick={nextLevel}
        />
        <div className="h-[25vh] w-[40%] bg-[#171725] rounded-xl shadowdiv flex justify-center items-center">
          <img
            src={level.img}
            alt={level.title}
            className="h-[110px] w-[110px]"
          />
        </div>
        <GrNext
          className="text-gray-300 text-2xl cursor-pointer"
          onClick={nextLevel}
        />
      </div>
      <p className="text-4xl text-center font-semibold">{level.title}</p>
      <p className="text-gray-300 font-medium text-lg text-center py-2">
        {level.description}
      </p>
    </div>
  );
}

function App() {
  return (
    <LevelProvider>
      <Level />
    </LevelProvider>
  );
}

export default App;
