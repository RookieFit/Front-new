import React, { useState } from "react";
import PropTypes from "prop-types";
import PhoneAuthFields from "../../Common/PhoneAuthFields";
import ApiClient from "../../../services/ApiClient";

const FindIdForm = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");

    const handleFindId = async () => {
        try {
            const response = await ApiClient.post(
                `/auth/find-id?userPhoneNumber=${phoneNumber}&verificationCode=${verificationCode}`
            );

            if (response.data && response.data.userId) {
                onNext(response.data.userId);
            } else {
                onNext(null);
            }
        } catch (err) {
            console.error(err);
            onNext(null);
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