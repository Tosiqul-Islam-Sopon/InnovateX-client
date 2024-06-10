import axios from "axios";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";

const axiosBase = axios.create({
    baseURL: 'https://innovate-x-server.vercel.app',
    // baseURL: 'http://localhost:5000',
})

const useAxiosBase = () => {
    // const navigate = useNavigate();
    // const { logOut } = useContext(AuthContext);
    axiosBase.interceptors.request.use(function (config) {
        const token = localStorage.getItem("accessToken");
        // console.log("interceptors", token);
        config.headers.authorization = token
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosBase.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            // await logOut();
            // navigate("/login");
        }
        return Promise.reject(error);
    })

    return axiosBase;
};

export default useAxiosBase;