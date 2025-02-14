import React, { useState } from 'react';
import Modal from '../Common/Modal';
import DietModalComponent from './DietModalComponent';

const AteFoodList = () => {
	const [ateFoodList, setAteFoodList] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [expandedIndex, setExpandedIndex] = useState(null);

	// 음식 추가 및 삭제 (저장하기 버튼 클릭 시)
	const handleSaveFood = (addedFoods) => {
		setAteFoodList(addedFoods); // 새로 저장된 음식 리스트로 업데이트
	};

	const toggleDropdown = (index) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<div className="ml-12 mt-28 w-[75vh]">
			<p className="flex ml-4 text-2xl font-bold">오늘 섭취한 식단 리스트</p>
			<hr className="flex w-full border mt-5" />

			<ul className="mt-5 space-y-2 max-h-[400px] overflow-y-auto pr-2">
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

			<div className="absolute bottom-28 left-0 w-full flex justify-center">
				<button
					className="w-[60%] bg-rookieRed text-white font-semibold py-3 rounded-lg"
					onClick={() => setIsModalOpen(true)}
				>
					식단 검색 및 추가하기
				</button>
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<DietModalComponent
					setIsModalOpen={setIsModalOpen}
					handleSaveFood={handleSaveFood}
					initialAddedFoods={ateFoodList}
				/>
			</Modal>
		</div>
	);
};

export default AteFoodList;
