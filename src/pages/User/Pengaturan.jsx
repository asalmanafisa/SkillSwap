// src/pages/User/Pengaturan.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';

const Pengaturan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('akun');

  // State untuk notifikasi toast
  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // State modal
  const [showUbahPasswordModal, setShowUbahPasswordModal] = useState(false);
  const [showHapusAkunModal, setShowHapusAkunModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showHapusFotoModal, setShowHapusFotoModal] = useState(false);

  // State untuk ubah password
  const [passwordForm, setPasswordForm] = useState({
    lama: '',
    baru: '',
    konfirmasi: ''
  });

  // State Akun
  const [profil, setProfil] = useState({
    namaLengkap: '',
    email: '',
    nomorTelepon: '',
    lokasi: '',
    profesi: '',
    skillDiminati: '',
    skillDikuasai: '',
    bio: '',
    fotoProfil: ''
  });
  const [previewFoto, setPreviewFoto] = useState('');

  // State Privasi
  const [privasi, setPrivasi] = useState({
    siapaBisaChat: 'semua',
    tampilkanStatusOnline: true,
    profilPublic: true,
    twoFactorEnabled: false
  });

  // State Notifikasi
  const [notifikasi, setNotifikasi] = useState({
    emailBaru: true,
    emailPembaruan: false,
    pushBaru: true,
    pushRespons: true,
  });

  // State Laporan
  const [laporan, setLaporan] = useState({
    jenis: '',
    keterangan: '',
    bukti: []
  });
  const fileInputRef = useRef(null);

  // State Bantuan
  const [bantuan, setBantuan] = useState({
    email: '',
    pesan: '',
    status: ''
  });

  // Inject Poppins
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Load data dari localStorage
  useEffect(() => {
    const savedTab = sessionStorage.getItem('pengaturan_activeTab');
    if (savedTab && ['akun','privasi','notifikasi','laporan','bantuan'].includes(savedTab)) {
      setActiveTab(savedTab);
    } else {
      setActiveTab('akun');
      sessionStorage.setItem('pengaturan_activeTab', 'akun');
    }

    const savedProfil = localStorage.getItem('userProfile');
    if (savedProfil) {
      const data = JSON.parse(savedProfil);
      setProfil(data);
      setPreviewFoto(data.fotoProfil || '');
    } else {
      setProfil({
        namaLengkap: 'Amira Salma Nafisa',
        email: 'asimamafisa@student.ub.ac.id',
        nomorTelepon: '+62 812-3456-7890',
        lokasi: 'Malang, Indonesia',
        profesi: 'Software Engineer',
        skillDiminati: 'React, UI/UX',
        skillDikuasai: 'React, Node.js, Tailwind',
        bio: 'Full Stack Developer yang passionate tentang web technologies',
        fotoProfil: ''
      });
      setPreviewFoto('');
    }
    const savedPrivasi = localStorage.getItem('privasi');
    if (savedPrivasi) setPrivasi(JSON.parse(savedPrivasi));
    const savedNotifikasi = localStorage.getItem('notifikasi');
    if (savedNotifikasi) setNotifikasi(JSON.parse(savedNotifikasi));
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    sessionStorage.setItem('pengaturan_activeTab', tabId);
  };

  const simpanAkun = () => {
    localStorage.setItem('userProfile', JSON.stringify(profil));
    showToast('Perubahan berhasil disimpan!');
  };

  const batalAkun = () => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const data = JSON.parse(saved);
      setProfil(data);
      setPreviewFoto(data.fotoProfil || '');
    }
  };

  const handleUploadFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5 MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
        setProfil({ ...profil, fotoProfil: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHapusFoto = () => {
    setShowHapusFotoModal(false);
    setPreviewFoto('');
    setProfil({ ...profil, fotoProfil: '' });
    showToast('Foto profil dihapus');
  };

  const simpanPrivasi = () => {
    localStorage.setItem('privasi', JSON.stringify(privasi));
    showToast('Pengaturan privasi disimpan!');
  };

  const simpanNotifikasi = () => {
    localStorage.setItem('notifikasi', JSON.stringify(notifikasi));
    showToast('Pengaturan notifikasi disimpan!');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setLaporan(prev => ({ ...prev, bukti: [...prev.bukti, ...files] }));
  };

  const removeFile = (index) => {
    setLaporan(prev => ({
      ...prev,
      bukti: prev.bukti.filter((_, i) => i !== index)
    }));
  };

  const resetLaporanForm = () => {
    setLaporan({ jenis: '', keterangan: '', bukti: [] });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const kirimLaporan = (e) => {
    e.preventDefault();
    if (!laporan.jenis || !laporan.keterangan || laporan.bukti.length === 0) {
      alert('Harap isi semua field: jenis pelanggaran, keterangan, dan minimal satu bukti file.');
      return;
    }
    const reportData = {
      jenis: laporan.jenis,
      keterangan: laporan.keterangan,
      bukti: laporan.bukti.map(f => ({ name: f.name, size: f.size, type: f.type })),
      timestamp: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem('reports') || '[]');
    existing.push(reportData);
    localStorage.setItem('reports', JSON.stringify(existing));
    showToast('Laporan terkirim. Terima kasih.');
    resetLaporanForm();
  };

  const kirimPesanBantuan = async (e) => {
    e.preventDefault();
    if (!bantuan.email || !bantuan.pesan) {
      setBantuan({ ...bantuan, status: 'Harap isi email dan pesan.' });
      return;
    }
    console.log('Pesan bantuan:', bantuan);
    setBantuan({ ...bantuan, status: 'Pesan terkirim! Kami akan merespon dalam 1x24 jam.', pesan: '' });
    setTimeout(() => setBantuan((prev) => ({ ...prev, status: '' })), 5000);
  };

  const handleUbahPassword = () => {
    if (!passwordForm.lama || !passwordForm.baru || !passwordForm.konfirmasi) {
      alert('Semua field harus diisi');
      return;
    }
    if (passwordForm.baru !== passwordForm.konfirmasi) {
      alert('Password baru dan konfirmasi tidak cocok');
      return;
    }
    const storedPass = localStorage.getItem('userPassword') || 'default123';
    if (passwordForm.lama !== storedPass) {
      alert('Password lama salah');
      return;
    }
    localStorage.setItem('userPassword', passwordForm.baru);
    showToast('Password berhasil diubah!');
    setShowUbahPasswordModal(false);
    setPasswordForm({ lama: '', baru: '', konfirmasi: '' });
  };

  const handleHapusAkun = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('privasi');
    localStorage.removeItem('notifikasi');
    localStorage.removeItem('reports');
    sessionStorage.removeItem('pengaturan_activeTab');
    sessionStorage.removeItem('user');
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate('/');
  };

  const menuItems = [
    { id: 'akun', label: 'Akun', icon: 'user' },
    { id: 'privasi', label: 'Privasi & Keamanan', icon: 'lock' },
    { id: 'notifikasi', label: 'Notifikasi', icon: 'bell' },
    { id: 'laporan', label: 'Laporan', icon: 'flag' },
    { id: 'bantuan', label: 'Bantuan & Dukungan', icon: 'help' },
  ];

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'user': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
      case 'lock': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
      case 'bell': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
      case 'flag': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5 5 0 006 0m-6 0a5 5 0 006 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5 5 0 006 0m-6 0a5 5 0 006 0M18 7l3 9" /></svg>;
      case 'help': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      default: return null;
    }
  };

  const Toggle = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#234c6a]"></div>
    </label>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'akun':
        return (
          <div>
            {/* Foto Profil */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">Foto Profil</h3>
              <div className="flex items-start gap-6 flex-wrap">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-[#e5e0d8]">
                    {previewFoto ? <img src={previewFoto} alt="Foto" className="w-full h-full object-cover" /> : <span className="text-3xl text-gray-400">📷</span>}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer border border-gray-300">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <input type="file" accept="image/*" onChange={handleUploadFoto} hidden />
                  </label>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-2">Format JPG, PNG, Maksimal 5 MB</p>
                  <div className="flex gap-3">
                    <label className="bg-[#234c6a] text-white px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-[#1a3d55] transition">
                      Upload Foto
                      <input type="file" accept="image/*" onChange={handleUploadFoto} hidden />
                    </label>
                    <button onClick={() => setShowHapusFotoModal(true)} className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-sm font-medium border border-red-200 hover:bg-red-100 transition">Hapus</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Pribadi */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Informasi Pribadi</h3>
              <div className="space-y-4">
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Nama Lengkap</label><input type="text" value={profil.namaLengkap} onChange={e => setProfil({...profil, namaLengkap: e.target.value})} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg text-sm" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Email</label><div className="flex items-center border border-[#e5e0d8] rounded-lg px-3 py-2"><svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg><input type="email" value={profil.email} onChange={e => setProfil({...profil, email: e.target.value})} className="flex-1 bg-transparent outline-none text-sm" /></div></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Nomor Telepon</label><div className="flex items-center border border-[#e5e0d8] rounded-lg px-3 py-2"><svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><input type="text" value={profil.nomorTelepon} onChange={e => setProfil({...profil, nomorTelepon: e.target.value})} className="flex-1 bg-transparent outline-none text-sm" /></div></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Lokasi</label><div className="flex items-center border border-[#e5e0d8] rounded-lg px-3 py-2"><svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><input type="text" value={profil.lokasi} onChange={e => setProfil({...profil, lokasi: e.target.value})} className="flex-1 bg-transparent outline-none text-sm" /></div></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Profesi</label><div className="flex items-center border border-[#e5e0d8] rounded-lg px-3 py-2"><svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><input type="text" value={profil.profesi} onChange={e => setProfil({...profil, profesi: e.target.value})} className="flex-1 bg-transparent outline-none text-sm" /></div></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Skill Yang Diminati</label><input type="text" value={profil.skillDiminati} onChange={e => setProfil({...profil, skillDiminati: e.target.value})} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg text-sm" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Skill Yang Dikuasai</label><input type="text" value={profil.skillDikuasai} onChange={e => setProfil({...profil, skillDikuasai: e.target.value})} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg text-sm" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Bio</label><textarea rows="3" value={profil.bio} onChange={e => setProfil({...profil, bio: e.target.value})} className="w-full px-3 py-2 border border-[#e5e0d8] rounded-lg text-sm" /></div>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={batalAkun} className="px-6 py-2 rounded-full text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition">Batal</button>
              <button onClick={simpanAkun} className="bg-[#234c6a] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#1a3d55] transition">Simpan Perubahan</button>
            </div>
          </div>
        );

      case 'privasi':
        return (
          <div>
            <h2 className="font-serif text-xl font-bold mb-4">Privasi & Keamanan</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <span className="text-sm font-medium text-gray-700">Siapa yang bisa mengirim pesan?</span>
                <select value={privasi.siapaBisaChat} onChange={e => setPrivasi({...privasi, siapaBisaChat: e.target.value})} className="border border-[#e5e0d8] rounded-lg px-3 py-1 text-sm">
                  <option value="semua">Semua orang</option>
                  <option value="koneksi">Hanya koneksi</option>
                  <option value="tidakada">Tidak ada</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Tampilkan status online</span>
                <Toggle checked={privasi.tampilkanStatusOnline} onChange={e => setPrivasi({...privasi, tampilkanStatusOnline: e.target.checked})} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Profil dapat dilihat publik</span>
                <Toggle checked={privasi.profilPublic} onChange={e => setPrivasi({...privasi, profilPublic: e.target.checked})} />
              </div>

              <div className="flex justify-between items-center flex-wrap gap-3 border-t pt-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Autentifikasi Dua Faktor</span>
                  <p className="text-xs text-gray-500">Tingkatkan keamanan akun dengan memerlukan kode tambahan saat login.</p>
                </div>
                <Toggle checked={privasi.twoFactorEnabled} onChange={e => setPrivasi({...privasi, twoFactorEnabled: e.target.checked})} />
              </div>

              <div className="mt-2 pt-2 border-t">
                <h3 className="font-semibold text-gray-800 mb-2">Keamanan</h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-[#e5e0d8]">
                  <button onClick={() => setShowUbahPasswordModal(true)} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                    Ubah Password
                  </button>
                </div>
              </div>
            </div>
            <button onClick={simpanPrivasi} className="mt-6 bg-[#234c6a] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#1a3d55] transition">Simpan</button>
          </div>
        );

      case 'notifikasi':
        return (
          <div>
            <h2 className="font-serif text-xl font-bold mb-4">Notifikasi</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1"><span className="text-sm font-medium text-gray-700">Email - Pesan baru</span><p className="text-xs text-gray-400">Dapatkan notifikasi email ketika ada pesan baru</p></div>
                <Toggle checked={notifikasi.emailBaru} onChange={e => setNotifikasi({...notifikasi, emailBaru: e.target.checked})} />
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1"><span className="text-sm font-medium text-gray-700">Email - Pembaruan dari partner</span><p className="text-xs text-gray-400">Notifikasi email tentang pembaruan dari partner belajar</p></div>
                <Toggle checked={notifikasi.emailPembaruan} onChange={e => setNotifikasi({...notifikasi, emailPembaruan: e.target.checked})} />
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1"><span className="text-sm font-medium text-gray-700">Push notifikasi - Pesan baru</span><p className="text-xs text-gray-400">Notifikasi langsung di browser saat pesan baru masuk</p></div>
                <Toggle checked={notifikasi.pushBaru} onChange={e => setNotifikasi({...notifikasi, pushBaru: e.target.checked})} />
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1"><span className="text-sm font-medium text-gray-700">Push notifikasi - Partner merespons</span><p className="text-xs text-gray-400">Notifikasi saat partner membalas pesan Anda</p></div>
                <Toggle checked={notifikasi.pushRespons} onChange={e => setNotifikasi({...notifikasi, pushRespons: e.target.checked})} />
              </div>
            </div>
            <button onClick={simpanNotifikasi} className="mt-6 bg-[#234c6a] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#1a3d55] transition">Simpan</button>
          </div>
        );

      case 'laporan':
        return (
          <div>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {previewFoto ? <img src={previewFoto} alt="Profil" className="w-full h-full object-cover" /> : <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                </div>
              </div>
              <h2 className="font-semibold text-lg text-gray-800">Laporkan Pengguna</h2>
              <p className="text-sm text-gray-600 mt-1">{profil.namaLengkap}</p>
            </div>
            <form onSubmit={kirimLaporan} className="space-y-3">
              <div className="space-y-2">
                {["Konten tidak pantas", "Spam atau penipuan skill", "Pelecehan atau bullying", "Akun palsu / duplikat", "Lainnya"].map((label, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-transparent hover:border-gray-200">
                    <input type="radio" id={`jenis${idx}`} name="jenis" value={label} checked={laporan.jenis === label} onChange={e => setLaporan({...laporan, jenis: e.target.value})} className="w-4 h-4 accent-[#234c6a]" />
                    <label htmlFor={`jenis${idx}`} className="text-sm font-medium text-gray-800 cursor-pointer flex-1">{label}</label>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                ))}
              </div>
              {laporan.jenis && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label><textarea rows="3" value={laporan.keterangan} onChange={e => setLaporan({...laporan, keterangan: e.target.value})} className="w-full border border-[#e5e0d8] rounded-lg px-3 py-2 text-sm" required></textarea></div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bukti (Foto/Video/File) - bisa pilih beberapa</label>
                    <label className="flex items-center justify-between gap-2 border-2 border-dashed border-[#e5e0d8] rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition">
                      <div className="flex items-center gap-2"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg><span className="text-sm text-gray-600">Pilih file</span></div>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple accept="image/*,video/*,.pdf,.doc,.docx" />
                    </label>
                    {laporan.bukti.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {laporan.bukti.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                            <span className="text-xs text-gray-700 truncate max-w-[200px]">{file.name}</span>
                            <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button type="submit" className={`w-full px-6 py-2 rounded-full text-sm font-semibold transition mt-6 ${laporan.jenis && laporan.keterangan && laporan.bukti.length > 0 ? 'bg-[#234c6a] text-white hover:bg-[#1a3d55]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Kirim</button>
                </div>
              )}
            </form>
          </div>
        );

      case 'bantuan':
        return (
          <div>
            <h2 className="font-serif text-xl font-bold mb-4">Bantuan & Dukungan</h2>
            <div className="space-y-4 mb-6">
              <div className="border-b pb-2"><p className="font-semibold">❓ Bagaimana cara memulai?</p><p className="text-sm text-gray-600">Lengkapi profil, cari partner, kirim chat, atur jadwal belajar.</p></div>
              <div className="border-b pb-2"><p className="font-semibold">💰 Apakah SkillSwap gratis?</p><p className="text-sm text-gray-600">Ya, SkillSwap sepenuhnya gratis.</p></div>
              <div className="border-b pb-2"><p className="font-semibold">🚨 Bagaimana melaporkan pengguna?</p><p className="text-sm text-gray-600">Gunakan tab Laporan di sini atau dari profil pengguna.</p></div>
              <div className="border-b pb-2"><p className="font-semibold">🔑 Bagaimana mengubah kata sandi?</p><p className="text-sm text-gray-600">Silakan hubungi dukungan melalui form di bawah ini.</p></div>
            </div>
            <h3 className="font-semibold mb-2">Kirim Pesan Dukungan</h3>
            <form onSubmit={kirimPesanBantuan} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Anda</label><input type="email" value={bantuan.email} onChange={e => setBantuan({...bantuan, email: e.target.value})} className="w-full border border-[#e5e0d8] rounded-lg px-3 py-2 text-sm" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label><textarea rows="3" value={bantuan.pesan} onChange={e => setBantuan({...bantuan, pesan: e.target.value})} className="w-full border border-[#e5e0d8] rounded-lg px-3 py-2 text-sm" required></textarea></div>
              <button type="submit" className="bg-[#234c6a] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#1a3d55] transition">Kirim Pesan</button>
              {bantuan.status && <p className="text-sm text-green-600">{bantuan.status}</p>}
            </form>
          </div>
        );

      default:
        return <div className="text-center py-12 text-gray-500">Halaman sedang dalam pengembangan.</div>;
    }
  };

  const UbahPasswordModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowUbahPasswordModal(false)}>
      <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Ubah Password</h3>
          <button onClick={() => setShowUbahPasswordModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="space-y-3">
          <input type="password" placeholder="Password Lama" value={passwordForm.lama} onChange={e => setPasswordForm({...passwordForm, lama: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          <input type="password" placeholder="Password Baru" value={passwordForm.baru} onChange={e => setPasswordForm({...passwordForm, baru: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          <input type="password" placeholder="Konfirmasi Password Baru" value={passwordForm.konfirmasi} onChange={e => setPasswordForm({...passwordForm, konfirmasi: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowUbahPasswordModal(false)} className="px-4 py-2 rounded-lg border border-gray-300">Batal</button>
          <button onClick={handleUbahPassword} className="px-4 py-2 rounded-lg bg-[#234c6a] text-white">Simpan</button>
        </div>
      </div>
    </div>
  );

  const HapusAkunModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowHapusAkunModal(false)}>
      <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-red-600">Hapus Akun</h3>
          <button onClick={() => setShowHapusAkunModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <p className="text-gray-600">Apakah Anda yakin ingin menghapus akun? Tindakan ini permanen dan tidak dapat dibatalkan.</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowHapusAkunModal(false)} className="px-4 py-2 rounded-lg border border-gray-300">Tidak</button>
          <button onClick={handleHapusAkun} className="px-4 py-2 rounded-lg bg-red-600 text-white">Ya, Hapus</button>
        </div>
      </div>
    </div>
  );

  const LogoutModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLogoutModal(false)}>
      <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Keluar</h3>
          <button onClick={() => setShowLogoutModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <p className="text-gray-600">Apakah Anda yakin ingin keluar?</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 rounded-lg border border-gray-300">Tidak</button>
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-600 text-white">Ya, Keluar</button>
        </div>
      </div>
    </div>
  );

  const HapusFotoModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowHapusFotoModal(false)}>
      <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Konfirmasi Hapus Foto</h3>
          <button onClick={() => setShowHapusFotoModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <p className="text-gray-600">Apakah yakin akan menghapus foto profil?</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowHapusFotoModal(false)} className="px-4 py-2 rounded-lg border border-gray-300">Batal</button>
          <button onClick={handleHapusFoto} className="px-4 py-2 rounded-lg bg-red-600 text-white">Hapus</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <Navbar />
      <div className="max-w-7xl w-full mx-auto px-5 py-8 flex-1">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">Pengaturan</h1>
          <p className="text-gray-500 mt-1">Kelola akun dan preferensi Anda</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 bg-white rounded-2xl shadow-sm border border-[#e5e0d8] overflow-hidden h-fit">
            <div className="py-2">
              {menuItems.map(item => (
                <div key={item.id} onClick={() => handleTabChange(item.id)} className={`flex items-center justify-between px-5 py-3 cursor-pointer transition ${activeTab === item.id ? 'bg-blue-50 text-[#234c6a] border-l-4 border-l-[#234c6a]' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">{renderIcon(item.icon)}<span className="text-sm font-medium">{item.label}</span></div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              ))}
              <div className="border-t border-[#e5e0d8] my-2"></div>
              
              {/* Logout */}
              <div onClick={() => setShowLogoutModal(true)} className="flex items-center justify-between px-5 py-3 cursor-pointer text-red-600 hover:bg-red-50 transition">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm font-medium">Keluar</span>
                </div>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Hapus Akun - di bawah Keluar */}
              <div onClick={() => setShowHapusAkunModal(true)} className="flex items-center justify-between px-5 py-3 cursor-pointer text-red-600 hover:bg-red-50 transition mt-1">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-sm font-medium">Hapus Akun</span>
                </div>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#e5e0d8] p-6 md:p-8">{renderContent()}</div>
        </div>
      </div>
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">© 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.</footer>
      <FloatingChatButton />

      {toast.show && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {toast.message}
        </div>
      )}

      {showUbahPasswordModal && <UbahPasswordModal />}
      {showHapusAkunModal && <HapusAkunModal />}
      {showLogoutModal && <LogoutModal />}
      {showHapusFotoModal && <HapusFotoModal />}
    </div>
  );
};

export default Pengaturan;