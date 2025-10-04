import type { LoginForm } from "../../schemas/login/login.schema";
import type { RegisterForm } from "../../schemas/register/register.schema";
import { api } from "../api";

export async function onRegister(data: RegisterForm) {
    try {
        const res = await api.post("/auth/register", {
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
        const res = await api.post("/auth/login", {
            email: data.email,
            password: data.password
        });
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Server Error.';
        throw new Error(message);
    }
}

export async function sendOTP(email: string) {
    try {
        const res = await api.post("/auth/send-otp", { email });
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Server Error.';
        throw new Error(message);
    }
}

export async function confirmOTP(email: string, otp: string) {
    try {
        const res = await api.post("/auth/verify-otp", { email, otp });
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'OTP confirmation failed';
        throw new Error(message);
    }
}
