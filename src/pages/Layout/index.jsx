import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const Layout = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    };

    return (
        <div className="bg-rookieRed h-screen flex flex-col">
            {/* 헤더 */}
            <header className="flex items-center bg-rookieFitRed text-white p-4 h-16">
                <h2 className="text-3xl font-semibold cursor-pointer" onClick={onClick}>
                    Rookie Fit
                </h2>
            </header>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex flex-grow">
                <SideBar />
                <main className="flex-1 p-2 bg-gray-100 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
