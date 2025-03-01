import React, { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import PropTypes from "prop-types";

const MyPageUserInfoComponent = ({ currentName, pageKey, setPageKey }) => {
    const [userBodyInfo, setUserBodyInfo] = useState({
        userInfoAge: 0,
        userInfoWeight: 0.0,
        userInfoHeight: 0.0,
        userInfoMuscleMass: 0.0,
        userInfoFatMass: 0.0,
        userInfoInBodyDate: "",
        userBasalMetabolicRate: 0.0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const response = await ApiClient.get(
                    `/user/userdata/getuserinfo`,
                );
                setUserBodyInfo(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response) {
                    console.log("서버 응답 오류:", error.response.data);
                    console.error("응답 상태 코드:", error.response.status);
                } else if (error.request) {
                    console.error("서버로부터 응답을 받지 못했습니다:", error.request);
                } else {
                    console.error("요청 설정 오류:", error.message);
                }
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []); // 컴포넌트 마운트 시 한 번 실행

    // 입력값 변경 핸들러 (불필요한 렌더링 방지)
    const handleInputChange = (key, value) => {
        const numericValue = isNaN(Number(value)) ? value : Number(value);
        setUserBodyInfo((prev) => {
            if (prev[key] === numericValue) return prev;
            return { ...prev, [key]: numericValue };
        });
    };

    // 사용자 정보 저장
    const inputUserBodyInfo = async (e) => {
        e.preventDefault();

        const weight = parseFloat(userBodyInfo.userInfoWeight);
        const fatMass = parseFloat(userBodyInfo.userInfoFatMass);
        const calculatedBMR = 370 + 21.6 * (weight - fatMass);
        const basalMetabolicRate = parseFloat(calculatedBMR.toFixed(3));

        const updatedUserBodyInfo = {
            ...userBodyInfo,
            userBasalMetabolicRate: basalMetabolicRate,
            userInfoInBodyDate: userBodyInfo.userInfoInBodyDate || new Date().toISOString().split("T")[0]
        };

        try {
            const response = await ApiClient.post("/user/userdata/createuserinfo", updatedUserBodyInfo);
            console.log("데이터 저장 결과:", response.data);
            alert("체성분 정보가 성공적으로 저장되었습니다.");
            setPageKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error("체성분 정보 저장 오류:", error);
            alert("정보 저장에 실패했습니다.");
        }
    };

    return (
        <div className="flex flex-col h-full justify-center p-4">
            {loading ? (
                <div className="text-center">로딩중...</div>
            ) : (
                <form className="flex flex-col">
                    <hr className="border w-full mb-3" />

                    {/* ✅ 이름 필드 (수정 불가능) */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row items-center space-x-2">
                            <label className="text-gray-600 text-xl w-1/4 text-left">이름</label>
                            <input
                                type="text"
                                className="border h-[60px] text-xl rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                                value={currentName || "이름 없음"}
                                readOnly
                            />
                        </div>
                        <hr className="border w-full mb-3" />
                    </div>

                    {/* ✅ 나이, 몸무게 등 수정 가능 필드 */}
                    {[
                        { key: "userInfoAge", label: "나이" },
                        { key: "userInfoWeight", label: "몸무게" },
                        { key: "userInfoHeight", label: "키" },
                        { key: "userInfoMuscleMass", label: "근육량" },
                        { key: "userInfoFatMass", label: "체지방량" }
                    ].map(({ key, label }) => (
                        <div key={key} className="flex flex-col gap-3">
                            <div className="flex flex-row items-center space-x-2">
                                <label className="text-gray-600 text-xl w-1/4 text-left">{label}</label>
                                <input
                                    type="number"
                                    className="border h-[60px] text-xl rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    placeholder="값을 입력해주세요"
                                    value={userBodyInfo[key] || ""}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                />
                            </div>
                            <hr className="border w-full mb-3" />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="mt-4 bg-red-800 text-white py-3 rounded-md hover:bg-blue-600 transition-all"
                        onClick={inputUserBodyInfo}
                    >
                        내 정보 저장하기
                    </button>
                </form>
            )}
        </div>
    );
};

MyPageUserInfoComponent.propTypes = {
    currentName: PropTypes.string.isRequired,
    pageKey: PropTypes.number.isRequired,
    setPageKey: PropTypes.func.isRequired,
};

export default MyPageUserInfoComponent;
