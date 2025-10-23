export default function AuthCheck () {
    const token = localStorage.getItem('token');
    if (!token) return false;

    return true;
}