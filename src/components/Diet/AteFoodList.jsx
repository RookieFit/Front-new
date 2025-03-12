import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import DietModalComponent from './DietModalComponent';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const AteFoodList = ({ handleSaveFood, ateFoodList }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [foods, setFoods] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    const toggleDropdown = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // 날짜 형식 변환 함수
    const formatDate = (date) => {
        return format(date, "yyyy-MM-dd", { locale: ko });
    };

    // API에서 식단 리스트 불러오기
    useEffect(() => {
        const fetchDietList = async () => {
            try {
                const formattedDate = formatDate(selectedDate);
                const response = await fetch(`/api/diet?dietDate=${encodeURIComponent(formattedDate)}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setFoods(data.dietDetails || []);
            } catch (error) {
                console.error("API 요청 실패:", error);
            }
        };

        fetchDietList();
    }, [selectedDate]);

    useEffect(() => {
        setFoods(ateFoodList);
    }, [ateFoodList]);

    return (
        <div className="w-full flex flex-col items-center min-h-[500px]">
            {/* 제목 */}
            <p className="text-2xl font-bold mr-[390px] pl-5">오늘 섭취한 식단 리스트</p>
            <hr className="w-[90%] border mt-5 mx-auto" />

            {/* 음식 리스트 */}
            <ul className="mt-5 space-y-2 max-h-[350px] overflow-auto w-[80%]">
                {foods.length === 0 ? (
                    <p className="text-center text-gray-500">추가된 식단이 없습니다.</p>
                ) : (
                    foods.map((food, index) => (
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

            {/* 모달 버튼 */}
            <div className="mt-auto mb-0">
                <button className="bg-rookieRed text-white font-semibold py-3 px-5 rounded-lg" onClick={() => setIsModalOpen(true)}>식단 검색 및 추가하기</button>
            </div>

            {/* 모달 */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DietModalComponent
                    setIsModalOpen={setIsModalOpen}
                    handleSaveFood={handleSaveFood}
                    initialAddedFoods={foods}
                />
            </Modal>
        </div>
    );
};

export default AteFoodList;
