import React from "react";
import FoodCharts from "./FoodCharts";

const Diet = () => {
  return (
    <div className="w-full h-full bg-rookieHover rounded-lg flex items-center justify-center">
      {/* 내부 박스 */}
      <div className="relative w-[97%] h-[86vh] bg-white rounded-lg flex">
        {/* 차트 */}
        <div className="w-1/2 flex justify-center items-center">
          <FoodCharts />
        </div>

        {/* 세로로 얇은 선 */}
        <div className="flex items-center justify-center w-0.5">
          <div className="h-[70%] w-0.5 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Diet;
