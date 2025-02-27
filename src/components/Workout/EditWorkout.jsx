import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import WorkoutImageUploader from './WorkoutImageUploader';
import useImageUploader from './useImageUploader';

const EditWorkout = ({ setWorkout, workout, setWorkoutImageUris }) => {
    const [comment, setComment] = useState(workout.workoutComment || '');

    const {
        imageList,
        currentIndex,
        fileInputRef,
        handleFileChange,
        handleDeleteImage,
        handlePrev,
        handleNext,
        handleDivClick,
    } = useImageUploader(workout.workoutImageUris || []);

    // 상위 컴포넌트(WorkoutModalComponent)로 데이터 전달
    useEffect(() => {
        setWorkout(prev => ({
            ...prev,
            workoutComment: comment,
        }));
        setWorkoutImageUris(imageList.map(img => img.file || img.preview));
    }, [comment, imageList, setWorkout, setWorkoutImageUris]);

    return (
        <div className="flex flex-col items-center w-1/2 overflow-auto">
            <WorkoutImageUploader
                imageList={imageList}
                currentIndex={currentIndex}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                handleDeleteImage={handleDeleteImage}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleDivClick={handleDivClick}
            />
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
