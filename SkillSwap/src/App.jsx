import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/User/LandingPage';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import ForgotPassword from './pages/User/ForgotPassword';
import ResetPassword from './pages/User/ResetPassword';
// Halaman user setelah login
import Beranda from './pages/User/Beranda';
import Tentang from './pages/User/Tentang';
import Temukan from './pages/User/Temukan';
import Notifikasi from './pages/User/Notifikasi';
import Profil from './pages/User/Profil';
import Chat from './pages/User/Chat';
import Pengaturan from './pages/User/Pengaturan';
import Laporan from './pages/User/Laporan';
import Partners from './pages/User/Partners';
import Sessions from './pages/User/Sessions';
import RatingSaya from './pages/User/RatingSaya';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* User routes */}
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/temukan" element={<Temukan/>} />
        <Route path="/notifikasi" element={<Notifikasi />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/profil/:userId" element={<Profil />} />
        <Route path="/pengaturan" element={<Pengaturan/>}/>
        <Route path="/laporan/:userId" element={<Laporan/>}/>
        <Route path="/partners" element={<Partners />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/rating-saya" element={<RatingSaya />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;