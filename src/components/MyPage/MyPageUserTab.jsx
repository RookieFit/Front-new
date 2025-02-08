import React, { useState } from "react";
import MyPageUserInfoComponent from "./MyPageUserInfoComponent";
import PropTypes from "prop-types";

const MyPageUserTab = ({ currentName }) => {
    const [activeTab, setActiveTab] = useState("info");

    return (
        <div className="flex flex-col h-full justify-center items-center bg-gray-100">
            {/* 탭 버튼 */}
            <div className="flex w-full space-x-2">
                {["info", "etc1", "etc2"].map((tab, idx) => (
                    <button
                        key={idx}
                        className={`flex-1 py-2 text-2xl text-center border transition-all duration-300 rounded-t-lg ${activeTab === tab
                            ? "bg-white text-black border-b-0" // 선택된 탭 - 아래쪽 Border 제거
                            : "bg-gray-200 text-black hover:bg-gray-300 border-b"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "info" ? "내 정보" : tab === "etc1" ? "기타1" : "기타2"}
                    </button>
                ))}
            </div>

            {/* 탭 내용 */}
            <div className="w-full bg-white shadow-md p-4 flex-1 flex flex-col">
                {activeTab === "info" && (
                    <div className="flex-1 flex flex-col">
                        <MyPageUserInfoComponent currentName={currentName} />
                    </div>
                )}
                {activeTab === "etc1" && (
                    <div className="text-gray-700 flex-1">
                        <h1 className="text-lg font-semibold">기타1 내용</h1>
                        <p className="text-sm mt-1">여기에 기타1 관련 내용을 추가하세요.</p>
                    </div>
                )}
                {activeTab === "etc2" && (
                    <div className="text-gray-700 flex-1">
                        <h1 className="text-lg font-semibold">기타2 내용</h1>
                        <p className="text-sm mt-1">여기에 기타2 관련 내용을 추가하세요.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

MyPageUserTab.propTypes = {
    currentName: PropTypes.string.isRequired,
};

export default MyPageUserTab;
