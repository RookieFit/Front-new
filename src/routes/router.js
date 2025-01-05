import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <div>내용이 들어가야 합니다요</div>,
            },
        ]
    }
]);
export default router;
