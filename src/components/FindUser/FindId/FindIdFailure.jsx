import React from "react";

const FindIdFailure = () => {
    return (
        <div className="w-full max-w-md p-4">
            <div className="border border-gray-300 rounded-lg p-10 mb-5 flex flex-col items-center justify-center">
                <p className="text-center">
                    회원님의 명의로 가입된 아이디가 없습니다.
                </p>
            </div>
            <div className="mt-4 flex justify-center w-full">
                <div className="flex justify-between w-11/12">
                    <button className="bg-rookieRed text-white px-4 py-2 rounded-md w-1/2 mr-2">
                        회원가입
                    </button>
                    <button className="bg-white border border-rookieRed text-rookieRed px-4 py-2 rounded-md w-1/2">
                        홈으로 이동
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FindIdFailure;