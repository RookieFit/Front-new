import React, { useState, useEffect } from "react";
import CalendarPicker from "../../components/Diet/CalendarPicker";
import FoodChart from "../../components/Diet/FoodChart";
import AteFoodList from "../../components/Diet/AteFoodList";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const DietPage = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [ateFoodList, setAteFoodList] = useState([]);
	const [showCalendar, setShowCalendar] = useState(false);

	// 날짜 형식 변환 함수
	const formatDate = (date) => {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		return format(dateObj, 'yyyy-MM-dd', { locale: ko });
	};

	// 음식 리스트를 덮어쓰는 함수
	const handleSaveFood = (addedFoods) => {
		setAteFoodList(addedFoods);
	};

	useEffect(() => {
		console.log("Updated ateFoodList: ", ateFoodList);
	}, [ateFoodList]);

	return (
		<div className="w-full h-full bg-rookieRed rounded-lg flex items-center justify-center">
			<div className="relative w-[97%] h-[86vh] bg-white rounded-lg flex p-6">
				{/* 왼쪽: 캘린더와 식단 차트 */}
				<div className="w-1/2 flex flex-col items-center justify-start">
					{/* 캘린더 컴포넌트 */}
					<CalendarPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

					{/* 식단 차트 */}
					{ateFoodList.length > 0 && <FoodChart ateFoodList={ateFoodList} />}
				</div>

				{/* 세로선 */}
				<div className="w-0.5 h-[70%] mt-24 bg-gray-200 mx-4"></div>

				{/* 오른쪽: 섭취한 식단 리스트 */}
				<div className="w-1/2 mt-24">
					<AteFoodList
						selectedDate={formatDate(selectedDate)}
						handleSaveFood={handleSaveFood}
						ateFoodList={ateFoodList}
					/>
				</div>
			</div>
		</div>
	);
};

export default DietPage;