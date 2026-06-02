// src/layouts/UserLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatButton from '../components/FloatingChatButton';

const UserLayout = () => {
  const location = useLocation();
  // Periksa apakah di halaman chat (path dimulai dengan /chat)
  const isChatPage = location.pathname.startsWith('/chat');
  
  // Jika halaman chat, render tanpa navbar & footer yang mengganggu
  if (isChatPage) {
    return (
      <div className="h-screen flex flex-col" style={{ fontFamily: "Poppins" }}>
        <Navbar />
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Poppins" }}>
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <FloatingChatButton />
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
        © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default UserLayout;