import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import ApiClient from '../../services/ApiClient';
import WorkoutDietSection from './WorkoutDietSection';
import WorkoutDisableDietSection from './WorkoutDisableDietSection';
import EditWorkoutDetailList from './EditWorkoutDetailList';
import EditWorkout from './EditWorkout';
import CreateWorkout from './CreateWorkout';
import { calculateCaloriesBurned } from '../Common/CalculateCaloriesBurned';

const WorkoutModalComponent = ({ selectedDate, setIsOpen, title, comment, imageList, setPageKey }) => {

    //todo: userinfo의 기초대사량 백에서 가져오기
    const userBMR = 1500;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [workoutDetailList, setWorkoutDetailList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [workout, setWorkout] = useState({
        workoutTitle: title || '',
        workoutComment: comment || '',
        workoutCreatedDate: selectedDate,
        dailyCaloriesBurned: 0
    });
    const [workoutImageUris, setWorkoutImageUris] = useState(imageList);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchWorkoutDetailList = async () => {
            try {
                const response = await ApiClient.get(
                    `/user/workout/getworkoutdetail?createdDate=${selectedDate}`,
                );
                if (Array.isArray(response.data)) {
                    setWorkoutDetailList(response.data);
                }
                else {
                    console.warn("예상치 못한 응답 형식:", response.data);
                    setWorkoutDetailList([]);
                }
            } catch (error) {
                console.error("운동 데이터를 불러오는 중 오류 발생:", error);
                setWorkoutDetailList([]); // 오류 발생 시 빈 배열 유지
            }
        };

        fetchWorkoutDetailList();
    }, [selectedDate]);

    useEffect(() => {
        setWorkoutImageUris(imageList);
    }, [imageList]);

    const [dietList, setDietList] = useState([
        {
            foodName: '불닭볶음면',
            kcal: '500kcal',
        },
        {
            foodName: '불닭볶음면',
            kcal: '500kcal',
        },
        {
            foodName: '불닭볶음면',
            kcal: '500kcal',
        },
        {
            foodName: '불닭볶음면',
            kcal: '500kcal',
        },
        {
            foodName: '불닭볶음면',
            kcal: '500kcal',
        },
    ]);

    // 오른쪽 버튼 클릭 시 처리
    const moveRight = () => {
        if (imageList.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
        }
    };

    // 왼쪽 버튼 클릭 시 처리
    const moveLeft = () => {
        if (imageList.length > 0) {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
            );
        }
    };

    useEffect(() => {
        setWorkout((prev) => ({
            ...prev,
            dailyCaloriesBurned: calculateCaloriesBurned(userBMR, workoutDetailList.length),
        }));
    }, [workoutDetailList, userBMR]);

    //todo: workoutdetaillist와 workout 수정사항 저장
    const handleSaveWorkoutData = async () => {
        if (!workout.workoutTitle.trim()) {
            alert("제목을 입력해주세요");
            return;
        } else if (!workout.workoutComment.trim()) {
            alert("내용을 입력해주세요");
            return;
        };
        const workoutData = {
            ...workout,
            workoutDetails: workoutDetailList,
        };
        const newFiles = workoutImageUris.filter(img => img instanceof File);
        try {
            setIsSaving(true);
            const formData = new FormData();
            formData.append(
                "workout",
                new Blob([JSON.stringify(workoutData)], { type: "application/json" })
            );
            newFiles.forEach((file) => {
                formData.append("images", file); // 여러 이미지 첨부
            });

            for (let [key, value] of formData.entries()) {
                if (value instanceof Blob) {
                    console.log(`FormData: ${key} -> Blob (type: ${value.type}, size: ${value.size})`);

                    // workout이면 JSON 내용 출력
                    if (key === "workout") {
                        value.text().then(text => {
                            console.log("📌 Workout 데이터 내용:", JSON.parse(text));
                        });
                    }
                } else {
                    console.log(`FormData: ${key} ->`, value);
                }
            }

            const response = await ApiClient.post(
                "/user/workout/update",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setWorkout({
                workoutTitle: '',
                workoutComment: '',
                workoutCreatedDate: selectedDate,
                dailyCaloriesBurned: 0
            });
            setWorkoutDetailList([]);
            setWorkoutImageUris([]);
            alert("저장되었습니다");
            setIsOpen(false);
            setPageKey(prevKey => prevKey + 1);
            navigator('/workout', { replace: true });
        } catch (error) {
            console.error("저장 실패:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (<>
        {!title && workoutDetailList.length === 0 ?
            (
                //title과 운동기록이 없을 시 새로입력
                <div>
                    <CreateWorkout
                        setPageKey={setPageKey}
                        selectedDate={selectedDate}
                        setIsOpen={setIsOpen}
                        userBMR={userBMR}
                    />
                </div>
            )
            :
            (

                isSaving ? (
                    <div className="flex justify-center pb-10 text-3xl text-center w-[200px] text-gray-500 font-bold animate-pulse" >
                        Saving...
                    </div >
                ) :
                    (<div className="w-[950px] h-[700px]">
                        <header className="flex flex-col mb-5 ml-5">
                            {isEdit ?
                                <input
                                    className='border-2 w-[200px] text-lg pl-2'
                                    placeholder='제목을 입력해주세요'
                                    type='text'
                                    value={workout.workoutTitle}
                                    onChange={(e) =>
                                        setWorkout((prevWorkout) => ({
                                            ...prevWorkout,
                                            workoutTitle: e.target.value,
                                        }))}
                                />
                                :
                                <h1 className="text-2xl font-bold">{workout.workoutTitle}</h1>
                            }
                            <span className="ml-1 text-gray-500">{selectedDate}</span>
                        </header>

                        <hr className="mb-5 border-gray-300" />

                        <div className="flex flex-row gap-5 h-[450px] mb-20">
                            {isEdit ? (
                                <EditWorkout
                                    setWorkout={setWorkout}
                                    workout={workout}
                                    selectedDate={selectedDate}
                                    setWorkoutImageUris={setWorkoutImageUris}
                                />) :
                                (<div className="flex flex-col items-center w-1/2">
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                            onClick={moveLeft}
                                        >
                                            &lt;
                                        </button>
                                        <img
                                            src={workoutImageUris?.[currentIndex]}
                                            className="w-[250px] h-[250px] my-5 object-cover rounded-lg"
                                        />
                                        <button
                                            className="bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                            onClick={moveRight}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                    {workout.workoutComment ? <p className="mt-3">{workout.workoutComment}</p> :
                                        <textarea
                                            placeholder='자유로운 글을 작성해보세요'
                                            type='text'
                                            className='border-2 w-[250px] h-1/3 pl-2 text-center'
                                            style={{
                                                lineHeight: '1.5',
                                                paddingTop: '0.75em',
                                            }}
                                        />
                                    }
                                </div>)}

                            <div className="w-[2px] h-[450px] bg-gray-300"></div>

                            <div className="flex flex-col justify-center h-full">
                                {isEdit ? (
                                    <EditWorkoutDetailList
                                        setWorkoutDetailList={setWorkoutDetailList}
                                        workoutDetailList={workoutDetailList}
                                        selectedDate={selectedDate}
                                    />) :
                                    (<div className='w-[400px]'>
                                        {workoutDetailList.length > 0 ? <div className="mb-3 border-2 border-solid border-gray-300 p-5">
                                            <p className="text-lg h-1/2 font-semibold text-center overflow-y-auto mb-5">운동일지</p>
                                            {workoutDetailList.map((workout, index) => (
                                                <div key={index} className="flex flex-row justify-center items-center gap-5 mb-2">
                                                    <p className="font-semibold w-1/3">{workout.workoutName}</p>
                                                    <p>{`${workout.sets}`}세트</p>
                                                    <p>{`${workout.reps}`}회</p>
                                                    <p>{`${workout.restTime}`}초</p>
                                                </div>
                                            ))}
                                        </div>
                                            :
                                            <div className="flex flex-col justify-center items-center mb-3 border-2 border-solid border-gray-300 p-5">
                                                <p className="text-lg h-1/2 font-semibold text-center overflow-y-auto mb-5">새로운 기록을 남겨 보세요.</p>
                                                <button
                                                    className='bg-gray-300 w-1/2'
                                                    onClick={() => setIsEdit(true)}
                                                >작성하기</button>
                                            </div>}

                                        {title && comment && workoutDetailList.length > 0 ? (
                                            <WorkoutDietSection dietList={dietList} />
                                        ) : (
                                            <WorkoutDisableDietSection dietList={dietList} />
                                        )}
                                    </div>)}
                            </div>
                        </div>

                        <footer className="mt-5 flex justify-center gap-10 w-full">
                            {!isEdit ? <button
                                className="bg-white rounded-lg text-gray-700 border-2 w-1/6 px-4 py-2 hover:opacity-50"
                                onClick={() => setIsOpen(false)}
                            >
                                닫기
                            </button>
                                :
                                <button
                                    className="bg-white rounded-lg text-gray-700 border-2 w-1/6 px-4 py-2 hover:opacity-50"
                                    onClick={() => { setIsEdit(false), setWorkoutImageUris(imageList); }}
                                >
                                    이전
                                </button>}
                            {isEdit ?
                                <button
                                    className="bg-gray-500 rounded-lg text-white px-4 py-2 w-1/6 hover:opacity-50"
                                    onClick={handleSaveWorkoutData}
                                >
                                    저장하기
                                </button>
                                :
                                <button
                                    className="bg-gray-500 rounded-lg text-white px-4 py-2 w-1/6 hover:opacity-50"
                                    onClick={() => setIsEdit(true)}
                                >
                                    수정하기
                                </button>
                            }
                        </footer>
                    </div>))}
    </>
    );
};

WorkoutModalComponent.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    imageList: PropTypes.array.isRequired,
    setPageKey: PropTypes.func.isRequired
};

export default WorkoutModalComponent;
