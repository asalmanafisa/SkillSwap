import Navbar from '../../components/Navbar'; // perbaiki import
import { Link } from 'react-router-dom';
import FloatingChatButton from '../../components/FloatingChatButton';

const Beranda = () => {
  const categories = [
    { name: 'Programming', icon: '💻', count: '1.000+ Kursus' },
    { name: 'Design', icon: '🎨', count: '800+ Kursus' },
    { name: 'Fotografi', icon: '📷', count: '600+ Kursus' },
    { name: 'Bahasa', icon: '📚', count: '400+ Kursus' },
  ];

  const testimonials = [
    {
      name: 'Yudanto Dharmo Adhani',
      role: 'Healer',
      text: 'Menurut SitiDharma, saya cenderung menguasai faktor sistem Z sumber amat lingkungan UNLV karena saya memiliki motivasi yang tinggi.',
    },
    {
      name: 'Rizki Fitriyanti',
      role: 'Lokal',
      text: 'Belum ada sebuah teori yang bisa dibuktikan.',
    },
  ];

  const steps = [
    { number: '1', title: 'Cari Partner', desc: 'Terkenal pasti yang memiliki kemampuan sosial yang baik, jadi buatlah hubungan dengan mereka.' },
    { number: '2', title: 'Kirim Reagasi', desc: 'Kami memiliki koneksi sosial yang kuat, jadi buatlah komunikasi yang efektif.' },
    { number: '3', title: 'Mulai Belajar', desc: 'Lakukan setiap kali Anda ingin melakukannya.' },
  ];

  const recommendations = [
    { name: 'Farah Niyati Pariza', skill: 'Desain', quote: "I'm a designer who loves to create beautiful designs that make people happy." },
    { name: 'Yesenhe Shavira Ahmed', skill: 'Programmer', quote: "I'm a programmer who loves to code and build amazing things." },
    { name: 'Talitha Nala Orisulida', skill: 'Dokter', quote: "I'm a doctor who loves to help people get better." },
    { name: 'Sekar Suryawati', skill: 'Ingin membuat karya?', quote: "I want to make something beautiful." },
  ];

  return (
    <div className="bg-[#fcf5e8] font-sans min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#234c6a] text-white py-16 md:py-24 px-5 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Tingkatkan Keahlian Bersama Ahli di Bidangnya</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Sistem pengembangan Anda dengan potensi untuk berlatih keterampilan. Bahagi, keterbangan, dan perasaan jujur dengan cara yang inovatif.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/temukan">
              <button className="bg-[#f5c842] text-black px-6 py-2 rounded-full font-bold shadow hover:translate-y-[-2px] transition">
                Temukan Partner →
              </button>
            </Link>
            <Link to="/tentang">
              <button className="bg-white/10 border border-white/30 px-6 py-2 rounded-full font-semibold backdrop-blur-sm hover:bg-white/20 transition">
                Pelajari Lebih Lanjut
              </button>
            </Link>
          </div>
          <div className="flex justify-center gap-8 mt-12">
            <div><span className="text-2xl font-bold">$5,000+</span><p className="text-sm text-white/60">Anggota aktif</p></div>
            <div><span className="text-2xl font-bold">120+</span><p className="text-sm text-white/60">Kategori Social</p></div>
            <div><span className="text-2xl font-bold">10k+</span><p className="text-sm text-white/60">Swi-Swiss</p></div>
          </div>
        </div>
      </section>

      {/* Temukan Pasangan Belajar */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e5e0d8] flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-[#234c6a] text-white rounded-xl w-14 h-14 flex items-center justify-center text-2xl shrink-0">🤝</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Temukan Pasangan Belajar yang Tepat</h3>
            <p className="text-gray-500 mt-2 leading-relaxed">
              Selisih penambahan Anda menekankan penting yang sempurna untuk berlatih keahlian. Tidak perlu membutuhkan kursus awal, cukup fokuskan sejauh Anda dengan orang lain dan belajar bersama-sama untuk mencapai tujuan yang lebih besar.
            </p>
          </div>
        </div>
      </section>

      {/* Kategori Populer */}
      <section className="py-16 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">Kategori Keahlian Populer</h2>
          <p className="text-gray-500 mt-2 mb-10">Eksplorasi berbagai kategori aktiv yang paling banyak dicari!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div key={cat.name} className="border border-[#e5e0d8] rounded-xl p-5 bg-[#fcf5e8] hover:border-[#234c6a] hover:shadow-md transition cursor-pointer">
                <div className="text-3xl">{cat.icon}</div>
                <h4 className="font-bold text-gray-800 mt-2">{cat.name}</h4>
                <span className="text-xs text-gray-400">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kisah Sukses */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">Kisah Sukses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e0d8]">
              <p className="text-gray-600 italic">"{t.text}"</p>
              <div className="mt-4 font-semibold text-gray-800">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Langkah */}
      <section className="py-16 px-5 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">Mulai Dalam 3 Langkah Mudah</h2>
          <p className="text-gray-500 mt-2 mb-10">Proses yang mudah untuk menjadi pemain terkemuka adalah Anda.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#234c6a] text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">{step.number}</div>
                <h4 className="font-bold text-gray-800 text-lg">{step.title}</h4>
                <p className="text-gray-500 text-sm mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rekomendasi Partner */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl font-bold text-gray-800 text-center mb-8">Rekomendasi Partner</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-[#e5e0d8] hover:shadow-md transition">
              <h4 className="font-bold text-gray-800">{rec.name}</h4>
              <p className="text-sm text-[#234c6a] font-medium mt-1">{rec.skill}</p>
              <p className="text-gray-600 text-sm mt-2">"{rec.quote}"</p>
              <button className="mt-3 text-[#234c6a] text-sm font-semibold hover:underline">Hubungi</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white/60 py-6 text-center text-sm">
        <p>© 2020 Sistem Informasi - Alhamdulillah, Al Fajrha Masyarakat.</p>
      </footer>

      {/* Tombol Chat Melayang - ditempatkan di sini */}
      <FloatingChatButton />
    </div>
  );
};

export default Beranda;