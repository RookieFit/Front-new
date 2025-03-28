import React from 'react';
import { Link } from 'react-router-dom';
import FoodChart from '../Diet/FoodChart';
import SectionCard from './SectionCard';
import PropTypes from 'prop-types';

const DietSection = ({ todayDiet, totalCalories }) => {
    return (
        <SectionCard title="식단">
            {todayDiet.length > 0 ? (
                <div className="flex flex-col items-center">
                    <p className="text-sm mb-1 text-black">총 {totalCalories} kcal</p>
                    <div className="w-full">
                        <FoodChart ateFoodList={todayDiet} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-black">
                    <p className="mb-16">오늘의 식단을 입력해보세요</p>
                    <Link
                        to="/diet"
                        className="bg-rookieRed text-white px-3 py-1 rounded-lg hover:opacity-80"
                    >
                        식단 입력하기
                    </Link>
                </div>
            )}
        </SectionCard>
    );
};

DietSection.propTypes = {
    todayDiet: PropTypes.array.isRequired,
    totalCalories: PropTypes.number.isRequired,
};

export default DietSection;