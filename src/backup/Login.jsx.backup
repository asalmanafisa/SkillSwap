// src/pages/User/Login.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroBg from './images/hero-bg.jpg';  

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Fraunces:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Data user (dummy) - user, admin, superadmin
  const dummyUsers = [
    // User biasa (bisa register)
    { id: 1, email: 'yasmine@gmail.com', password: '123456', name: 'Yasmine Shavira', role: 'user' },
    { id: 2, email: 'amira@gmail.com', password: 'test123', name: 'Amira Salma', role: 'user' },
    // Admin (dibuat oleh superadmin)
    { id: 3, email: 'admin@skillswap.com', password: 'admin123', name: 'Admin SkillSwap', role: 'admin' },
    // Superadmin (dibuat manual di database)
    { id: 4, email: 'superadmin@skillswap.com', password: 'super123', name: 'Superadmin', role: 'superadmin' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Cari user berdasarkan email
    const user = dummyUsers.find((u) => u.email === email);
    
    if (!user) {
      setError('Email belum terdaftar. Silakan daftar terlebih dahulu.');
      return;
    }
    
    if (user.password !== password) {
      setError('Password salah. Coba lagi.');
      return;
    }
    
    // Data user yang akan disimpan
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    // Simpan sesuai pilihan "Ingat saya"
    if (remember) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('role', user.role);
      localStorage.setItem('token', 'dummy-token-' + Date.now());
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('role', user.role);
      sessionStorage.setItem('token', 'dummy-token-' + Date.now());
    }
    
    // Redirect berdasarkan role
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user.role === 'superadmin') {
      navigate('/superadmin/dashboard');
    } else {
      navigate('/beranda');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <div className="flex flex-1">
        {/* Kolom kiri - form login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
                <span className="font-extrabold text-[#234c6a] text-xl">SkillSwap</span>
              </Link>
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-800">Masuk ke Akun Anda</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">Silakan masukkan detail Anda untuk melanjutkan</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] pr-10 text-sm"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#234c6a]"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded border-gray-300 text-[#234c6a] focus:ring-[#234c6a]"
                  />
                  Ingat saya
                </label>
                <Link to="/forgot-password" className="text-xs text-[#234c6a] hover:underline">Lupa password?</Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#234c6a] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#1a3d55] transition flex items-center justify-center gap-2"
              >
                Masuk <span>→</span>
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Belum punya akun?{' '}
              <Link to="/register" className="text-[#234c6a] font-semibold hover:underline">Daftar sekarang</Link>
            </p>
            
            
          </div>
        </div>

        {/* Kolom kanan - branding */}
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

      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
        © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Login;