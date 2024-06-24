import axios from "axios";
import { logOut } from "../redux/AuthSlice";

// Redux store access
let axiosStore;
export const setAxiosStore = (store) => {
  axiosStore = store;
};

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("profile")).accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .get("/auth/refresh", { withCredentials: true })
        .then(({ data }) => {
          localStorage.setItem("profile", JSON.stringify(data));
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          return API(originalRequest);
        })
        .catch(() => {
          axiosStore.dispatch(logOut());
          window.location.reload();
        });
    }

    return Promise.reject(error);
  }
);

export default API;
