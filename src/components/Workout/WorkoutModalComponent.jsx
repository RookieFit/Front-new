import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import ApiClient from '../../services/ApiClient';
import WorkoutDietSection from './WorkoutDietSection';
import WorkoutDisableDietSection from './WorkoutDisableDietSection';
import EditWorkoutList from './EditWorkoutList';

const WorkoutModalComponent = ({ selectedDate, setIsOpen, title, comment, imageList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [workoutDetailList, setWorkoutDetailList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchWorkoutDetailList = async () => {
            try {
                const response = await ApiClient.get(
                    `/user/userworkoutdetaildata?workoutDetailCreatedDate=${selectedDate}`,
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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    };

    // 왼쪽 버튼 클릭 시 처리
    const moveLeft = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-[950px] h-[700px]">
            {/* 헤더 */}
            <header className="flex flex-col mb-5 ml-5">
                {title ? <h1 className="text-2xl font-bold">{title}</h1> :
                    <input
                        className='border-2 w-[200px] text-lg pl-2'
                        placeholder='제목을 입력해주세요'
                        type='text'
                    />}
                <span className="ml-1 text-gray-500">{selectedDate}</span>
            </header>

            <hr className="mb-5 border-gray-300" />

            {/* 본문 */}
            <div className="flex flex-row gap-5 h-[450px] mb-20">
                {/* 왼쪽 (이미지 & 내용) */}
                <div className="flex flex-col items-center w-1/2">
                    <div className="flex items-center gap-3">
                        <button className="bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={moveLeft}>&lt;</button>
                        <img src={imageList[currentIndex]} className="w-[250px] h-[250px] my-5 object-cover rounded-lg" />
                        <button className="bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={moveRight}>&gt;</button>
                    </div>
                    {comment ? <p className="mt-3">{comment}</p> :
                        <textarea
                            placeholder='자유로운 글을 작성해보세요'
                            type='text'
                            className='border-2 w-[250px] h-1/3 pl-2 text-center'
                            style={{
                                lineHeight: '1.5',  // 텍스트 수직 중앙 정렬
                                paddingTop: '0.75em',  // 수직 중앙을 맞추기 위한 여백 조정
                            }}
                        />
                    }
                </div>

                {/* 세로 구분선 */}
                <div className="w-[2px] h-[450px] bg-gray-300"></div>

                {/* 오른쪽 (운동일지 & 식단) */}
                <div className="flex flex-col justify-center h-full w-1/2">
                    {isEdit ? (<EditWorkoutList />) :
                        (<div>
                            {workoutDetailList.length > 0 ? <div className="mb-3 border-2 border-solid border-gray-300 p-5">
                                <p className="text-lg h-1/2 font-semibold text-center overflow-y-auto mb-5">운동일지</p>
                                {workoutDetailList.map((workout, index) => (
                                    <div key={index} className="flex flex-row justify-center items-center gap-10 mb-2">
                                        <p className="font-semibold w-1/5">{workout.workoutName}</p>
                                        <p>{`${workout.sets}`}세트</p>
                                        <p>{`${workout.reps}`}회</p>
                                        <p>{`${workout.restTime}`}</p>
                                    </div>
                                ))}
                            </div> : <div className="flex flex-col justify-center items-center mb-3 border-2 border-solid border-gray-300 p-5">
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

            {/* 푸터 */}
            <footer className="mt-5 flex justify-center gap-10 w-full">
                <button className="bg-white rounded-lg text-gray-700 border-2 w-1/6 px-4 py-2 rounded hover:opacity-50" onClick={() => setIsOpen(false)}>닫기</button>
                {title || comment || workoutDetailList.length ?
                    <button className="bg-gray-500 rounded-lg text-white px-4 py-2 w-1/6 rounded hover:opacity-50">수정하기</button> :
                    <button className="bg-gray-500 rounded-lg text-white px-4 py-2 w-1/6 rounded hover:opacity-50">저장하기</button>
                }
            </footer>
        </div>
    );
};

WorkoutModalComponent.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    imageList: PropTypes.array.isRequired,
};

export default WorkoutModalComponent;
