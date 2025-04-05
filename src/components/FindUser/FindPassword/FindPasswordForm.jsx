import React, { useState } from "react";
import PropTypes from "prop-types";
import PhoneAuthFields from "../../Common/PhoneAuthFields";

const FindPasswordForm = ({ onNext }) => {
    const [userId, setUserId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleNext = () => {
        if (!userId.trim() || !phoneNumber.trim()) {
            alert("아이디와 전화번호를 입력해주세요.");
            return;
        }
        onNext(userId);
    };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                    ID
                </label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                    placeholder="아이디를 입력하세요"
                />
            </div>
            <PhoneAuthFields
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                inputTextColor="black"
            />
            <div className="flex justify-end">
                <button
                    type="button"
                    className="w-36 bg-rookieRed text-white py-2 rounded-lg font-semibold text-xl mt-4"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

FindPasswordForm.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default FindPasswordForm;