import React from "react";
import PropTypes from "prop-types";

const PhoneAuthFields = ({ phoneNumber, setPhoneNumber, verificationCode, setVerificationCode, inputTextColor }) => {
    return (
        <div>
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover text-${inputTextColor}`}
                    placeholder="전화번호를 입력하세요"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                    Verification Code
                </label>
                <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover text-${inputTextColor}`}
                    placeholder="인증번호를 입력하세요"
                />
            </div>
        </div>
    );
};

PhoneAuthFields.propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    setPhoneNumber: PropTypes.func.isRequired,
    verificationCode: PropTypes.string.isRequired,
    setVerificationCode: PropTypes.func.isRequired,
    inputTextColor: PropTypes.string,
};

export default PhoneAuthFields;