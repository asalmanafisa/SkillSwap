import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroBg from './images/hero-bg.jpg';  

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Fraunces:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Email tidak valid');
      return;
    }
    console.log('Reset password untuk email:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      {/* Konten utama dua kolom */}
      <div className="flex flex-1">
        {/* Kolom kiri - form forgot password */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
                <span className="font-extrabold text-[#234c6a] text-xl">SkillSwap</span>
              </Link>
            </div>

            <h2 className="font-serif text-3xl font-bold text-gray-800">Lupa Password?</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">
              Tidak masalah. Masukkan email Anda dan kami akan mengirimkan link untuk mereset password.
            </p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                <p>✅ Link reset password telah dikirim ke <strong>{email}</strong>.</p>
                <p className="text-sm mt-1">Cek kotak masuk atau folder spam Anda.</p>
                <Link to="/login" className="text-[#234c6a] font-semibold hover:underline block mt-3">
                  ← Kembali ke halaman login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#234c6a] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#1a3d55] transition"
                >
                  Kirim Link Reset
                </button>
              </form>
            )}

            {!submitted && (
              <p className="text-center text-xs text-gray-500 mt-6">
                Ingat password?{' '}
                <Link to="/login" className="text-[#234c6a] font-semibold hover:underline">Masuk di sini</Link>
              </p>
            )}
          </div>
        </div>

        {/* Kolom kanan - branding dengan gambar background opacity 10% (tanpa statistik) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#234c6a] text-white flex-col items-center justify-center px-12 relative overflow-hidden">
          <img 
            src={heroBg} 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
          />
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#f5c842]/10 rounded-full blur-3xl"></div>
          <div className="absolute left-0 bottom-0 w-72 h-72 bg-[#f5c842]/5 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-md text-center">
            <h1 className="font-serif text-4xl font-bold leading-tight">Selamat Datang di SkillSwap</h1>
            <p className="text-white/80 mt-4 text-base">
              Platform bertukar keahlian terbaik. Temukan partner yang tepat, bagikan skill Anda, dan berkembang bersama komunitas kami.
            </p>
          </div>
        </div>
      </div>

      {/* Footer full width di paling bawah (seperti Login) */}
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
        © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ForgotPassword;