import axios from "axios";

const testUrl = 'http://localhost:4040';
const requestUrl = 'http://pipakmjhomeserver.ddns.net';

const ApiClient = axios.create({
    baseURL: `${requestUrl}/api/v1`,
    headers: {
        "Content-Type": "application/json"
    }
});

// 요청 인터셉터 요청에 token을 추가
ApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
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
    (error) => {
        // 403 Forbidden 처리
        if (error.response && error.response.status === 403) {
            // 여기에서 로그인 페이지로 리다이렉트하거나 알림을 띄울 수 있습니다.
            localStorage.removeItem('token');
            alert('권한이 없습니다. 다시 로그인 해주세요.');
            window.location.href = '/login';  // 로그인 페이지로 리다이렉트
        }

        /*// 다른 상태 코드 처리
        if (error.response && error.response.status === 401) {
            // 401 Unauthorized 처리 (필요시 로그인 페이지로 리다이렉트 등)
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            window.location.href = '/login';
        }

        // 그 외 오류 처리
        return Promise.reject(error);*/
    }
);

export default ApiClient;