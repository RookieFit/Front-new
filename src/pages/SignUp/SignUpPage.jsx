import SignUp from "../../components/SignUp/SignUp";

const SignUpPage = () => {
    return (
        <main className="flex h-screen">
            {/* 왼쪽: 로그인 폼 */}
            <div className="flex items-center justify-center w-3/5 bg-white">
            </div>

            {/* 오른쪽: 배경 */}
            <div className="w-2/5 bg-rookieRed">
                <SignUp />
            </div>
        </main>
    );
};

export default SignUpPage;