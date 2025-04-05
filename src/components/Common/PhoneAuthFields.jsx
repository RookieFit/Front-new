import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const PhoneAuthFields = ({ onSendAuthCode, onVerifyAuthCode, inputTextColor = "white" }) => {
    const [phone, setPhone] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [authCodeMessage, setAuthCodeMessage] = useState("");

    const handleSendAuthCode = () => {
        setPhoneMessage("인증번호가 전송되었습니다.");
        onSendAuthCode(phone);
    };

    const handleVerifyAuthCode = () => {
        setAuthCodeMessage("인증번호 확인이 완료되었습니다.");
        onVerifyAuthCode(authCode);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-5 py-7">
            <p className="text-mainText text-2xl mb-5 -mt-5">
                PhoneNumber
            </p>

            {/* 핸드폰 번호 입력 필드 */}
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="핸드폰 번호"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`flex-grow border-b border-gray-300 py-2 px-4 focus:outline-none bg-transparent text-${inputTextColor}`}
                />
                <button
                    type="button"
                    className="ml-2 mt-3 rounded-md bg-gray-400 text-white text-xs px-2 py-2"
                    onClick={handleSendAuthCode}
                >
                    인증번호 전송
                </button>
            </div>
            <p className={`text-blue-500 text-xs mt-1 ml-3 ${phoneMessage ? 'visible' : 'invisible'}`}>
                {phoneMessage}
            </p>

            {/* 인증번호 입력 필드 */}
            <div className="relative mt-4 flex items-center">
                <input
                    type="text"
                    placeholder="인증번호 입력"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    className={`flex-grow border-b border-gray-300 py-2 px-4 focus:outline-none bg-transparent text-${inputTextColor}`}
                />
                <button
                    type="button"
                    className="ml-2 mt-3 rounded-md bg-gray-400 text-white text-xs px-2 py-2"
                    onClick={handleVerifyAuthCode}
                >
                    인증번호 확인
                </button>
            </div>
            <p className={`text-blue-500 text-xs mt-1 ml-3 ${authCodeMessage ? 'visible' : 'invisible'}`}>
                {authCodeMessage}
            </p>
        </div>
    );
};

export default PhoneAuthFields;