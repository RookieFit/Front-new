import React, { useState } from "react";
import ApiClient from "../../services/ApiClient";
import { useNavigate, Link } from "react-router-dom";
import { setAccessToken } from "../../services/Store";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestBody = {
            userId: id,
            userPassword: password
        };
        try {
            const response = await ApiClient.post(
                '/auth/sign-in',
                requestBody,
                { withCredentials: true }
            );
            const accessToken = response.data;
            setAccessToken(accessToken);
            login(accessToken); // AuthContext의 login 함수 호출
            navigate('/');
        } catch (error) {
            if (error.response) {
                console.log("서버 응답 오류:", error.response.data);
                console.error("응답 상태 코드:", error.response.status);
                alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
            } else if (error.request) {
                console.error("서버로부터 응답을 받지 못했습니다:", error.request);
                alert("서버 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
            } else {
                console.error("요청 설정 오류:", error.message);
                alert("로그인 중 오류가 발생했습니다.");
            }
        };
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
                    <Link to="/findid" className="hover:underline">
                        아이디찾기
                    </Link>
                    <span className="mx-2">|</span>
                    <Link to="/findpassword" className="hover:underline">
                        비밀번호 찾기
                    </Link>
                </footer>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">아직 계정이 없으신가요?</p>
                    <Link to="/signup" className="text-rookieRed font-medium hover:underline">
                        회원가입하기
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Login;
