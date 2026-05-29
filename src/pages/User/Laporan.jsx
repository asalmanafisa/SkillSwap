// src/pages/User/Laporan.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';

const Laporan = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedViolation, setSelectedViolation] = useState('');
  const [otherText, setOtherText] = useState('');

  // Nama pengguna yang dilaporkan (sementara, nanti bisa ambil dari dummyUsers)
  const reportedUserName = "Amira Salma Nafisa"; // bisa dinamis sesuai userId

  const violations = [
    "Konten tidak pantas",
    "Spam atau penipuan skill",
    "Pelecehan atau bullying",
    "Akun palsu / duplikat",
    "Lainnya...."
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = {
      userId,
      reportedUser: reportedUserName,
      violation: selectedViolation === "Lainnya...." ? otherText : selectedViolation,
      timestamp: new Date().toISOString()
    };
    console.log("Laporan dikirim:", reportData);
    // Simpan ke localStorage sementara
    const existingReports = JSON.parse(localStorage.getItem('reports') || '[]');
    existingReports.push(reportData);
    localStorage.setItem('reports', JSON.stringify(existingReports));
    alert("Laporan terkirim. Terima kasih.");
    navigate(-1); // kembali ke halaman sebelumnya
  };

  return (
    <>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fcf5e8; }
        .laporan-root { min-height: 100vh; background: #fcf5e8; display: flex; flex-direction: column; }

        /* Navbar styling (salin dari halaman lain agar konsisten) */
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

        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background: white; border-radius: 24px; border: 1px solid #e5e0d8; padding: 32px; }
        .title { font-family: 'Fraunces', serif; font-size: 28px; margin-bottom: 8px; }
        .subtitle { color: #6b7280; font-size: 14px; margin-bottom: 24px; }
        .reported-name { font-weight: 700; font-size: 18px; margin: 16px 0 8px; }
        .violation-group { margin: 20px 0; }
        .violation-item { margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
        .violation-item input { width: 18px; height: 18px; }
        .other-input { margin-left: 30px; margin-top: 8px; width: 100%; padding: 10px; border: 1px solid #e5e0d8; border-radius: 12px; }
        .btn-submit { background: #234c6a; color: white; border: none; padding: 12px 24px; border-radius: 30px; font-weight: 600; cursor: pointer; margin-top: 20px; width: 100%; }
        footer { background: #1f2937; color: #9ca3af; text-align: center; padding: 24px; margin-top: 48px; }
      `}</style>

      <div className="laporan-root">
        <div className="navbar-custom">
          <Link to="/beranda" className="logo"><div className="logo-icon">S</div>SkillSwap</Link>
          <div className="nav-links">
            <Link to="/beranda" className="nav-link">Beranda</Link>
            <Link to="/temukan" className="nav-link">Temukan</Link>
            <Link to="/notifikasi" className="nav-link">Notifikasi</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
            <Link to="/profil" className="nav-link">Profil</Link>
          </div>
          <div className="user-info"><div className="avatar">U</div><span>User</span></div>
        </div>

        <div className="container">
          <div className="card">
            <h1 className="title">Laporkan Pengguna</h1>
            <div className="reported-name">{reportedUserName}</div>
            <p className="subtitle">Pilih jenis pelanggaran</p>
            <form onSubmit={handleSubmit}>
              <div className="violation-group">
                {violations.map(v => (
                  <div key={v} className="violation-item">
                    <input
                      type="radio"
                      name="violation"
                      value={v}
                      checked={selectedViolation === v}
                      onChange={() => setSelectedViolation(v)}
                      required
                    />
                    <label>{v}</label>
                  </div>
                ))}
              </div>
              {selectedViolation === "Lainnya...." && (
                <textarea
                  className="other-input"
                  rows="3"
                  placeholder="Tuliskan alasan lainnya..."
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                />
              )}
              <button type="submit" className="btn-submit">Kirim Laporan</button>
            </form>
          </div>
        </div>

        <footer>© 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.</footer>
        <FloatingChatButton />
      </div>
    </>
  );
};

export default Laporan;