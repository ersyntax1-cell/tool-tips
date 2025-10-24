import type { LoginForm } from "../../schemas/login/login.schema";
import type { RegisterForm } from "../../schemas/register/register.schema";
import { authApi } from "../api";

export async function onRegister(data: RegisterForm) {
    try {
        const res = await authApi.post("/auth/register", {
            name: data.name,
            email: data.email,
            password: data.password
        });
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Server Error.';
        throw new Error(message);
    }
}

export async function onLogin(data: LoginForm) {
    try {
        const res = await authApi.post("/auth/login", {
            email: data.email,
            password: data.password
        });

        const token = res.data?.token;
        if (token) {
            if (typeof chrome !== "undefined" && chrome.storage?.local) {
                await chrome.storage.local.set({ token });
            } else {
                localStorage.setItem("token", token);
            }
        }

        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Server Error.';
        throw new Error(message);
    }
}

export async function sendOTP(email: string) {
    try {
        const res = await authApi.post("/auth/send-otp", { email });
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Server Error.';
        throw new Error(message);
    }
}

export async function confirmOTP(email: string, otp: string) {
    try {
        const res = await authApi.post("/auth/verify-otp", { email, otp });
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'OTP confirmation failed';
        throw new Error(message);
    }
}
