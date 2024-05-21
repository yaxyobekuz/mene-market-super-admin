import axios from "axios";
const token = JSON.parse(localStorage.getItem("auth")).token;

// create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://menemarket-8699a792d090.herokuapp.com/api",
  timeout: 15000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("errorbek", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
