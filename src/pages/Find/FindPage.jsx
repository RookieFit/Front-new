import React, { useState } from "react";
import FindIdForm from "../../components/FindUser/FindId/FindIdForm";
import FindIdSuccess from "../../components/FindUser/FindId/FindIdSuccess";
import FindIdFailure from "../../components/FindUser/FindId/FindIdFailure";

const FindPage = () => {
    const [isSuccess, setIsSuccess] = useState(null);
    const [userId, setUserId] = useState("");

    const handleNext = (foundUserId) => {
        if (foundUserId) {
            setUserId(foundUserId);
            setIsSuccess(true);
        } else {
            setIsSuccess(false);
        }
    };

    return (
        <main className="flex h-screen">
            {/* 왼쪽: 아이디 찾기 결과 */}
            <div className="flex flex-col items-center justify-center w-2/5 bg-white">
                <header>
                    <h1 className="text-7xl font-bold text-center mb-16 text-rookieRed">
                        Find ID
                    </h1>
                </header>
                {isSuccess === null ? (
                    <FindIdForm onNext={handleNext} />
                ) : isSuccess ? (
                    <FindIdSuccess userId={userId} />
                ) : (
                    <FindIdFailure />
                )}
            </div>

            {/* 오른쪽: 배경 */}
            <div className="w-3/5 bg-rookieRed"></div>
        </main>
    );
};

export default FindPage;