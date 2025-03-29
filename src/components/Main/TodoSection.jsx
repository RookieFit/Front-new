import React from 'react';
import SectionCard from './SectionCard';
import PropTypes from 'prop-types';

function formatDateToMD(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${Number(month)}월 ${Number(day)}일`;
}

const TodoSection = ({ selectedDate, todoList, checkedTodos, handleCheck }) => {
    const formattedDate = selectedDate ? selectedDate.replace(/-/g, '.') : '';

    return (
        <SectionCard title="ToDo List">
            {/* 소제목 */}
            <div className="text-center text-lg text-black mb-1">
                {selectedDate ? formattedDate : ""}
            </div>
            {/* 구분선 */}
            <hr className="mb-2 border-gray-300" />

            {/* 투두 목록 */}
            <div className="overflow-y-auto max-h-60 space-y-2 text-lg">
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
    );
};

TodoSection.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    todoList: PropTypes.array.isRequired,
    checkedTodos: PropTypes.object.isRequired,
    handleCheck: PropTypes.func.isRequired,
};

export default TodoSection;