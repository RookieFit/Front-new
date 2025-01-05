import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const Layout = () => {
    return (
        <div className="flex h-screen">
            <nav className="w-64 h-full bg-gray-800 text-white p-4">
                <SideBar />
            </nav>

            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
