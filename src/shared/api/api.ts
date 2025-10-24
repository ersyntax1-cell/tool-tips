import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export const apiForm = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const authApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

async function getToken(): Promise<string | null> {
  try {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const { token } = await chrome.storage.local.get("token");
      if (token) return token;
    }
    return localStorage.getItem("token");
  } catch (err) {
    console.error("getToken error:", err);
    return null;
  }
}

async function addAuthHeader(config: any) {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

api.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));
apiForm.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));