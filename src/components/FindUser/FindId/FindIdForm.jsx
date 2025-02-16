import React from "react";
import PhoneAuthFields from "../../Common/PhoneAuthFields";

// eslint-disable-next-line react/prop-types
const FindIdForm = ({ onSendAuthCode, onVerifyAuthCode, onNext }) => {
    return (
        <div className="w-full max-w-md p-4">
            <PhoneAuthFields
                onSendAuthCode={onSendAuthCode}
                onVerifyAuthCode={onVerifyAuthCode}
                inputTextColor="black"
            />
            <div className="flex justify-end">
                <button
                    type="button"
                    className="w-36 bg-rookieRed text-white py-2 rounded-lg font-semibold text-xl mt-4"
                    onClick={onNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FindIdForm;