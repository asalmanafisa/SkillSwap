// src/pages/User/Profil.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';

// Data dummy user (termasuk user login)
const dummyUsers = {
  // current user (id = 0)
  0: {
    id: 0,
    name: 'User Name',
    role: 'Frontend Developer',
    location: 'Depok, Indonesia',
    activeTime: 'Malam Hari',
    connections: 142,
    about: 'Saya adalah seorang Frontend Developer yang antusias dalam membangun UI interaktif menggunakan React dan Tailwind CSS. Saya mencari partner untuk belajar Backend Development (Node.js/Go) dalam rangka memperluas kemampuan saya menjadi Fullstack.',
    portfolio: [
      { id: 1, title: 'E-commerce App', image: 'https://via.placeholder.com/150', link: '#' },
      { id: 2, title: 'Portfolio Website', image: 'https://via.placeholder.com/150', link: '#' },
    ],
  },
  // user lain
  1: {
    id: 1,
    name: 'Farah Naylul Fauzia',
    role: 'Desainer',
    location: 'Surabaya',
    activeTime: 'Malam Hari',
    connections: 88,
    about: 'Saya seorang desainer UI/UX dengan pengalaman 3 tahun. Saya ingin bertukar skill desain dengan programming agar bisa membuat prototype yang lebih interaktif.',
    portfolio: [
      { id: 1, title: 'Mobile App Design', image: 'https://via.placeholder.com/150', link: '#' },
      { id: 2, title: 'Landing Page', image: 'https://via.placeholder.com/150', link: '#' },
    ],
  },
  2: {
    id: 2,
    name: 'Yasmine Shavira Ahmad',
    role: 'Programmer',
    location: 'Malang',
    activeTime: 'Malam Hari',
    connections: 120,
    about: 'Fullstack developer dengan spesialisasi React dan Node.js. Saya ingin mengajarkan programming dan belajar UI/UX.',
    portfolio: [
      { id: 1, title: 'Task Manager App', image: 'https://via.placeholder.com/150', link: '#' },
      { id: 2, title: 'API Gateway', image: 'https://via.placeholder.com/150', link: '#' },
    ],
  },
  3: {
    id: 3,
    name: 'Sekar Suryawati',
    role: 'Digital Marketing',
    location: 'Jakarta',
    activeTime: 'Flexible',
    connections: 95,
    about: 'Expert dalam SEO, SEM, dan social media strategy. Saya ingin belajar data analytics untuk meningkatkan performa kampanye.',
    portfolio: [
      { id: 1, title: 'SEO Campaign', image: 'https://via.placeholder.com/150', link: '#' },
      { id: 2, title: 'Social Media Report', image: 'https://via.placeholder.com/150', link: '#' },
    ],
  },
};

const Profil = () => {
  const { userId } = useParams(); // ambil id dari URL, misal /profile/1
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(0); // asumsikan user login id = 0
  const [userData, setUserData] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    // Ambil user login dari localStorage nanti, sementara hardcoded 0
    const loggedInUserId = 0; // nanti ganti dengan localStorage.getItem('userId')
    setCurrentUserId(loggedInUserId);

    const id = parseInt(userId);
    if (isNaN(id)) {
      // jika tidak ada userId, tampilkan profil sendiri
      setUserData(dummyUsers[loggedInUserId]);
      setIsOwnProfile(true);
    } else {
      const data = dummyUsers[id];
      if (data) {
        setUserData(data);
        setIsOwnProfile(id === loggedInUserId);
      } else {
        // user tidak ditemukan, redirect ke beranda
        navigate('/beranda');
      }
    }
  }, [userId, navigate]);

  const handleStartChat = () => {
    // Cari chatId yang sudah ada dengan user ini, atau buat baru
    // Untuk sementara kita asumsikan chatId = userId (karena di Chat.jsx, id personal = userId)
    navigate('/chat', { state: { chatId: userData.id } });
  };

  if (!userData) {
    return <div className="bg-[#fcf5e8] min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <style>{`
        /* CSS sama dengan halaman lain (navbar, container, dll) */
        /* Saya sertakan style minimal agar tampilan rapi */
        .profile-container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .profile-header { display: flex; gap: 32px; align-items: center; margin-bottom: 32px; flex-wrap: wrap; }
        .profile-avatar { width: 120px; height: 120px; background: #234c6a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold; }
        .profile-info { flex: 1; }
        .profile-name { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
        .profile-role { color: #234c6a; font-weight: 600; margin-bottom: 12px; }
        .profile-meta { display: flex; gap: 24px; font-size: 14px; color: #4b5563; margin-bottom: 16px; }
        .profile-connections { font-weight: 600; color: #234c6a; }
        .profile-buttons { display: flex; gap: 12px; margin-bottom: 32px; }
        .btn-edit, .btn-settings, .btn-chat { padding: 8px 20px; border-radius: 30px; font-weight: 600; cursor: pointer; border: none; }
        .btn-edit { background: #f5c842; color: black; }
        .btn-settings { background: white; border: 1px solid #e5e0d8; }
        .btn-chat { background: #234c6a; color: white; }
        .section-title { font-size: 20px; font-weight: 700; margin: 32px 0 16px; }
        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
        .portfolio-card { background: white; border-radius: 16px; border: 1px solid #e5e0d8; overflow: hidden; }
        .portfolio-image { height: 120px; background: #e5e0d8; display: flex; align-items: center; justify-content: center; color: #6b7280; }
        .portfolio-title { padding: 8px; font-size: 14px; font-weight: 500; text-align: center; }
        .add-portfolio { margin-top: 16px; display: inline-block; background: none; border: 1px dashed #234c6a; color: #234c6a; padding: 8px 16px; border-radius: 30px; cursor: pointer; }
        footer { background: #1f2937; color: #9ca3af; text-align: center; padding: 24px; font-size: 12px; margin-top: 48px; }
      `}</style>

      <div className="bg-[#fcf5e8] font-sans min-h-screen flex flex-col">
        <Navbar />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">{userData.name.charAt(0)}</div>
            <div className="profile-info">
              <div className="profile-name">{userData.name}</div>
              <div className="profile-role">{userData.role}</div>
              <div className="profile-meta">
                <span>📍 {userData.location}</span>
                <span>🕒 {userData.activeTime}</span>
              </div>
              <div className="profile-connections">{userData.connections} Koneksi</div>
            </div>
          </div>

          <div className="profile-buttons">
            {isOwnProfile ? (
              <>
                <button className="btn-edit">Edit Profil</button>
                <button className="btn-settings">Pengaturan<Link to="/pengaturan" className="btn-settings">Pengaturan</Link></button>
              </>
            ) : (
              <button className="btn-chat" onClick={handleStartChat}>Start Chatting
               <Link to={`/laporan/${userData.id}`} className="btn-report">Laporkan</Link>
              </button>
            )}
          </div>

          <div>
            <h3 className="section-title">Tentang</h3>
            <p className="text-gray-700 leading-relaxed">{userData.about}</p>
          </div>

          <div>
            <h3 className="section-title">Portfolio & Hasil Karya</h3>
            <div className="portfolio-grid">
              {userData.portfolio.map(item => (
                <div key={item.id} className="portfolio-card">
                  <div className="portfolio-image">📷 Preview</div>
                  <div className="portfolio-title">{item.title}</div>
                </div>
              ))}
            </div>
            {isOwnProfile && (
              <button className="add-portfolio">+ Tambah Karya</button>
            )}
          </div>
        </div>

        <footer>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </footer>
        <FloatingChatButton />
      </div>
    </>
  );
};

export default Profil;