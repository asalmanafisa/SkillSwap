// src/pages/Admin/DashboardAdmin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText,
  Settings, LogOut, Activity,
  AlertTriangle, UserX,
} from "lucide-react";

const laporanMasuk = [
  { id: 1, title: "Mengirim spam",         desc: "Dilaporkan oleh Amira Salma Nafisa ter...", color: "#ef4444" },
  { id: 2, title: "Konten tidak pantas",   count: 14, desc: "Dilaporkan oleh Farah Naylul Fauzia", color: "#f97316" },
  { id: 3, title: "Penipuan skill",        desc: "Pengguna mengaku memiliki skill yang...",   color: "#ef4444" },
  { id: 4, title: "Permintaan verifikasi", desc: "Diana Putri meminta verifikasi akun prof...", color: "#3b82f6" },
  { id: 5, title: "Akun duplikat",         desc: "Terdeteksi 2 akun dengan email yang sa...", color: "#f97316" },
];

const daftarPengguna = [
  { id: 1, nama: "Farah Naylul Fauzia",   role: "Desainer · Surabaya",        avatar: "FN", warna: "#f97316", status: "Aktif"   },
  { id: 2, nama: "Yasmine Shavira Ahmad", role: "Programmer · Malang",         avatar: "YS", warna: "#22c55e", status: "Aktif"   },
  { id: 3, nama: "Tabina Naila Griselda", role: "Data Analyst · Surabaya",     avatar: "TN", warna: "#8b5cf6", status: "Aktif"   },
  { id: 4, nama: "Sekar Suryawati",       role: "Digital Marketing · Jakarta", avatar: "SS", warna: "#14b8a6", status: "Pending" },
];

const statCards = [
  { label: "Total Pengguna",      value: "5.284", sub: "+12% bulan ini",   subColor: "#22c55e", iconEl: "users",    iconBg: "#eff6ff", iconColor: "#3b82f6" },
  { label: "Sesi Aktif",          value: "1.047", sub: "+8% minggu ini",   subColor: "#22c55e", iconEl: "activity", iconBg: "#f0fdf4", iconColor: "#22c55e" },
  { label: "Laporan Masuk",       value: "23",    sub: "+5 baru hari ini", subColor: "#ef4444", iconEl: "alert",    iconBg: "#fff7ed", iconColor: "#f97316" },
  { label: "Pengguna Tersuspend", value: "14",    sub: "+2 minggu ini",    subColor: "#ef4444", iconEl: "userx",    iconBg: "#fef2f2", iconColor: "#ef4444" },
];

function SidebarAdmin({ active }) {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const menus = [
    { key: "dashboard",       label: "Dashboard",       icon: LayoutDashboard, path: "/admin/dashboard"       },
    { key: "kelola-pengguna", label: "Kelola Pengguna", icon: Users,           path: "/admin/kelola-pengguna" },
    { key: "kelola-laporan",  label: "Kelola Laporan",  icon: FileText,        path: "/admin/kelola-laporan"  },
  ];

  return (
    <aside style={{
      width: 200, minHeight: "100vh", background: "white",
      borderRight: "1px solid #f1f5f9",
      display: "flex", flexDirection: "column",
      padding: "20px 0", flexShrink: 0,
    }}>
      <div style={{ padding: "0 16px 20px", borderBottom: "1px solid #f1f5f9", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #1e3a5f, #3b82f6)",
            color: "white", fontWeight: 800, fontSize: "0.75rem",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>SS</div>
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>SkillSwap</span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "0 10px" }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#cbd5e1", letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6 }}>
          MENU
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <li key={item.key}>
                <button
                  onClick={() => navigate(item.path)}
                  style={{
                    display: "flex", alignItems: "center", gap: 9,
                    padding: "9px 10px", borderRadius: 8,
                    width: "100%", border: "none", cursor: "pointer",
                    fontSize: "0.83rem", fontWeight: isActive ? 600 : 500,
                    background: isActive ? "#1e3a5f" : "transparent",
                    color: isActive ? "white" : "#64748b",
                    transition: "all 0.15s", textAlign: "left",
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#cbd5e1", letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6 }}>
          LAINNYA
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <button
              onClick={() => navigate("/admin/pengaturan")}
              style={{
                display: "flex", alignItems: "center", gap: 9,
                padding: "9px 10px", borderRadius: 8,
                width: "100%", border: "none", cursor: "pointer",
                fontSize: "0.83rem", fontWeight: 500,
                background: "transparent", color: "#64748b", textAlign: "left",
              }}
            >
              <Settings size={16} /> Pengaturan
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowLogout(true)}
              style={{
                display: "flex", alignItems: "center", gap: 9,
                padding: "9px 10px", borderRadius: 8,
                width: "100%", border: "none", cursor: "pointer",
                fontSize: "0.83rem", fontWeight: 500,
                background: "transparent", color: "#ef4444", textAlign: "left",
              }}
            >
              <LogOut size={16} /> Keluar
            </button>
          </li>
        </ul>
      </nav>

      {showLogout && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "white", borderRadius: 16,
            padding: "28px 24px", width: 300,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)", textAlign: "center",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "#fef2f2", fontSize: "1.3rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px",
            }}>👋</div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Keluar?</h3>
            <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "0 0 20px", lineHeight: 1.5 }}>
              Apakah anda yakin ingin keluar dari panel Admin?
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowLogout(false)} style={{
                flex: 1, padding: "9px", borderRadius: 10,
                border: "1px solid #e2e8f0", background: "white",
                color: "#64748b", fontSize: "0.83rem", cursor: "pointer",
              }}>Batal</button>
              <button onClick={() => { window.location.href = "/"; }} style={{
                flex: 1, padding: "9px", borderRadius: 10,
                border: "none", background: "#ef4444",
                color: "white", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer",
              }}>Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default function DashboardAdmin() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: "#f8f7f4", fontFamily: "'Poppins','Segoe UI',sans-serif",
    }}>
      <SidebarAdmin active="dashboard" />

      <main style={{ flex: 1, padding: "24px 28px", overflowY: "auto", minWidth: 0 }}>

        {/* Header */}
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
            Dashboard Admin
          </h1>
          <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "4px 0 0" }}>
            Selamat datang kembali, Admin. Berikut ringkasan aktivitas SkillSwap.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
          {statCards.map((c) => (
            <div key={c.label} style={{
              background: "white", borderRadius: 14,
              padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>{c.label}</span>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: c.iconBg, color: c.iconColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {c.iconEl === "users"    && <Users size={20} />}
                  {c.iconEl === "activity" && <Activity size={20} />}
                  {c.iconEl === "alert"    && <AlertTriangle size={20} />}
                  {c.iconEl === "userx"    && <UserX size={20} />}
                </div>
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>{c.value}</div>
              <div style={{ fontSize: "0.72rem", color: c.subColor, marginTop: 6 }}>
                {c.subColor === "#22c55e" ? "▲" : "▼"} {c.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Tengah */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 16 }}>

          {/* Laporan Masuk */}
          <div style={{ background: "white", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>Laporan Masuk</h2>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/admin/kelola-laporan"); }}
                style={{ fontSize: "0.78rem", color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>
                Lihat semua
              </a>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {laporanMasuk.map((item) => (
                <li key={item.id} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "9px 0", borderBottom: "1px solid #f1f5f9",
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}>
                      {item.title}
                      {item.count && (
                        <span style={{ background: "#f1f5f9", color: "#64748b", fontSize: "0.7rem", padding: "1px 6px", borderRadius: 20 }}>
                          {item.count}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Kelola Pengguna */}
          <div style={{ background: "white", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>Kelola Pengguna</h2>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/admin/kelola-pengguna"); }}
                style={{ fontSize: "0.78rem", color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>
                Lihat semua
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 80px", gap: 8, padding: "6px 8px", marginBottom: 4 }}>
              {["PENGGUNA", "STATUS", "AKSI"].map((h) => (
                <div key={h} style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em" }}>{h}</div>
              ))}
            </div>

            {daftarPengguna.map((user) => (
              <div key={user.id} style={{
                display: "grid", gridTemplateColumns: "1fr 120px 80px",
                gap: 8, padding: "10px 8px", alignItems: "center",
                borderBottom: "1px solid #f8fafc",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: user.warna, color: "white",
                    fontSize: "0.68rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{user.avatar}</div>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b" }}>{user.nama}</div>
                    <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{user.role}</div>
                  </div>
                </div>
                <div>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: user.status === "Aktif" ? "#f0fdf4" : "#fff7ed",
                    color: user.status === "Aktif" ? "#22c55e" : "#f97316",
                    fontSize: "0.7rem", fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: user.status === "Aktif" ? "#22c55e" : "#f97316" }} />
                    {user.status}
                  </span>
                </div>
                <div>
                  <button style={{
                    padding: "4px 12px", borderRadius: 6,
                    border: user.status === "Aktif" ? "1px solid #fecaca" : "1px solid #fed7aa",
                    background: user.status === "Aktif" ? "#fef2f2" : "#fff7ed",
                    color: user.status === "Aktif" ? "#ef4444" : "#f97316",
                    fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
                  }}>
                    {user.status === "Aktif" ? "Suspend" : "Tinjau"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 28, fontSize: "0.72rem", color: "#94a3b8", paddingBottom: 16 }}>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </div>
      </main>
    </div>
  );
}