// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin sudah memiliki Sidebar di dalam halamannya (DashboardAdmin.jsx) */}
      {/* Tidak perlu tambahan Navbar di sini */}
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
        © 2026 SkillSwap — Admin Panel. All Rights Reserved.
      </footer>
    </div>
  );
};

export default AdminLayout;