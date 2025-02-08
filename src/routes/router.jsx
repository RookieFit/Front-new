import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Workout from "../components/Workout/Workout";
import MainPage from "../pages/Main/MainPage";
import Diet from "../components/Diet/Diet";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <MainPage />,
			},
			{
				path: "/workout",
				element: <Workout />,
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
]);

export default router;
