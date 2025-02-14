import React, { useState } from 'react';
import Modal from '../Common/Modal';
import DietModalComponent from './DietModalComponent';

const AteFoodList = () => {
	// 식단 데이터
	const foodList = [
		{ name: '닭가슴살', carbs: 2, protein: 31, fat: 3, calories: 165 },
		{ name: '고구마', carbs: 27, protein: 2, fat: 0.1, calories: 112 },
		{ name: '현미밥', carbs: 45, protein: 5, fat: 1.5, calories: 216 },
		{ name: '샐러드', carbs: 5, protein: 2, fat: 0.5, calories: 30 },
		{ name: '바나나', carbs: 27, protein: 1, fat: 0.3, calories: 105 },
		{ name: '오트밀', carbs: 66, protein: 11, fat: 6, calories: 389 },
		{ name: '연어', carbs: 0, protein: 20, fat: 13, calories: 208 }
	];

	const [openIndex, setOpenIndex] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleDropdown = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="ml-12 mt-28 w-[75vh]">
			<p className="flex ml-4 text-2xl font-bold">오늘 섭취한 식단 리스트</p>
			<hr className="flex w-full border mt-5" />

			{/* 추가한 식단 리스트 */}
			<ul className="mt-5 space-y-2 max-h-[400px] overflow-y-auto pr-2">
				{foodList.map((food, index) => (
					<li key={index}>
						{/* 클릭 가능한 식품 항목 */}
						<div
							className="p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200"
							onClick={() => toggleDropdown(index)}
						>
							{food.name}
						</div>

						{/* 드롭다운 내용 (선택된 항목만 보이도록 설정) */}
						{openIndex === index && (
							<div className="p-3 bg-gray-50 border rounded-md mt-2 transition-all duration-300">
								<p>탄수화물: {food.carbs}g</p>
								<p>단백질: {food.protein}g</p>
								<p>지방: {food.fat}g</p>
								<p>칼로리: {food.calories}kcal</p>
							</div>
						)}
					</li>
				))}
			</ul>

			{/* 식단 버튼 */}
			<div className="absolute bottom-28 left-0 w-full flex justify-center">
				<button className="w-[60%] bg-rookieRed text-white font-semibold py-3 rounded-lg" onClick={() => setIsModalOpen(true)}>
					식단 검색 및 추가하기
				</button>
			</div>

			{/* 모달 */}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div>
					<DietModalComponent setIsModalOpen={setIsModalOpen} />
				</div>
			</Modal>
		</div>
	);
};

export default AteFoodList;
