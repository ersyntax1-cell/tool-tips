import React, {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import AuthCheck from "../../auth-check/auth-check";

interface AuthContextProps {
  mode: "login" | "register" | "app";
  toggleMode: () => void;
  setMode: Dispatch<SetStateAction<"login" | "register" | "app">>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"login" | "register" | "app">("app");

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await AuthCheck();
      setMode(isAuth ? "app" : "login");
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setMode("login");
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, []);

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <AuthContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </AuthContext.Provider>
  );
};
