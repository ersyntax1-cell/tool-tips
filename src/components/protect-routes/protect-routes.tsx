import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoutes() {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to='/auth/login' />
    }

    return <Outlet />
}
