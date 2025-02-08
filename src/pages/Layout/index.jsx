import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

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
                <button
                    onClick={toggleSidebar}
                    className="text-white hover:text-gray-300 mr-4"
                >
                    <span className="material-icons ml-12 text-2xl font-bold">
                        {isCollapsed ? ">>" : "<<"}
                    </span>
                </button>
            </header>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex flex-grow">
                <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-2 bg-gray-100 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
