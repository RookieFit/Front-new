import React, { useState } from "react";
import SignUp from "../../components/SignUp/SignUp";
import PhoneAuth from "../../components/SignUp/PhoneAuth";

const SignUpPage = () => {
    const [view, setView] = useState("signup"); // "signup" 또는 "phoneAuth"

    return (
        <main className="flex h-screen">
            {/* 왼쪽: 로그인 폼 */}
            <div className="flex items-center justify-center w-3/5 bg-white">
                {/* 로그인 폼 내용 */}
            </div>

            {/* 오른쪽: 배경 */}
            <div className="w-2/5 bg-rookieRed">
                {view === "signup" ? (
                    <SignUp onPhoneAuth={() => setView("phoneAuth")} />
                ) : (
                    <PhoneAuth onComplete={() => {
                        // 회원가입 완료 후 처리
                    }} />
                )}
            </div>
        </main>
    );
};

export default SignUpPage;
