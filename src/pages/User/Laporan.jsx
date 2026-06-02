// src/pages/User/Laporan.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FloatingChatButton from '../../components/FloatingChatButton';
// Hapus import Navbar karena nanti pakai dari UserLayout

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
    <div className="min-h-screen bg-[#fcf5e8]">
      <div className="container mx-auto max-w-2xl px-5 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-6 md:p-8">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-800">Laporkan Pengguna</h1>
          
          <div className="mt-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[#234c6a] text-white flex items-center justify-center text-lg font-bold">
                {reportedUserName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{reportedUserName}</p>
                <p className="text-xs text-gray-500">ID Pengguna: {userId || 'Tidak diketahui'}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6">Pilih jenis pelanggaran yang sesuai:</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              {violations.map(v => (
                <div key={v} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-transparent hover:border-gray-200">
                  <input
                    type="radio"
                    name="violation"
                    value={v}
                    checked={selectedViolation === v}
                    onChange={() => setSelectedViolation(v)}
                    className="w-4 h-4 accent-[#234c6a]"
                    required
                  />
                  <label className="text-sm font-medium text-gray-800 cursor-pointer flex-1">{v}</label>
                </div>
              ))}
            </div>

            {selectedViolation === "Lainnya...." && (
              <textarea
                className="w-full border border-[#e5e0d8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#234c6a] mt-2"
                rows="3"
                placeholder="Tuliskan alasan lainnya..."
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
              />
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 rounded-full bg-[#234c6a] text-white text-sm font-semibold hover:bg-[#1a3d55] transition"
              >
                Kirim Laporan
              </button>
            </div>
          </form>
        </div>
      </div>
      <FloatingChatButton />
    </div>
  );
};

export default Laporan;