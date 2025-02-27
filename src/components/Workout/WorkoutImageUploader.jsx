import PropTypes from 'prop-types';
import React from 'react';

const WorkoutImageUploader = ({
    imageList,
    currentIndex,
    fileInputRef,
    handleFileChange,
    handleDeleteImage,
    handlePrev,
    handleNext,
    handleDivClick
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
                <button className="bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={handlePrev}
                    disabled={imageList.length === 0}
                >
                    &lt;
                </button>
                {imageList.length > 0 ? (
                    <img src={imageList[currentIndex].preview}
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
                <button className="bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={handleNext}
                    disabled={imageList.length === 0}
                >
                    &gt;
                </button>
            </div>

            {imageList.length > 0 && (
                <button className="bg-red-500 text-white px-4 py-2 rounded my-2" onClick={() => handleDeleteImage(currentIndex)}>
                    이미지 삭제
                </button>
            )}

            <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} style={{ display: "none" }} />
        </div>
    );
};

WorkoutImageUploader.propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.shape({
        file: PropTypes.object,
        preview: PropTypes.string.isRequired,
    })).isRequired,
    currentIndex: PropTypes.number.isRequired,
    fileInputRef: PropTypes.object.isRequired,
    handleFileChange: PropTypes.func.isRequired,
    handleDeleteImage: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleDivClick: PropTypes.func.isRequired,
};

export default WorkoutImageUploader;