import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const ResetPassword = () => {
  const { token } = useParams(); // ambil token dari URL, misal /reset-password/abc123
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    // Panggil API untuk reset password dengan token
    console.log('Reset password dengan token:', token);
    console.log('Password baru:', password);

    // Simulasi sukses
    setSubmitted(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="bg-[#fcf5e8] font-sans min-h-screen flex">
      {/* Kolom kiri - form reset password */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-extrabold text-[#234c6a] text-xl">SkillSwap</span>
            </Link>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-500 mt-2 mb-6">Buat password baru untuk akun Anda.</p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <p>✅ Password berhasil direset!</p>
              <p className="text-sm mt-1">Mengalihkan ke halaman login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
                  placeholder="Minimal 6 karakter"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a]"
                  placeholder="Ulangi password baru"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#234c6a] text-white py-2 rounded-lg font-semibold hover:bg-[#1a3d55] transition"
              >
                Reset Password
              </button>
            </form>
          )}

          {!submitted && (
            <p className="text-center text-sm text-gray-500 mt-6">
              <Link to="/login" className="text-[#234c6a] font-semibold hover:underline">← Kembali ke login</Link>
            </p>
          )}
        </div>
      </div>

      {/* Kolom kanan - info statistik (sama) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#234c6a] text-white flex-col justify-center px-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#f5c842]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-md">
          <h1 className="font-serif text-4xl font-bold leading-tight">SkillSwap</h1>
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

export default ResetPassword;