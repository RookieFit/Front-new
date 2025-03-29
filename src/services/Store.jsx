let accessToken;

export const setAccessToken = (token) => {
    sessionStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
};

export const clearAccessToken = () => {
    sessionStorage.removeItem('accessToken');
};

export const removeAccessToken = () => {
    sessionStorage.removeItem('accessToken');
};