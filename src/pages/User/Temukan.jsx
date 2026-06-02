// src/pages/User/Temukan.jsx
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FloatingChatButton from '../../components/FloatingChatButton';
import { users } from '../../utils/dummyData';

const Temukan = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [gender, setGender] = useState('');
  const [sortBy, setSortBy] = useState('terbaru');
  
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const skillParam = searchParams.get('skill');
    if (skillParam) setKeyword(skillParam);
  }, [searchParams]);

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

  const ChatIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  const partners = Object.values(users)
    .filter(user => user.id !== 0)
    .map(user => ({
      id: user.id,
      name: user.name,
      role: user.role,
      location: user.location,
      availability: user.activeTime,
      description: user.about.substring(0, 100) + (user.about.length > 100 ? '...' : ''),
      gender: 'Perempuan',
      category: getCategoryFromRole(user.role),
      avatar: user.name.charAt(0),
      createdAt: '2024-01-01'
    }));

  function getCategoryFromRole(role) {
    if (role === 'Programmer') return 'Programmer';
    if (role === 'Desainer') return 'Design';
    if (role === 'Digital Marketing') return 'Marketing';
    if (role === 'Data Analyst') return 'Data Science';
    return 'Lainnya';
  }

  const categories = ['Semua Kategori', 'Programmer', 'Design', 'Fotografi', 'Bahasa', 'Marketing', 'Data Science'];
  const locations = ['Semua Lokasi', 'Surabaya', 'Malang', 'Jakarta', 'Bandung', 'Depok'];
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

  const handleSendRequest = (partner) => {
    setSelectedPartner(partner);
    setRequestSent(false);
    setShowRequestModal(true);
  };

  const confirmSendRequest = () => {
    const newRequest = {
      id: Date.now(),
      type: 'request',
      fromUserId: 0,
      fromName: currentUser?.name || 'Saya',
      toUserId: selectedPartner.id,
      toName: selectedPartner.name,
      action: `ingin belajar ${selectedPartner.role} denganmu`,
      status: 'pending',
      time: 'baru saja',
      read: false,
      isFromMe: true
    };
    
    const existingNotif = JSON.parse(localStorage.getItem('allNotifications') || '[]');
    existingNotif.unshift(newRequest);
    localStorage.setItem('allNotifications', JSON.stringify(existingNotif));
    
    setRequestSent(true);
    
    setTimeout(() => {
      setShowRequestModal(false);
      setSelectedPartner(null);
      setRequestSent(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins'", backgroundColor: '#fcf5e8' }}>
      <div className="flex-1 max-w-7xl w-full mx-auto px-5 md:px-10 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">Manajemen Skill & Pencarian Partner</h1>
        <p className="text-gray-500 mt-2 mb-8 text-base">Cari dan temukan partner bertukar keahlian sesuai preferensi Anda</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e0d8] p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="font-bold text-lg text-gray-800">Filter Pencarian</h3>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pencarian Kata Kunci</label>
                <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Nama atau skill..." className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Skill</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm bg-white">
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <select value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm bg-white">
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Ketersediaan</label>
                <select value={availability} onChange={e => setAvailability(e.target.value)} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm bg-white">
                  {availabilities.map(av => <option key={av} value={av}>{av}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender (Opsional)</label>
                <select value={gender} onChange={e => setGender(e.target.value)} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm bg-white">
                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <button onClick={resetFilters} className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
                Reset Filter
              </button>
            </div>
          </div>
          
          {/* Hasil Pencarian */}
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h3 className="font-bold text-xl text-gray-800">Hasil Pencarian ({filteredPartners.length})</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Urutkan:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-1 border border-[#e5e0d8] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#234c6a]">
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                  <option value="nama-asc">Nama A-Z</option>
                  <option value="nama-desc">Nama Z-A</option>
                </select>
              </div>
            </div>
            
            {filteredPartners.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-8 text-center text-gray-500 text-base">
                Tidak ada partner yang sesuai.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPartners.map(partner => (
                  <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-4 hover:shadow-md transition flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#234c6a] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {partner.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base">{partner.name}</h4>
                        <p className="text-sm text-[#234c6a] font-medium">{partner.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-2 text-xs text-gray-500">
                      <span className="flex items-center text-xs"><LocationIcon />{partner.location}</span>
                      <span className="flex items-center text-xs"><TimeIcon />{partner.availability}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed">{partner.description}</p>
                    <div className="flex gap-3 mt-auto">
                      <Link to={`/profil/${partner.id}`} className="flex-1">
                        <button className="w-full bg-white border border-[#234c6a] text-[#234c6a] py-2 rounded-lg text-sm font-semibold hover:bg-[#234c6a] hover:text-white transition">
                          Lihat Profil
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleSendRequest(partner)}
                        className="flex-1 w-full bg-[#f5c842] text-black py-2 rounded-lg text-sm font-semibold hover:bg-[#e5b830] transition"
                      >
                        Hubungkan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <FloatingChatButton />

      {/* Modal Request - CENTERED */}
      {showRequestModal && selectedPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRequestModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%] mx-4" style={{ fontFamily: "'Poppins'" }} onClick={e => e.stopPropagation()}>
            {requestSent ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckIcon />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Request Terkirim!</h3>
                <p className="text-gray-500 text-sm mt-2">
                  Request belajar ke <strong>{selectedPartner.name}</strong> telah dikirim.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Menunggu konfirmasi dari partner
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Hubungkan dengan {selectedPartner.name}?</h3>
                  <button onClick={() => setShowRequestModal(false)} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Anda akan mengirim request belajar ke <strong>{selectedPartner.name}</strong> untuk mempelajari skill <strong>{selectedPartner.role}</strong>.
                </p>
                <div className="flex gap-3">
                  <Link to={`/profil/${selectedPartner.id}`} className="flex-1">
                    <button 
                      onClick={() => setShowRequestModal(false)}
                      className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                    >
                      Lihat Profil
                    </button>
                  </Link>
                  <button 
                    onClick={confirmSendRequest}
                    className="flex-1 py-2 rounded-lg bg-[#f5c842] text-black text-sm font-semibold hover:bg-[#e5b830] transition flex items-center justify-center gap-2"
                  >
                    <ChatIcon /> Kirim Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Temukan;