import axios from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "./Store";
import { refreshAccessToken } from "./Auth";

const testUrl = 'http://localhost:8080';
const requestUrl = 'http://pipakmjhomeserver.ddns.net';

const ApiClient = axios.create({
    baseURL: `${testUrl}/api`,
    headers: {
        "Content-Type": "application/json"
    }
});

// 요청 인터셉터 요청에 token을 추가
ApiClient.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 모든 응답에 대해 실행
ApiClient.interceptors.response.use(
    (response) => {
        // 정상 응답 처리
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 403) {
            clearAccessToken();
            alert('권한이 없습니다. 다시 로그인 해주세요.');
            window.location.href = '/login';  // 로그인 페이지로 리다이렉트
        }

        if (error.response && error.response.status === 401) {
            console.warn("엑세스 토큰 만료, 새 토큰 요청 시도...");

            // 새 엑세스 토큰 요청
            try {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    setAccessToken(newToken);

                    // 기존 요청을 새 토큰으로 재시도
                    const newRequestConfig = { ...error.config }; // 기존 config 복사
                    newRequestConfig.headers.Authorization = `Bearer ${newToken}`;
                    return axios(newRequestConfig); // 새 토큰을 사용해 재요청
                }
            } catch (refreshError) {
                clearAccessToken();
                console.error("토큰 갱신 실패:", refreshError);
            }

            // 토큰 갱신에 실패한 경우 로그인 페이지로 리다이렉트
            window.location.href = '/login';
            return Promise.reject(error); // 실패한 요청 반환
        }
        return Promise.reject(error); // 다른 오류 반환
    }
);

export default ApiClient;