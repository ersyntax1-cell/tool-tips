import { useEffect } from "react";
import ActionBar from "../action-bar/action-bar";
import GlobalPicker from "../global-picker/global-picker";
import ToolTipOverlay from "../tooltip-overlay/tooltip-overlay";
import useAuthContext from "../../hooks/auth-context/auth-context.hook";
import LoginPage from "../../pages/auth/login/login";
import RegisterPage from "../../pages/auth/register/register";

export default function RedirectComponent() {
  const { mode } = useAuthContext();

  if (mode === 'login') {
    return <LoginPage />
  }

  if (mode === 'register') {
    return <RegisterPage />
  }

  async function fetchDomain() {
    const domain = window.location.hostname;
    const token = localStorage.getItem('token');

    if (!token) return;

    fetch('http://localhost:3000/domain', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ domain })
    })
      .then(res => res.json())
      .catch(console.error);
  }

  useEffect(() => {
    fetchDomain();
  }, []);

  return (
    <>
      <ActionBar />
      <GlobalPicker />
      <ToolTipOverlay />
    </>
  )
}
