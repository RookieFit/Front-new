/* eslint-disable react/prop-types */
import React, { useState } from "react";

const SignUp = ({ onPhoneAuth }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [activeField, setActiveField] = useState("id");

    // 조건은 나중에 추가
    const handleIdChange = (e) => {
        const newId = e.target.value;
        setId(newId);
        setIsIdAvailable(newId.length >= 4);
    };

    // 조건은 나중에 추가
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsPasswordValid(newPassword.length >= 6);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <section className="w-full h-full max-w-md rounded-lg p-8 flex flex-col left-1/2 justify-center space-y-4">
                <header>
                    <h1 className="text-7xl font-bold text-center mb-24 text-white">
                        SIGN UP
                    </h1>
                </header>
                <form className="space-y-4">
                    {/* ID 입력 필드 */}
                    <div className="relative">
                        <input
                            type="text"
                            id="id"
                            placeholder="ID"
                            value={id}
                            onChange={handleIdChange}
                            onFocus={() => setActiveField("id")}
                            className={`w-full px-4 transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover ${activeField === "id" ? "py-4 opacity-100" : "py-2 opacity-50"
                                }`}
                        />
                        {activeField === "id" && isIdAvailable && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setActiveField("password")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black text-xs px-3 py-2 rounded"
                                >
                                    NEXT
                                </button>
                                <p className="absolute -bottom-7 right-0 text-l text-white">
                                    사용가능한 아이디 입니다.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Password 입력 필드 (ID NEXT 버튼을 눌러야 visible) */}
                    <div className={`relative ${activeField === "password" || activeField === "confirmPassword" ? "visible" : "invisible"}`}>
                        <input
                            type="password"
                            id="password"
                            placeholder="PW"
                            value={password}
                            onChange={handlePasswordChange}
                            onFocus={() => setActiveField("password")}
                            className={`w-full px-4 transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover ${activeField === "password" ? "py-4 opacity-100" : "py-2 opacity-50"
                                }`}
                        />
                        {activeField === "password" && isPasswordValid && (
                            <button
                                type="button"
                                onClick={() => setActiveField("confirmPassword")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black text-xs px-3 py-2 rounded"
                            >
                                NEXT
                            </button>
                        )}
                    </div>

                    {/* Confirm Password 입력 필드 (PW NEXT 버튼을 눌러야 visible) */}
                    <div className={`relative ${activeField === "confirmPassword" ? "visible" : "invisible"}`}>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm PW"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setActiveField("confirmPassword")}
                            className={`w-full px-4 transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover ${activeField === "confirmPassword" ? "py-4 opacity-100" : "py-2 opacity-50"
                                }`}
                        />
                        {activeField === "confirmPassword" &&
                            confirmPassword === password &&
                            password !== "" && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onPhoneAuth) {
                                            onPhoneAuth();
                                        } else {
                                            setActiveField("phoneAuth");
                                        }
                                    }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black text-xs px-3 py-2 rounded"
                                >
                                    NEXT
                                </button>
                            )}
                    </div>
                </form>
            </section>
        </div>
    );
};

export default SignUp;
