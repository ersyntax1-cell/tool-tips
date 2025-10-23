import { useEffect } from "react";
import AuthCheck from "../../auth-check/auth-check";
import ActionBar from "../action-bar/action-bar";
import GlobalPicker from "../global-picker/global-picker";
import ToolTipOverlay from "../tooltip-overlay/tooltip-overlay";

export default function RedirectComponent() {

  if (!AuthCheck) {
    // navigate to /login
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
