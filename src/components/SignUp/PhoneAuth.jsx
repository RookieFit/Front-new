import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const PhoneAuth = ({ onComplete }) => {
    const [phone, setPhone] = useState("");
    const [authCode, setAuthCode] = useState("");

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-full h-full max-w-md rounded-lg p-2 flex flex-col left-1/2 justify-center space-y-4 ">
                <div className=" border border-gray-300 rounded-lg p-5 py-7">
                    <p className="text-white text-xl mb-8 -mt-2">
                        PhoneNumber
                    </p>

                    {/* 핸드폰 번호 입력 필드 */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="핸드폰 번호"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 px-4 focus:outline-none rounded-md"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md bg-gray-400 text-white text-xs px-2 py-1"
                        >
                            인증번호 전송
                        </button>
                    </div>
                    {/* 인증번호 입력 필드 */}
                    <div className="relative mt-4">
                        <input
                            type="text"
                            placeholder="인증번호 입력"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 px-4 focus:outline-none rounded-md"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md bg-gray-400 text-white text-xs px-2 py-1"
                        >
                            인증번호 확인
                        </button>
                    </div>
                </div>
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
