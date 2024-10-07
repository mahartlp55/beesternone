import React, { useEffect, useState } from "react";

const ComboCard = ({ additionalArray = [], id = "" }) => {
  const [comingData, setComingData] = useState([]);
  useEffect(() => {
    const data = additionalArray?.filter((item) => {
      return item.id == id;
    });
    setComingData(data);
  }, [id]);
  return (
    <div className="">
      {additionalArray.length === 0 ? (
        <p className="text-5xl font-semibold text-yellow-600">?</p>
      ) : (
        <div>
          {comingData?.map((item) => (
            <div
              key={item.id}
              className="  flex flex-col items-center text-center overflow-hidden gap-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[35px] h-[35px]"
              />
              <div>
                <p className="">{item.title}</p>
                <p className="text-sm">Price: {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboCard;
