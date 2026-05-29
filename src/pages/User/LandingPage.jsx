import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroBg from './images/hero-bg.jpg'; 

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data carousel (rating & ulasan)
  const testimonialsData = [
    {
      name: 'Yasmine Shavira Ahmad',
      avatar: 'Y',
      rating: 4.9,
      text: 'Berkat SkillSwap, saya berhasil menguasai React dalam 2 bulan sambil mengajarkan UI/UX ke partner saya. Sekarang saya bekerja sebagai Full-stack Developer!',
      skill: 'React JS ⇔ UI/UX Design',
      sessions: 15
    },
    {
      name: 'Farah Niyati',
      avatar: 'F',
      rating: 5.0,
      text: 'SkillSwap membantu saya menemukan partner desain yang sangat berbakat. Sesi belajar jadi menyenangkan dan produktif.',
      skill: 'UI/UX Design',
      sessions: 12
    },
    {
      name: 'Rizki Fitriyanti',
      avatar: 'R',
      rating: 4.8,
      text: 'Platform yang luar biasa! Saya bisa belajar bahasa Inggris sambil mengajar programming. Win-win solution!',
      skill: 'Programming ⇔ English',
      sessions: 20
    },
    {
      name: 'Ahmad Fauzi',
      avatar: 'A',
      rating: 4.7,
      text: 'Sangat membantu untuk menemukan partner belajar yang sesuai minat. Prosesnya mudah dan cepat.',
      skill: 'Data Science',
      sessions: 8
    }
  ];

  // Ikon SVG untuk kategori (sama dengan Beranda)
  const getCategoryIcon = (catName) => {
    const icons = {
      'Programming': <svg className="w-8 h-8 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      'Design': <svg className="w-8 h-8 text-pink-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
      'Fotografi': <svg className="w-8 h-8 text-purple-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      'Bahasa': <svg className="w-8 h-8 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
      'Marketing': <svg className="w-8 h-8 text-orange-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
      'Musik': <svg className="w-8 h-8 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
      'Videografi': <svg className="w-8 h-8 text-indigo-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      'AI & ML': <svg className="w-8 h-8 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    };
    return icons[catName] || <span className="text-3xl">📚</span>;
  };

  // Inject Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // Efek carousel: update active card saat scroll
  useEffect(() => {
    const container = document.querySelector('.carousel-container');
    if (!container) return;

    const updateActiveCard = () => {
      const cards = document.querySelectorAll('.carousel-card');
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenter);
        const threshold = cardRect.width * 0.6;

        if (distance < threshold) {
          card.classList.remove('scale-down');
          // update dot indicator
          document.querySelectorAll('.dot').forEach((dot, i) => {
            if (i === idx) dot.classList.add('!w-6', '!bg-[#234c6a]');
            else dot.classList.remove('!w-6', '!bg-[#234c6a]');
          });
        } else {
          card.classList.add('scale-down');
        }
      });
    };

    updateActiveCard();
    container.addEventListener('scroll', updateActiveCard);
    window.addEventListener('resize', updateActiveCard);
    return () => {
      container.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, [testimonialsData]);

  return (
    <>
      {/* CSS untuk ticker dan carousel */}
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
          100% { transform: translateX(-50%); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .carousel-container {
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        .carousel-card {
          scroll-snap-align: start;
        }
        .carousel-card .bg-white {
          transition: all 0.3s ease;
        }
        .carousel-card.scale-down .bg-white {
          transform: scale(0.92);
          opacity: 0.7;
          filter: blur(0.5px);
        }
      `}</style>

      <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
        {/* Navbar - sama dengan style landing page */}
        <nav className="bg-[#fcf5e8] border-b border-[#e5e0d8] sticky top-0 z-50 py-3 px-5 md:px-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-extrabold text-[#234c6a] text-lg">SkillSwap</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#categories" className="hover:text-[#234c6a] transition">Kategori</a>
              <a href="#how-it-works" className="hover:text-[#234c6a] transition">Cara Kerja</a>
              <a href="#testimonials" className="hover:text-[#234c6a] transition">Testimoni</a>
            </div>
            <div className="hidden md:flex gap-3">
              <Link to="/register">
                <button className="border border-[#234c6a] text-[#234c6a] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#234c6a] hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  Daftar
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-[#234c6a] border border-[#234c6a] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#fcf5e8] hover:text-[#234c6a] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  Masuk
                </button>
              </Link>
            </div>
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
          {isMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-[#e5e0d8] flex flex-col gap-3 pb-2">
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

        {/* Hero Section */}
        <section className="bg-[#234c6a] text-white py-20 md:py-28 px-5 md:px-10 flex items-center justify-center min-h-[70vh] relative overflow-hidden" data-aos="fade-up" data-aos-duration="1000">
          <div className="max-w-3xl text-center md:text-left md:mr-auto z-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Tingkatkan Keahlian <br />Bersama Ahli di Bidangnya</h1>
            <p className="text-white/70 text-base md:text-lg mt-4 max-w-xl">SkillSwap menghubungkan Anda dengan profesional untuk berbagi pengetahuan, belajar, dan berkembang bersama ribuan pengguna lainnya.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              <Link to="/register"><button className="bg-[#f5c842] text-black px-8 py-3 rounded-full font-bold shadow-lg hover:translate-y-[-2px] transition">Mulai Sekarang →</button></Link>
              <Link to="/tentang"><button className="bg-white/10 border border-white/30 px-8 py-3 rounded-full font-semibold backdrop-blur-sm hover:bg-white/20 transition">Pelajari Lebih Lanjut</button></Link>
            </div>
          </div>
          <div className="absolute right-[-100px] top-[-100px] w-80 h-80 rounded-full bg-[#f5c842]/10 blur-3xl"></div>
          <img src={heroBg} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0" />
        </section>

        {/* Ticker */}
        <div className="ticker-wrap">
          <div className="ticker">
            <div className="ticker-item">
              <span className="text-white/90 font-bold text-sm tracking-wider">SKILLSWAP</span>
              <span className="ticker-dot"></span>
              <span className="text-white/90 font-bold text-sm tracking-wider">BERBAGI ILMU</span>
              <span className="ticker-dot"></span>
              <span className="text-white/90 font-bold text-sm tracking-wider">BELAJAR BERSAMA</span>
            </div>
            <div className="ticker-item">
              <span className="text-white/90 font-bold text-sm tracking-wider">SKILLSWAP</span>
              <span className="ticker-dot"></span>
              <span className="text-white/90 font-bold text-sm tracking-wider">BERBAGI ILMU</span>
              <span className="ticker-dot"></span>
              <span className="text-white/90 font-bold text-sm tracking-wider">BELAJAR BERSAMA</span>
            </div>
          </div>
        </div>

        {/* Temukan Pasangan */}
        <section className="mt-20 px-5 md:px-10" data-aos="fade-right" data-aos-duration="800">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 text-center"># Temukan Pasangan Belajar yang Tepat</h2>
            <p className="text-gray-600 text-base md:text-lg mt-4 leading-relaxed text-center">
              SkillSwap membantu Anda menemukan partner yang sempurna untuk bertukar keahlian. 
              Tidak perlu membayar kursus mahal, cukup tukarkan skill Anda dengan orang lain 
              dan belajar bersama-sama untuk mencapai tujuan yang lebih besar.
            </p>
          </div>
        </section>

        {/* Categories - dengan icon SVG */}
        <section id="categories" className="py-16 px-5 md:px-10" style={{ backgroundColor: '#fcf5e8' }}>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800" data-aos="fade-up">Kategori Keahlian Populer</h2>
            <p className="text-gray-500 mt-2 mb-10" data-aos="fade-up" data-aos-delay="100">Eksplorasi berbagai bidang yang paling banyak dicari</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[ 
                { name: "Programming", count: "1.200+" },
                { name: "Design", count: "800+" },
                { name: "Fotografi", count: "520+" },
                { name: "Bahasa", count: "980+" },
                { name: "Marketing", count: "650+" },
                { name: "Musik", count: "430+" },
                { name: "Videografi", count: "380+" },
                { name: "AI & ML", count: "290+" }
              ].map((cat, index) => (
                <div key={cat.name} className="border border-[#e5e0d8] rounded-xl p-5 bg-white shadow-md cursor-pointer hover:bg-[#fcf5e8] hover:border-[#234c6a] hover:shadow-[0_4px_12px_#234c6a] hover:-translate-y-1 transition active:scale-95 duration-150" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="flex justify-center mb-2">{getCategoryIcon(cat.name)}</div>
                  <h4 className="font-bold text-gray-800 mt-2 text-center">{cat.name}</h4>
                  <span className="text-xs text-gray-400 text-center block">{cat.count} Partner</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Carousel Rating & Ulasan - bisa digeser sampai semua data */}
        <section id="testimonials" className="py-16 px-5 md:px-10" style={{ backgroundColor: '#fcf5e8' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2" data-aos="fade-up">Apa Kata Mereka?</h2>
            <p className="text-gray-500 text-center mb-10" data-aos="fade-up" data-aos-delay="100">Rating dan ulasan dari partner belajar</p>

            {/* Container carousel dengan horizontal scroll */}
            <div 
              className="carousel-container overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 pb-6 no-scrollbar"
              style={{ scrollbarWidth: 'none', display: 'flex', overflowX: 'auto' }}
            >
              {testimonialsData.map((item, idx) => (
                <div
                  key={idx}
                  data-index={idx}
                  className="carousel-card snap-start shrink-0 w-[280px] md:w-[320px] lg:w-[380px] transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    const container = document.querySelector('.carousel-container');
                    const card = document.querySelector(`.carousel-card[data-index='${idx}']`);
                    if (container && card) {
                      container.scrollTo({ left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2, behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-[#e5e0d8] transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#234c6a] rounded-full flex items-center justify-center text-white font-bold text-lg">{item.avatar}</div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                            <span className="text-xs text-gray-400">/ 5.0</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-3xl opacity-20">⭐</div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed mb-4 text-sm">"{item.text}"</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{item.skill}</span>
                      <span>•</span>
                      <span>{item.sessions} sesi</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 dot"
                  data-dot={idx}
                  onClick={() => {
                    const container = document.querySelector('.carousel-container');
                    const card = document.querySelector(`.carousel-card[data-index='${idx}']`);
                    if (container && card) {
                      container.scrollTo({ left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2, behavior: 'smooth' });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 px-5 md:px-10" style={{ backgroundColor: '#fcf5e8' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center" data-aos="fade-up">Mulai Dalam 3 Langkah Mudah</h2>
            <p className="text-gray-500 text-center mt-2 mb-12" data-aos="fade-up" data-aos-delay="100">Proses yang dirancang untuk memudahkan perjalanan keahlian Anda</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  number: '1', 
                  icon: <svg className="w-10 h-10 mx-auto text-[#234c6a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
                  title: 'Cari Partner', 
                  desc: 'Temukan partner yang memiliki keahlian yang ingin kamu pelajari', 
                  bg: 'bg-[#234c6a]' 
                },
                { 
                  number: '2', 
                  icon: <svg className="w-10 h-10 mx-auto text-[#f5c842]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                  title: 'Kirim Request', 
                  desc: 'Kirim permintaan dan diskusikan jadwal belajar bersama', 
                  bg: 'bg-[#f5c842] text-black' 
                },
                { 
                  number: '3', 
                  icon: <svg className="w-10 h-10 mx-auto text-[#234c6a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                  title: 'Mulai Belajar', 
                  desc: 'Lakukan sesi pertukaran pengetahuan dan berkembang bersama', 
                  bg: 'bg-[#234c6a]' 
                }
              ].map((step, idx) => (
                <div key={step.number} className="bg-white rounded-2xl shadow-lg border border-[#e5e0d8] p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300" data-aos="flip-up" data-aos-delay={idx * 150}>
                  <div className={`w-12 h-12 ${step.bg} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}>{step.number}</div>
                  <div className="mb-3">{step.icon}</div>
                  <h3 className="font-bold text-lg text-gray-800">{step.title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-5 md:px-10 bg-[#234c6a] text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Siap Memulai Perjalananmu?</h2>
          <p className="text-white/70 mt-2 mb-8 max-w-lg mx-auto">Bergabung bersama ribuan pengguna yang telah meningkatkan keahlian mereka.</p>
          <Link to="/register"><button className="bg-[#f5c842] text-black px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#fcf5e8] hover:text-[#234c6a] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">Daftar Gratis Sekarang →</button></Link>
        </section>

        {/* Footer */}
        <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </footer>
      </div>
    </>
  );
};

export default LandingPage;