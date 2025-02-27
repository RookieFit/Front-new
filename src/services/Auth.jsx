import ApiClient from "./ApiClient";
import { clearAccessToken, setAccessToken } from "./Store";

export const refreshAccessToken = async () => {
    try {
        const response = await ApiClient.post(
            '/auth/refresh',
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