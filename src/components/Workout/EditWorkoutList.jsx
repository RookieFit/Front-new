import React, { useState } from 'react';

const EditWorkoutList = () => {
    // 운동 리스트 (입력 완료된 항목들)
    const [workoutList, setWorkoutList] = useState([]);

    // 현재 입력 중인 운동 데이터
    const [inputForm, setInputForm] = useState({
        workoutName: '',
        reps: '',
        sets: '',
        restTime: ''
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
        if (inputForm.workoutName.trim()) {
            setWorkoutList((prev) => [...prev, inputForm]);
            setInputForm({ workoutName: '', reps: '', sets: '', restTime: '' }); // 입력 필드 초기화
        }
    };

    return (
        <div className="h-full my-2">
            <header className="flex flex-col gap-2 items-center">
                <form className="flex flex-row gap-7 justify-center rounded-xs">
                    {[
                        { key: 'workoutName', label: '운동명' },
                        { key: 'reps', label: '횟수' },
                        { key: 'sets', label: '세트수' },
                        { key: 'restTime', label: '휴식시간' }
                    ].map(({ key, label }) => (
                        <div key={key} className="flex flex-col items-center gap-1 my-2">
                            <label className="bg-gray-400 w-[90px] h-[35px] text-center rounded-lg">{label}</label>
                            <input
                                type="text"
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

            <div className="mt-5 border-t-2 border-gray-300 pt-3">
                {workoutList.map((workout, index) => (
                    <div key={index} className="flex flex-row justify-around items-center p-2 border-b">
                        <p className="w-1/4 text-center">{workout.workoutName || '-'}</p>
                        <p className="w-1/4 text-center">{workout.reps || '-'}</p>
                        <p className="w-1/4 text-center">{workout.sets || '-'}</p>
                        <p className="w-1/4 text-center">{workout.restTime || '-'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditWorkoutList;
