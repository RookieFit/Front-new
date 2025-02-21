import PropTypes from 'prop-types';
import React, { useState } from 'react';

const EditWorkoutList = ({ setWorkoutDetailList, workoutDetailList, selectedDate }) => {

    // 현재 입력 중인 운동 데이터
    const [inputForm, setInputForm] = useState({
        workoutName: '',
        reps: '',
        sets: '',
        restTime: '',
        workoutCreatedDate: selectedDate  // Make sure this is always included
    });

    // 입력값 변경 핸들러
    const handleInputChange = (key, value) => {
        setInputForm((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    // 운동 추가 핸들러
    const addWorkout = () => {
        // 빈 값이 아닌 경우에만 추가
        if (inputForm.workoutName.trim() && isValidNumber(inputForm.reps) && isValidNumber(inputForm.sets) && isValidNumber(inputForm.restTime)) {
            // Add selectedDate explicitly for each new workout
            setWorkoutDetailList((prev) => [...prev, { ...inputForm, workoutCreatedDate: selectedDate }]);
            setInputForm({ workoutName: '', reps: '', sets: '', restTime: '', workoutCreatedDate: selectedDate }); // Ensure selectedDate is reset
        } else {
            alert('운동명과 횟수, 세트수, 휴식시간을 모두 올바르게 입력해주세요.');
        }
    };

    // 숫자 유효성 검사 함수
    const isValidNumber = (value) => {
        return !isNaN(value) && value > 0;  // 숫자이고 0보다 큰 값만 유효
    };

    return (
        <div className="h-full my-2">
            <header className="flex flex-col gap-2 items-center">
                <form className="flex flex-row gap-7 justify-center rounded-xs">
                    {[
                        { key: 'workoutName', label: '운동명' },
                        { key: 'reps', label: '횟수', type: 'number' },
                        { key: 'sets', label: '세트수', type: 'number' },
                        { key: 'restTime', label: '휴식시간(초)', type: 'number' }
                    ].map(({ key, label, type }) => (
                        <div key={key} className="flex flex-col items-center gap-1 my-2">
                            <label className="bg-gray-400 w-[95px] h-[35px] text-center rounded-lg">{label}</label>
                            <input
                                type={type || 'text'}  // 기본값은 'text'로 설정
                                className="w-[90px] h-[35px] text-center rounded-lg bg-gray-200"
                                value={inputForm[key]}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                            />
                        </div>
                    ))}
                </form>

                <button
                    className="text-center w-full h-[50px] rounded-xl text-2xl text-white font-semibold bg-gray-300"
                    onClick={addWorkout}
                >
                    추가하기
                </button>
            </header>

            <div className='h-[330px] overflow-auto'>
                <div className="mt-5 border-t-2 border-gray-300 pt-3">
                    {workoutDetailList.map((workout, index) => (
                        <div key={index} className="flex flex-row justify-around items-center p-2 border-b">
                            <p className="w-1/4 text-center">{workout.workoutName || '-'}</p>
                            <p className="w-1/4 text-center">{workout.reps || '-'}회</p>
                            <p className="w-1/4 text-center">{workout.sets || '-'}세트</p>
                            <p className="w-1/4 text-center">{workout.restTime || '-'}초</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

EditWorkoutList.propTypes = {
    setWorkoutDetailList: PropTypes.func.isRequired,
    workoutDetailList: PropTypes.array.isRequired,
    selectedDate: PropTypes.string.isRequired
};

export default EditWorkoutList;
