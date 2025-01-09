import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="bg-rookieRed">
            <header className="flex items-center bg-rookieFitRed text-white p-4">
                <h2 className="text-3xl font-semibold">Rookie Fit</h2>
                <button
                    onClick={toggleSidebar}
                    className="text-white hover:text-gray-300 mr-4"
                >
                    <span className="material-icons ml-12 text-2xl font-bold">
                        {isCollapsed ? '>>' : '<<'}
                    </span>
                </button>
            </header>

            <div className="flex h-screen">
                <SideBar
                    isCollapsed={isCollapsed}
                    toggleSidebar={toggleSidebar}
                />

                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
