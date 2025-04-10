import React, { useState } from "react";
import PropTypes from "prop-types";

const ResetPasswordForm = ({ userId, onReset }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleReset = () => {
        if (!newPassword.trim() || !confirmPassword.trim()) {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (newPassword.length < 8) {
            alert("비밀번호는 최소 8자 이상이어야 합니다.");
            return;
        }
        onReset(newPassword);
    };

    return (
        <div className="w-full max-w-md p-4">
            <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-rookieRed">
                    New Password
                </label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                    placeholder="새 비밀번호를 입력해주세요"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-rookieRed">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                    placeholder="비밀번호를 다시 입력해주세요"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="w-full bg-rookieRed text-white py-2 rounded-lg font-semibold text-m mt-4"
                    onClick={handleReset}
                >
                    새 비밀번호 설정 완료하기
                </button>
            </div>
        </div>
    );
};

ResetPasswordForm.propTypes = {
    userId: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
};

export default ResetPasswordForm;