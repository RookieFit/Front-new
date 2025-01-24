import React from "react";

const Login = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <section className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                <header>
                    <h1 className="text-5xl font-bold text-center mb-6 text-rookieRed">LOGIN</h1>
                </header>
                <form className="space-y-4">
                    {/* ID 입력 */}
                    <div className="relative">
                        <label htmlFor="id" className="sr-only">
                            ID
                        </label>
                        <input
                            type="text"
                            id="id"
                            placeholder="ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">
                            PW
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="PW"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rookieHover"
                        />
                    </div>
                    {/* 로그인 버튼 */}
                    <button
                        type="submit"
                        className="w-full bg-rookieRed text-white py-2 rounded-md hover:bg-rookieHover"
                    >
                        로그인
                    </button>
                </form>
                {/* 아이디 찾기 | 비밀번호 찾기 */}
                <footer className="text-right mt-4 text-sm font-extralight text-rookieRed">
                    <a href="#" className="hover:underline">
                        아이디찾기
                    </a>
                    <span className="mx-2">|</span>
                    <a href="#" className="hover:underline">
                        비밀번호찾기
                    </a>
                </footer>
            </section>
        </main>
    );
};

export default Login;
