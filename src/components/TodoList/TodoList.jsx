import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import wastebasketIcon from "./assets/wastebasket.png";

const TodoList = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState(""); // 새로운 할 일

    const formatDate = (date) => format(date, 'yyyy-MM-dd (EEE)', { locale: ko });

    // 할 일 추가
    const handleAddTask = () => {
        if (newTask.trim()) {
            setTodoList([...todoList, { task: newTask, done: false }]);
            setNewTask("");
        }
    };

    // 개별 체크박스 토글
    const handleCheck = (index) => {
        const updatedTodoList = [...todoList];
        updatedTodoList[index].done = !updatedTodoList[index].done;
        setTodoList(updatedTodoList);
    };

    // "All" 체크박스 토글
    const handleAllCheck = () => {
        const allChecked = todoList.every(item => item.done);
        setTodoList(todoList.map(item => ({ ...item, done: !allChecked })));
    };

    const handleDeleteTask = (index) => {
        setTodoList(todoList.filter((_, i) => i !== index));
    };

    const isAllChecked = todoList.length > 0 && todoList.every(item => item.done);

    return (
        <div className="w-full h-full bg-rookieRed rounded-lg flex items-center justify-center">
            <div className="relative w-[97%] h-[86vh] bg-white rounded-lg flex flex-col p-6">

                <p className="text-4xl font-bold text-center mb-4 mt-10">ToDo List</p>

                {/* 날짜 및 캘린더 */}
                <div className="flex justify-center items-center mb-6 relative">
                    <h2 className="text-lg">{formatDate(selectedDate)}</h2>
                    <button onClick={() => setShowCalendar(!showCalendar)} className="ml-2 text-xl">
                        📆
                    </button>

                    {showCalendar && (
                        <div className="absolute z-10 mt-2 left-0 bg-white border p-4 rounded-lg shadow-lg">
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

                <div className="ml-[20%]">
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="ToDoList를 입력해주세요"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="w-[65%] p-2 border rounded-md"
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
                                            checked={item.done}
                                            onChange={() => handleCheck(index)}
                                            className="mr-3"
                                        />
                                        <span className={`text-lg flex-1 ${item.done ? "text-gray-400 line-through" : ""}`}>
                                            {item.task}
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
                    <p className="absolute bottom-44 left-[21.5%]">Completed Todos: {todoList.filter(item => item.done).length}</p>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
