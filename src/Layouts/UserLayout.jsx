import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatButton from '../components/FloatingChatButton';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
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