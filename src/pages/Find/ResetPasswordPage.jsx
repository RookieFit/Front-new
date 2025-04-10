import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResetPasswordForm from "../../components/FindUser/FindPassword/ResetPasswordForm";
import ApiClient from "../../services/ApiClient";

const ResetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId;

    const handleResetPassword = async (newPassword) => {
        try {
            const response = await ApiClient.post("/auth/reset-password", {
                userId,
                newPassword,
            });
            if (response.status === 200) {
                alert("비밀번호가 성공적으로 변경되었습니다.");
                navigate("/login");
            }
        } catch (error) {
            console.error("비밀번호 재설정 실패:", error);
            alert("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <main className="flex h-screen">
            {/* 왼쪽: 비밀번호 재설정 */}
            <div className="flex flex-col items-center justify-center w-2/5 bg-white">
                <header>
                    <h1 className="text-7xl font-bold text-center mb-4 text-rookieRed">
                        New Password
                    </h1>
                    <p className="text-sm text-gray-500 text-center mb-8">
                        영문, 숫자를  포함하여<br />8자 이상 20자 이내로 새 비밀번호를 설정해 주세요
                    </p>
                </header>
                <div className="w-full max-w-md p-6 rounded-lg border border-gray-500">
                    <ResetPasswordForm userId={userId} onReset={handleResetPassword} />
                </div>
            </div>

            {/* 오른쪽: 배경 */}
            <div className="w-3/5 bg-rookieRed"></div>
        </main>
    );
};

export default ResetPasswordPage;