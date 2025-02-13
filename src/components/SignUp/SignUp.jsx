import React, { useState } from "react";

const SignUp = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    // 항상 하나가 활성화되어야 하므로 activeInput 상태를 사용 (초기값은 "id")
    const [activeInput, setActiveInput] = useState("id");
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    const handleIdChange = (e) => {
        const newId = e.target.value;
        setId(newId);
        // 예시: 아이디 길이가 4글자 이상이면 사용 가능하다고 가정
        if (newId.length >= 4) {
            setIsIdAvailable(true);
        } else {
            setIsIdAvailable(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <section className="w-full h-full max-w-md rounded-lg p-8 flex flex-col left-1/2 justify-center">
                <header>
                    <h1 className="text-7xl font-bold text-center mb-24 text-white">
                        SIGN UP
                    </h1>
                </header>
                <form>
                    <div className="relative mb-4">
                        <label htmlFor="id" className="sr-only">
                            ID
                        </label>
                        <input
                            type="text"
                            id="id"
                            placeholder="ID"
                            className={`w-full px-4 ${activeInput === "id" ? "py-4 opacity-100" : "py-1 opacity-50"
                                } mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover transition-all duration-200`}
                            value={id}
                            onChange={handleIdChange}
                            onFocus={() => setActiveInput("id")}
                        />
                        {isIdAvailable && (
                            <span className="text-xs text-white block text-right">
                                사용이 가능한 아이디 입니다.
                            </span>
                        )}
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="sr-only">
                            PW
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="PW"
                            className={`w-full px-4 ${activeInput === "password" ? "py-4 opacity-100" : "py-1 opacity-50"
                                } border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover transition-all duration-200`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setActiveInput("password")}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-right pr-7 text-white py-4 rounded-md"
                    >
                        NEXT
                    </button>
                </form>
            </section>
        </div>
    );
};

export default SignUp;
