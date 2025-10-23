import React, {
  createContext,
  useEffect,
  useState
} from "react";
import AuthCheck from "../../auth-check/auth-check";

interface AuthContextProps {
  mode: 'login' | 'register' | 'app',
  toggleMode: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{
  children: React.ReactNode
}> = ({
  children
}) => {

    const [mode, setMode] = useState<'login' | 'register' | 'app'>('app');

    useEffect(() => {
      const isAuth = AuthCheck();
      setMode(isAuth ? 'app' : 'login');
    }, []);


    const toggleMode = () => {
      setMode((prev) =>
        prev === 'login' ? 'register' : 'login');
    }

    return (
      <AuthContext.Provider value={{
        mode,
        toggleMode
      }}>
        {children}
      </AuthContext.Provider>
    )
  }