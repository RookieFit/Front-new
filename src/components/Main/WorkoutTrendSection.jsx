import React, { useEffect, useState, useMemo } from 'react';
import SectionCard from './SectionCard';
import Chart from 'react-apexcharts';
import ApiClient from '../../services/ApiClient';
import { parseISO } from 'date-fns';

const WorkoutTrendSection = () => {
    const [workoutData, setWorkoutData] = useState([]); // 운동 기록 목록용 데이터
    const [calorieData, setCalorieData] = useState([]); // 차트용 칼로리 데이터
    const [showAllRecords, setShowAllRecords] = useState(false);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '60%',
                    borderRadius: 4
                },
            },
            dataLabels: { enabled: false },
            xaxis: {
                categories: [],
                labels: { style: { fontSize: '12px' } }
            },
            yaxis: {
                title: {
                    text: '칼로리 (kcal)',
                    style: { fontSize: '12px' }
                },
                labels: { formatter: (val) => Math.round(val) }
            },
            colors: ['#d14d42'],
            fill: { opacity: 0.85 },
            tooltip: {
                y: { formatter: (val) => `${val} kcal` }
            },
        },
    });

    // 날짜 유틸리티 함수
    const formatDateShort = (dateStr) => {
        try {
            const date = parseISO(dateStr);
            return `${date.getMonth() + 1}/${date.getDate()}`;
        } catch (error) {
            return dateStr;
        }
    };

    const getDayOfWeek = (dateStr) => {
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        try {
            const date = new Date(dateStr);
            return dayNames[date.getDay()];
        } catch (error) {
            return '';
        }
    };

    // 운동 기록 목록 데이터 가져오기
    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const response = await ApiClient.get('/user/workout/getworkout');
                const data = response.data;

                // 데이터 없는 경우 처리
                if (!data || data.length === 0) {
                    setWorkoutData([]);
                    return;
                }

                // 데이터 정렬 (날짜 기준 - 최신순)
                const sortedData = [...data].sort((a, b) =>
                    new Date(b.workoutCreatedDate) - new Date(a.workoutCreatedDate)
                );

                setWorkoutData(sortedData);
            } catch (error) {
                console.error('운동 기록을 불러오는데 실패했습니다:', error);
                setWorkoutData([]);
            }
        };

        fetchWorkoutData();
    }, []);

    // 차트용 칼로리 데이터 가져오기
    useEffect(() => {
        const fetchCalorieData = async () => {
            try {
                const response = await ApiClient.get('/user/workout/getdailycalorie');
                const data = response.data;

                // 데이터 없는 경우 처리
                if (!data || data.length === 0) {
                    setCalorieData([]);
                    return;
                }

                // 차트 데이터 구성 (날짜순 정렬)
                const chartSortedData = [...data].sort((a, b) =>
                    new Date(a.workoutCreatedDate) - new Date(b.workoutCreatedDate)
                );

                setCalorieData(chartSortedData);

                const categories = chartSortedData.map(item =>
                    `${formatDateShort(item.workoutCreatedDate)}(${getDayOfWeek(item.workoutCreatedDate)})`
                );

                const seriesData = chartSortedData.map(item =>
                    item.dailyCaloriesBurned ? Number(item.dailyCaloriesBurned) : 0
                );

                setChartData(prev => ({
                    ...prev,
                    series: [{ name: '소모 칼로리', data: seriesData }],
                    options: {
                        ...prev.options,
                        xaxis: { ...prev.options.xaxis, categories }
                    },
                }));
            } catch (error) {
                console.error('칼로리 데이터를 불러오는데 실패했습니다:', error);
                setCalorieData([]);
            }
        };

        fetchCalorieData();
    }, []);

    // 차트에 표시할 데이터가 있는지 확인
    const hasChartData = useMemo(() => {
        return chartData.series.length > 0 &&
            chartData.series[0].data?.length > 0 &&
            chartData.series[0].data.some(val => val > 0);
    }, [chartData.series]);

    // 표시할 운동 기록
    const displayWorkouts = useMemo(() => {
        return showAllRecords ? workoutData : workoutData.slice(0, 4);
    }, [workoutData, showAllRecords]);

    // 더보기 토글
    const toggleShowAllRecords = () => {
        setShowAllRecords(!showAllRecords);
    };

    return (
        <SectionCard title="이번주 운동량 추세">
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                {hasChartData ? (
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={280}
                    />
                ) : (
                    <div className="flex items-center justify-center h-[280px] text-gray-400">
                        <p>표시할 운동량 데이터가 없습니다</p>
                    </div>
                )}
            </div>

            {/* 구분선 */}
            <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-mainText mr-2">최근 운동 기록</span>
                <div className="h-0.5 flex-1 bg-gray-500 bg-opacity-30"></div>
            </div>

            <div className="space-y-2 bg-white bg-opacity-10 p-3 rounded-lg max-h-[400px] overflow-y-auto">
                {displayWorkouts.length > 0 ? (
                    <>
                        {displayWorkouts.map((workout, index) => (
                            <div
                                key={index}
                                className="flex flex-col bg-white p-3 rounded shadow-sm text-black border-l-2 border-rookieRed border-[1px] border-gray-100"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-medium">
                                        {formatDateShort(workout.workoutCreatedDate)} ({getDayOfWeek(workout.workoutCreatedDate)})
                                    </span>
                                    {workout.dailyCaloriesBurned ? (
                                        <span className="text-sm font-bold text-rookieRed">
                                            {workout.dailyCaloriesBurned} kcal
                                        </span>
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            칼로리 정보 없음
                                        </span>
                                    )}
                                </div>
                                <p className="font-medium mt-1">{workout.workoutTitle}</p>
                                <p className="text-sm mt-1 line-clamp-2">{workout.workoutComment}</p>
                            </div>
                        ))}

                        {/* 더보기/접기 버튼 */}
                        {workoutData.length > 4 && (
                            <button
                                onClick={toggleShowAllRecords}
                                className="w-full text-center py-2 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition-all"
                            >
                                <span className="text-xs text-white font-medium">
                                    {showAllRecords ? '접기' : `+ ${workoutData.length - 4}개 더보기`}
                                </span>
                            </button>
                        )}
                    </>
                ) : (
                    <div className="text-center py-6 text-gray-300">
                        <p>운동 기록이 없습니다</p>
                        <p className="text-xs mt-1">운동을 기록하고 트렌드를 확인해보세요</p>
                    </div>
                )}
            </div>
        </SectionCard>
    );
};

export default WorkoutTrendSection;
