import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* TODO: Tambahkan AdminNavbar nanti */}
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
        © 2026 SkillSwap — Admin Panel
      </footer>
    </div>
  );
};

export default AdminLayout;