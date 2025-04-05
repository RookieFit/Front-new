import React from "react";
import { useNavigate } from "react-router-dom";
import FindPasswordForm from "../../components/FindUser/FindPassword/FindPasswordForm";

const FindPasswordPage = () => {
    const navigate = useNavigate();

    const handleNext = (userId) => {
        navigate("/reset-password", { state: { userId } });
    };

    return (
        <main className="flex h-screen">
            {/* 왼쪽: 비밀번호 찾기 */}
            <div className="flex flex-col items-center justify-center w-2/5 bg-white">
                <header>
                    <h1 className="text-7xl font-bold text-center mb-16 text-rookieRed">
                        Find Password
                    </h1>
                </header>
                <div className="w-full max-w-md p-6 rounded-lg border border-gray-500">
                    <FindPasswordForm onNext={handleNext} />
                </div>
            </div>

            {/* 오른쪽: 배경 */}
            <div className="w-3/5 bg-rookieRed"></div>
        </main>
    );
};

export default FindPasswordPage;