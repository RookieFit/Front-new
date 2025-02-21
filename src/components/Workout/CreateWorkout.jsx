import PropTypes from 'prop-types';
import React, { useState } from 'react';
import EditWorkout from './EditWorkout';
import EditWorkoutList from './EditWorkoutDetailList';

const CreateWorkout = ({ selectedDate, setIsOpen }) => {
    const [workoutDetailList, setWorkoutDetailList] = useState([]);
    const [workout, setWorkout] = useState({
        workoutTitle: '',
        workoutComment: '',
        workoutImageUris: [],
        workoutCreatedDate: selectedDate
    });
    const handleTitleChange = (e) => {
        setWorkout((prev) => ({ ...prev, workoutTitle: e.target.value }));
    };
    //todo: workdoutlist와 detail create에 저장
    const handleSaveWorkoutData = () => {
        if (!workout.workoutTitle.trim()) {
            alert("제목을 입력해주세요");
            return;
        } else if (!workout.workoutComment.trim()) {
            alert("내용을 입력해주세요");
            return;
        };
        console.log(workoutDetailList);
        console.log(workout);
        setIsOpen(false);
        alert("저장되었습니다");
    };
    return (
        <div className="w-[950px] h-[700px]">
            <header className="flex flex-col mb-5 ml-5">
                <input
                    className='border-2 w-[200px] text-lg pl-2'
                    placeholder='제목을 입력해주세요'
                    type='text'
                    value={workout.workoutTitle}
                    onChange={handleTitleChange}
                />
                <span className="ml-1 text-gray-500">{selectedDate}</span>
            </header>

            <hr className="mb-5 border-gray-300" />

            <div className="flex flex-row gap-5 h-[450px] mb-20">
                <EditWorkout
                    setWorkout={setWorkout}
                    workout={workout}
                    selectedDate={selectedDate}
                />
                <div className="w-[2px] h-[450px] bg-gray-300"></div>
                <EditWorkoutList
                    setWorkoutDetailList={setWorkoutDetailList}
                    workoutDetailList={workoutDetailList}
                    selectedDate={selectedDate}
                />
            </div>
            <footer className="mt-5 flex justify-center gap-10 w-full">
                <button
                    className="bg-white rounded-lg text-gray-700 border-2 w-1/6 px-4 py-2 hover:opacity-50"
                    onClick={() => setIsOpen(false)}
                >
                    닫기
                </button>

                <button
                    className="bg-gray-500 rounded-lg text-white px-4 py-2 w-1/6 hover:opacity-50"
                    onClick={handleSaveWorkoutData}
                >
                    저장하기
                </button>
            </footer>
        </div>

    );
};

CreateWorkout.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

export default CreateWorkout;