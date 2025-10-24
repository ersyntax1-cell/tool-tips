import { useEffect } from "react";
import ActionBar from "../action-bar/action-bar";
import GlobalPicker from "../global-picker/global-picker";
import ToolTipOverlay from "../tooltip-overlay/tooltip-overlay";
import useAuthContext from "../../hooks/auth-context/auth-context.hook";
import AuthComponents from "../../auth-components/auth-components";

export default function RedirectComponent() {
  const { mode } = useAuthContext();

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
    if (mode !== 'app') return;
    fetchDomain();
  }, [mode]);

  return mode === 'app' ? (
    <>
      <ActionBar />
      <GlobalPicker />
      <ToolTipOverlay />
    </>
  ) : (
    <AuthComponents />
  );
}
