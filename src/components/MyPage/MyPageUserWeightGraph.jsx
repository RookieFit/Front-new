import React, { useState } from 'react';
import Chart from "react-apexcharts";

const MyPageUserInfoGraph = () => {
    const [chartData] = useState({
        series: [
            {
                name: "Weight (kg)",
                type: "line",
                data: [80, 101, 123, 90, 21],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                toolbar: { show: false },
            },
            stroke: { width: [3, 3, 3] },
            xaxis: {
                categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            },
            yaxis: [
                {
                    title: { text: "Weight (kg)", style: { color: "#000" } },
                    labels: { style: { colors: "#000" } },
                },
            ],
            colors: ["#FF4560"],
            grid: {
                show: true,
                padding: {
                    left: 30,
                    right: 30,
                },
            },
            tooltip: { shared: true, intersect: false },
            legend: { show: true, },
            dataLabels: {
                enabled: true,
                style: {
                    colors: ["#FF4560",], // 각 시리즈에 맞는 색상 설정
                },
                formatter: (value) => value.toFixed(2),
            },
        },
    });
    return (
        <div className='px-10'>
            <Chart options={chartData.options} series={chartData.series} type="line" height={250} />
        </div>
    );
};

export default MyPageUserInfoGraph;