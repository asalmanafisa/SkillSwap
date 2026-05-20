import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import KelolaPengguna from "./pages/Admin/KelolaPengguna";
import KelolaLaporan from "./pages/Admin/KelolaLaporan";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/kelola-pengguna" element={<KelolaPengguna />} />
        <Route path="/admin/kelola-laporan" element={<KelolaLaporan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;