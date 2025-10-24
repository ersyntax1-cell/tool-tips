import { BrowserRouter } from 'react-router-dom';
import RedirectComponent from '../../components/redirect-component/redirect-component'
import { AuthProvider } from '../../context/auth-provider/auth-provider'

export default function ModalLayout() {

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
