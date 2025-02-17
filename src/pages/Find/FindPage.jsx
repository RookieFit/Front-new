import React, { useState } from "react";
import FindIdForm from "../../components/FindUser/FindId/FindIdForm";
import FindIdSuccess from "../../components/FindUser/FindId/FindIdSuccess";
import FindIdFailure from "../../components/FindUser/FindId/FindIdFailure";

const FindPage = () => {
    const [isSuccess, setIsSuccess] = useState(null);
    const [userId, setUserId] = useState("");

    const handleSendAuthCode = (phone) => {
        console.log(`인증번호가 ${phone}로 전송되었습니다.`);
    };

    const handleVerifyAuthCode = (authCode) => {
        console.log(`인증번호 ${authCode}가 확인되었습니다.`);
    };

    const handleNext = () => {
        // 예시로 성공/실패를 랜덤하게 설정
        const success = Math.random() > 0.5;
        if (success) {
            setUserId("exampleUserId");
        }
        setIsSuccess(success);
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
                    <FindIdForm
                        onSendAuthCode={handleSendAuthCode}
                        onVerifyAuthCode={handleVerifyAuthCode}
                        onNext={handleNext}
                    />
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