import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';

const Temukan = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [gender, setGender] = useState('');
  const [sortBy, setSortBy] = useState('terbaru');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fraunces:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const skillParam = searchParams.get('skill');
    if (skillParam) setKeyword(skillParam);
  }, [searchParams]);

  const partners = [
    { id: 1, name: 'Farah Naylul Fauzia', role: 'Desainer', location: 'Surabaya', availability: 'Weekend', description: 'Berpengalaman 3 tahun dalam mendesain aplikasi mobile dan web.', gender: 'Perempuan', category: 'Design', avatar: 'F', createdAt: '2024-01-15' },
    { id: 2, name: 'Yasmine Shavira Ahmad', role: 'Programmer', location: 'Malang', availability: 'Malam Hari', description: 'Fullstack developer dengan spesialisasi React dan Node.js.', gender: 'Perempuan', category: 'Programmer', avatar: 'Y', createdAt: '2024-02-20' },
    { id: 3, name: 'Tabina Naila Griselda', role: 'Data Analyst', location: 'Surabaya', availability: 'Siang Hari', description: 'Menganalisis data untuk pengambilan keputusan bisnis menggunakan Python dan SQL.', gender: 'Perempuan', category: 'Data Science', avatar: 'T', createdAt: '2024-01-10' },
    { id: 4, name: 'Sekar Suryawati', role: 'Digital Marketing', location: 'Jakarta', availability: 'Flexible', description: 'Expert dalam SEO, SEM, dan social media strategy.', gender: 'Perempuan', category: 'Marketing', avatar: 'S', createdAt: '2024-03-05' },
  ];

  const categories = ['Semua Kategori', 'Programmer', 'Design', 'Fotografi', 'Bahasa', 'Marketing', 'Data Science'];
  const locations = ['Semua Lokasi', 'Surabaya', 'Malang', 'Jakarta', 'Bandung'];
  const availabilities = ['Semua Waktu', 'Weekend', 'Malam Hari', 'Siang Hari', 'Flexible'];
  const genders = ['Semua Gender', 'Laki-laki', 'Perempuan'];

  let filteredPartners = partners.filter(partner => {
    const matchKeyword = keyword === '' || partner.name.toLowerCase().includes(keyword.toLowerCase()) || partner.role.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = category === '' || category === 'Semua Kategori' || partner.category === category;
    const matchLocation = location === '' || location === 'Semua Lokasi' || partner.location === location;
    const matchAvailability = availability === '' || availability === 'Semua Waktu' || partner.availability === availability;
    const matchGender = gender === '' || gender === 'Semua Gender' || partner.gender === gender;
    return matchKeyword && matchCategory && matchLocation && matchAvailability && matchGender;
  });

  filteredPartners = filteredPartners.sort((a, b) => {
    if (sortBy === 'terbaru') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'terlama') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'nama-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'nama-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  const resetFilters = () => {
    setKeyword('');
    setCategory('');
    setLocation('');
    setAvailability('');
    setGender('');
    setSortBy('terbaru');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-5 md:px-10 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">Manajemen Skill & Pencarian Partner</h1>
        <p className="text-gray-500 mt-2 mb-8">Cari dan temukan partner bertukar keahlian sesuai preferensi Anda</p>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e0d8] p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                <h3 className="font-bold text-lg text-gray-800">Filter Pencarian</h3>
              </div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Pencarian Kata Kunci</label><input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Nama atau skill..." className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm" /></div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Kategori Skill</label><select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm bg-white">{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label><select value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm bg-white">{locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}</select></div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Waktu Ketersediaan</label><select value={availability} onChange={e => setAvailability(e.target.value)} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm bg-white">{availabilities.map(av => <option key={av} value={av}>{av}</option>)}</select></div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Gender (Opsional)</label><select value={gender} onChange={e => setGender(e.target.value)} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm bg-white">{genders.map(g => <option key={g} value={g}>{g}</option>)}</select></div>
              <button onClick={resetFilters} className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">Reset Filter</button>
            </div>
          </div>
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h3 className="font-bold text-xl text-gray-800">Hasil Pencarian ({filteredPartners.length})</h3>
              <div className="flex items-center gap-2"><span className="text-sm text-gray-500">Urutkan:</span><select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-1 border border-[#e5e0d8] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#234c6a]"><option value="terbaru">Terbaru</option><option value="terlama">Terlama</option><option value="nama-asc">Nama A-Z</option><option value="nama-desc">Nama Z-A</option></select></div>
            </div>
            {filteredPartners.length === 0 ? <div className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-8 text-center text-gray-500">Tidak ada partner yang sesuai.</div> : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPartners.map(partner => (
                  <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-4 hover:shadow-md transition flex flex-col">
                    <div className="flex items-start gap-3 mb-3"><div className="w-12 h-12 rounded-full bg-[#234c6a] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">{partner.avatar}</div><div><h4 className="font-bold text-gray-800">{partner.name}</h4><p className="text-sm text-[#234c6a] font-medium">{partner.role}</p></div></div>
                    <div className="flex flex-wrap gap-3 mb-2 text-xs text-gray-500"><span>📍 {partner.location}</span><span>🕒 {partner.availability}</span></div>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{partner.description}</p>
                    <div className="flex gap-3 mt-auto">
                      <Link to={`/profil/${partner.id}`} className="flex-1"><button className="w-full bg-white border border-[#234c6a] text-[#234c6a] py-2 rounded-lg text-sm font-semibold hover:bg-[#234c6a] hover:text-white transition">Lihat Profil</button></Link>
                      <Link to={`/chat/${partner.id}`} className="flex-1"><button className="w-full bg-[#f5c842] text-black py-2 rounded-lg text-sm font-semibold hover:bg-[#e5b830] transition">Hubungkan</button></Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">© 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.</footer>
      <FloatingChatButton />
    </div>
  );
};

export default Temukan;