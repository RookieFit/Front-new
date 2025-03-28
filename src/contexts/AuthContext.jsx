import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiClient from "../services/ApiClient";
import { getAccessToken, removeAccessToken } from "../services/Store";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // 초기 로그인 상태 확인
    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = getAccessToken();
            if (token) {
                try {
                    // 토큰이 유효한지 확인하는 API 호출 (선택적)
                    // const response = await ApiClient.get('/auth/validate');
                    // setUser(response.data);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("인증 토큰 검증 실패:", error);
                    removeAccessToken();
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = (token) => {
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await ApiClient.post('/auth/sign-out');
        } catch (error) {
            console.error("로그아웃 API 호출 실패:", error);
        } finally {
            removeAccessToken();
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);