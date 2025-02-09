import React from 'react';
import PropTypes from "prop-types";

function WorkoutDisableDietSection({ dietList }) {
    return (
        <div
            className="mb-3 relative"
            style={{ pointerEvents: 'none' }} // 비활성화된 영역
        >
            <div className='opacity-20 bg-black'>
                <p className="text-lg h-1/2 font-semibold text-center overflow-y-auto mb-5 ">식단</p>
                {dietList.map((diet, index) => (
                    <div key={index} className="flex flex-row justify-center items-center gap-5 w-1/2 mb-2">
                        <p className="font-semibold">{diet.foodName}</p>
                        <p>{`${diet.kcal}`}</p>
                    </div>
                ))}
            </div>

            {/* 문구를 비활성화된 영역의 중앙에 띄우기 */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                <p className="text-center text-black">식단 수정은 식단페이지에서 가능합니다</p>
                <div
                    className="cursor-pointer text-blue-500 mt-4 text-center z-20"
                    style={{ pointerEvents: 'auto' }}
                    onClick={() => alert("이동")}  // 식단 페이지로 이동
                >
                    식단 페이지로 이동 &gt;&gt;
                </div>
            </div>
        </div>
    );
};

WorkoutDisableDietSection.propTypes = {
    dietList: PropTypes.array.isRequired,
};

export default WorkoutDisableDietSection;