import React, { useState, useEffect } from "react";
import FoodSearchBar from "./FoodSearchBar";
import FoodSearchResult from "./FoodSearchResult";
import ApiClient from "../../services/ApiClient";

const DietModalComponent = ({ setIsModalOpen, handleSaveFood, initialAddedFoods = [], selectedDate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFood, setSelectedFood] = useState(null);
    const [addedFoods, setAddedFoods] = useState(initialAddedFoods);

    useEffect(() => {
        setAddedFoods(initialAddedFoods);
    }, [initialAddedFoods]);

    const handleFoodClick = (food) => {
        setSelectedFood((prevFood) => (prevFood && prevFood.foodName === food.foodName ? null : food));
    };

    const handleAddFood = (newFood) => {
        setAddedFoods((prevFoods) => {
            if (!prevFoods.find((food) => food.id === newFood.id)) {
                return [...prevFoods, newFood];
            }
            return prevFoods;
        });
    };

    const handleRemoveFood = (foodToRemove) => {
        setAddedFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodToRemove.id));
    };

    const handleSave = () => {
        saveDietToDatabase();
    };

    const saveDietToDatabase = async () => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const dietData = {
                dietDate: selectedDate,
                dietDetails: addedFoods.map((food) => ({
                    id: food.id,
                    foodName: food.foodName,
                    foodFirstCategory: food.foodFirstCategory,
                    chocdf: food.chocdf,
                    prot: food.prot,
                    fatce: food.fatce,
                    enerc: food.enerc,
                })),
            };

            const response = await ApiClient.post('/diet/list/add', dietData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('식단이 저장되었습니다!');
                handleSaveFood(addedFoods);
                setIsModalOpen(false);
            } else {
                alert('식단 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('API 호출 오류:', error);
            alert('식단 저장 중 오류가 발생했습니다.');
        }
    };


    return (
        <div className="w-[950px] h-[700px] relative flex flex-col p-6">
            <div className="w-full">
                <p className="text-2xl font-bold ml-3">식단 검색</p>
                <hr className="w-full border mt-5" />
            </div>

            <div className="flex flex-grow mt-5">
                <div className="w-1/2 flex flex-col h-[51vh] mt-[-1%]">
                    <FoodSearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
                    <div className="flex-grow overflow-auto mt-4 border p-2 rounded-lg">
                        <FoodSearchResult
                            searchQuery={searchTerm}
                            handleFoodClick={handleFoodClick}
                            selectedFood={selectedFood}
                            handleAddFood={handleAddFood}
                        />
                    </div>
                </div>

                <div className="h-[70%] w-[1px] mt-5 bg-gray-200 mx-6"></div>

                <div className="w-1/2 h-[50vh] bg-gray-100 p-4 overflow-auto rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">추가된 음식 리스트</h3>
                    <ul>
                        {addedFoods.length === 0 ? (
                            <p className="text-center text-gray-500">음식이 없습니다.</p>
                        ) : (
                            addedFoods.map((food) => (
                                <li key={food.foodName} className="mb-2 p-3 border-b flex justify-between items-center">
                                    <div>
                                        <div className="font-semibold">{food.foodName}</div>
                                        <div className="text-sm">칼로리: {food.enerc} kcal</div>
                                        <div className="text-sm">탄수화물: {food.chocdf} g</div>
                                        <div className="text-sm">단백질: {food.prot} g</div>
                                        <div className="text-sm">지방: {food.fatce} g</div>
                                    </div>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                                        onClick={() => handleRemoveFood(food)}
                                    >
                                        삭제
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            <div className="absolute bottom-10 left-0 w-full flex justify-center">
                <button className="bg-white rounded-lg text-gray-700 border-2 w-1/6 px-4 py-2 hover:opacity-50" onClick={() => setIsModalOpen(false)}>닫기</button>
                <button className="bg-rookieRed rounded-lg text-white border-2 w-1/6 px-4 py-2 ml-4 hover:opacity-80" onClick={handleSave}>저장하기</button>
            </div>
        </div>
    );
};

export default DietModalComponent;