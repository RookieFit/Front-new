// src/components/FoodChart.js
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const FoodChart = ({ ateFoodList }) => {
	// 날짜 형식 변환
	const formatDate = (date) => {
		return format(date, "yyyy-MM-dd (EEE)", { locale: ko });
	};

	// 영양소 합계 계산
	const calculateNutrition = () => {
		let carbs = 0;
		let protein = 0;
		let fat = 0;

		if (ateFoodList && ateFoodList.length > 0) {
			ateFoodList.forEach((food) => {
				carbs += food.chocdf || 0;
				protein += food.prot || 0;
				fat += food.fatce || 0;
			});
		}
		carbs = parseFloat(carbs.toFixed(2));
		protein = parseFloat(protein.toFixed(2));
		fat = parseFloat(fat.toFixed(2));

		return [carbs, protein, fat];
	};

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
		<div className="max-w-lg mx-auto mt-7 p-4 bg-white rounded-lg flex flex-col items-center relative">
			{nutritionData.length > 0 && (
				<Chart options={data.options} series={data.series} type="donut" width="200%" />
			)}
		</div>
	);
};

export default FoodChart;
