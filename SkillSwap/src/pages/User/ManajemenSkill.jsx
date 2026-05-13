import UserNavbar from '../../components/Navbar';
import { useState } from 'react';
import FloatingChatButton from '../../components/FloatingChatButton';

const ManajemenSkill = () => {
  const [search, setSearch] = useState('');
  const results = [
    { name: 'Faris Nasyid Fuadie', desc: 'Professional designer' },
    { name: 'Farish Nasyid Fuadie', desc: 'Fullstack developer' },
    { name: 'Tatiana Naib Giriwati', desc: 'Data analyst' },
    { name: 'Sekar Saripandi', desc: 'Content creator' },
  ];

  return (
    <div className="bg-[#fcf5e8] font-sans min-h-screen flex flex-col">
      <UserNavbar />
      <div className="flex-1 max-w-7xl mx-auto px-5 py-10">
        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">Manajemen Skill & Pencarian Partner</h1>
        <p className="text-gray-500 mb-6">Cari lebih banyak layanan dan produk yang berbeda-beda!</p>

        {/* Pencarian */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cari partner berdasarkan nama atau skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Hasil Pencarian */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hasil Pencarian (4)</h2>
            <div className="space-y-3">
              {results.map((r, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-[#e5e0d8] flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">{r.name}</h4>
                    <p className="text-sm text-gray-500">{r.desc}</p>
                  </div>
                  <button className="text-[#234c6a] text-sm font-semibold hover:underline">Read More</button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-[#e5e0d8]">
              <h3 className="font-bold text-gray-800 mb-2">Faktor Pencarian</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Pemilik Karya Kunci</li>
                <li>Harga Harga</li>
                <li>Riset</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#e5e0d8]">
              <h3 className="font-bold text-gray-800 mb-2">Layanan Terkini</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Layanan Terkini</li>
                <li>Layanan Terbanyak</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#e5e0d8]">
              <h3 className="font-bold text-gray-800 mb-2">Sejarah Sampai</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Digital Marketing</li>
                <li>Lain-lain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-white border-t border-[#e5e0d8] py-4 text-center text-xs text-gray-400">
        © 2023 SkillSwap — Universiti Brunei Darussalam. All Rights Reserved.
      </footer>
      <FloatingChatButton/>
    </div>
  );
};

export default ManajemenSkill;