import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';

const EditWorkout = ({ setWorkout, workout, setWorkoutImageUris }) => {
    const [comment, setComment] = useState(workout.workoutComment || '');

    // 이미지 상태를 별도로 관리
    const [currentImageList, setCurrentImageList] = useState(
        (workout.workoutImageUris || []).map(uri => ({
            file: null,
            preview: uri
        }))
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const fileInputRef = useRef(null);

    // 상위 컴포넌트(WorkoutModalComponent)로 데이터 전달
    useEffect(() => {
        setWorkout(prev => ({
            ...prev,
            workoutComment: comment,
        }));
        setWorkoutImageUris(currentImageList.map(img => img.file || img.preview));
    }, [comment, currentImageList, setWorkout, setWorkoutImageUris]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setCurrentImageList(prev => [...(prev || []), ...imagePreviews]);

        // 파일 선택 후 input 값 초기화
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // useRef를 이용한 cleanup
    const imageListRef = useRef(currentImageList);
    useEffect(() => {
        imageListRef.current = currentImageList;
    }, [currentImageList]);

    useEffect(() => {
        return () => {
            imageListRef.current.forEach(image => {
                if (image.file) {
                    URL.revokeObjectURL(image.preview);
                }
            });
        };
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? currentImageList.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex =>
            currentImageList.length === 0 ? 0 : (prevIndex + 1) % currentImageList.length
        );
    };

    // 이미지 삭제 함수
    const handleDeleteImage = (indexToDelete) => {
        setCurrentImageList(prev => {
            const newList = prev.filter((_, index) => index !== indexToDelete);
            if (newList.length === 0) {
                setCurrentIndex(0);
            } else if (currentIndex >= newList.length) {
                setCurrentIndex(newList.length - 1);
            }
            return newList;
        });
    };

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="flex flex-col items-center w-1/2 overflow-auto">
            {/* 이미지 슬라이드 */}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                    <button
                        className="bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        onClick={handlePrev}
                        disabled={currentImageList.length === 0}
                    >
                        &lt;
                    </button>
                    {currentImageList.length > 0 ? (
                        <img
                            src={currentImageList[currentIndex].preview}
                            alt="미리보기"
                            className="w-[250px] h-[250px] my-5 object-fill rounded-lg"
                            onClick={handleDivClick}
                        />
                    ) : (
                        <div
                            className="w-[250px] h-[250px] my-5 bg-gray-200 rounded-lg flex items-center justify-center"
                            onClick={handleDivClick}
                        >
                            이미지 미리보기
                        </div>
                    )}
                    <button
                        className="bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        onClick={handleNext}
                        disabled={currentImageList.length === 0}
                    >
                        &gt;
                    </button>
                </div>
                {/* 삭제 버튼 */}
                {currentImageList.length > 0 && (
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded my-2"
                        onClick={() => handleDeleteImage(currentIndex)}
                    >
                        이미지 삭제
                    </button>
                )}
                {/* 선택된 이미지 개수 표시 */}
                {currentImageList.length > 0 && (
                    <p>선택된 이미지: {currentImageList.length}개</p>
                )}
            </div>
            {/* 파일 선택 -> 이미지 추가 (hidden input) */}
            <div>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
            </div>
            {/* 댓글 수정 */}
            <textarea
                placeholder="자유로운 글을 작성해보세요"
                className="border-2 w-[300px] min-h-[150px] pl-2 text-center my-2 resize-none border-none focus:outline"
                style={{
                    lineHeight: '1.5',
                    paddingTop: '0.75em',
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
        </div>
    );
};

EditWorkout.propTypes = {
    setWorkout: PropTypes.func.isRequired,
    workout: PropTypes.object.isRequired,
    setWorkoutImageUris: PropTypes.func.isRequired
};

export default EditWorkout;
