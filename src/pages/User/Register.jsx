// src/pages/User/Register.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroBg from './images/hero-bg.jpg';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    skills: '',
  });
  const [remember, setRemember] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  // State untuk OTP
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [storedOTP, setStoredOTP] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Fraunces:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Timer untuk resend OTP
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'password') validatePassword(e.target.value);
    if (e.target.name === 'confirmPassword') validateConfirm(e.target.value);
  };

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      setPasswordError('Password minimal 8 karakter');
    } else if (!/[A-Z]/.test(pass)) {
      setPasswordError('Password harus mengandung minimal 1 huruf besar');
    } else if (!/[0-9]/.test(pass)) {
      setPasswordError('Password harus mengandung minimal 1 angka');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirm = (confirm) => {
    if (confirm && confirm !== form.password) {
      setPasswordError('Konfirmasi password tidak cocok');
    } else if (form.password.length >= 8 && /[A-Z]/.test(form.password) && /[0-9]/.test(form.password)) {
      setPasswordError('');
    }
  };

  // Generate OTP 6 digit
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Kirim OTP (simulasi)
  const sendOTP = (email, otpCode) => {
    // Di production, ini akan kirim email/SMS
    console.log(`📧 Kirim OTP ke ${email}: ${otpCode}`);
    
    // Tampilkan alert untuk demo (bisa dihapus setelah backend ready)
    alert(`[DEMO] Kode OTP Anda: ${otpCode}\n(Dikirim ke ${email})`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    if (passwordError) {
      alert('Periksa kembali password Anda');
      return;
    }
    if (!form.name || !form.email || !form.password) {
      alert('Nama, Email, dan Password wajib diisi!');
      return;
    }
    
    // Simpan data user sementara ke sessionStorage
    const tempUser = {
      name: form.name,
      email: form.email,
      location: form.location,
      skills: form.skills,
      role: 'user',
      verified: false,
      createdAt: new Date().toISOString()
    };
    sessionStorage.setItem('tempUser', JSON.stringify(tempUser));
    sessionStorage.setItem('remember', remember.toString());
    
    // Generate dan kirim OTP
    const otpCode = generateOTP();
    setStoredOTP(otpCode);
    sendOTP(form.email, otpCode);
    
    // Buka modal OTP
    setShowOTP(true);
    setOtp("");
    setOtpError("");
    setResendCooldown(60); // Cooldown 60 detik untuk resend
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (resendCooldown > 0) return;
    
    const newOTP = generateOTP();
    setStoredOTP(newOTP);
    sendOTP(form.email, newOTP);
    setResendCooldown(60);
    setOtpError("");
  };

  // Verifikasi OTP
  const handleVerifyOTP = () => {
    if (otp === storedOTP) {
      // Ambil data user sementara
      const tempUser = JSON.parse(sessionStorage.getItem('tempUser'));
      const rememberMe = sessionStorage.getItem('remember') === 'true';
      
      // Buat user final dengan status verified
      const finalUser = {
        id: Date.now(),
        ...tempUser,
        verified: true,
        verifiedAt: new Date().toISOString()
      };
      
      // Simpan user
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(finalUser));
        localStorage.setItem('role', finalUser.role);
        localStorage.setItem('token', 'dummy-token-' + Date.now());
      } else {
        sessionStorage.setItem('user', JSON.stringify(finalUser));
        sessionStorage.setItem('role', finalUser.role);
        sessionStorage.setItem('token', 'dummy-token-' + Date.now());
      }
      
      // Bersihkan data temporary
      sessionStorage.removeItem('tempUser');
      sessionStorage.removeItem('remember');
      
      // Tutup modal OTP
      setShowOTP(false);
      
      // Redirect ke beranda
      navigate('/beranda');
    } else {
      setOtpError('Kode OTP salah! Silakan coba lagi.');
    }
  };

  // Format waktu cooldown
  const formatCooldown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) return `${mins}:${secs.toString().padStart(2, '0')}`;
    return `${secs} detik`;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <div className="flex flex-1">
        {/* Kolom kiri - form registrasi */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#234c6a] rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
                <span className="font-extrabold text-[#234c6a] text-xl">SkillSwap</span>
              </Link>
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-800">Daftar</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">Mulai perjalanan belajarmu bersama kami</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm"
                  placeholder="Nama lengkap"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm"
                  placeholder="Min. 8 karakter, huruf besar & angka"
                  required
                />
                {passwordError && (
                  <p className="text-[10px] text-red-500 mt-1">{passwordError}</p>
                )}
                <p className="text-[10px] text-gray-400 mt-1">* Password: huruf besar, angka, minimal 8 karakter</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm"
                  placeholder="Ulangi password"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Lokasi (opsional)</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm"
                  placeholder="Kota, Negara"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Skill yang Anda tawarkan</label>
                <textarea
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 border border-[#e5e0d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234c6a] text-sm"
                  placeholder="UI design, SEO, Photography"
                />
                <p className="text-[10px] text-gray-400 mt-1">Pisahkan dengan koma</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-gray-300 text-[#234c6a] focus:ring-[#234c6a]"
                />
                <label className="text-xs text-gray-600">Ingat saya</label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#234c6a] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#1a3d55] transition flex items-center justify-center gap-2"
              >
                Daftar <span>→</span>
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-[#234c6a] font-semibold hover:underline">Masuk di sini</Link>
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

      {/* Modal OTP Verifikasi */}
      {showOTP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowOTP(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%] text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-[#fcf5e8] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#234c6a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verifikasi 2 Langkah</h3>
            <p className="text-sm text-gray-600 mb-4">
              Masukkan kode verifikasi yang telah dikirim ke <strong className="text-[#234c6a]">{form.email}</strong>
            </p>
            
            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full border border-[#e5e0d8] rounded-xl p-3 text-center text-2xl tracking-[8px] font-mono focus:outline-none focus:ring-2 focus:ring-[#234c6a] mb-4"
              maxLength={6}
              autoFocus
            />
            
            {otpError && (
              <p className="text-red-500 text-sm mb-3">{otpError}</p>
            )}
            
            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                otp.length === 6 
                  ? 'bg-[#234c6a] text-white hover:bg-[#1a3d55]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Verifikasi
            </button>
            
            <div className="mt-4 text-sm">
              {resendCooldown > 0 ? (
                <span className="text-gray-400">
                  Kirim ulang dalam {formatCooldown(resendCooldown)}
                </span>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="text-[#234c6a] hover:underline"
                >
                  Kirim Ulang Kode
                </button>
              )}
            </div>
            
            <button
              onClick={() => setShowOTP(false)}
              className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">
        © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Register;