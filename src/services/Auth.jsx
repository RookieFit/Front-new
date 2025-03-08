import axios from "axios";
import { clearAccessToken, setAccessToken } from "./Store";

export const refreshAccessToken = async () => {
    const TEST_API_BASE_URL = import.meta.env.VITE_API_TEST_URL;
    const REQUEST_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
        const response = await axios.post(
            `${TEST_API_BASE_URL}/api/auth/refresh`,
            {},
            { withCredentials: true }
        );
        if (response.status === 200) {
            const accessToken = response.data;
            setAccessToken(accessToken);
            return accessToken;
        }
    } catch (error) {
        console.error('토큰 갱신 실패', error);
        clearAccessToken();
        window.location.href = '/login';
    }
    return null;
};