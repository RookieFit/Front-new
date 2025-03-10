import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import DietModalComponent from './DietModalComponent';

const AteFoodList = ({ ateFoodList, handleSaveFood }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [foods, setFoods] = useState(ateFoodList);

    const toggleDropdown = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

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
