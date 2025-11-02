import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../services/ApiClient";

// eslint-disable-next-line react/prop-types
const PhoneAuth = ({ userId, userPassword }) => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    const handleSignUp = async () => {
        if (!phoneNumber.trim()) {
            alert("전화번호를 입력해주세요.");
            return;
        }

        if (!verificationCode.trim()) {
            alert("인증번호를 입력해주세요.");
            return;
        }

        try {
            const response = await ApiClient.post("/auth/signup", {
                userId: userId,
                userPassword: userPassword,
                userPhoneNumber: phoneNumber
            });

            if (response.status === 200 || response.status === 201) {
                alert("회원가입이 완료되었습니다!");
                navigate("/");
            }
        } catch (error) {
            console.error("회원가입 실패:", error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-full h-full max-w-md rounded-lg p-2 flex flex-col left-1/2 justify-center space-y-4">
                <div className="border border-gray-300 rounded-lg p-5 py-7">
                    <p className="text-white text-2xl mb-5">전화번호 입력</p>
                    
                    <div className="relative flex items-center mb-4">
                        <input
                            type="text"
                            placeholder="전화번호 (예: 010-1234-5678)"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="flex-grow border-b text-white border-gray-300 py-2 px-4 focus:outline-none bg-transparent"
                        />
                    </div>

                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="인증번호"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="flex-grow border-b text-white border-gray-300 py-2 px-4 focus:outline-none bg-transparent"
                        />
                    </div>
                </div>
                
                <button
                    type="button"
                    className="w-full bg-white text-rookieRed py-3 rounded-lg font-semibold text-xl"
                    onClick={handleSignUp}
                >
                    회원가입 완료
                </button>
            </div>
        </div>
    );
};

export default PhoneAuth;