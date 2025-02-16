import React from "react";

const FindIdFailure = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">아이디 찾기 실패</h2>
            <p>회원님의 명의로 가입된 아이디가 없습니다.</p>
            <div className="mt-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                    회원가입
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                    홈으로 이동
                </button>
            </div>
        </div>
    );
};

export default FindIdFailure;