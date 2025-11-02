import React, { useState } from "react";
import SignUp from "../../components/SignUp/SignUp";
import PhoneAuth from "../../components/SignUp/PhoneAuth";

const SignUpPage = () => {
    const [view, setView] = useState("signup");
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return (
        <main className="flex h-screen">
            <div className="flex items-center justify-center w-3/5 bg-white">
            </div>

            <div className="w-2/5 bg-rookieRed">
                {view === "signup" ? (
                    <SignUp onPhoneAuth={(id, password) => {
                        setUserId(id);
                        setUserPassword(password);
                        setView("phoneAuth");
                    }} />
                ) : (
                    <PhoneAuth 
                        userId={userId}
                        userPassword={userPassword}
                    />
                )}
            </div>
        </main>
    );
};

export default SignUpPage;
