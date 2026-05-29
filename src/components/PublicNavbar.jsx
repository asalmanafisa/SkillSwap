// src/components/PublicNavbar.jsx
import { Link } from 'react-router-dom';

const PublicNavbar = () => {
  return (
    <nav className="bg-[#fcf5e8] border-b border-[#e5e0d8] sticky top-0 z-50 py-3 px-5 md:px-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-extrabold text-[#234c6a] text-lg">SkillSwap</span>
        </Link>

        {/* Tombol Daftar dan Masuk - sama persis dengan landing page */}
        <div className="hidden md:flex gap-3">
          <Link to="/register">
            <button className="border border-[#234c6a] text-[#234c6a] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#234c6a] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
              Daftar
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-[#234c6a] border border-[#234c6a] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#fcf5e8] hover:text-[#234c6a] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
              Masuk
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg className="w-6 h-6 text-[#234c6a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;