import React from 'react';
import PropTypes from "prop-types";

const WorkoutDietSection = ({ dietList }) => {

    return (
        <div className="flex flex-col h-[220px] border-2 border-solid border-gray-300 p-5">
            <p className="text-lg font-semibold text-center overflow-y-auto mb-5">식단</p>
            <div className='overflow-auto'>
                {dietList.map((diet, index) => (
                    <div key={index} className="flex flex-row justify-center items-center gap-5 w-1/2 mb-2">
                        <p className="font-semibold">{diet.foodName}</p>
                        <p>{`${diet.kcal}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

WorkoutDietSection.propTypes = {
    dietList: PropTypes.array.isRequired,
};

export default WorkoutDietSection;