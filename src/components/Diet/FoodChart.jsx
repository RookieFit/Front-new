import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const FoodChart = ({ ateFoodList }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showCalendar, setShowCalendar] = useState(false);

	// 날짜 형식 변환
	const formatDate = (date) => {
		return format(date, "yyyy-MM-dd (EEE)", { locale: ko });
	};

	// 영양소 합계 계산
	const calculateNutrition = () => {
		let carbs = 0;
		let protein = 0;
		let fat = 0;

		// ateFoodList가 비어 있지 않은지 확인
		if (ateFoodList && ateFoodList.length > 0) {
			ateFoodList.forEach((food) => {
				carbs += food.chocdf || 0;
				protein += food.prot || 0;
				fat += food.fatce || 0;
			});
		}

		return [carbs, protein, fat];
	};

	// 차트 데이터
	const nutritionData = calculateNutrition();
	const data = {
		series: nutritionData,
		options: {
			chart: {
				type: "donut",
			},
			labels: ["Carbs", "Protein", "Fat"],
			colors: ["#FABC3F", "#00224D", "#CC2B52"],
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							total: {
								show: true,
								label: "Total",
								formatter: () => `100%`,
							},
						},
					},
				},
			},
			legend: {
				position: "bottom",
			},
		},
	};

	return (
		<div className="max-w-lg mx-auto mt-10 p-4 bg-white rounded-lg flex flex-col items-center relative">
			<div className="mb-4 flex items-center gap-2">
				<h2 className="text-xl font-bold">{formatDate(selectedDate)}</h2>
				<button onClick={() => setShowCalendar(!showCalendar)} className="text-xl">
					📆
				</button>
			</div>

			{/* 달력 팝업 */}
			{showCalendar && (
				<div className="absolute z-10 mt-2 bg-white border p-4 rounded-lg shadow-lg">
					<DatePicker
						selected={selectedDate}
						onChange={(date) => {
							setSelectedDate(date);
							setShowCalendar(false); // 날짜 클릭 시 닫기
						}}
						dateFormat="yyyy-MM-dd"
						locale={ko}
						className="border px-2 py-1 rounded-md"
						onClickOutside={() => setShowCalendar(false)} // 외부 클릭 시 달력 닫기
					/>
				</div>
			)}

			{nutritionData.length > 0 && (
				<Chart options={data.options} series={data.series} type="donut" width="200%" />
			)}
		</div>
	);
};

export default FoodChart;
