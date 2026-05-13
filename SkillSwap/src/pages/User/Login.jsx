import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // DUMMY USER (sementara, nanti diganti dengan panggilan API)
  const dummyUsers = [
    { id: 1, email: 'yasmine@gmail.com', password: '123456', name: 'User Example' },
    { id: 2, email: 'amira@gmail', password: 'test123', name: 'Test User' },
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

    // Login berhasil
    console.log('Login sukses:', user);
    // Simpan token/sesi di localStorage jika perlu
    if (remember) {
      localStorage.setItem('user', JSON.stringify({ id: user.id, email: user.email, name: user.name }));
    } else {
      sessionStorage.setItem('user', JSON.stringify({ id: user.id, email: user.email, name: user.name }));
    }
    // Arahkan ke halaman beranda (nanti ganti dengan route "/beranda")
    navigate('/beranda');
  };

  return (
    <div className="bg-[#fcf5e8] font-sans min-h-screen flex">
      {/* Kolom kiri - form login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-extrabold text-[#234c6a] text-xl">SkillSwap</span>
            </Link>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-800">Masuk ke Akun Anda</h2>
          <p className="text-gray-500 mt-2 mb-6">Silakan masukkan detail Anda untuk melanjutkan</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] pr-10"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#234c6a]"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-gray-300 text-[#234c6a] focus:ring-[#234c6a]"
                />
                Ingat saya
              </label>
              <Link to="/forgot-password" className="text-sm text-[#234c6a] hover:underline">Lupa password?</Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#234c6a] text-white py-2 rounded-lg font-semibold hover:bg-[#1a3d55] transition flex items-center justify-center gap-2"
            >
              Masuk <span>→</span>
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="text-[#234c6a] font-semibold hover:underline">Daftar sekarang</Link>
          </p>
        </div>
      </div>

      {/* Kolom kanan - info statistik */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#234c6a] text-white flex-col justify-center px-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#f5c842]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-md">
          <h1 className="font-serif text-4xl font-bold leading-tight">Selamat Datang di SkillSwap</h1>
          <p className="text-white/80 mt-4 text-lg">
            Platform bertukar keahlian terbaik. Temukan partner yang tepat, bagikan skill Anda, dan berkembang bersama komunitas kami.
          </p>
          <div className="flex gap-8 mt-8">
            <div><div className="text-3xl font-bold">5K+</div><div className="text-white/60 text-sm">Pengguna Aktif</div></div>
            <div><div className="text-3xl font-bold">10K+</div><div className="text-white/60 text-sm">Sesi Diskusi</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;