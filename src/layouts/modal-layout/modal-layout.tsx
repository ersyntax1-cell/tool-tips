import { BrowserRouter } from 'react-router-dom';
import RedirectComponent from '../../components/redirect-component/redirect-component'
import { AuthProvider } from '../../context/auth-provider/auth-provider'
import { useEffect } from "react";

export default function ModalLayout() {

  async function fetchDomain() {
    const domain = window.location.hostname;
    // const token = localStorage.getItem('token');

    // if (!token) return;

    fetch('http://localhost:3000/domain', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
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
      <BrowserRouter>
        <AuthProvider>
          <RedirectComponent />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
