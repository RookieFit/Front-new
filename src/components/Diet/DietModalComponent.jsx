import React, { useState } from 'react';
import FoodSearchBar from './FoodSearchBar';
import FoodSearchResult from './FoodSearchResult';

const DietModalComponent = ({ setIsModalOpen }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedFood, setSelectedFood] = useState(null);

	const handleSearch = (query) => {
		setSearchTerm(query);
	};

	// 음식을 클릭할 때마다 드롭다운을 토글
	const handleFoodClick = (food) => {
		// 선택된 음식이 같으면 닫고, 다르면 열기
		setSelectedFood(prevFood => (prevFood && prevFood.foodName === food.foodName ? null : food));
	};

	const handleAddFood = () => {
		alert('음식이 추가되었습니다!');
	};

	return (
		<div className="w-[950px] h-[700px] relative flex">
			<div className="w-full">
				<p className="text-2xl ml-12 font-bold">식단검색</p>
				<hr className="w-[95%] border mt-5 mx-auto" />
			</div>

			{/* 왼쪽 */}
			<div className="flex-1 p-6 mt-10 ml-[-100%]">
				<div>
					{/* 검색바 */}
					<div className="mt-5">
						<FoodSearchBar onSearch={handleSearch} searchTerm={searchTerm} />
					</div>

					{/* 검색결과 */}
					<div className="mt-5 h-[60%] overflow-auto">
						<FoodSearchResult
							searchQuery={searchTerm}
							handleFoodClick={handleFoodClick}
							selectedFood={selectedFood}
							handleAddFood={handleAddFood}
						/>
					</div>
				</div>
			</div>

			{/* 중간 세로선 */}
			<div className="h-[50%] w-[1px] bg-gray-200 mt-36 mx-2"></div>

			{/* 오른쪽 */}
			<div className="flex-1 p-6">
				<div className="h-full flex justify-center items-center">
				</div>
			</div>

			{/* 닫기 버튼 */}
			<div className="absolute bottom-5 left-0 w-full flex justify-center">
				<button
					className="bg-white rounded-lg text-gray-700 border-2 w-1/6 px-4 py-2 hover:opacity-50"
					onClick={() => setIsModalOpen(false)}
				>
					닫기
				</button>
			</div>
		</div>
	);
};

export default DietModalComponent;
