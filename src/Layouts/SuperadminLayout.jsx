// src/layouts/SuperadminLayout.jsx
import { Outlet } from 'react-router-dom';

const SuperadminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Superadmin sudah memiliki Sidebar di dalam halamannya (DashboardSuperadmin.jsx) */}
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
        © 2026 SkillSwap — Superadmin Panel. All Rights Reserved.
      </footer>
    </div>
  );
};

export default SuperadminLayout;