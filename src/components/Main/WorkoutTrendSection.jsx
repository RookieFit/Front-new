import React, { useEffect, useState } from 'react';
import SectionCard from './SectionCard';
import Chart from 'react-apexcharts';
import ApiClient from '../../services/ApiClient';

const WorkoutTrendSection = () => {
    const [workoutData, setWorkoutData] = useState([]);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: [],
            },
            yaxis: {
                title: {
                    text: '칼로리 (kcal)',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} kcal`,
                },
            },
        },
    });

    // 운동 데이터 가져오기
    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const response = await ApiClient.get('/user/workout/trend'); // 운동 데이터 API 호출
                const data = response.data;

                // 차트 데이터 구성
                const categories = data.map((item) => item.date); // 날짜
                const seriesData = data.map((item) => item.caloriesBurned); // 소모 칼로리

                setWorkoutData(data);
                setChartData((prev) => ({
                    ...prev,
                    series: [{ name: '소모 칼로리', data: seriesData }],
                    options: {
                        ...prev.options,
                        xaxis: { categories },
                    },
                }));
            } catch (error) {
                console.error('운동 데이터를 불러오는데 실패했습니다:', error);
            }
        };

        fetchWorkoutData();
    }, []);

    return (
        <SectionCard title="이번주 운동량 추세">
            {/* 차트 */}
            <div className="mb-6">
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={300}
                />
            </div>

            {/* 운동 기록 */}
            <div className="space-y-4">
                {workoutData.length > 0 ? (
                    workoutData.map((workout, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-white p-4 rounded shadow-md text-black"
                        >
                            <span className="text-sm text-gray-500">{workout.date}</span>
                            <span className="font-bold text-lg">
                                총 소모 칼로리: {workout.caloriesBurned} kcal
                            </span>
                            <p className="text-sm mt-2">{workout.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">운동 기록이 없습니다.</p>
                )}
            </div>
        </SectionCard>
    );
};

export default WorkoutTrendSection;