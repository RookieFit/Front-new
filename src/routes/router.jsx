import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Workout from "../components/Workout/Workout";
import MyPage from "../pages/MyPage/MyPage";
import MainPage from "../pages/Main/MainPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "/mypage",
                element: <MyPage />,
            },
            {
                path: "/workout",
                element: <Workout />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

export default router;
