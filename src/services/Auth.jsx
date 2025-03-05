import axios from "axios";
import { clearAccessToken, setAccessToken } from "./Store";

export const refreshAccessToken = async () => {
    const testUrl = 'http://localhost:8080';
    const requestUrl = 'http://pipakmjhomeserver.ddns.net';
    try {
        const response = await axios.post(
            `${testUrl}/api/auth/refresh`,
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