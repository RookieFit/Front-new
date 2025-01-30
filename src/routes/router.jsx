import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Workout from "../components/Workout/Workout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <div>내용이 들어가야 합니다요</div>,
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
