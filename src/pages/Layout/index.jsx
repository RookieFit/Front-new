import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const Layout = () => {
    return (
        <div className="bg-rookieRed">
            <h2 className="text-3xl font-semibold w-full text-white pl-5 pt-2 pb-3">Rookie Fit</h2>
            <div className="flex h-screen">
                <nav className="w-64 h-full bg-rookieRed text-white p-4">
                    <SideBar />
                </nav>

                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
