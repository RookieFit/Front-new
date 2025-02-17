import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FindIdSuccess = ({ userId }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    // 아이디의 마지막 세 글자를 별표로 대체
    const maskedUserId = userId.slice(0, -3) + '***';

    return (
        <div className="w-full max-w-md p-4">
            <h2 className="text-sm font-bold mb-12 text-center">아이디 찾기가 완료되었습니다.</h2>
            <div className="border border-gray-300 rounded-lg p-14 mb-5 flex flex-col items-center justify-center">
                <p className="text-center">
                    회원님의 아이디는 <br /> <span className="font-bold underline">{maskedUserId}</span> 입니다.
                </p>
            </div>
            <div className="mt-4 flex justify-center w-full">
                <div className="flex justify-between w-11/12">
                    <button
                        className="bg-rookieRed text-white px-4 py-2 rounded-md w-1/2 mr-2"
                        onClick={handleLogin}
                    >
                        로그인
                    </button>
                    <button className="bg-white border border-rookieRed text-rookieRed px-4 py-2 rounded-md w-1/2">
                        비밀번호 찾기
                    </button>
                </div>
            </div>
        </div>
    );
};

FindIdSuccess.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default FindIdSuccess;