import UserNavbar from '../../components/Navbar';
import { useState } from 'react';
import FloatingChatButton from '../../components/FloatingChatButton';

const Notifikasi = () => {
  const [filter, setFilter] = useState('Semua'); // Semua, Menunggu, Diterima, Ditolak

  const notifications = [
    { id: 1, name: 'Farah Nayful Fauzia', role: 'Desainer', action: 'Belajar Figma', time: '2 menit yang lalu', status: 'menunggu' },
    { id: 2, name: 'Yasmine Shavira Ahmad', role: 'Programmer', action: 'Belajar Django', time: '1 jam yang lalu', status: 'menunggu' },
    { id: 3, name: 'Tabina Naila Griselda', role: 'Data Analyst', action: 'mengundang Anda untuk bergabung ke grup "Web Development Indonesia"', time: '3 jam yang lalu', status: 'menunggu' },
    { id: 4, name: 'Ahmad Rizki', role: 'Mobile Developer', action: 'ingin meruntai aktif swap dengan Anda', time: '5 jam yang lalu', status: 'menunggu' },
    { id: 5, name: 'Dewi Lestari', role: 'Graphic Designer', action: 'tertarik untuk bertukar aktif Graphic Design dengan Frontend Development', time: '1 hari yang lalu', status: 'diterima' },
    { id: 6, name: 'Faisal Rahman', role: 'Data Analyst', action: 'ingin terhubung dengan Anda', time: '3 hari yang lalu', status: 'ditolak' },
  ];

  const filtered = notifications.filter(notif => {
    if (filter === 'Semua') return true;
    if (filter === 'Menunggu') return notif.status === 'menunggu';
    if (filter === 'Diterima') return notif.status === 'diterima';
    if (filter === 'Ditolak') return notif.status === 'ditolak';
    return true;
  });

  const handleTerima = (id) => {
    console.log(`Terima notifikasi ${id}`);
    // nanti update status
  };

  const handleTolak = (id) => {
    console.log(`Tolak notifikasi ${id}`);
  };

  return (
    <div className="bg-[#fcf5e8] font-sans min-h-screen flex flex-col">
      <UserNavbar />
      <div className="flex-1 max-w-4xl mx-auto px-5 py-10 w-full">
        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">Notifikasi</h1>
        <p className="text-gray-500 mb-6">Kelola permintaan kinerja dan undangan skill swap</p>

        {/* Filter tabs */}
        <div className="flex gap-4 border-b border-[#e5e0d8] mb-6">
          {['Semua', 'Menunggu', 'Diterima', 'Ditolak'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-2 px-1 text-sm font-medium transition ${
                filter === tab
                  ? 'text-[#234c6a] border-b-2 border-[#234c6a]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab} {tab === 'Diterima' ? '(1)' : tab === 'Ditolak' ? '(1)' : ''}
            </button>
          ))}
        </div>

        {/* Daftar notifikasi */}
        <div className="space-y-4">
          {filtered.map((notif) => (
            <div key={notif.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#e5e0d8]">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{notif.name} - {notif.role}</h3>
                  <p className="text-gray-600 text-sm mt-1">{notif.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
                <div className="flex gap-2">
                  {notif.status === 'menunggu' && (
                    <>
                      <button onClick={() => handleTolak(notif.id)} className="px-3 py-1 text-sm border border-red-400 text-red-500 rounded-full hover:bg-red-50 transition">Tolak</button>
                      <button onClick={() => handleTerima(notif.id)} className="px-3 py-1 text-sm bg-[#234c6a] text-white rounded-full hover:bg-[#1a3d55] transition">Terima</button>
                    </>
                  )}
                  {notif.status === 'diterima' && (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">Diterima</span>
                  )}
                  {notif.status === 'ditolak' && (
                    <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">Ditolak</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-10">Tidak ada notifikasi.</p>
          )}
          <FloatingChatButton/>
          
        </div>
      </div>
    </div>
  );
};

export default Notifikasi;