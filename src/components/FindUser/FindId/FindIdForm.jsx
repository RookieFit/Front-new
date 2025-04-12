import React, { useState } from "react";
import PropTypes from "prop-types";
import PhoneAuthFields from "../../Common/PhoneAuthFields";
import ApiClient from "../../../services/ApiClient";

const FindIdForm = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");

    const handleFindId = async () => {
        if (!phoneNumber.trim() || !verificationCode.trim()) {
            setError("전화번호와 인증번호를 입력해주세요.");
            return;
        }

        try {
            // 인증번호 검증 없이 API 요청
            const response = await ApiClient.post(
                `/api/auth/find-id?userPhoneNumber=${phoneNumber}&verificationCode=${verificationCode}`
            );

            if (response.data && response.data.userId) {
                onNext(response.data.userId); // 성공 시 userId를 전달
            } else {
                setError("아이디를 찾을 수 없습니다.");
            }
        } catch (err) {
            console.error("아이디 찾기 실패:", err);
            setError("아이디 찾기에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="w-full max-w-md p-4">
            <PhoneAuthFields
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                inputTextColor="black"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex justify-end">
                <button
                    type="button"
                    className="w-36 bg-rookieRed text-white py-2 rounded-lg font-semibold text-xl mt-4"
                    onClick={handleFindId}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

FindIdForm.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default FindIdForm;