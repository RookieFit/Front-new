import React from 'react';

const FoodSearchResult = ({
	searchQuery,
	handleFoodClick,
	selectedFood,
	handleAddFood,
}) => {
	const foodData = [
		{ id: 1, foodName: "닭가슴살", enerc: 165, chocdf: 2, prot: 31, fatce: 3 },
		{ id: 2, foodName: "고구마", enerc: 112, chocdf: 27, prot: 2, fatce: 0.1 },
		{ id: 3, foodName: "현미밥", enerc: 216, chocdf: 45, prot: 5, fatce: 1.5 },
		{ id: 4, foodName: "샐러드", enerc: 30, chocdf: 5, prot: 2, fatce: 0.5 },
		{ id: 5, foodName: "바나나", enerc: 105, chocdf: 27, prot: 1, fatce: 0.3 },
		{ id: 6, foodName: "오트밀", enerc: 389, chocdf: 66, prot: 11, fatce: 6 },
		{ id: 7, foodName: "연어", enerc: 208, chocdf: 0, prot: 20, fatce: 13 }
	];


	const filteredFoods = foodData.filter((food) =>
		food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="overflow-auto max-h-[300px]">
			{filteredFoods.length > 0 ? (
				filteredFoods.map((food, index) => (
					<div
						key={index}
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
									onClick={() => handleAddFood(food)} // food 정보를 직접 전달
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

export default FoodSearchResult;
