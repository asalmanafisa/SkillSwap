// src/pages/User/Tentang.jsx atau src/pages/Tentang.jsx
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PublicNavbar from '../../components/PublicNavbar';
import heroBg from './images/hero-bg.jpg';

const Tentang = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <PublicNavbar />

      {/* Hero Section Tentang */}
      <section className="relative bg-[#234c6a] text-white py-16 md:py-24 px-5 md:px-10 overflow-hidden">
        <img src={heroBg} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#f5c842]/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-[#f5c842]/5 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Tentang SkillSwap</h1>
          <p className="text-white/80 text-lg md:text-xl mt-3">Perjalanan Belajar Tanpa Batas</p>
        </div>
      </section>

      {/* Konten Utama - sama seperti sebelumnya */}
      <div className="flex-1 max-w-4xl mx-auto px-5 py-12 md:py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-6 md:p-10">
          <p className="text-gray-700 leading-relaxed mb-6 text-base">
            Semua dimulai dengan langkah sederhana. Kamu mencantumkan apa yang kamu kuasai dan apa yang ingin kamu pelajari. 
            Sistem kami akan mempertemukan dengan orang-orang yang memiliki kepingan puzzle yang kamu cari.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6 text-base">
            Melalui obrolan, diskusi, dan sesi berbagi, kamu tidak hanya mendapatkan ilmu baru secara cuma-cuma, 
            tetapi juga membangun jaringan pertemanan yang luas dan bermakna.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6 text-base">
            Di SkillSwap, kita tidak hanya belajar tentang hardskill, tapi kita belajar tentang kolaborasi, apresiasi, 
            dan pertumbuhan bersama.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8 text-base">
            Kami mengundangmu untuk berhenti sejenak dari metode belajar yang kaku dan mulailah bertukar inspirasi. 
            Mari bergabung.
          </p>

          <div className="border-l-4 border-[#f5c842] bg-[#fcf5e8] p-5 rounded-r-xl italic text-gray-700 text-center mb-8">
            "Karena ilmu yang dibagikan tidak akan berkurang, ia justru akan berlipat ganda."
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link to="/register">
              <button className="bg-[#f5c842] text-black px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
                Mulai Sekarang →
              </button>
            </Link>
            <Link to="/">
              <button className="bg-white border border-[#234c6a] text-[#234c6a] px-6 py-2.5 rounded-full font-semibold hover:bg-[#234c6a] hover:text-white transition">
                Kembali ke Landing Page
              </button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
        © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Tentang;