import React from "react";

const Diet = () => {
  return (
    <div className="w-full h-full bg-rookieHover rounded-lg flex items-center justify-center">
      {/* 내부 박스 */}
      <div className="relative w-[97%] h-[90vh] bg-white rounded-lg flex items-center justify-center">
        {/* 세로로 얇은 선 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-[70%] border-l-2 border-gray-200"></div>
      </div>
    </div>
  );
};

export default Diet;
