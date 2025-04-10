import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Workout from "../components/Workout/Workout";
import MyPage from "../pages/MyPage/MyPage";
import MainPage from "../pages/Main/MainPage";
import CommunityPage from "../pages/Community/CommunityPage";
import CommunityEditor from "../components/Community/CommunityEditor";
import SignUpPage from "../pages/SignUp/SignUpPage";
import CommunityDetail from "../components/Community/CommunityDetail";
import FindPage from "../pages/Find/FindPage";
import TodoList from "../components/Todo/TodoList";
import MyCommunityPage from "../pages/Community/MyCommunityPage";
import UpdateCommunityEditor from "../components/Community/UpdateCommunityEditor";
import DietPage from "../pages/Diet/DietPage";
import ResetPasswordPage from "../pages/Find/ResetPasswordPage";
import FindPasswordPage from "../pages/Find/FindPasswordPage";

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
                path: "/community/:id",
                element: <CommunityDetail />,
            },
            {
                path: "/mycommunity",
                element: <MyCommunityPage />,
            },
            {
                path: "/editor",
                element: <CommunityEditor />,
            },
            {
                path: "/updatecommunity/:id",
                element: <UpdateCommunityEditor />,
            },
            {
                path: "/diet",
                element: <DietPage />,
            },
            {
                path: "/todolist",
                element: <TodoList />,
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
    {
        path: "/findid",
        element: <FindPage />,
    },
    {
        path: "/findpassword",
        element: <FindPasswordPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    },
]);

export default router;