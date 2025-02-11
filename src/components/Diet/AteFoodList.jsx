import React from 'react'

const AteFoodList = () => {
	// 식단 데이터
	const foodList = ['닭가슴살', '고구마', '현미밥', '샐러드']

	return (
		<div className="ml-12 mt-28 w-[75vh]">
			<p className="flex ml-4 text-2xl font-bold">오늘 섭취한 식단 리스트</p>
			<hr className="flex w-full border mt-5" />

			{/* 추가한 식단 리스트 */}
			<ul className="mt-5 space-y-2">
				{foodList.map((food, index) => (
					<li key={index} className="p-2 bg-gray-100 rounded-md">
						{food}
					</li>
				))}
			</ul>

			{/* 식단 버튼 */}
			<div className="flex justify-center mt-60">
				<button className="w-[60%] bg-rookieRed text-white font-semibold py-3 rounded-lg">
					식단 검색 및 추가하기
				</button>
			</div>
		</div>
	)
}

export default AteFoodList
