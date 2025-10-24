import { Dialog } from "@mui/material";
import useAuthContext from "../hooks/auth-context/auth-context.hook";
import LoginPage from "../pages/auth/login/login";
import RegisterPage from "../pages/auth/register/register";

export default function AuthComponents() {
  const { mode } = useAuthContext();

  if (mode === 'login') {
    return (
      <Dialog
        open
        fullWidth
        maxWidth="sm"
        disablePortal
        sx={{ bgcolor: 'transparent' }}
      >
        <LoginPage />
      </Dialog>
    );
  }

  if (mode === 'register') {
    return (
      <Dialog
        open
        fullWidth
        maxWidth="sm"
        disablePortal
        sx={{ bgcolor: 'transparent' }}
      >
        <RegisterPage />
      </Dialog>
    );
  }

  return null;
}
