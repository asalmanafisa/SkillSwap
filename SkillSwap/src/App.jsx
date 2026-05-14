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
        <Route path="/" element={<Navigate to="/superadmin/dashboard" />} />

        {/* Halaman login — bebas diakses */}
        <Route path="/superadmin/login" element={<LoginSuperadmin />} />

        {/* Halaman yang butuh login */}
        <Route path="/superadmin/dashboard" element={<DashboardSuperadmin />} />
        <Route path="/superadmin/kelola-user" element={<KelolaUser />} />
        <Route path="/superadmin/kelola-admin" element={<KelolaAdmin />} />
        <Route path="/superadmin/laporan" element={<Laporan />} />
        <Route path="/superadmin/statistik" element={<Statistik />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;