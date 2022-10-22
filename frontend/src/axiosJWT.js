import jwt_decode from "jwt-decode";
import { refreshTokenService } from "./service/userService";
import axios from "axios";

const axiosJWT = (accessToken, refreshToken, setAccessToken, setRefreshToken) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        withCredentials: true
    });

    instance.interceptors.request.use(
        async (config) => {
            if (accessToken) {
                let date = new Date();
                const decodedToken = jwt_decode(accessToken);
                if (decodedToken.exp < date.getTime() / 1000) {
                    const data = await refreshTokenService(refreshToken);
                    setAccessToken(data.accessToken);
                    setRefreshToken(data.refreshToken);
                    config.headers["token"] = "Bearer " + data.accessToken;
                }
            }
            return config;
        }
    )

    instance.interceptors.response.use((response) => {
        const { data } = response;
        return response.data;
    });
    return instance;
};

export default axiosJWT;

