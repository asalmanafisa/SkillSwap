// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  
  // State untuk badge notifikasi
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({ name: 'User' });
    }
  }, []);

  // Fungsi untuk load jumlah notifikasi belum dibaca
  const loadUnreadCount = () => {
    const stored = localStorage.getItem('allNotifications');
    if (stored) {
      const notifications = JSON.parse(stored);
      const unread = notifications.filter(n => !n.read).length;
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    loadUnreadCount();
    
    // Event listener untuk update saat storage berubah (dari tab lain)
    window.addEventListener('storage', loadUnreadCount);
    
    // Event listener custom untuk update dari halaman Notifikasi
    window.addEventListener('notifications-updated', loadUnreadCount);
    
    return () => {
      window.removeEventListener('storage', loadUnreadCount);
      window.removeEventListener('notifications-updated', loadUnreadCount);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate('/');
    setShowLogoutModal(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="bg-[#fcf5e8] border-b border-[#e5e0d8] sticky top-0 z-50 py-3 px-5 md:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/beranda" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-extrabold text-[#234c6a] text-lg">SkillSwap</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white border border-[#e5e0d8] rounded-full px-4 py-1.5 w-96 shadow-sm focus-within:border-[#234c6a] focus-within:ring-1 focus-within:ring-[#234c6a]">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari partner atau keahlian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          {/* Menu dan Ikon */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <Link to="/beranda" className="hover:text-[#234c6a] transition">Beranda</Link>
              <Link to="/temukan" className="hover:text-[#234c6a] transition">Temukan</Link>
            </div>
            
            {/* Ikon Notifikasi */}
            <Link to="/notifikasi" className="text-gray-600 hover:text-[#234c6a] transition relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>

            {/* Profil User dengan Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 border border-[#e5e0d8] hover:border-[#234c6a] transition"
              >
                <div className="w-6 h-6 rounded-full bg-[#234c6a] text-white flex items-center justify-center text-xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user?.name || 'User'}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#e5e0d8] z-20 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#e5e0d8]">
                    <p className="text-xs text-gray-500">Masuk sebagai</p>
                    <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
                  </div>
                  <Link
                    to="/profil"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Tampilan Profil
                  </Link>
                  <Link
                    to="/pengaturan"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Pengaturan
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar - MOBILE */}
        <div className="md:hidden mt-3">
          <div className="flex items-center bg-white border border-[#e5e0d8] rounded-full px-4 py-1.5 shadow-sm">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari partner atau keahlian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      </nav>

      {/* Modal Konfirmasi Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLogoutModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Konfirmasi Keluar</h3>
              <button onClick={() => setShowLogoutModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700">Apakah Anda yakin ingin keluar?</p>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-sm">Tidak</button>
              <button onClick={handleLogoutConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm">Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;