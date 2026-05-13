import { Link } from 'react-router-dom';
import { useState } from 'react';
import heroBg from './images/hero-bg.jpg'; 

const LandingPage = () => {
  const [searchVal, setSearchVal] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* CSS khusus untuk ticker - satu-satunya bagian yang tidak pakai Tailwind */}
      <style>{`
        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background-color: #234c6a;
          padding: 12px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .ticker {
          display: flex;
          width: max-content;
          animation: tickerScroll 20s linear infinite;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-right: 24px;
          flex-shrink: 0;
        }
        .ticker-dot {
          width: 5px;
          height: 5px;
          background-color: #f5c842;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      <div className="bg-[#fcf5e8] font-sans min-h-screen flex flex-col">
        {/* Navbar - Tailwind semua */}
        <nav className="bg-[#fcf5e8] border-b border-[#e5e0d8] sticky top-0 z-50 py-3 px-5 md:px-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-extrabold text-[#234c6a] text-lg">SkillSwap</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#features" className="hover:text-[#234c6a]">Fitur</a>
              <a href="#categories" className="hover:text-[#234c6a]">Kategori</a>
              <a href="#how-it-works" className="hover:text-[#234c6a]">Cara Kerja</a>
              <a href="#testimonials" className="hover:text-[#234c6a]">Testimoni</a>
            </div>
            
            <div className="hidden md:flex gap-3">
              <Link to="/register"><button className="border border-[#234c6a] text-[#234c6a] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#234c6a] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">Daftar</button></Link>
              <Link to="/login"><button className="bg-[#234c6a] border border-[#234c6a] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#fcf5e8] hover:text-[#234c6a] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">Masuk</button></Link>
            </div>
            
            {/* Hamburger button for mobile */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6 text-[#234c6a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-[#e5e0d8] flex flex-col gap-3 pb-2">
              <a href="#features" className="hover:text-[#234c6a] text-gray-700 py-1" onClick={() => setIsMenuOpen(false)}>Fitur</a>
              <a href="#categories" className="hover:text-[#234c6a] text-gray-700 py-1" onClick={() => setIsMenuOpen(false)}>Kategori</a>
              <a href="#how-it-works" className="hover:text-[#234c6a] text-gray-700 py-1" onClick={() => setIsMenuOpen(false)}>Cara Kerja</a>
              <a href="#testimonials" className="hover:text-[#234c6a] text-gray-700 py-1" onClick={() => setIsMenuOpen(false)}>Testimoni</a>
              <div className="flex gap-3 pt-2">
                <Link to="/register"><button className="border border-[#234c6a] text-[#234c6a] px-4 py-2 rounded-full text-sm font-semibold w-full">Daftar</button></Link>
                <Link to="/login"><button className="bg-[#234c6a] text-white px-5 py-2 rounded-full text-sm font-semibold w-full">Masuk</button></Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero - Tailwind */}
        <section className="bg-[#234c6a] text-white py-20 md:py-28 px-5 md:px-10 flex items-center justify-center min-h-[70vh] relative overflow-hidden">
          <div className="max-w-3xl text-center md:text-left md:mr-auto z-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Tingkatkan Keahlian <br />Bersama Ahli di Bidangnya</h1>
            <p className="text-white/70 text-base md:text-lg mt-4 max-w-xl">SkillSwap menghubungkan Anda dengan profesional untuk berbagi pengetahuan, belajar, dan berkembang bersama ribuan pengguna lainnya.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              <Link to="/register"><button className="bg-[#f5c842] text-black px-8 py-3 rounded-full font-bold shadow-lg hover:translate-y-[-2px] transition">Mulai Sekarang →</button></Link>
              <button className="bg-white/10 border border-white/30 px-8 py-3 rounded-full font-semibold backdrop-blur-sm hover:bg-white/20 transition">Pelajari Lebih Lanjut</button>
            </div>
          </div>
          <div className="absolute right-[-100px] top-[-100px] w-80 h-80 rounded-full bg-[#f5c842]/10 blur-3xl"></div>
          <img 
            src={heroBg}  
            alt="Background belajar"
            className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0"
          />
        </section>

        {/* TICKER - CSS manual (tapi tetap selaras dengan warna Tailwind) */}
        <div className="ticker-wrap">
          <div className="ticker">
            {/* Set pertama */}
            <div className="ticker-item">
              <span className="text-white/90 font-bold text-sm tracking-wider">SKILLSWAP</span>
              <span className="ticker-dot"></span>
              <span className="text-white/90 font-bold text-sm tracking-wider">BERBAGI ILMU</span>
              <span className="ticker-dot"></span>
              <span className="text-white/90 font-bold text-sm tracking-wider">BELAJAR BERSAMA</span>
            </div>
            {/* Set kedua - duplikasi persis, tanpa tambahan apapun */}
            <div className="ticker-item">
              <span className="text-white/90 font-bold text-sm tracking-wider">SKILLSWAP</span>
              <span className="ticker-dot"></span>
              <span className="text-white/90 font-bold text-sm tracking-wider">BERBAGI ILMU</span>
              <span className="ticker-dot"></span>
              <span className="text-white/90 font-bold text-sm tracking-wider">BELAJAR BERSAMA</span>
            </div>
          </div>
        </div>

        {/* Section: Temukan Pasangan Belajar */}
        <section className="mt-20 px-5 md:px-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 text-center"># Temukan Pasangan Belajar yang Tepat</h2>
            <p className="text-gray-600 text-base md:text-lg mt-4 leading-relaxed text-center">
              SkillSwap membantu Anda menemukan partner yang sempurna untuk bertukar keahlian. 
              Tidak perlu membayar kursus mahal, cukup tukarkan skill Anda dengan orang lain 
              dan belajar bersama-sama untuk mencapai tujuan yang lebih besar.
            </p>
          </div>
        </section>

        {/* Categories - Tailwind */}
        <section id="categories" className="py-16 px-5 md:px-10 bg-[#fcf5e8]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">Kategori Keahlian Populer</h2>
            <p className="text-gray-500 mt-2 mb-10">Eksplorasi berbagai bidang yang paling banyak dicari</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[ 
                { icon:"💻", name:"Programming", count:"1.200+" },
                { icon:"🎨", name:"Design", count:"800+" },
                { icon:"📷", name:"Fotografi", count:"520+" },
                { icon:"📚", name:"Bahasa", count:"980+" },
                { icon:"📊", name:"Marketing", count:"650+" },
                { icon:"🎵", name:"Musik", count:"430+" },
                { icon:"🎬", name:"Videografi", count:"380+" },
                { icon:"🤖", name:"AI & ML", count:"290+" }
              ].map(cat => (
                <div key={cat.name} className="border border-[#e5e0d8] rounded-xl p-5 bg-white shadow-md cursor-pointer hover:bg-[#fcf5e8] hover:border-[#234c6a] hover:shadow-[0_4px_12px_#234c6a] hover:-translate-y-1 transition">
                  <div className="text-3xl">{cat.icon}</div>
                  <h4 className="font-bold text-gray-800 mt-2">{cat.name}</h4>
                  <span className="text-xs text-gray-400">{cat.count} Partner</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Testimoni */}
        <section id="testimonials" className="py-16 px-5 md:px-10 bg-[#fcf5e8]">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-[#e5e0d8]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#234c6a] rounded-full flex items-center justify-center text-white font-bold text-lg">Y</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Yasmine Shavira Ahmad</h4>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">✓</span>
                    <span className="text-xs text-gray-500">Verified</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "Berkat SkillSwap, saya berhasil menguasai React dalam 2 bulan sambil mengajarkan UI/UX ke partner saya. 
                Sekarang saya bekerja sebagai Full-stack Developer!"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-block bg-[#fcf5e8] px-3 py-1 rounded-full text-xs font-semibold text-[#234c6a] border border-[#234c6a]/20">
                  React JS ⇔ UI/UX Design · 15 Sesi
                </div>
                <button 
                  onClick={() => {
                    if (liked) {
                      setLikeCount(likeCount - 1);
                    } else {
                      setLikeCount(likeCount + 1);
                    }
                    setLiked(!liked);
                  }}
                  className={`flex items-center gap-1 text-sm transition-all duration-200 ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                >
                  {liked ? '❤️' : '🤍'} {likeCount}
                </button>
              </div>
            </div>
        </section>

        {/* How It Works - Cara Kerja dalam kotak */}
        <section id="how-it-works" className="py-16 px-5 md:px-10 bg-[#fcf5e8]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center">Mulai Dalam 3 Langkah Mudah</h2>
            <p className="text-gray-500 text-center mt-2 mb-12">Proses yang dirancang untuk memudahkan perjalanan keahlian Anda</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-[#234c6a] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-bold text-lg text-gray-800">Cari Partner</h3>
                <p className="text-gray-500 text-sm mt-2">Temukan partner yang memiliki keahlian yang ingin kamu pelajari</p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-[#f5c842] text-black rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                <div className="text-3xl mb-2">📬</div>
                <h3 className="font-bold text-lg text-gray-800">Kirim Request</h3>
                <p className="text-gray-500 text-sm mt-2">Kirim permintaan dan diskusikan jadwal belajar bersama</p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-[#234c6a] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
                <div className="text-3xl mb-2">🎓</div>
                <h3 className="font-bold text-lg text-gray-800">Mulai Belajar</h3>
                <p className="text-gray-500 text-sm mt-2">Lakukan sesi pertukaran pengetahuan dan berkembang bersama</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Tailwind */}
        <section className="py-20 px-5 md:px-10 bg-[#234c6a] text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Siap Memulai Perjalananmu?</h2>
          <p className="text-white/70 mt-2 mb-8 max-w-lg mx-auto">Bergabung bersama ribuan pengguna yang telah meningkatkan keahlian mereka.</p>
          <Link to="/register"><button className="bg-[#f5c842] text-black px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#fcf5e8] hover:text-[#234c6a] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">Daftar Gratis Sekarang →</button></Link>
        </section>

        {/* Footer - Tailwind, borderless */}
        <footer className="bg-[#234c6a] text-white/60 py-8 px-5 md:px-10 text-center text-sm border-t-2">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-[#f5c842] rounded-md flex items-center justify-center text-black font-bold text-xs">S</div><span className="font-semibold text-white">SkillSwap</span></div>
            <p>© 2025 SkillSwap.</p>
            <div className="flex gap-4"><a href="#" className="hover:text-white">Tentang</a><a href="#" className="hover:text-white">Privasi</a><a href="#" className="hover:text-white">Kontak</a></div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;