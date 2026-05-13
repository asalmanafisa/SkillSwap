// src/pages/Superadmin/LoginSuperadmin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Shield } from "lucide-react";

export default function LoginSuperadmin() {
  const navigate = useNavigate();
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [ingat, setIngat]         = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [showLupa, setShowLupa] = useState(false);
  const [showKontak, setShowKontak] = useState(false);   

  const handleLogin = () => {
    setError("");
    if (email === "superadmin@skillswap.ub.ac.id" && password === "admin123") {
  localStorage.setItem("isLoggedIn", "true");  // ← simpan status login
  navigate("/superadmin/dashboard");
}
    setLoading(true);
    // Simulasi login — ganti dengan API call nanti
    setTimeout(() => {
      setLoading(false);
      if (email === "superadmin@skillswap.ub.ac.id" && password === "admin123") {
        navigate("/superadmin/dashboard");
      } else {
        setError("Email atau password salah.");
      }
    }, 1000);
  };

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      fontFamily: "'Poppins','Segoe UI',sans-serif",
    }}>

      {/* ── Panel Kiri ── */}
      <div style={{
        width: "45%", background: "linear-gradient(145deg, #1e3a5f 0%, #1e4d8c 50%, #1a3a6b 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "24px", position: "relative", overflow: "hidden",
      }}>

        {/* Lingkaran dekorasi */}
        <div style={{
          position: "absolute", width: 300, height: 300,
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)",
          top: -80, left: -80,
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400,
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)",
          top: -120, left: -120,
        }} />
        <div style={{
          position: "absolute", width: 250, height: 250,
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)",
          bottom: 40, right: -80,
        }} />

        {/* Konten kiri */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "white", margin: "0 0 8px" }}>
            SkillSwap
          </h1>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.5 }}>
            Panel kontrol penuh untuk mengelola<br />platform pertukaran keahlian.
          </p>
        </div>

        {/* Card ringkasan platform */}
        <div style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          borderRadius: 14, padding: "16px 18px",
          width: "100%", maxWidth: 260,
          border: "1px solid rgba(255,255,255,0.12)",
          position: "relative", zIndex: 1,
        }}>
          <div style={{
            fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em", marginBottom: 14,
          }}>
            RINGKASAN PLATFORM
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {[
              { label: "Total User", value: "5.284", sub: "+12% bulan ini", color: "#60a5fa" },
              { label: "Sesi Aktif", value: "1.047", sub: "+6% minggu ini", color: "#34d399" },
            ].map((item) => (
              <div key={item.label} style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 10, padding: "10px 12px",
              }}>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "white" }}>
                  {item.value}
                </div>
                <div style={{ fontSize: "0.62rem", color: item.color, marginTop: 2 }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[
              { label: "Laporan Baru", value: "5", sub: "Perlu ditangani", color: "#fbbf24" },
              { label: "User Baru", value: "318", sub: "April 2026", color: "#a78bfa" },
            ].map((item) => (
              <div key={item.label} style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 10, padding: "10px 12px",
              }}>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "white" }}>
                  {item.value}
                </div>
                <div style={{ fontSize: "0.62rem", color: item.color, marginTop: 2 }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>User Aktif</span>
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>86%</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4 }}>
              <div style={{ height: "100%", width: "86%", background: "#3b82f6", borderRadius: 4 }} />
            </div>
          </div>
        </div>

        {/* Badge bawah */}
        <div style={{
          marginTop: 24, position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "6px 14px",
          border: "1px solid rgba(255,255,255,0.12)",
        }}>
          <Shield size={12} color="rgba(255,255,255,0.6)" />
          <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>
            Superadmin Access Only
          </span>
        </div>
      </div>

      {/* ── Panel Kanan ── */}
      <div style={{
        flex: 1, background: "#f8f7f4",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}>
        <div style={{ width: "100%", maxWidth: 320 }}>

          {/* Judul */}
          <div style={{ marginBottom: 14 }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Selamat Datang 👋
            </h2>
          </div>

          {/* Info card role */}
          <div style={{
            background: "#eff6ff", borderRadius: 10,
            padding: "12px 14px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 10,
            border: "1px solid #bfdbfe",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "#3b82f6", color: "white",
              fontSize: "0.7rem", fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              SA
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e40af" }}>
                Superadmin
              </div>
              <div style={{ fontSize: "0.72rem", color: "#3b82f6" }}>
                Full access kelola user, admin, laporan & statistik
              </div>
            </div>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
            }} />
          </div>

          {/* Warning card */}
          <div style={{
            background: "#fffbeb", borderRadius: 10,
            padding: "10px 14px", marginBottom: 24,
            border: "1px solid #fde68a",
            display: "flex", gap: 8,
          }}>
            <span style={{ fontSize: "0.9rem" }}>⚠️</span>
            <p style={{ fontSize: "0.75rem", color: "#92400e", margin: 0, lineHeight: 1.5 }}>
              Halaman ini hanya untuk <strong>Superadmin</strong>. Akses tidak sah akan
              dicatat dan dilaporkan.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: "#fef2f2", color: "#ef4444",
              fontSize: "0.8rem", padding: "10px 14px",
              borderRadius: 8, marginBottom: 16,
              border: "1px solid #fecaca",
            }}>
              {error}
            </div>
          )}

          {/* Form Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Email Superadmin</label>
            <input
              type="email"
              placeholder="superadmin@skillswap.ub.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={inputStyle}
            />
          </div>

          {/* Form Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ ...inputStyle, paddingRight: 40 }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", color: "#94a3b8", display: "flex",
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Ingat saya + Lupa password */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 22,
          }}>
            <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={ingat}
                onChange={(e) => setIngat(e.target.checked)}
                style={{ width: 14, height: 14, accentColor: "#3b82f6" }}
              />
              <span style={{ fontSize: "0.8rem", color: "#475569" }}>Ingat saya</span>
            </label>
            <a href="#"
             onClick={(e) => { e.preventDefault(); setShowLupa(true); }}
              style={{
               fontSize: "0.8rem", color: "#3b82f6",
                 textDecoration: "none", fontWeight: 500,
                  }}
                >
                Lupa password?
              </a>
          </div>

          {/* Tombol Login */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%", padding: "10px",
              borderRadius: 10, border: "none",
              background: loading ? "#94a3b8" : "#1e3a5f",
              color: "white", fontSize: "0.85rem",
              fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
              transition: "background 0.2s",
            }}
          >
            <LogIn size={16} />
            {loading ? "Memverifikasi..." : "Masuk sebagai Superadmin"}
          </button>

          {/* Link bantuan */}
          <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.78rem", color: "#94a3b8" }}>
            Butuh bantuan? Hubungi{" "}
            <a href="#"
            onClick={(e) => { e.preventDefault(); setShowKontak(true); }}
             style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}
              >
              tim IT SkillSwap
            </a>
          </p>
        </div>
{/* Modal Lupa Password */}
{/* Modal Kontak IT */}
{showKontak && (
  <div style={{
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  }}>
    <div style={{
      background: "white", borderRadius: 16,
      padding: "28px 24px", width: 360,
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    }}>
      {/* Icon */}
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: "#f0fdf4", fontSize: "1.3rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px",
      }}>
        💬
      </div>

      {/* Judul */}
      <h3 style={{
        fontSize: "1rem", fontWeight: 700,
        color: "#0f172a", margin: "0 0 6px", textAlign: "center",
      }}>
        Hubungi Tim IT SkillSwap
      </h3>
      <p style={{
        fontSize: "0.78rem", color: "#64748b",
        margin: "0 0 20px", textAlign: "center", lineHeight: 1.5,
      }}>
        Tim IT kami siap membantu kamu 24/7.
      </p>

      {/* Kontak list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {[
          { icon: "📧", label: "Email", value: "it@skillswap.ub.ac.id",    color: "#eff6ff", textColor: "#2563eb" },
          { icon: "💬", label: "WhatsApp", value: "+62 895-3411-86135",     color: "#f0fdf4", textColor: "#16a34a" },
        ].map((item) => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: item.color, borderRadius: 10, padding: "10px 14px",
          }}>
            <span style={{ fontSize: "1rem" }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginBottom: 1 }}>
                {item.label}
              </div>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: item.textColor }}>
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol tutup */}
      <button
        onClick={() => setShowKontak(false)}
        style={{
          width: "100%", padding: "10px",
          borderRadius: 10,
          border: "1px solid #e2e8f0", background: "white",
          color: "#64748b", fontSize: "0.85rem",
          cursor: "pointer", fontWeight: 500,
        }}
      >
        Tutup
      </button>
    </div>
  </div>
)}
{showLupa && (
  <div style={{
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  }}>
    <div style={{
      background: "white", borderRadius: 16,
      padding: "28px 24px", width: 360,
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    }}>
      {/* Icon */}
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: "#eff6ff", color: "#3b82f6",
        fontSize: "1.3rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px",
      }}>
        🔑
      </div>

      {/* Judul */}
      <h3 style={{
        fontSize: "1rem", fontWeight: 700,
        color: "#0f172a", margin: "0 0 6px", textAlign: "center",
      }}>
        Lupa Password?
      </h3>
      <p style={{
        fontSize: "0.78rem", color: "#64748b",
        margin: "0 0 20px", textAlign: "center", lineHeight: 1.5,
      }}>
        Masukkan email superadmin kamu. Kami akan mengirimkan link reset password.
      </p>

      {/* Input email */}
      <div style={{ marginBottom: 16 }}>
        <label style={{
          display: "block", fontSize: "0.8rem",
          fontWeight: 500, color: "#475569", marginBottom: 6,
        }}>
          Email Superadmin
        </label>
        <input
          type="email"
          placeholder="superadmin@skillswap.ub.ac.id"
          style={{
            width: "100%", padding: "9px 12px",
            border: "1px solid #e2e8f0", borderRadius: 8,
            fontSize: "0.83rem", color: "#1e293b",
            outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Tombol */}
      <button
        onClick={() => setShowLupa(false)}
        style={{
          width: "100%", padding: "10px",
          borderRadius: 10, border: "none",
          background: "#1e3a5f", color: "white",
          fontSize: "0.85rem", fontWeight: 600,
          cursor: "pointer", marginBottom: 10,
        }}
      >
        Kirim Link Reset
      </button>

      <button
        onClick={() => setShowLupa(false)}
        style={{
          width: "100%", padding: "10px",
          borderRadius: 10,
          border: "1px solid #e2e8f0", background: "white",
          color: "#64748b", fontSize: "0.85rem",
          cursor: "pointer",
        }}
      >
        Batal
      </button>
    </div>
  </div>
)}
        
      </div>
    </div>
  );
}

// ── Style helpers ─────────────────────────────────────────
const labelStyle = {
  display: "block", fontSize: "0.82rem",
  fontWeight: 500, color: "#475569", marginBottom: 6,
};
const inputStyle = {
  width: "100%", padding: "9px 12px",
  border: "1px solid #e2e8f0", borderRadius: 10,
  fontSize: "0.83rem", color: "#1e293b",
  outline: "none", boxSizing: "border-box",
  background: "white",
  transition: "border-color 0.2s",
};
 