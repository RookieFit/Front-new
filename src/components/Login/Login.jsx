import React, { useState } from "react";

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Login submitted with ID:", id);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <section className="w-full h-full max-w-md rounded-lg p-8 flex flex-col left-1/2 justify-center">
                <header>
                    <h1 className="text-7xl font-bold text-center mb-24 text-rookieRed">
                        LOGIN
                    </h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="id" className="sr-only">
                            ID
                        </label>
                        <input
                            type="text"
                            id="id"
                            placeholder="ID"
                            className="w-full px-4 py-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            PW
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="PW"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-rookieRed text-white py-4 mt-10 rounded-md hover:bg-rookieHover"
                    >
                        로그인
                    </button>
                </form>
                <footer className="text-right mt-4 text-sm font-light text-rookieRed">
                    <a href="#" className="hover:underline">
                        아이디찾기
                    </a>
                    <span className="mx-2">|</span>
                    <a href="#" className="hover:underline">
                        비밀번호찾기
                    </a>
                </footer>
            </section>
        </div>
    );
};

export default Login;
