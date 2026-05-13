// src/pages/User/Temukan.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar'; // pastikan Navbar sudah benar
import FloatingChatButton from '../../components/FloatingChatButton';

const Temukan = () => {
  const [search, setSearch] = useState('');

  // Data dummy user (id harus sama dengan di Profil.jsx)
  const users = [
    { id: 1, name: 'Farah Naylul Fauzia', role: 'Desainer', location: 'Surabaya' },
    { id: 2, name: 'Yasmine Shavira Ahmad', role: 'Programmer', location: 'Malang' },
    { id: 3, name: 'Sekar Suryawati', role: 'Digital Marketing', location: 'Jakarta' },
    { id: 4, name: 'Talitha Nala Orisulida', role: 'Dokter', location: 'Bandung' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fcf5e8; }
        .temukan-root { width:100%; min-height:100vh; background:#fcf5e8; }

        /* Navbar CSS (opsional jika sudah pakai komponen Navbar, bisa dihapus) */
        .navbar-custom {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 40px; background: white; border-bottom: 1px solid #e5e0d8;
          position: sticky; top:0; z-index:100;
        }
        .logo { display: flex; align-items: center; gap:8px; font-weight:800; color:#234c6a; font-size:18px; text-decoration:none; }
        .logo-icon { width:32px; height:32px; background:#234c6a; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; }
        .nav-links { display: flex; gap: 32px; }
        .nav-link { text-decoration: none; font-size:14px; font-weight:500; color:#4b5563; padding-bottom:4px; }
        .nav-link.active { color:#234c6a; border-bottom:2px solid #234c6a; }
        .user-info { display: flex; align-items: center; gap:12px; }
        .avatar { width:32px; height:32px; background:#f5c842; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:black; }

        .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        .page-title { font-family: 'Fraunces', serif; font-size: 32px; margin-bottom: 8px; }
        .page-subtitle { color: #6b7280; margin-bottom: 32px; }
        .search-box { margin-bottom: 32px; }
        .search-input { width: 100%; max-width: 400px; padding: 12px 20px; border: 1px solid #e5e0d8; border-radius: 30px; font-size: 14px; }

        .two-columns { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; }
        .result-item {
          background: white; padding: 16px 20px; border-radius: 16px; border: 1px solid #e5e0d8;
          margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;
          text-decoration: none; transition: 0.2s; cursor: pointer;
        }
        .result-item:hover { background: #fcf5e8; transform: translateY(-2px); }
        .result-name { font-weight: 700; color: #1f2937; }
        .result-role { font-size: 13px; color: #234c6a; margin-top: 2px; }
        .read-more { color: #234c6a; font-size: 13px; font-weight: 500; }

        .sidebar-card { background: white; border-radius: 16px; padding: 20px; border: 1px solid #e5e0d8; margin-bottom: 24px; }
        .sidebar-title { font-weight: 700; font-size: 18px; margin-bottom: 12px; }
        .sidebar-list { list-style: none; padding: 0; }
        .sidebar-list li { padding: 8px 0; border-bottom: 1px solid #f0f0f0; }

        footer { background: #1f2937; color: #9ca3af; text-align: center; padding: 24px; margin-top: 48px; }

        @media (max-width: 768px) {
          .navbar-custom { padding: 12px 20px; flex-wrap: wrap; }
          .nav-links { order: 3; width: 100%; justify-content: center; margin-top: 12px; }
          .two-columns { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="temukan-root">
        {/* Navbar sementara - ganti dengan komponen Navbar kamu jika sudah ada */}
        <div className="navbar-custom">
          <Link to="/beranda" className="logo"><div className="logo-icon">S</div>SkillSwap</Link>
          <div className="nav-links">
            <Link to="/beranda" className="nav-link">Beranda</Link>
            <Link to="/temukan" className="nav-link active">Temukan</Link>
            <Link to="/notifikasi" className="nav-link">Notifikasi</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
            <Link to="/profil" className="nav-link">Profil</Link>
          </div>
          <div className="user-info"><div className="avatar">U</div><span>User</span></div>
        </div>

        <div className="container">
          <h1 className="page-title">Manajemen Skill & Pencarian Partner</h1>
          <p className="page-subtitle">Cari lebih banyak layanan dan produk yang berbeda-beda!</p>

          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Cari partner atau keahlian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="two-columns">
            <div>
              <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Hasil Pencarian ({filteredUsers.length})</h3>
              {filteredUsers.map(user => (
                <Link to={`/profil/${user.id}`} key={user.id} className="result-item">
                  <div>
                    <div className="result-name">{user.name}</div>
                    <div className="result-role">{user.role} • {user.location}</div>
                  </div>
                  <span className="read-more">Lihat Profil →</span>
                </Link>
              ))}
              {filteredUsers.length === 0 && <p>Tidak ada hasil</p>}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sidebar-card">
                <div className="sidebar-title">Faktor Pencarian</div>
                <ul className="sidebar-list"><li>Pemilik Karya Kunci</li><li>Harga Harga</li><li>Riset</li></ul>
              </div>
              <div className="sidebar-card">
                <div className="sidebar-title">Layanan Terkini</div>
                <ul className="sidebar-list"><li>Layanan Terkini</li><li>Layanan Terbanyak</li></ul>
              </div>
              <div className="sidebar-card">
                <div className="sidebar-title">Sejarah Sampai</div>
                <ul className="sidebar-list"><li>Digital Marketing</li><li>Lain-lain</li></ul>
              </div>
            </div>
          </div>
        </div>

        <footer>© 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.</footer>
        <FloatingChatButton />
      </div>
    </>
  );
};

export default Temukan;