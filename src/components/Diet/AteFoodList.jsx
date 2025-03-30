import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Common/Modal";
import DietModalComponent from "./DietModalComponent";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import axios from "axios";
import FoodChart from "./FoodChart";

const AteFoodList = ({ handleSaveFood, selectedDate }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [ateFoodList, setAteFoodList] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);

    const toggleDropdown = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const formatDate = (date) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return format(dateObj, 'yyyy-MM-dd', { locale: ko });
    };

    const fetchDietList = async (date) => {
        try {
            const token = sessionStorage.getItem("accessToken");
            if (!token) {
                alert("사용자 인증 정보가 없습니다. 로그인 후 다시 시도해주세요.");
                navigate("/login");
                return;
            }

            const formattedDate = formatDate(date);
            const response = await axios.get(`http://localhost:8080/api/diet?dietDate=${formattedDate}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data) {
                setAteFoodList(response.data.dietDetails || []);
                setTotalCalories(response.data.totalCalories || 0);
            } else {
                setAteFoodList([]);
                setTotalCalories(0);
            }
        } catch (error) {
            console.error("식단을 불러오는 데 문제가 발생했습니다.", error);
            alert("식단을 불러오는 데 문제가 발생했습니다.");
        }
    };

    const handleSaveFoodInParent = (newFoods) => {
        setAteFoodList(newFoods);
    };

    useEffect(() => {
        fetchDietList(selectedDate);
    }, [selectedDate]);

    return (
        <div className="w-full flex flex-col items-center min-h-[500px]">
            <p className="text-2xl font-bold -ml-[45%] pl-5">
                {selectedDate} 섭취한 식단 리스트
            </p>
            <hr className="w-[90%] border mt-5 mx-auto" />
            <p className="text-lg font-semibold text-gray-700 mt-2">
                총 섭취 칼로리: {totalCalories} kcal
            </p>

            <div className="mr-[220%] -mt-10">
                <FoodChart ateFoodList={ateFoodList} width="200%" />
            </div>

            <ul className="-mt-[57%] space-y-2 max-h-[350px] overflow-auto w-[80%]">
                {ateFoodList.length === 0 ? (
                    <p className="text-center text-gray-500">추가된 식단이 없습니다.</p>
                ) : (
                    ateFoodList.map((food, index) => (
                        <li
                            key={food.id}
                            className="p-3 bg-gray-100 rounded-md cursor-pointer"
                            onClick={() => toggleDropdown(index)}
                        >
                            <div className="font-semibold">{food.foodName}</div>
                            <p className="text-sm">{food.enerc} kcal</p>
                            {expandedIndex === index && (
                                <div className="mt-2 bg-white p-2 shadow-md rounded-md">
                                    <p className="text-sm">탄수화물: {food.chocdf} g</p>
                                    <p className="text-sm">단백질: {food.prot} g</p>
                                    <p className="text-sm">지방: {food.fatce} g</p>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>

            <div className="mt-auto mb-0">
                <button
                    className="bg-rookieRed text-white font-semibold py-3 px-5 rounded-lg"
                    onClick={() => setIsModalOpen(true)}
                >
                    식단 검색 및 추가하기
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DietModalComponent
                    setIsModalOpen={setIsModalOpen}
                    handleSaveFood={handleSaveFoodInParent}
                    initialAddedFoods={ateFoodList}
                    selectedDate={selectedDate}
                />
            </Modal>
        </div>
    );
};

export default AteFoodList;