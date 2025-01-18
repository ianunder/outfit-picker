import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api'
    
});

axiosInstance.interceptors.request.use(
    (config) => {
        const uname = import.meta.env.VITE_API_UNAME;
        const password = import.meta.env.VITE_API_PASSWORD;
        console.log("AUTHHHHH", {uname,password});
        if(uname && password){
            config.auth = {
                username: uname,
                password: password
            }
        }
        return config;
    },
        (error) => {
            return Promise.reject(error);
    }
);

export default axiosInstance;