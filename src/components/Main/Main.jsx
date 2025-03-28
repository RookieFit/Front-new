import React, { useState, useEffect, useRef } from 'react';
import "cally";
import ApiClient from "../../services/ApiClient";
import { format } from "date-fns";

import WeatherSection from './WeatherSection';
import DietSection from './DietSection';
import CalendarSection from './CalendarSection';
import TodoSection from './TodoSection';
import WorkoutTrendSection from './WorkoutTrendSection';

const Main = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [checkedTodos, setCheckedTodos] = useState({});
    const [todayDiet, setTodayDiet] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);

    const callyRef = useRef(null);

    // 오늘 날짜 포맷팅
    const today = format(new Date(), 'yyyy-MM-dd');

    // 오늘의 식단 데이터 가져오기
    useEffect(() => {
        const fetchTodayDiet = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                if (!token) return;

                const response = await ApiClient.get(`/diet?dietDate=${today}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data) {
                    setTodayDiet(response.data.dietDetails || []);
                    setTotalCalories(response.data.totalCalories || 0);
                }
            } catch (error) {
                console.error("오늘의 식단을 불러오는데 실패했습니다:", error);
            }
        };

        fetchTodayDiet();
    }, [today]);

    useEffect(() => {
        const callyEl = callyRef.current;
        if (!callyEl) return;

        const handleDateChange = (e) => {
            console.log('cally changed date:', e.target.value);
            setSelectedDate(e.target.value);
        };

        callyEl.addEventListener('change', handleDateChange);
        return () => {
            callyEl.removeEventListener('change', handleDateChange);
        };
    }, []);

    useEffect(() => {
        const fetchTodosByDate = async () => {
            if (!selectedDate) return;
            try {
                console.log('선택된 날짜로 투두 조회 시도:', selectedDate);
                const response = await ApiClient.get(`/todos/date/${selectedDate}`);
                setTodoList(response.data);

                const newCheckedState = {};
                response.data.forEach((todo) => {
                    newCheckedState[todo.id] = todo.completed;
                });
                setCheckedTodos(newCheckedState);
            } catch (error) {
                if (error.response) {
                    console.log("서버 응답 오류:", error.response.data);
                    console.error("응답 상태 코드:", error.response.status);
                } else if (error.request) {
                    console.error("서버로부터 응답을 받지 못했습니다:", error.request);
                } else {
                    console.error("요청 설정 오류:", error.message);
                }
            }
        };

        fetchTodosByDate();
    }, [selectedDate]);

    // 체크박스 클릭 핸들러
    const handleCheck = (todoId) => {
        setCheckedTodos((prev) => ({
            ...prev,
            [todoId]: !prev[todoId],
        }));
    };

    return (
        <main className="flex flex-col md:flex-row gap-5 p-4 flex-1 h-full">
            <div className="flex flex-col gap-4 flex-1 h-full">
                {/* 상단 두 개 박스 */}
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="flex-[3]">
                        <WeatherSection />
                    </div>
                    <div className="flex-[2]">
                        <DietSection todayDiet={todayDiet} totalCalories={totalCalories} />
                    </div>
                </div>

                {/* 하단: 캘린더 & 투두리스트 */}
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="flex-1">
                        <CalendarSection callyRef={callyRef} />
                    </div>
                    <div className="flex-1">
                        <TodoSection
                            selectedDate={selectedDate}
                            todoList={todoList}
                            checkedTodos={checkedTodos}
                            handleCheck={handleCheck}
                        />
                    </div>
                </div>
            </div>

            {/* 오른쪽 박스 */}
            <WorkoutTrendSection />
        </main>
    );
};

export default Main;
