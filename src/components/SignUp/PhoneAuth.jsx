import React from "react";
import PhoneAuthFields from "../Common/PhoneAuthFields";

// eslint-disable-next-line react/prop-types
const PhoneAuth = ({ onComplete }) => {
    const handleSendAuthCode = (phone) => {
        console.log(`인증번호가 ${phone}로 전송되었습니다.`);
    };

    const handleVerifyAuthCode = (authCode) => {
        console.log(`인증번호 ${authCode}가 확인되었습니다.`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-full h-full max-w-md rounded-lg p-2 flex flex-col left-1/2 justify-center space-y-4 ">
                <PhoneAuthFields
                    onSendAuthCode={handleSendAuthCode}
                    onVerifyAuthCode={handleVerifyAuthCode}
                    inputTextColor="white"
                />
                {/* 회원가입 완료 버튼 */}
                <button
                    type="button"
                    className="w-full bg-white text-rookieRed py-3 rounded-lg font-semibold text-xl"
                    onClick={onComplete}
                >
                    회원가입 완료
                </button>
            </div>
        </div>
    );
};

export default PhoneAuth;