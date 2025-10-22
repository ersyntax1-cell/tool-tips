import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.AUTH_URL,
    headers: { "Content-Type": "application/json" },
});

export const apiForm = axios.create({
  baseURL: import.meta.env.AUTH_URL,
  headers: {
    "Content-Type": "multipart/form-data"
  },
});

export const authApi = axios.create({
  baseURL: import.meta.env.AUTH_URL,
  headers: { "Content-Type": "application/json" },
});

const addAuthHeader = (config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiForm.interceptors.response.use(addAuthHeader, (error) => Promise.reject(error));
// api.interceptors.response.use(addAuthHeader, (error) => Promise.reject(error));