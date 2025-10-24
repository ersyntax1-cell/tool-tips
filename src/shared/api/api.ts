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

async function getToken(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get("token", (result) => {
      resolve(result.token || null);
    });
  });
}

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiForm.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleUnauthorized = (error: any) => {
  if (error.response?.status === 401) {
    chrome.storage.local.remove("token", () => {
      window.dispatchEvent(new Event("unauthorized"));
    });
  }
  return Promise.reject(error);
};

api.interceptors.response.use((res) => res, handleUnauthorized);
apiForm.interceptors.response.use((res) => res, handleUnauthorized);