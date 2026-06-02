import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';
import heroBg from './images/hero-bg.jpg';
import { getUserData } from '../../utils/dummyData';

const Profil = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentUserId] = useState(0);
  const [userData, setUserData] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [fotoProfil, setFotoProfil] = useState('');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFileType, setUploadFileType] = useState('');
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const showModalMessage = (msg) => {
    setNoticeMessage(msg);
    setShowNoticeModal(true);
  };

  const confirmDeletePortfolio = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const executeDeletePortfolio = () => {
    if (deleteTargetId !== null) {
      savePortfolio(portfolioItems.filter(item => item.id !== deleteTargetId));
      showModalMessage('Karya telah dihapus');
    }
    setShowDeleteConfirm(false);
    setDeleteTargetId(null);
  };

  // Ambil data current user dari localStorage
  const getCurrentUserData = () => {
    return getUserData(0, true);
  };

  const loadPortfolio = () => {
    const savedPortfolio = localStorage.getItem('userPortfolio');
    if (savedPortfolio) {
      setPortfolioItems(JSON.parse(savedPortfolio));
    } else {
      const defaultPortfolio = getUserData(0, false).portfolio;
      setPortfolioItems(defaultPortfolio);
      localStorage.setItem('userPortfolio', JSON.stringify(defaultPortfolio));
    }
  };

  const savePortfolio = (newPortfolio) => {
    localStorage.setItem('userPortfolio', JSON.stringify(newPortfolio));
    setPortfolioItems(newPortfolio);
  };

  // Cek tipe file
  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    return 'other';
  };

  const handleUploadFile = () => {
    if (!uploadTitle.trim()) return showModalMessage('Harap isi judul karya');
    if (!uploadFile) return showModalMessage('Pilih file');
    
    const fileType = getFileType(uploadFile);
    if (fileType === 'other') return showModalMessage('Hanya file gambar atau PDF');
    
    const maxSize = fileType === 'image' ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB untuk gambar, 5MB untuk PDF
    if (uploadFile.size > maxSize) {
      return showModalMessage(`Maksimal ${maxSize / (1024 * 1024)} MB`);
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const newItem = {
        id: Date.now(),
        title: uploadTitle.trim(),
        fileType: fileType,
        fileData: e.target.result,
        fileName: uploadFile.name
      };
      savePortfolio([...portfolioItems, newItem]);
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadFile(null);
      setUploadFileType('');
      showModalMessage('✅ Karya berhasil ditambahkan!');
    };
    reader.onerror = () => showModalMessage('Gagal membaca file');
    reader.readAsDataURL(uploadFile);
  };

  const handleViewFile = (item) => {
    if (item.fileType === 'image') {
      // Buka modal preview gambar atau window baru
      window.open(item.fileData, '_blank');
    } else if (item.fileType === 'pdf') {
      window.open(item.fileData, '_blank');
    } else if (item.pdfBase64) {
      window.open(item.pdfBase64, '_blank');
    } else if (item.pdfUrl) {
      window.open(item.pdfUrl, '_blank');
    } else {
      showModalMessage('File tidak tersedia');
    }
  };

  useEffect(() => {
    const id = userId ? parseInt(userId) : currentUserId;
    if (isNaN(id) || id === currentUserId) {
      const data = getCurrentUserData();
      setUserData(data);
      setIsOwnProfile(true);
      setFotoProfil(data.fotoProfil || '');
      loadPortfolio();
    } else {
      const data = getUserData(id, false);
      if (data) {
        setUserData(data);
        setIsOwnProfile(false);
        setFotoProfil(data.fotoProfil || '');
        setPortfolioItems(data.portfolio);
      } else {
        navigate('/beranda');
      }
    }
  }, [userId, navigate, currentUserId]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  if (!userData) return <div className="min-h-screen bg-[#fcf5e8] flex items-center justify-center">Loading...</div>;

  // Ikon SVG
  const LocationIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
  const TimeIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  const ConnectionsIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
  const RatingIcon = () => <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
  
  // Ikon berdasarkan tipe file
  const FileIcon = ({ type }) => {
    if (type === 'image') {
      return <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    }
    return <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 11h.01M7 15h.01" /></svg>;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <div className="relative bg-[#234c6a] h-48 md:h-64 overflow-hidden">
        <img src={heroBg} alt="Header" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#234c6a]/50 to-[#234c6a]/80"></div>
      </div>
      <div className="flex-1 max-w-4xl w-full mx-auto px-5 relative z-10 -mt-12 md:-mt-16">
        <div className="pb-10">
          {/* Card Profil */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md flex-shrink-0">
                {fotoProfil ? <img src={fotoProfil} alt="Profil" className="w-full h-full object-cover" /> : <span className="text-4xl font-bold text-[#234c6a]">{userData.name.charAt(0)}</span>}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div><h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800">{userData.name}</h2><p className="text-[#234c6a] font-semibold mt-1">{userData.role}</p></div>
                  {isOwnProfile && <button onClick={() => navigate('/pengaturan')} className="px-4 py-2 rounded-full border-2 border-[#234c6a] text-[#234c6a] font-semibold text-sm bg-transparent hover:bg-[#234c6a] hover:text-white transition">Edit Profil</button>}
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500"><span className="flex items-center gap-1"><LocationIcon /> {userData.location}</span><span className="flex items-center gap-1"><TimeIcon /> {userData.activeTime}</span></div>
                <div className="flex gap-4 mt-3"><span className="text-sm font-semibold text-gray-700 flex items-center gap-1"><ConnectionsIcon /> {userData.connections} Koneksi</span><span className="text-sm font-semibold flex items-center gap-1"><RatingIcon /> {userData.rating} / 5.0</span></div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#e5e0d8]"><h3 className="font-serif text-lg font-bold text-gray-800 mb-2">Tentang</h3><p className="text-gray-700 leading-relaxed">{userData.about}</p></div>
          </div>

          {/* Portfolio - Mendukung gambar dan PDF */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl font-bold text-gray-800">Portfolio & Hasil Karya</h3>
              {isOwnProfile && (
                <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-1 text-[#234c6a] text-sm font-semibold hover:underline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Karya
                </button>
              )}
            </div>
            
            {portfolioItems.length === 0 ? (
              <p className="text-gray-400 text-center py-4">Belum ada karya.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-[#e5e0d8] rounded-xl hover:bg-[#fcf5e8] transition group">
                    <button onClick={() => handleViewFile(item)} className="flex items-center gap-3 flex-1 text-left">
                      {/* Preview thumbnail untuk gambar */}
                      {item.fileType === 'image' && item.fileData && (
                        <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <img src={item.fileData} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      {item.fileType !== 'image' && <FileIcon type={item.fileType} />}
                      <span className="font-medium text-gray-800 truncate">{item.title}</span>
                    </button>
                    {isOwnProfile && (
                      <button onClick={() => confirmDeletePortfolio(item.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isOwnProfile && (
            <div className="flex justify-center">
              <button onClick={() => showModalMessage(`Request session ke ${userData.name} telah dikirim`)} className="bg-[#f5c842] text-black px-8 py-3 rounded-full font-bold shadow-md hover:bg-[#e5b830] transition">
                Request Session →
              </button>
            </div>
          )}
        </div>
      </div>
      
      <FloatingChatButton />

      {/* Modal Upload - Mendukung Gambar dan PDF */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowUploadModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tambah Karya</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Karya</label>
                <input type="text" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Contoh: Desain UI/UX Mobile" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File (Gambar atau PDF)</label>
                <input type="file" accept="image/*,application/pdf" onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    setUploadFile(file);
                    setUploadFileType(file.type);
                  }
                }} className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-[#234c6a] file:text-white hover:file:bg-[#1a3d55]" />
                <p className="text-xs text-gray-400 mt-1">Maksimal 10 MB untuk gambar, 5 MB untuk PDF</p>
                {uploadFile && uploadFileType?.startsWith('image/') && (
                  <div className="mt-2">
                    <p className="text-xs text-green-600">Preview gambar akan ditampilkan</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-sm">Batal</button>
              <button onClick={handleUploadFile} className="px-4 py-2 rounded-lg bg-[#234c6a] text-white text-sm">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Notifikasi */}
      {showNoticeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNoticeModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Notifikasi</h3>
              <button onClick={() => setShowNoticeModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700">{noticeMessage}</p>
            <div className="flex justify-end mt-6">
              <button onClick={() => setShowNoticeModal(false)} className="px-4 py-2 rounded-lg bg-[#234c6a] text-white text-sm">OK</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">Konfirmasi Hapus</h3>
              <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700">Apakah Anda yakin ingin menghapus karya ini?</p>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-sm">Batal</button>
              <button onClick={executeDeletePortfolio} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;