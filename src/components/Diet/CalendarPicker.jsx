import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
	const [showCalendar, setShowCalendar] = useState(false);  // 캘린더 보이기/숨기기 상태

	const formatDate = (date) => format(date, "yyyy-MM-dd (EEE)", { locale: ko });

	return (
		<div className="relative">
			<div className="mt-20 flex items-center gap-2">
				<h2 className="text-xl font-bold">{formatDate(selectedDate)}</h2>
				<button onClick={() => setShowCalendar(!showCalendar)} className="text-xl">
					📆
				</button>
			</div>

			{showCalendar && (
				<div className="absolute z-10 mt-2 bg-white border p-4 rounded-lg shadow-lg">
					<DatePicker
						selected={selectedDate}
						onChange={(date) => {
							setSelectedDate(date);
							setShowCalendar(false);
						}}
						dateFormat="yyyy-MM-dd"
						locale={ko}
						className="border px-2 py-1 rounded-md"
						onClickOutside={() => setShowCalendar(false)}
					/>
				</div>
			)}
		</div>
	);
};

export default CalendarPicker;