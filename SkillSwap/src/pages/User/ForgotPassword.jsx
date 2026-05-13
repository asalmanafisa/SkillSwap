import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simulasi validasi sederhana
    if (!email.includes('@')) {
      setError('Email tidak valid');
      return;
    }
    
    // Di sini nanti panggil API untuk kirim email reset password
    console.log('Reset password untuk email:', email);
    
    // Tampilkan pesan sukses
    setSubmitted(true);
    
    // Opsional: setelah 3 detik langsung ke login
    // setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className="bg-[#fcf5e8] font-sans min-h-screen flex">
      {/* Kolom kiri - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-extrabold text-[#234c6a] text-xl">SkillSwap</span>
            </Link>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-800">Lupa Password?</h2>
          <p className="text-gray-500 mt-2 mb-6">
            Tidak masalah. Masukkan email Anda dan kami akan mengirimkan link untuk mereset password.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              <p>✅ Link reset password telah dikirim ke <strong>{email}</strong>.</p>
              <p className="text-sm mt-1">Cek kotak masuk atau folder spam Anda.</p>
              <Link to="/login" className="text-[#234c6a] font-semibold hover:underline block mt-3">
                ← Kembali ke halaman login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
                  placeholder="nama@email.com"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#234c6a] text-white py-2 rounded-lg font-semibold hover:bg-[#1a3d55] transition"
              >
                Kirim Link Reset
              </button>
            </form>
          )}

          {!submitted && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Ingat password?{' '}
              <Link to="/login" className="text-[#234c6a] font-semibold hover:underline">Masuk di sini</Link>
            </p>
          )}
        </div>
      </div>

      {/* Kolom kanan - info statistik (sama seperti login) */}
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

export default ForgotPassword;