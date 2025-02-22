import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/ApiClient';
import PropTypes from "prop-types";

const MyPageUserInfoComponent = ({ currentName }) => {
    const [userBodyInfo, setUserBodyInfo] = useState({
        userAge: '',
        userWeight: '',
        userHeight: '',
        userMuscleMass: '',
        userFatMass: '',
        inbodyDate: '',
        userBasalMetabolicRate: ''
    });
    const [loading, setLoading] = useState(false);

    /*useEffect(() => {
        //setLoading(true);
        const fetchProfile = async () => {
            try {
                const response = await ApiClient.get(`/user/userbodydata`);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    // inbodyDate를 기준으로 최신 데이터 찾기
                    const latestData = response.data.sort(
                        (a, b) => new Date(b.inbodyDate) - new Date(a.inbodyDate)
                    )[0];

                    setUserBodyInfo(latestData);
                }
            } catch (error) {
                console.error("프로필 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);*/

    // 수정된 값만 필터링하여 백엔드에 전송
    const inputUserBodyInfo = async (e) => {
        e.preventDefault();
        const weight = Number(userBodyInfo.userWeight);
        const fatMass = Number(userBodyInfo.userFatMass);
        const calculatedBMR = 370 + 21.6 * (weight - fatMass);
        const basalMetabolicRate = Number(calculatedBMR.toFixed(3));

        // 계산된 값을 포함하여 새로운 객체를 생성
        const updatedUserBodyInfo = {
            ...userBodyInfo,
            userBasalMetabolicRate: basalMetabolicRate
        };

        const updatedData = Object.fromEntries(
            Object.entries(updatedUserBodyInfo).filter(([key, value]) => value !== "")
        );
        updatedData.inbodyDate = userBodyInfo.inbodyDate || new Date().toISOString().split("T")[0];

        console.log("업데이트된 데이터:", JSON.stringify(updatedData, null, 2));

        try {
            const response = await ApiClient.post("/user/input-userbodydata", updatedData);
            console.log("데이터 저장 결과:", response.data);
            alert("체성분 정보가 성공적으로 저장되었습니다.");
        } catch (error) {
            console.error("체성분 정보 저장 오류:", error);
            alert("정보 저장에 실패했습니다.");
        }
    };

    // 모든 값이 비어있는지 확인
    const isAllEmpty = Object.values(userBodyInfo).every(value => !value);

    return (
        <div className="flex flex-col h-full justify-center p-4">
            {loading ? <div className='text-center'>로딩중...</div> :
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
                                readOnly // 이름은 수정 불가능하도록 설정
                            />
                        </div>
                        <hr className="border w-full mb-3" />
                    </div>

                    {/* ✅ 나이, 몸무게 등 수정 가능 필드 */}
                    {[
                        { key: "userAge", label: "나이" },
                        { key: "userWeight", label: "몸무게" },
                        { key: "userHeight", label: "키" },
                        { key: "userMuscleMass", label: "근육량" },
                        { key: "userFatMass", label: "체지방량" }
                    ].map(({ key, label }, index) => (
                        <div key={index} className="flex flex-col gap-3">
                            <div className="flex flex-row items-center space-x-2">
                                <label className="text-gray-600 text-xl w-1/4 text-left">{label}</label>
                                <input
                                    type="number"
                                    className="border h-[60px] text-xl rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    placeholder="값을 입력해주세요"
                                    value={userBodyInfo[key] || ""}
                                    onChange={(e) =>
                                        setUserBodyInfo((prev) => ({ ...prev, [key]: e.target.value }))
                                    }
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
                        {isAllEmpty ? "내 정보 저장하기" : "내 정보 수정하기"}
                    </button>
                </form>}
        </div>
    );
};

MyPageUserInfoComponent.propTypes = {
    currentName: PropTypes.string.isRequired,
};

export default MyPageUserInfoComponent;
