import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginSuperadmin from "./pages/Superadmin/LoginSuperadmin";
import DashboardSuperadmin from "./pages/Superadmin/DashboardSuperadmin";
import KelolaUser from "./pages/Superadmin/KelolaUserSuperadmin";
import KelolaAdmin from "./pages/Superadmin/KelolaAdminSuperadmin";
import Laporan from "./pages/Superadmin/Laporan";
import Statistik from "./pages/Superadmin/Statistik";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect "/" ke login */}
        <Route path="/" element={<Navigate to="/superadmin/login" />} />

        {/* Halaman login — bebas diakses */}
        <Route path="/superadmin/login" element={<LoginSuperadmin />} />

        {/* Halaman yang butuh login */}
        <Route path="/superadmin/dashboard" element={
          <ProtectedRoute><DashboardSuperadmin /></ProtectedRoute>
        } />
        <Route path="/superadmin/kelola-user" element={
          <ProtectedRoute><KelolaUser /></ProtectedRoute>
        } />
        <Route path="/superadmin/kelola-admin" element={
          <ProtectedRoute><KelolaAdmin /></ProtectedRoute>
        } />
        <Route path="/superadmin/laporan" element={
          <ProtectedRoute><Laporan /></ProtectedRoute>
        } />
        <Route path="/superadmin/statistik" element={
          <ProtectedRoute><Statistik /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;