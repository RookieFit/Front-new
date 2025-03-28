import React, { useState, useEffect, useRef } from 'react';
import "cally";
import ApiClient from "../../services/ApiClient";
import FoodChart from "../Diet/FoodChart";
import { format } from "date-fns";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SectionCard = ({ title, children }) => {
    return (
        <article className="flex-1 h-full bg-mainRed rounded-md p-4 opacity-60">
            <header>
                <h2 className="text-lg text-mainText ml-2">{title}</h2>
            </header>
            <div className="mt-2">{children}</div>
        </article>
    );
};

function formatDateToMD(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${Number(month)}월 ${Number(day)}일`;
}

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

    const formattedDate = selectedDate ? selectedDate.replace(/-/g, '.') : '';

    return (
        <main className="flex flex-col md:flex-row gap-5 p-4 flex-1 h-full">
            <div className="flex flex-col gap-4 flex-1 h-full">
                {/* 상단 두 개 박스 */}
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="flex-[3]">
                        <SectionCard title="오늘날씨" />
                    </div>
                    <div className="flex-[2]">
                        <SectionCard title="식단">
                            {todayDiet.length > 0 ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-sm mb-1 text-black">총 {totalCalories} kcal</p>
                                    <div className="w-full">
                                        <FoodChart ateFoodList={todayDiet} />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-black">
                                    <p className="mb-16">오늘의 식단을 입력해보세요</p>
                                    <Link
                                        to="/diet"
                                        className="bg-rookieRed text-white px-3 py-1 rounded-lg hover:opacity-80"
                                    >
                                        식단 입력하기
                                    </Link>
                                </div>
                            )}
                        </SectionCard>
                    </div>
                </div>

                {/* 하단: 캘린더 & 투두리스트 */}
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                    {/* 캘린더 */}
                    <SectionCard title="캘린더">
                        <div className="flex justify-center overflow-x-auto">
                            <calendar-date
                                ref={callyRef}
                                class="cally bg-base-100 border border-base-300 shadow-lg rounded-box p-3 block"
                                style={{ minWidth: '300px', maxWidth: '600px', width: '100%' }}
                                value="2025-03-02"
                                min="2025-01-01"
                                max="2025-12-31"
                                locale="ko"
                            >
                                <svg
                                    aria-label="Previous"
                                    className="fill-current size-4"
                                    slot="previous"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                                <svg
                                    aria-label="Next"
                                    className="fill-current size-4"
                                    slot="next"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                <calendar-month class="text-xl" style={{ width: '100%' }}>
                                </calendar-month>
                            </calendar-date>
                        </div>
                    </SectionCard>

                    <SectionCard title="ToDo List">
                        {/* 소제목 */}
                        <div className="text-center text-lg text-black mb-1 ">
                            {selectedDate ? formattedDate : ""}
                        </div>
                        {/* 구분선 */}
                        <hr className="mb-2 border-gray-300" />

                        {/* 투두 목록 */}
                        <div className="overflow-y-auto max-h-60 space-y-2 text-lg ">
                            {todoList.length > 0 ? (
                                todoList.map((todo) => {
                                    const isChecked = checkedTodos[todo.id] || false;
                                    const monthDay = formatDateToMD(todo.date);
                                    const displayTitle = `${monthDay} ${todo.description}`;
                                    return (
                                        <label
                                            key={todo.id}
                                            className="flex items-center bg-white p-2 rounded shadow text-black"
                                            style={{
                                                textDecoration: isChecked ? 'line-through' : 'none',
                                                opacity: isChecked ? 0.6 : 1,
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={isChecked}
                                                onChange={() => handleCheck(todo.id)}
                                            />
                                            {displayTitle}
                                        </label>
                                    );
                                })
                            ) : (
                                selectedDate ? (
                                    <p className="text-black text-lg">할 일이 없습니다.</p>
                                ) : (
                                    <p className="text-black text-lg">날짜를 선택하세요!</p>
                                )
                            )}
                        </div>
                    </SectionCard>
                </div>
            </div>

            {/* 오른쪽 박스 */}
            <aside className="md:w-4/12 flex-2 bg-mainRed rounded-md opacity-60 p-4">
                <header>
                    <h2 className="text-lg text-mainText ml-2">이번주 운동량 추세</h2>
                </header>
            </aside>
        </main>
    );
};

export default Main;
