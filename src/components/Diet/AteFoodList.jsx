import React, { useState, useEffect } from "react";
import Modal from "../Common/Modal";
import DietModalComponent from "./DietModalComponent";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import axios from "axios";

const AteFoodList = ({ handleSaveFood, ateFoodList, selectedDate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [foods, setFoods] = useState([]);

    const toggleDropdown = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // 날짜 형식 변환 함수
    const formatDate = (date) => {
        // 만약 date가 문자열이라면 Date 객체로 변환
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        // Date 객체라면 'yyyy-MM-dd' 형식으로 반환
        return format(dateObj, 'yyyy-MM-dd', { locale: ko });
    };

    // API에서 식단 리스트 불러오기
    const fetchDietList = async (date) => {
        try {
            const token = sessionStorage.getItem("accessToken"); // sessionStorage에서 토큰 가져오기

            if (!token) {
                console.log("토큰이 없습니다. 로그인 후 다시 시도해주세요.");
                alert("사용자 인증 정보가 없습니다. 로그인 후 다시 시도해주세요.");
                return;
            }

            const formattedDate = formatDate(date); // 날짜를 형식에 맞게 변환
            const response = await axios.get(`/api/diet?dietDate=${formattedDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.dietDetails) {
                setFoods(response.data.dietDetails);
            } else {
                setFoods([]); // dietDetails가 없으면 빈 배열로 설정
            }
        } catch (error) {
            console.error("식단을 불러오는 데 문제가 발생했습니다.", error);
            alert("식단을 불러오는 데 문제가 발생했습니다.");
        }
    };

    // selectedDate가 변경될 때마다 식단 리스트를 가져옵니다.
    useEffect(() => {
        fetchDietList(selectedDate); // 선택된 날짜에 대한 식단 리스트 불러오기
    }, [selectedDate]);

    // ateFoodList가 변경될 때마다 업데이트
    useEffect(() => {
        setFoods(ateFoodList);
    }, [ateFoodList]);

    return (
        <div className="w-full flex flex-col items-center min-h-[500px]">
            {/* 제목 */}
            <p className="text-2xl font-bold mr-48 pl-5">
                {selectedDate} 섭취한 식단 리스트
            </p>
            <hr className="w-[90%] border mt-5 mx-auto" />

            {/* 음식 리스트 */}
            <ul className="mt-10 space-y-2 max-h-[350px] overflow-auto w-[80%]">
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
                <button
                    className="bg-rookieRed text-white font-semibold py-3 px-5 rounded-lg"
                    onClick={() => setIsModalOpen(true)}
                >
                    식단 검색 및 추가하기
                </button>
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
