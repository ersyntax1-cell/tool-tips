import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export const apiForm = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "multipart/form-data" },
});

export const authApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

function getToken(): string | null {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    console.error("getToken error:", err);
    return null;
  }
}

function addAuthHeader(config: any) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

api.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));
apiForm.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));

const handleUnauthorized = (error: any) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("unauthorized"));
  }

  return Promise.reject(error);
};

api.interceptors.response.use((res) => res, handleUnauthorized);
apiForm.interceptors.response.use((res) => res, handleUnauthorized);