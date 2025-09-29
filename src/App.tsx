import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/main-layout/main-layout';
import Home from './pages/home/home';
import RegisterPage from './pages/auth/register/register';
import LoginPage from './pages/auth/login/login';
import ProtectRoutes from './components/protect-routes/protect-routes';

function App() {

  return (
    <>
      <Routes>
        <Route path='/auth/register' element={<RegisterPage />} />
        <Route path='/auth/login' element={<LoginPage />} />

        <Route element={<ProtectRoutes />}>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
