import React, { useState } from 'react';
import Chart from "react-apexcharts";

const MyPageUserMuscleGraph = () => {
    const [chartData] = useState({
        series: [
            {
                name: "Muscle (%)",
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
                    title: { text: "Muscle (%)", style: { color: "#000" } },
                    labels: { style: { colors: "#000" } },
                },
            ],
            colors: ["blue"],
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
                    colors: ["blue",],
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

export default MyPageUserMuscleGraph;