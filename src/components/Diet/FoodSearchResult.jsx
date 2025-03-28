import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/ApiClient';
import PropTypes from 'prop-types';

const FoodSearchResult = ({
    searchQuery,
    handleFoodClick,
    selectedFood,
    handleAddFood,
}) => {
    const [foodData, setFoodData] = useState([]);

    // API 호출 함수
    const fetchFoodData = async (query) => {
        try {
            const response = await ApiClient.get(`/diet/search?keyword=${query}`);
            setFoodData(response.data);
        } catch (error) {
            console.error("API 호출 실패:", error);
        }
    };

    // searchQuery가 변경될 때마다 API 호출
    useEffect(() => {
        if (searchQuery) {
            fetchFoodData(searchQuery);
        } else {
            setFoodData([]); // 검색어가 없으면 결과를 비움
        }
    }, [searchQuery]);

    return (
        <div className="overflow-auto max-h-[300px]">
            {foodData.length > 0 ? (
                foodData.map((food) => (
                    <div
                        key={food.id}
                        className="p-4 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleFoodClick(food)}
                    >
                        <div className="text-lg font-semibold">{food.foodName}</div>
                        <div className="text-sm text-gray-500">{food.enerc} kcal</div>
                        {/* 선택된 음식일 경우 드롭다운 표시 */}
                        {selectedFood && selectedFood.foodName === food.foodName && (
                            <div className="mt-2 p-4 border-t">
                                <p><strong>탄수화물:</strong> {food.chocdf} g</p>
                                <p><strong>단백질:</strong> {food.prot} g</p>
                                <p><strong>지방:</strong> {food.fatce} g</p>
                                <button
                                    onClick={() => handleAddFood(food)}
                                    className="mt-6 mb-[-10%] ml-24 w-[40%] bg-rookieRed text-white py-2 rounded-lg"
                                >
                                    추가하기
                                </button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="p-4 text-center text-gray-500">검색 결과가 없습니다.</div>
            )}
        </div>
    );
};

FoodSearchResult.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    handleFoodClick: PropTypes.func.isRequired,
    selectedFood: PropTypes.object,
    handleAddFood: PropTypes.func.isRequired,
};

export default FoodSearchResult;
