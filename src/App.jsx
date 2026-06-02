// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import SuperadminLayout from './layouts/SuperadminLayout';

// ========== PUBLIC PAGES ==========
import LandingPage from './pages/User/LandingPage';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Tentang from './pages/User/Tentang';
import ForgotPassword from './pages/User/ForgotPassword';
import ResetPassword from './pages/User/ResetPassword';

// ========== USER PAGES ==========
import Beranda from './pages/User/Beranda';
import Chat from './pages/User/Chat';
import Laporan from './pages/User/Laporan';
import Notifikasi from './pages/User/Notifikasi';
import Partners from './pages/User/Partners';
import Pengaturan from './pages/User/Pengaturan';
import Profil from './pages/User/Profil';
import RatingSaya from './pages/User/RatingSaya';
import Sessions from './pages/User/Sessions';
import Temukan from './pages/User/Temukan';

// ========== ADMIN PAGES ==========
import DashboardAdmin from './pages/Admin/DashboardAdmin';
import KelolaPengguna from './pages/Admin/KelolaPengguna';
import KelolaLaporan from './pages/Admin/KelolaLaporan';

// ========== SUPERADMIN PAGES ==========
import DashboardSuperadmin from './pages/Superadmin/DashboardSuperadmin';
import KelolaUserSuperadmin from './pages/Superadmin/KelolaUserSuperadmin';
import KelolaAdminSuperadmin from './pages/Superadmin/KelolaAdminSuperadmin';
import LaporanSuperadmin from './pages/Superadmin/Laporan';
import Statistik from './pages/Superadmin/Statistik';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'superadmin') return <Navigate to="/superadmin/dashboard" replace />;
    return <Navigate to="/beranda" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ========== USER ROUTES ========== */}
        <Route element={<UserLayout />}>
          <Route path="/beranda" element={<ProtectedRoute allowedRoles={['user']}><Beranda /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute allowedRoles={['user']}><Chat /></ProtectedRoute>} />
          <Route path="/chat/:userId" element={<ProtectedRoute allowedRoles={['user']}><Chat /></ProtectedRoute>} />
          <Route path="/laporan/:userId" element={<ProtectedRoute allowedRoles={['user']}><Laporan /></ProtectedRoute>} />
          <Route path="/notifikasi" element={<ProtectedRoute allowedRoles={['user']}><Notifikasi /></ProtectedRoute>} />
          <Route path="/partners" element={<ProtectedRoute allowedRoles={['user']}><Partners /></ProtectedRoute>} />
          <Route path="/pengaturan" element={<ProtectedRoute allowedRoles={['user']}><Pengaturan /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute allowedRoles={['user']}><Profil /></ProtectedRoute>} />
          <Route path="/profil/:userId" element={<ProtectedRoute allowedRoles={['user']}><Profil /></ProtectedRoute>} />
          <Route path="/rating-saya" element={<ProtectedRoute allowedRoles={['user']}><RatingSaya /></ProtectedRoute>} />
          <Route path="/sessions" element={<ProtectedRoute allowedRoles={['user']}><Sessions /></ProtectedRoute>} />
          <Route path="/temukan" element={<ProtectedRoute allowedRoles={['user']}><Temukan /></ProtectedRoute>} />
        </Route>

        {/* ========== ADMIN ROUTES ========== */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><DashboardAdmin /></ProtectedRoute>} />
          <Route path="/admin/kelola-pengguna" element={<ProtectedRoute allowedRoles={['admin']}><KelolaPengguna /></ProtectedRoute>} />
          <Route path="/admin/kelola-laporan" element={<ProtectedRoute allowedRoles={['admin']}><KelolaLaporan /></ProtectedRoute>} />
        </Route>

        {/* ========== SUPERADMIN ROUTES ========== */}
        <Route element={<SuperadminLayout />}>
          <Route path="/superadmin/dashboard" element={<ProtectedRoute allowedRoles={['superadmin']}><DashboardSuperadmin /></ProtectedRoute>} />
          <Route path="/superadmin/kelola-user" element={<ProtectedRoute allowedRoles={['superadmin']}><KelolaUserSuperadmin /></ProtectedRoute>} />
          <Route path="/superadmin/kelola-admin" element={<ProtectedRoute allowedRoles={['superadmin']}><KelolaAdminSuperadmin /></ProtectedRoute>} />
          <Route path="/superadmin/laporan" element={<ProtectedRoute allowedRoles={['superadmin']}><LaporanSuperadmin /></ProtectedRoute>} />
          <Route path="/superadmin/statistik" element={<ProtectedRoute allowedRoles={['superadmin']}><Statistik /></ProtectedRoute>} />
        </Route>

        {/* ========== DEFAULT REDIRECT ========== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;