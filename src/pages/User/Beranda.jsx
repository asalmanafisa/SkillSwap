// src/pages/User/Beranda.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';
import heroBg from './images/hero-bg.jpg';
import { users } from '../../utils/dummyData';

const Beranda = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSessions, setActiveSessions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({ partnerCount: 0, weeklySessions: 0, averageRating: 0 });

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : { name: users[0]?.name || 'Pengguna' });

    // Ambil data partner dari users (selain user sendiri)
    const partnerUsers = Object.values(users).filter(u => u.id !== 0);
    
    // Buat activeSessions dari data partner (semua partner)
    const sessions = partnerUsers.map(partner => ({
      id: partner.id,
      partnerName: partner.name,
      skill: partner.role,
      lastMessage: `Halo, siap belajar ${partner.role === 'Desainer' ? 'design' : partner.role === 'Programmer' ? 'coding' : partner.role === 'Data Analyst' ? 'analisis data' : 'skill'} sore ini?`,
      time: '5 menit lalu',
      avatar: partner.name.charAt(0),
      unread: partner.id === 1 ? true : false
    }));
    
    setActiveSessions(sessions);

    const savedActivities = localStorage.getItem('beranda_activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      const defaultActivities = [
        { id: 1, type: 'request', text: `${users[1]?.name || 'Farah'} menerima request belajarmu`, time: '10 menit lalu', isNew: true },
        { id: 2, type: 'rating', text: `${users[2]?.name || 'Yasmine'} memberi rating 5 bintang untuk sesi React`, time: '2 jam lalu', isNew: false },
        { id: 3, type: 'message', text: `Pesan baru dari ${users[4]?.name || 'Tabina'}`, time: '5 jam lalu', isNew: false },
      ];
      setActivities(defaultActivities);
      localStorage.setItem('beranda_activities', JSON.stringify(defaultActivities));
    }

    // Hitung statistik dari users
    const otherUsers = Object.values(users).filter(u => u.id !== 0);
    const totalRatings = otherUsers.reduce((sum, u) => sum + u.rating, 0);
    const avgRating = otherUsers.length > 0 ? totalRatings / otherUsers.length : 0;

    setStats({ 
      partnerCount: otherUsers.length, 
      weeklySessions: 8, 
      averageRating: avgRating.toFixed(1) 
    });
  }, []);

  const markActivityAsRead = (id) => {
    setActivities(prev => {
      const updated = prev.map(act => act.id === id ? { ...act, isNew: false } : act);
      localStorage.setItem('beranda_activities', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/temukan?skill=${encodeURIComponent(categoryName)}`);
  };

  // Navigasi ke chat
  const goToChat = (partnerId) => {
    navigate(`/chat/${partnerId}`);
  };

  const categories = [
    { name: 'Programmer', count: '1.200+ Partner' },
    { name: 'Design', count: '800+ Partner' },
    { name: 'Fotografi', count: '520+ Partner' },
    { name: 'Bahasa', count: '980+ Partner' },
    { name: 'Marketing', count: '650+ Partner' },
    { name: 'Musik', count: '430+ Partner' },
    { name: 'Videografi', count: '380+ Partner' },
    { name: 'AI & ML', count: '290+ Partner' },
  ];

  const tickerItems = [
    'PROGRAMMER', 'DESIGN', 'FOTOGRAFI', 'BAHASA', 'MARKETING', 'MUSIK', 'VIDEOGRAFI', 'AI & ML'
  ];

  // Rekomendasi partner dari data users (kecuali user sendiri)
  const recommendationsList = Object.values(users)
    .filter(u => u.id !== 0)
    .map(user => ({
      id: user.id,
      name: user.name,
      skill: user.role,
      description: user.about.substring(0, 100) + '...',
      location: user.location,
      availability: user.activeTime,
      avatar: user.name.charAt(0),
      bannerColor: getBannerColor(user.id)
    }));

  function getBannerColor(id) {
    const colors = {
      1: 'from-blue-500 to-cyan-400',
      2: 'from-green-500 to-teal-400',
      3: 'from-yellow-500 to-orange-400',
      4: 'from-purple-500 to-pink-400',
    };
    return colors[id] || 'from-gray-500 to-gray-400';
  }

  // Ikon SVG untuk lokasi dan jam
  const LocationIcon = () => (
    <svg className="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const TimeIcon = () => (
    <svg className="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  function getCategoryIcon(catName) {
    const icons = {
      'Programmer': <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      'Design': <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
      'Fotografi': <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      'Bahasa': <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
      'Marketing': <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
      'Musik': <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
      'Videografi': <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      'AI & ML': <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    };
    return icons[catName] || null;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-[#234c6a] text-white py-16 md:py-24 px-5 md:px-10 relative overflow-hidden">
        <img src={heroBg} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#f5c842]/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-[#f5c842]/5 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-left md:w-2/3">
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Tingkatkan Keahlian Bersama Ahli di Bidangnya</h1>
            <p className="text-white/80 mt-4 text-lg max-w-xl">SkillSwap menghubungkan Anda dengan profesional untuk berbagi pengetahuan, belajar, dan berkembang bersama ribuan pengguna lainnya.</p>
            <div className="flex gap-4 mt-8">
              <Link to="/temukan"><button className="bg-[#f5c842] text-black px-6 py-2 rounded-full font-bold shadow hover:translate-y-[-2px] transition">Temukan Partner →</button></Link>
            </div>
          </div>
          <div className="flex gap-8 mt-8 md:mt-0">
            <div className="text-center"><div className="text-2xl font-bold">5,000+</div><p className="text-sm text-white/60">Anggota Aktif</p></div>
            <div className="text-center"><div className="text-2xl font-bold">120+</div><p className="text-sm text-white/60">Kategori</p></div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden bg-[#234c6a] py-3 border-t border-white/10 border-b border-white/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center mx-4">
              <span className="text-white/90 font-bold text-sm tracking-wider">{item}</span>
              <span className="w-1 h-1 bg-[#f5c842] rounded-full mx-4"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard User */}
      <div className="max-w-7xl w-full mx-auto px-5 md:px-10 py-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-800">Selamat Datang, {user?.name || 'Pengguna'}! 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Senang melihatmu kembali. Yuk lanjutkan perjalanan belajarmu.</p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div onClick={() => navigate('/temukan')} className="bg-white p-4 rounded-xl shadow-sm border border-[#e5e0d8] flex items-center gap-3 hover:shadow-md transition cursor-pointer">
            <svg className="w-8 h-8 text-[#234c6a]" fill="none" stroke="currentColor" viewBox="0 0 30 30"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <div><p className="text-xl font-bold text-gray-800">{stats.partnerCount}</p><p className="text-xs text-gray-500">Partner Aktif</p></div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5e0d8] flex items-center gap-3 hover:shadow-md transition cursor-pointer">
            <svg className="w-8 h-8 text-[#f5c842]" fill="none" stroke="currentColor" viewBox="0 0 30 30"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <div><p className="text-xl font-bold text-gray-800">{stats.weeklySessions}</p><p className="text-xs text-gray-500">Sesi Minggu Ini</p></div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5e0d8] flex items-center gap-3 hover:shadow-md transition cursor-pointer">
            <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <div><p className="text-xl font-bold text-gray-800">{stats.averageRating}</p><p className="text-xs text-gray-500">Rating Rata-rata</p></div>
          </div>
        </div>

        {/* Sesi Belajar */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>Sesi Belajar</h3>
              <Link to="/sessions" className="text-xs text-[#234c6a] hover:underline">Lihat semua</Link>
            </div>
            {activeSessions.map((session) => (
              <div key={session.id} onClick={() => goToChat(session.id)} className="flex items-center gap-3 pb-3 border-b border-[#e5e0d8] last:border-0 hover:bg-gray-50 p-2 rounded-lg transition cursor-pointer">
                <div className="relative"><div className="w-8 h-8 rounded-full bg-[#234c6a] text-white flex items-center justify-center text-xs font-bold">{session.avatar}</div>{session.unread && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>}</div>
                <div className="flex-1"><div className="flex justify-between"><h4 className="font-semibold text-gray-800 text-sm">{session.partnerName}</h4><span className="text-[10px] text-gray-400">{session.time}</span></div><p className="text-xs text-[#234c6a] font-medium">{session.skill}</p><p className="text-xs text-gray-500 mt-1">{session.lastMessage}</p></div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>Aktivitas Terbaru</h3>
            {activities.map((act) => (
              <Link key={act.id} to="/notifikasi" onClick={() => markActivityAsRead(act.id)} className={`flex items-center gap-3 pb-2 mb-1 border-b border-[#e5e0d8] last:border-0 ${act.isNew ? 'bg-blue-50/30 p-2 rounded-md' : ''} cursor-pointer hover:bg-gray-50 transition`}>
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                  {act.type === 'request' && <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  {act.type === 'rating' && <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
                  {act.type === 'message' && <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                </div>
                <div className="flex-1"><p className="text-sm text-gray-700">{act.text}</p><p className="text-xs text-gray-400">{act.time}</p></div>
                {act.isNew && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full">Baru</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Kategori Populer */}
      <section className="py-16 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">Kategori Keahlian Populer</h2>
          <p className="text-gray-500 mt-2 mb-10">Eksplorasi berbagai bidang yang paling banyak dicari</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div key={cat.name} onClick={() => handleCategoryClick(cat.name)} className="border border-[#e5e0d8] rounded-xl p-5 bg-white shadow-md cursor-pointer hover:bg-[#fcf5e8] hover:border-[#234c6a] hover:shadow-[0_4px_12px_#234c6a] hover:-translate-y-1 transition">
                <div className="flex justify-center mb-2">{getCategoryIcon(cat.name)}</div>
                <h4 className="font-bold text-gray-800 mt-2 text-center">{cat.name}</h4>
                <span className="text-xs text-gray-400 text-center block">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rating untuk Anda (ringkasan) */}
      <section className="py-16 px-5 md:px-10 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">Rating untuk Anda</h2>
          <p className="text-gray-500 mt-2">Apa kata partner belajar tentang Anda</p>
        </div>
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-[#e5e0d8]">
            <span className="text-2xl font-bold text-gray-800">4.9</span>
            <div className="flex text-yellow-400 text-lg">★★★★★</div>
            <span className="text-gray-500 text-sm">(dari 12 ulasan)</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Rating rata-rata yang Anda terima dari partner</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e0d8]"><div className="flex items-center gap-2 mb-2"><div className="flex text-yellow-400 text-base">★★★★★</div><span>5.0</span></div><p className="text-gray-600 italic text-sm">"Partner yang sangat sabar dan jelas dalam menjelaskan konsep React. Sesi belajar terasa produktif."</p><div className="mt-3 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-[#234c6a] text-white flex items-center justify-center text-xs">A</div><div><div className="font-semibold text-gray-800 text-sm">Ahmad Fauzi</div><div className="text-xs text-gray-400">Partner Programmer</div></div></div></div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e0d8]"><div className="flex items-center gap-2 mb-2"><div className="flex text-yellow-400 text-base">★★★★★</div><span>5.0</span></div><p className="text-gray-600 italic text-sm">"Menyenangkan diajak diskusi. Sangat terbuka dan selalu memberikan contoh nyata untuk UI/UX."</p><div className="mt-3 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-[#f5c842] text-black flex items-center justify-center text-xs">R</div><div><div className="font-semibold text-gray-800 text-sm">Rina Wulandari</div><div className="text-xs text-gray-400">Partner Design</div></div></div></div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e0d8]"><div className="flex items-center gap-2 mb-2"><div className="flex text-yellow-400 text-base">★★★★★</div><span>4.8</span></div><p className="text-gray-600 italic text-sm">"Komunikatif dan tepat waktu. Sangat membantu saya memahami dasar-dasar pemrograman."</p><div className="mt-3 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">D</div><div><div className="font-semibold text-gray-800 text-sm">Doni Saputra</div><div className="text-xs text-gray-400">Partner Programmer</div></div></div></div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e0d8]"><div className="flex items-center gap-2 mb-2"><div className="flex text-yellow-400 text-base">★★★★☆</div><span>4.5</span></div><p className="text-gray-600 italic text-sm">"Kadang sedikit terburu-buru, tapi materi yang diberikan sangat berkualitas."</p><div className="mt-3 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">M</div><div><div className="font-semibold text-gray-800 text-sm">Maya Sari</div><div className="text-xs text-gray-400">Partner Digital Marketing</div></div></div></div>
        </div>
        <div className="text-center mt-8"><Link to="/rating-saya" className="inline-block text-[#234c6a] text-sm font-semibold hover:underline">Lihat semua ulasan tentang Anda →</Link></div>
      </section>

      {/* Rekomendasi Partner */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl font-bold text-gray-800 text-center mb-2">Rekomendasi Partner</h2>
        <p className="text-gray-500 text-center mb-10">Berdasarkan minat dan keahlian yang Anda cari</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendationsList.map((rec) => (
            <Link key={rec.id} to={`/profil/${rec.id}`} className="bg-white rounded-xl shadow-md border border-[#e5e0d8] hover:shadow-lg transition flex flex-col h-full overflow-hidden cursor-pointer">
              <div className={`h-24 bg-gradient-to-r ${rec.bannerColor}`}></div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-center -mt-8 mb-3"><div className="w-14 h-14 rounded-full bg-[#234c6a] text-white flex items-center justify-center font-bold text-xl ring-2 ring-white">{rec.avatar}</div></div>
                <div className="text-center mb-2"><h4 className="font-bold text-gray-800 text-base break-words leading-tight">{rec.name}</h4><p className="text-xs text-[#234c6a] font-medium break-words">{rec.skill}</p></div>
                <p className="text-gray-600 text-sm mb-3 flex-1 text-center">{rec.description}</p>
                <div className="flex justify-center items-center gap-2 text-xs text-gray-500 mb-4">
                  <span className="flex items-center"><LocationIcon />{rec.location}</span>
                  <span>•</span>
                  <span className="flex items-center"><TimeIcon />{rec.availability}</span>
                </div>
                <button className="w-full bg-[#f5c842] text-black py-2 rounded-full text-sm font-semibold hover:bg-[#e5b830] transition">Lihat Profil</button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">© 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.</footer>
      <FloatingChatButton />
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 25s linear infinite; width: max-content; }`}</style>
    </div>
  );
};

export default Beranda;