import { useEffect } from 'react'
import ActionBar from '../../components/action-bar/action-bar'
import GlobalPicker from '../../components/global-picker/global-picker'
import ToolTipOverlay from '../../components/tooltip-overlay/tooltip-overlay'

export default function ModalLayout() {

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
