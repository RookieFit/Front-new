import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import ApiClient from '../../services/ApiClient';
import PropTypes from 'prop-types';

const MyPageUserInfoGraph = ({ pageKey }) => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: "Weight (kg)",
                type: "line",
                data: [],
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
            colors: ["#000"],
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
                    colors: ["#000",], // 각 시리즈에 맞는 색상 설정
                },
                formatter: (value) => value.toFixed(2),
            },
        },
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiClient.get("/user/userdata/getuserweightdata");
                const weights = response.data.map(item => parseFloat(item.userInfoWeight));
                const dates = response.data.map(item => item.userInfoInbodyDate);

                setChartData(prevState => ({
                    ...prevState,
                    series: [{ ...prevState.series[0], data: weights }],
                    options: { ...prevState.options, xaxis: { categories: dates } },
                }));
            } catch (error) {
                console.error("Error fetching weight data:", error);
            }
        };

        fetchData();
    }, [pageKey]);
    return (
        <div className='px-10'>
            <Chart options={chartData.options} series={chartData.series} type="line" height={250} />
        </div>
    );
};
MyPageUserInfoGraph.propTypes = {
    pageKey: PropTypes.number.isRequired,
};

export default MyPageUserInfoGraph;