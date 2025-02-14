import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Workout from "../components/Workout/Workout";
import MyPage from "../pages/MyPage/MyPage";
import MainPage from "../pages/Main/MainPage";
import Diet from "../components/Diet/Diet";
import CommunityPage from "../pages/Community/CommunityPage";
import CommunityEditor from "../components/Community/CommunityEditor";
import SignUpPage from "../pages/SignUp/SignUpPage";


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
            {
                path: "/community",
                element: <CommunityPage />,
            },
            {
                path: "/editor",
                element: <CommunityEditor />,
            },
            {
                path: "/diet",
                element: <Diet />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
]);

export default router;
