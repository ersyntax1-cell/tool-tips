import type { LoginForm } from "../../schemas/login/login.schema";
import type { RegisterForm } from "../../schemas/register/register.schema";
import { api } from "../api";
import { handleRequest } from "../utils/handle-request.api";
export function onRegister(data: RegisterForm) {
    return handleRequest(api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password
    }));
}

export function onLogin(data: LoginForm) {
    return handleRequest(api.post("/auth/login", data));
}

export function sendOTP(email: string) {
    return handleRequest(api.post("/auth/send-otp", { email }));
}

export function confirmOTP(email: string, otp: string) {
    return handleRequest(api.post("/auth/verify-otp", { email, otp }));
}
