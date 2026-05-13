// src/pages/User/Pengaturan.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';

const Pengaturan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('akun'); // akun, privasi, notifikasi, preferensi, laporan, bantuan

  // State untuk Akun (edit profil)
  const [profil, setProfil] = useState({
    namaLengkap: '',
    email: '',
    nomorTelepon: '',
    lokasi: '',
    profesi: '',
    bio: '',
    fotoProfil: ''
  });
  const [previewFoto, setPreviewFoto] = useState('');

  // State untuk Privasi
  const [privasi, setPrivasi] = useState({
    siapaBisaChat: 'semua', // semua, koneksi, tidakada
    tampilkanStatusOnline: true,
    profilPublic: true
  });

  // State untuk Notifikasi
  const [notifikasi, setNotifikasi] = useState({
    emailBaru: true,
    emailPembaruan: false,
    pushBaru: true,
    pushRespons: true,
    suara: false
  });

  // State untuk Preferensi
  const [preferensi, setPreferensi] = useState({
    tema: 'terang', // terang, gelap, sistem
    bahasa: 'id',
    minatSkill: '',
    kuasaiSkill: ''
  });

  // State untuk Laporan (simulasi)
  const [laporan, setLaporan] = useState({
    userId: '',
    jenis: '',
    keterangan: ''
  });

  // State untuk Bantuan (form kontak)
  const [bantuan, setBantuan] = useState({
    email: '',
    pesan: '',
    status: ''
  });

  // Load data dari localStorage saat pertama kali
  useEffect(() => {
    const savedProfil = localStorage.getItem('userProfile');
    if (savedProfil) {
      const data = JSON.parse(savedProfil);
      setProfil(data);
      setPreviewFoto(data.fotoProfil || '');
    } else {
      // Data default
      const defaultProfil = {
        namaLengkap: 'Amira Salma Nafisa',
        email: 'asimamafisa@student.ub.ac.id',
        nomorTelepon: '+62 812-3456-7890',
        lokasi: 'Malang, Indonesia',
        profesi: 'Software Engineer',
        bio: 'Full Stack Developer yang passionate tentang web technologies',
        fotoProfil: ''
      };
      setProfil(defaultProfil);
      setPreviewFoto('');
    }

    const savedPrivasi = localStorage.getItem('privasi');
    if (savedPrivasi) setPrivasi(JSON.parse(savedPrivasi));
    const savedNotifikasi = localStorage.getItem('notifikasi');
    if (savedNotifikasi) setNotifikasi(JSON.parse(savedNotifikasi));
    const savedPreferensi = localStorage.getItem('preferensi');
    if (savedPreferensi) setPreferensi(JSON.parse(savedPreferensi));
  }, []);

  // Simpan data ke localStorage
  const simpanAkun = () => {
    localStorage.setItem('userProfile', JSON.stringify(profil));
    alert('Informasi akun disimpan!');
  };
  const simpanPrivasi = () => {
    localStorage.setItem('privasi', JSON.stringify(privasi));
    alert('Pengaturan privasi disimpan!');
  };
  const simpanNotifikasi = () => {
    localStorage.setItem('notifikasi', JSON.stringify(notifikasi));
    alert('Pengaturan notifikasi disimpan!');
  };
  const simpanPreferensi = () => {
    localStorage.setItem('preferensi', JSON.stringify(preferensi));
    alert('Preferensi disimpan!');
  };

  const handleUploadFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
        setProfil({ ...profil, fotoProfil: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleHapusFoto = () => {
    setPreviewFoto('');
    setProfil({ ...profil, fotoProfil: '' });
  };

  // Kirim laporan (simulasi)
  const kirimLaporan = (e) => {
    e.preventDefault();
    if (!laporan.jenis) {
      alert('Pilih jenis pelanggaran');
      return;
    }
    const reportData = { ...laporan, timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('reports') || '[]');
    existing.push(reportData);
    localStorage.setItem('reports', JSON.stringify(existing));
    alert('Laporan terkirim. Terima kasih.');
    setLaporan({ userId: '', jenis: '', keterangan: '' });
  };

  // Kirim pesan bantuan
  const kirimPesanBantuan = (e) => {
    e.preventDefault();
    if (!bantuan.email || !bantuan.pesan) {
      setBantuan({ ...bantuan, status: 'Harap isi email dan pesan.' });
      return;
    }
    console.log('Pesan bantuan:', bantuan);
    setBantuan({ ...bantuan, status: 'Pesan terkirim! Kami akan merespon dalam 1x24 jam.', pesan: '' });
    setTimeout(() => setBantuan((prev) => ({ ...prev, status: '' })), 5000);
  };

  // Keluar (logout)
  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('userLoggedIn'); // asumsikan ada flag session
      navigate('/login');
    }
  };

  // Render konten berdasarkan activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'akun':
        return (
          <div className="tab-content">
            <h2>Akun</h2>
            <p>Edit profil Anda</p>
            <div className="photo-section">
              <div className="photo-preview">{previewFoto ? <img src={previewFoto} alt="foto" /> : <span>📷</span>}</div>
              <div className="photo-actions">
                <label className="btn-upload">Upload Foto<input type="file" accept="image/*" onChange={handleUploadFoto} hidden /></label>
                <button onClick={handleHapusFoto} className="btn-delete">Hapus</button>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-field"><label>Nama Lengkap</label><input type="text" value={profil.namaLengkap} onChange={e => setProfil({...profil, namaLengkap: e.target.value})} /></div>
              <div className="form-field"><label>Email</label><input type="email" value={profil.email} onChange={e => setProfil({...profil, email: e.target.value})} /></div>
              <div className="form-field"><label>Nomor Telepon</label><input type="text" value={profil.nomorTelepon} onChange={e => setProfil({...profil, nomorTelepon: e.target.value})} /></div>
              <div className="form-field"><label>Lokasi</label><input type="text" value={profil.lokasi} onChange={e => setProfil({...profil, lokasi: e.target.value})} /></div>
              <div className="form-field"><label>Profesi</label><input type="text" value={profil.profesi} onChange={e => setProfil({...profil, profesi: e.target.value})} /></div>
              <div className="form-field full-width"><label>Bio</label><textarea rows="3" value={profil.bio} onChange={e => setProfil({...profil, bio: e.target.value})}></textarea></div>
            </div>
            <button className="btn-save" onClick={simpanAkun}>Simpan Perubahan</button>
          </div>
        );
      case 'privasi':
        return (
          <div className="tab-content">
            <h2>Privasi & Keamanan</h2>
            <div className="setting-item"><label>Siapa yang dapat mengirim pesan?</label><select value={privasi.siapaBisaChat} onChange={e => setPrivasi({...privasi, siapaBisaChat: e.target.value})}><option value="semua">Semua orang</option><option value="koneksi">Hanya koneksi</option><option value="tidakada">Tidak ada</option></select></div>
            <div className="setting-item"><label>Tampilkan status online</label><input type="checkbox" checked={privasi.tampilkanStatusOnline} onChange={e => setPrivasi({...privasi, tampilkanStatusOnline: e.target.checked})} /></div>
            <div className="setting-item"><label>Profil dapat dilihat publik</label><input type="checkbox" checked={privasi.profilPublic} onChange={e => setPrivasi({...privasi, profilPublic: e.target.checked})} /></div>
            <button className="btn-save" onClick={simpanPrivasi}>Simpan</button>
          </div>
        );
      case 'notifikasi':
        return (
          <div className="tab-content">
            <h2>Notifikasi</h2>
            <div className="setting-item"><label>Email - Pesan baru</label><input type="checkbox" checked={notifikasi.emailBaru} onChange={e => setNotifikasi({...notifikasi, emailBaru: e.target.checked})} /></div>
            <div className="setting-item"><label>Email - Pembaruan partner</label><input type="checkbox" checked={notifikasi.emailPembaruan} onChange={e => setNotifikasi({...notifikasi, emailPembaruan: e.target.checked})} /></div>
            <div className="setting-item"><label>Push - Pesan baru</label><input type="checkbox" checked={notifikasi.pushBaru} onChange={e => setNotifikasi({...notifikasi, pushBaru: e.target.checked})} /></div>
            <div className="setting-item"><label>Push - Partner merespons</label><input type="checkbox" checked={notifikasi.pushRespons} onChange={e => setNotifikasi({...notifikasi, pushRespons: e.target.checked})} /></div>
            <div className="setting-item"><label>Suara notifikasi</label><input type="checkbox" checked={notifikasi.suara} onChange={e => setNotifikasi({...notifikasi, suara: e.target.checked})} /></div>
            <button className="btn-save" onClick={simpanNotifikasi}>Simpan</button>
          </div>
        );
      case 'preferensi':
        return (
          <div className="tab-content">
            <h2>Preferensi</h2>
            <div className="setting-item"><label>Tema</label><select value={preferensi.tema} onChange={e => setPreferensi({...preferensi, tema: e.target.value})}><option value="terang">Terang</option><option value="gelap">Gelap</option><option value="sistem">Ikuti sistem</option></select></div>
            <div className="setting-item"><label>Bahasa</label><select value={preferensi.bahasa} onChange={e => setPreferensi({...preferensi, bahasa: e.target.value})}><option value="id">Indonesia</option><option value="en">English</option></select></div>
            <div className="setting-item"><label>Skill yang diminati (pisahkan koma)</label><input type="text" value={preferensi.minatSkill} onChange={e => setPreferensi({...preferensi, minatSkill: e.target.value})} placeholder="React, UI/UX" /></div>
            <div className="setting-item"><label>Skill yang dikuasai</label><input type="text" value={preferensi.kuasaiSkill} onChange={e => setPreferensi({...preferensi, kuasaiSkill: e.target.value})} placeholder="Python, Data Analysis" /></div>
            <button className="btn-save" onClick={simpanPreferensi}>Simpan</button>
          </div>
        );
      case 'laporan':
        return (
          <div className="tab-content">
            <h2>Laporkan Pengguna</h2>
            <form onSubmit={kirimLaporan}>
              <div className="form-field"><label>ID Pengguna (atau nama)</label><input type="text" value={laporan.userId} onChange={e => setLaporan({...laporan, userId: e.target.value})} placeholder="Nama atau ID pengguna" required /></div>
              <div className="form-field"><label>Jenis Pelanggaran</label><select value={laporan.jenis} onChange={e => setLaporan({...laporan, jenis: e.target.value})} required><option value="">Pilih</option><option>Konten tidak pantas</option><option>Spam atau penipuan skill</option><option>Pelecehan atau bullying</option><option>Akun palsu / duplikat</option><option>Lainnya</option></select></div>
              <div className="form-field full-width"><label>Keterangan tambahan</label><textarea rows="3" value={laporan.keterangan} onChange={e => setLaporan({...laporan, keterangan: e.target.value})}></textarea></div>
              <button className="btn-save" type="submit">Kirim Laporan</button>
            </form>
          </div>
        );
      case 'bantuan':
        return (
          <div className="tab-content">
            <h2>Bantuan & Dukungan</h2>
            <p>FAQ singkat:</p>
            <div className="faq-item"><strong>Bagaimana cara memulai?</strong><p>Lengkapi profil, cari partner, kirim chat, atur jadwal belajar.</p></div>
            <div className="faq-item"><strong>Apakah gratis?</strong><p>Ya, SkillSwap sepenuhnya gratis.</p></div>
            <div className="faq-item"><strong>Laporkan pengguna?</strong><p>Gunakan tab Laporan di sini atau dari profil pengguna.</p></div>
            <form onSubmit={kirimPesanBantuan}>
              <div className="form-field"><label>Email Anda</label><input type="email" value={bantuan.email} onChange={e => setBantuan({...bantuan, email: e.target.value})} required /></div>
              <div className="form-field full-width"><label>Pesan</label><textarea rows="3" value={bantuan.pesan} onChange={e => setBantuan({...bantuan, pesan: e.target.value})} required></textarea></div>
              <button className="btn-save" type="submit">Kirim Pesan</button>
              {bantuan.status && <p className="status-msg">{bantuan.status}</p>}
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fcf5e8; }
        .settings-page { min-height: 100vh; background: #fcf5e8; display: flex; flex-direction: column; }
        .settings-container { display: flex; max-width: 1200px; margin: 40px auto; padding: 0 20px; gap: 32px; flex: 1; }
        /* Sidebar */
        .sidebar { width: 260px; background: white; border-radius: 24px; border: 1px solid #e5e0d8; padding: 20px 0; height: fit-content; }
        .sidebar-item { padding: 12px 24px; cursor: pointer; font-weight: 500; color: #4b5563; transition: 0.2s; }
        .sidebar-item:hover { background: #fcf5e8; color: #234c6a; }
        .sidebar-item.active { background: #f0f4f8; color: #234c6a; border-left: 3px solid #234c6a; font-weight: 600; }
        .sidebar-logout { margin-top: 20px; border-top: 1px solid #e5e0d8; padding-top: 16px; color: #ef4444; }
        /* Main content */
        .main-content { flex: 1; background: white; border-radius: 24px; border: 1px solid #e5e0d8; padding: 32px; }
        .tab-content h2 { font-family: 'Fraunces', serif; margin-bottom: 8px; }
        .tab-content p { color: #6b7280; margin-bottom: 24px; }
        .photo-section { display: flex; gap: 24px; align-items: center; margin-bottom: 24px; flex-wrap: wrap; }
        .photo-preview { width: 80px; height: 80px; background: #e5e0d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .photo-preview img { width: 100%; height: 100%; object-fit: cover; }
        .btn-upload, .btn-delete { padding: 6px 16px; border-radius: 30px; border: 1px solid #234c6a; background: white; cursor: pointer; }
        .btn-delete { border-color: #ef4444; color: #ef4444; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .full-width { grid-column: span 2; }
        .form-field input, .form-field select, .form-field textarea { padding: 10px; border: 1px solid #e5e0d8; border-radius: 12px; font-family: inherit; }
        .setting-item { margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .btn-save { background: #234c6a; color: white; border: none; padding: 10px 24px; border-radius: 30px; cursor: pointer; font-weight: 600; margin-top: 16px; }
        .status-msg { margin-top: 16px; color: #16a34a; }
        footer { background: #1f2937; color: #9ca3af; text-align: center; padding: 24px; margin-top: 48px; }
        @media (max-width: 768px) { .settings-container { flex-direction: column; } .sidebar { width: 100%; } .form-grid { grid-template-columns: 1fr; } .full-width { grid-column: span 1; } }
      `}</style>

      <div className="settings-page">
        <Navbar />
        <div className="settings-container">
          <div className="sidebar">
            <div className={`sidebar-item ${activeTab === 'akun' ? 'active' : ''}`} onClick={() => setActiveTab('akun')}>Akun</div>
            <div className={`sidebar-item ${activeTab === 'privasi' ? 'active' : ''}`} onClick={() => setActiveTab('privasi')}>Privasi</div>
            <div className={`sidebar-item ${activeTab === 'notifikasi' ? 'active' : ''}`} onClick={() => setActiveTab('notifikasi')}>Notifikasi</div>
            <div className={`sidebar-item ${activeTab === 'preferensi' ? 'active' : ''}`} onClick={() => setActiveTab('preferensi')}>Preferensi</div>
            <div className={`sidebar-item ${activeTab === 'laporan' ? 'active' : ''}`} onClick={() => setActiveTab('laporan')}>Laporan</div>
            <div className={`sidebar-item ${activeTab === 'bantuan' ? 'active' : ''}`} onClick={() => setActiveTab('bantuan')}>Bantuan & Dukungan</div>
            <div className="sidebar-item sidebar-logout" onClick={handleLogout}>Keluar</div>
          </div>
          <div className="main-content">
            {renderContent()}
          </div>
        </div>
        <footer>© 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.</footer>
        <FloatingChatButton />
      </div>
    </>
  );
};

export default Pengaturan;