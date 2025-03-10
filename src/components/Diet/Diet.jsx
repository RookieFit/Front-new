import React, { useState, useEffect } from "react";
import FoodChart from "./FoodChart";
import AteFoodList from "./AteFoodList";

const Diet = () => {
    const [ateFoodList, setAteFoodList] = useState([]);

    // 음식 리스트를 업데이트하는 함수
    const handleSaveFood = (addedFoods) => {
        setAteFoodList(addedFoods);
    };

    useEffect(() => {
        console.log("Updated ateFoodList: ", ateFoodList);
    }, [ateFoodList]);

    return (
        <div className="w-full h-full bg-rookieRed rounded-lg flex items-center justify-center">
            <div className="relative w-[97%] h-[86vh] bg-white rounded-lg flex p-6">
                <div className="w-2/3 mb-20 flex justify-center items-center">
                    {ateFoodList.length > 0 && <FoodChart ateFoodList={ateFoodList} />}
                </div>

                {/* 세로선 */}
                <div className="w-0.5 h-[70%] mt-24 bg-gray-200 mx-4"></div>

                <div className="w-2/3 mt-24">
                    <AteFoodList handleSaveFood={handleSaveFood} ateFoodList={ateFoodList} />
                </div>
            </div>
        </div>
    );
};

export default Diet;
