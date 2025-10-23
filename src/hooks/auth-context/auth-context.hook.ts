import { useContext } from "react";
import { AuthContext } from "../../context/auth-provider/auth-provider";


export default function useAuthContext () {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Context is not found.')
    }
    return context;
}