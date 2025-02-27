let accessToken;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
    accessToken = "";
};