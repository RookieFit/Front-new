import React, { useState, useEffect } from "react";
import CalendarPicker from "../../components/Diet/CalendarPicker";
import AteFoodList from "../../components/Diet/AteFoodList";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const DietPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ateFoodList, setAteFoodList] = useState([]);

    // 날짜 형식 변환 함수
    const formatDate = (date) => {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        return format(dateObj, "yyyy-MM-dd", { locale: ko });
    };

    // 날짜가 변경될 때마다 서버에서 데이터를 가져오기
    useEffect(() => {
        const fetchAteFoodList = async () => {
            try {
                const formattedDate = formatDate(selectedDate);
                console.log(`🔍 Fetching food list for: ${formattedDate}`);

                const response = await fetch(`/api/diet?dietDate=${formattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                });

                // 응답 상태 코드 및 응답 텍스트 확인
                const responseText = await response.text();
                console.log("Response status: ", response.status);
                console.log("Response body: ", responseText);

                if (!response.ok) {
                    throw new Error(`Failed to fetch food list. Server responded with: ${responseText}`);
                }

                // 응답 데이터가 JSON 형식이라면 파싱
                const data = JSON.parse(responseText);
                console.log("✅ Fetched data: ", data);
                setAteFoodList(data);
            } catch (error) {
                console.error("❌ Error fetching food list:", error);
            }
        };

        fetchAteFoodList();
    }, [selectedDate]);

    return (
        <div className="w-full h-full bg-rookieRed rounded-lg flex items-center justify-center">
            <div className="relative w-[97%] h-[86vh] bg-white rounded-lg flex p-6">
                {/* 왼쪽: 캘린더와 식단 차트 */}
                <div className="w-1/2 flex flex-col items-center justify-start space-y-6">
                    {/* 캘린더 컴포넌트 */}
                    <CalendarPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>

                {/* 세로선 */}
                <div className="w-0.5 h-[70%] mt-24 bg-gray-200 mx-4"></div>

                {/* 오른쪽: 섭취한 식단 리스트 */}
                <div className="w-1/2 mt-24">
                    <AteFoodList selectedDate={formatDate(selectedDate)} ateFoodList={ateFoodList} />
                </div>
            </div>
        </div>
    );
};

export default DietPage;