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
        onReset(newPassword);
    };

    return (
        <div className="w-full max-w-md p-4">
            <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                    placeholder="새 비밀번호를 입력하세요"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                    placeholder="비밀번호를 다시 입력하세요"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="w-36 bg-rookieRed text-white py-2 rounded-lg font-semibold text-xl mt-4"
                    onClick={handleReset}
                >
                    Reset
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