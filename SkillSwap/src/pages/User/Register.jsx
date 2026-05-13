import { Link } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    skills: '',
  });
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', { ...form, remember });
    // nanti hubungkan ke API
  };

  return (
    <div className="bg-[#fcf5e8] font-sans min-h-screen flex">
      {/* Kolom kiri - form registrasi */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-extrabold text-[#234c6a] text-xl">SkillSwap</span>
            </Link>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-800">Registrasi</h2>
          <p className="text-gray-500 mt-2 mb-6">Mulai perjalanan belajarmu bersama kami</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
                placeholder="edo riando"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
                placeholder="fafa@gmail.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
                placeholder="********"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
                placeholder="Depok, Indonesia"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill yang anda tawarkan</label>
              <textarea
                name="skills"
                value={form.skills}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
                placeholder="UI design, SEO, Photography"
              />
              <p className="text-xs text-gray-400 mt-1">Pisahkan dengan koma</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-gray-300 text-[#234c6a] focus:ring-[#234c6a]"
              />
              <label className="text-sm text-gray-600">Ingat saya</label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#234c6a] text-white py-2 rounded-lg font-semibold hover:bg-[#1a3d55] transition flex items-center justify-center gap-2"
            >
              Daftar <span>→</span>
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-[#234c6a] font-semibold hover:underline">Masuk di sini</Link>
          </p>

          <div className="text-center text-xs text-gray-400 mt-8">
            © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Kolom kanan - statistik (sama seperti login) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#234c6a] text-white flex-col justify-center px-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#f5c842]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-md">
          <h1 className="font-serif text-4xl font-bold leading-tight">Selamat Datang di SkillSwap</h1>
          <p className="text-white/80 mt-4 text-lg">
            Platform bertukar keahlian terbaik. Temukan partner yang tepat, bagikan skill Anda, dan berkembang bersama komunitas kami.
          </p>
          <div className="flex gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold">5K+</div>
              <div className="text-white/60 text-sm">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-white/60 text-sm">Sesi Diskusi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;