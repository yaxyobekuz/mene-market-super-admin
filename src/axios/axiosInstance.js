import axios from "axios";
const authData = JSON.parse(localStorage.getItem("auth"));

// create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://menemarket-8699a792d090.herokuapp.com/api",
  timeout: 20000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${
      authData ? authData.token : ""
    }`;
    return config;
  },
  (error) => {
    console.log("errorbek", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
