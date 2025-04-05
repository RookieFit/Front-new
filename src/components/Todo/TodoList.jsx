import React, { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import wastebasketIcon from "./assets/wastebasket.png";
import ApiClient from "../../services/ApiClient";

const TodoList = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState(""); // 새로운 할 일
    const [completedCount, setCompletedCount] = useState(0);
    const calendarBtnRef = useRef(null);

    const formatDate = (date) => format(date, 'yyyy-MM-dd', { locale: ko });

    // 전체 투두 가져오기
    const fetchAllTodos = async () => {
        try {
            const response = await ApiClient.get('/todos/select-all');
            setTodoList(response.data);
        } catch (error) {
            console.error("전체 투두를 가져오는데 실패했습니다:", error);
        }
    };

    // 특정 날짜의 투두 가져오기
    const fetchTodosByDate = async (date) => {
        try {
            const response = await ApiClient.get(`/todos/date/${date}`);
            setTodoList(response.data);
        } catch (error) {
            console.error("특정 날짜의 투두를 가져오는데 실패했습니다:", error);
        }
    };

    // 완료된 투두 카운트 가져오기
    const fetchCompletedCount = async () => {
        try {
            const response = await ApiClient.get('/todos/completed/count');
            setCompletedCount(response.data);
        } catch (error) {
            console.error("완료된 투두 카운트를 가져오는데 실패했습니다:", error);
        }
    };

    // 새로운 투두 추가
    const handleAddTask = async () => {
        if (newTask.trim()) {
            const newTodo = {
                description: newTask,
                completed: false,
                date: formatDate(selectedDate)
            };
            try {
                const response = await ApiClient.post('/todos', newTodo);
                setTodoList([...todoList, response.data]);
                setNewTask("");
            } catch (error) {
                console.error("새로운 투두를 추가하는데 실패했습니다:", error);
            }
        }
    };

    // 투두 완료 상태 업데이트
    const handleCheck = async (index) => {
        const todo = todoList[index];
        try {
            const response = await ApiClient.put(`/todos/${todo.id}/complete`);
            const updatedTodoList = [...todoList];
            updatedTodoList[index] = response.data;
            setTodoList(updatedTodoList);
            fetchCompletedCount(); // 완료된 투두 카운트 업데이트
        } catch (error) {
            console.error("투두 완료 상태를 업데이트하는데 실패했습니다:", error);
        }
    };

    // 투두 삭제
    const handleDeleteTask = async (index) => {
        const todo = todoList[index];
        try {
            await ApiClient.delete(`/todos/${todo.id}`);
            setTodoList(todoList.filter((_, i) => i !== index));
            fetchCompletedCount(); // 완료된 투두 카운트 업데이트
        } catch (error) {
            console.error("투두를 삭제하는데 실패했습니다:", error);
        }
    };

    // "All" 체크박스 토글
    const handleAllCheck = async () => {
        const allChecked = todoList.every(item => item.completed);
        try {
            const updatedTodos = await Promise.all(
                todoList.map(async (todo) => {
                    const response = await ApiClient.put(`/todos/${todo.id}/complete`);
                    return response.data;
                })
            );
            setTodoList(updatedTodos);
            fetchCompletedCount(); // 완료된 투두 카운트 업데이트
        } catch (error) {
            console.error("전체 투두 완료 상태를 업데이트하는데 실패했습니다:", error);
        }
    };

    // 초기 데이터 로드
    useEffect(() => {
        fetchTodosByDate(formatDate(selectedDate));
        fetchCompletedCount();
    }, [selectedDate]);

    const isAllChecked = todoList.length > 0 && todoList.every(item => item.completed);

    return (
        <div className="w-full h-full bg-rookieRed rounded-lg flex items-center justify-center">
            <div className="relative w-[97%] h-[86vh] bg-white rounded-lg flex flex-col p-6">

                <p className="text-4xl font-bold text-center mb-4 mt-10">ToDo List</p>

                {/* 날짜 및 캘린더 */}
                <div className="flex justify-center items-center mb-6 relative">
                    <h2 className="text-lg">{formatDate(selectedDate)}</h2>
                    <button
                        ref={calendarBtnRef}
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="ml-2 text-xl"
                    >
                        📆
                    </button>

                    {showCalendar && (
                        <div
                            className="absolute z-10 bg-white border p-4 rounded-lg shadow-lg"
                            style={{
                                top: '100%',
                                right: '50%',
                                transform: 'translateX(50%)',
                                marginTop: '10px'
                            }}
                        >
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
                                inline
                            />
                        </div>
                    )}
                </div>

                <div className="ml-[20%]">
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="ToDoList를 입력해주세요"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="w-[65%] p-2 border rounded-md"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddTask();
                                }
                            }}
                        />
                        <button onClick={handleAddTask} className="ml-2 p-2 w-28 bg-rookieRed text-white rounded-md">
                            추가하기
                        </button>
                    </div>

                    {/* "All" 체크박스 */}
                    <div className="mb-3 ml-3 mt-[-10px] flex items-center">
                        <input
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={handleAllCheck}
                            className="mr-3"
                        />
                        <label className="text-lg font-medium">All</label>
                    </div>

                    <hr className="w-[74%]" />

                    {/* 할 일 목록 */}
                    <div className="overflow-y-auto max-h-[300px]">
                        <ul className="mt-4 ml-3">
                            {todoList.length > 0 ? (
                                todoList.map((item, index) => (
                                    <li key={index} className="mb-2 flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={item.completed}
                                            onChange={() => handleCheck(index)}
                                            className="mr-3"
                                        />
                                        <span className={`text-lg flex-1 ${item.completed ? "text-gray-400 line-through" : ""}`}>
                                            {item.description}
                                        </span>
                                        <button onClick={() => handleDeleteTask(index)} className="mr-[27%]">
                                            <img src={wastebasketIcon} alt="삭제" className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>해당 날짜에 할 일이 없습니다.</p>
                            )}
                        </ul>
                    </div>
                    <hr className="absolute bottom-52 w-[58%]" />
                    <p className="absolute bottom-44 left-[21.5%]">Completed Todos: {completedCount}</p>
                </div>
            </div>
        </div>
    );
};

export default TodoList;