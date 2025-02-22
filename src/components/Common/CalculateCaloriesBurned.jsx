// utils/activityCalculator.js

/**
 * 활동계수에 따른 칼로리 소모량 계산 함수
 * @param {number} userBMR - 기초대사량
 * @param {number} workoutDetailListLength - 운동 기록의 갯수
 * @returns {number} - 칼로리 소모량
 */
export const calculateCaloriesBurned = (userBMR, workoutDetailListLength) => {
    const calculateActivityFactor = (workoutDetailListLength) => {
        if (workoutDetailListLength === 0) {
            return 1.2; // 기본 활동계수
        } else if (workoutDetailListLength <= 5) {
            return 1.375; // 가벼운 활동
        } else if (workoutDetailListLength <= 10) {
            return 1.55; // 중간 정도 활동
        } else {
            return 1.725; // 매우 활동적인 경우
        }
    };

    const activityFactor = calculateActivityFactor(workoutDetailListLength);
    return userBMR * activityFactor;
};
