import Login from "../../components/Login/Login";

const LoginPage = () => {
    return (
        <main className="flex h-screen">
            {/* 왼쪽: 로그인 폼 */}
            <div className="flex items-center justify-center w-2/5 bg-white">
                <Login />
            </div>

            {/* 오른쪽: 배경 */}
            <div className="w-3/5 bg-rookieRed">
            </div>
        </main>
    );
};

export default LoginPage;