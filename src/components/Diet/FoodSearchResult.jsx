import React, { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import PropTypes from "prop-types";

const FoodSearchResult = ({ searchQuery, handleFoodClick, selectedFood, handleAddFood, dietDate }) => {
    const [foodData, setFoodData] = useState([]);
    const [customFood, setCustomFood] = useState({
        foodName: "",
        enerc: "",
        chocdf: "",
        prot: "",
        fatce: "",
        dietDate: dietDate,
        foodFirstCategory: "사용자커스텀식단"
    });
    const [error, setError] = useState("");
    const [customFoodData, setCustomFoodData] = useState([]);
    const [showCustomFoodForm, setShowCustomFoodForm] = useState(false);

    // 커스텀 음식을 DB에 저장하는 함수
    const saveCustomFoodToDB = async (food) => {
        try {
            // 커스텀 음식 정보를 food_info DB에 저장하는 API 호출
            const response = await ApiClient.post('/diet/add', food);
            if (response.data.success) {
                // DB 저장 후 커스텀 음식 리스트에 추가
                setCustomFoodData([food, ...customFoodData]); // 커스텀 음식이 가장 위에 추가되도록 변경
                setError("");
            }
        } catch (error) {
            console.error("커스텀 음식 저장 실패:", error);
            setError("커스텀 음식을 저장하는데 실패했습니다.");
        }
    };

    // 검색된 음식 데이터를 가져오는 함수
    const fetchFoodData = async (query) => {
        try {
            const response = await ApiClient.get(`/diet/search?keyword=${query}`);
            setFoodData(response.data);
        } catch (error) {
            console.error("API 호출 실패:", error);
        }
    };

    // 커스텀 음식 정보를 입력하는 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomFood((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 숫자 입력만 가능하도록 처리
    const handleNumberInput = (e) => {
        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
            e.preventDefault();
        }
    };

    // 커스텀 음식을 리스트에 추가하는 함수
    const handleAddCustomFoodToList = () => {
        if (!customFood.foodName || !customFood.enerc) {
            setError("음식 이름과 칼로리는 필수 입력입니다.");
            return;
        }

        // 이미 등록된 음식인지 확인
        const foodExists = customFoodData.some((food) => food.foodName === customFood.foodName);
        if (foodExists) {
            setError("이미 등록된 음식입니다.");
            return;
        }

        // DB에 커스텀 음식 저장
        saveCustomFoodToDB(customFood);

        // 폼 초기화
        setCustomFood({
            foodName: "",
            enerc: "",
            chocdf: "",
            prot: "",
            fatce: "",
            dietDate: dietDate
        });
    };

    useEffect(() => {
        if (searchQuery) {
            fetchFoodData(searchQuery);
        } else {
            setFoodData([]);
        }
    }, [searchQuery]);

    return (
        <div className="overflow-auto max-h-[300px]">
            {/* 커스텀 음식이 추가되었을 때 그 음식이 검색 결과 위에 바로 뜨게 처리 */}
            {customFoodData.length > 0 && (
                <div className="p-4 border-b cursor-pointer hover:bg-gray-100">
                    <div className="text-lg font-semibold">추가된 커스텀 음식</div>
                    {customFoodData.map((food, index) => (
                        <div key={index} className="p-4 border-b">
                            <div className="text-lg font-semibold">{food.foodName}</div>
                            <div className="text-sm text-gray-500">{food.enerc} kcal</div>
                            <button
                                onClick={() => handleAddFood(food)}
                                className="mt-2 w-full bg-rookieRed text-white py-2 rounded-lg"
                            >
                                추가하기
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 검색된 음식 목록 */}
            {foodData.length > 0 ? (
                foodData.map((food) => (
                    <div
                        key={food.id}
                        className="p-4 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleFoodClick(food)}
                    >
                        <div className="text-lg font-semibold">{food.foodName}</div>
                        <div className="text-sm text-gray-500">{food.enerc} kcal</div>
                        {selectedFood && selectedFood.foodName === food.foodName && (
                            <div className="mt-2 p-4 border-t">
                                <p><strong>탄수화물:</strong> {food.chocdf} g</p>
                                <p><strong>단백질:</strong> {food.prot} g</p>
                                <p><strong>지방:</strong> {food.fatce} g</p>
                                <button
                                    onClick={() => handleAddFood(food)}
                                    className="mt-4 w-full bg-rookieRed text-white py-2 rounded-lg"
                                >
                                    추가하기
                                </button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="p-4 text-center text-gray-500">
                    검색 결과가 없습니다.
                </div>
            )}

            <button
                onClick={() => setShowCustomFoodForm(!showCustomFoodForm)}
                className="w-full bg-gray-300 text-white py-2 rounded-lg mt-4"
            >
                음식 직접 추가
            </button>

            {/* 음식 직접 추가 폼 */}
            {showCustomFoodForm && (
                <div className="p-4 border rounded-lg bg-gray-100 mt-4">
                    <input
                        type="text"
                        name="foodName"
                        placeholder="음식 이름"
                        value={customFood.foodName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="number"
                        name="enerc"
                        placeholder="칼로리 (kcal)"
                        value={customFood.enerc}
                        onChange={handleInputChange}
                        onKeyDown={handleNumberInput}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="number"
                        name="chocdf"
                        placeholder="탄수화물 (g)"
                        value={customFood.chocdf}
                        onChange={handleInputChange}
                        onKeyDown={handleNumberInput}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="number"
                        name="prot"
                        placeholder="단백질 (g)"
                        value={customFood.prot}
                        onChange={handleInputChange}
                        onKeyDown={handleNumberInput}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="number"
                        name="fatce"
                        placeholder="지방 (g)"
                        value={customFood.fatce}
                        onChange={handleInputChange}
                        onKeyDown={handleNumberInput}
                        className="w-full p-2 border rounded mb-4"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        onClick={handleAddCustomFoodToList}
                        className="w-full bg-rookieRed text-white py-2 rounded-lg"
                    >
                        추가하기
                    </button>
                </div>
            )}
        </div>
    );
};

FoodSearchResult.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    handleFoodClick: PropTypes.func.isRequired,
    selectedFood: PropTypes.object,
    handleAddFood: PropTypes.func.isRequired,
    dietDate: PropTypes.string.isRequired,
};

export default FoodSearchResult;