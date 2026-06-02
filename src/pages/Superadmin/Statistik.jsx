// src/pages/Superadmin/Statistik.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { ChevronLeft, ChevronRight, Users, Activity, AlertTriangle, UserX, Star, UserCheck, ArrowRight } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

// ── Data dummy ────────────────────────────────────────────
// Data untuk tahun 2026
const monthlyData2026 = [
  { bulan: "Jan", pengguna: 3, sesi: 2, laporan: 8, tersuspend: 0 },
  { bulan: "Feb", pengguna: 4, sesi: 2, laporan: 1, tersuspend: 0 },
  { bulan: "Mar", pengguna: 5, sesi: 3, laporan: 6, tersuspend: 1 },
  { bulan: "Apr", pengguna: 6, sesi: 4, laporan: 2, tersuspend: 1 },
  { bulan: "Mei", pengguna: 4, sesi: 3, laporan: 1, tersuspend: 1 },
  { bulan: "Jun", pengguna: 7, sesi: 5, laporan: 1, tersuspend: 1 },
  { bulan: "Jul", pengguna: 6, sesi: 4, laporan: 9, tersuspend: 2 },
  { bulan: "Agu", pengguna: 7, sesi: 6, laporan: 1, tersuspend: 2 },
  { bulan: "Sep", pengguna: 5, sesi: 4, laporan: 7, tersuspend: 2 },
  { bulan: "Okt", pengguna: 8, sesi: 6, laporan: 2, tersuspend: 2 },
  { bulan: "Nov", pengguna: 7, sesi: 5, laporan: 1, tersuspend: 2 },
  { bulan: "Des", pengguna: 9, sesi: 7, laporan: 1, tersuspend: 1 },
];

// Data untuk tahun selain 2026 (kosong/0)
const emptyMonthlyData = [
  { bulan: "Jan", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Feb", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Mar", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Apr", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Mei", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Jun", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Jul", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Agu", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Sep", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Okt", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Nov", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { bulan: "Des", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
];

const weeklyData2026 = [
  { hari: "Sen", pengguna: 8, sesi: 6, laporan: 2, tersuspend: 1 },
  { hari: "Sel", pengguna: 1, sesi: 9, laporan: 5, tersuspend: 1 },
  { hari: "Rab", pengguna: 9, sesi: 7, laporan: 3, tersuspend: 0 },
  { hari: "Kam", pengguna: 1, sesi: 1, laporan: 7, tersuspend: 1 },
  { hari: "Jum", pengguna: 1, sesi: 9, laporan: 4, tersuspend: 1 },
  { hari: "Sab", pengguna: 1, sesi: 1, laporan: 2, tersuspend: 0 },
  { hari: "Min", pengguna: 1, sesi: 8, laporan: 1, tersuspend: 1 },
];

const emptyWeeklyData = [
  { hari: "Sen", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { hari: "Sel", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { hari: "Rab", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { hari: "Kam", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { hari: "Jum", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { hari: "Sab", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
  { hari: "Min", pengguna: 0, sesi: 0, laporan: 0, tersuspend: 0 },
];

// Data pengguna paling aktif dengan koneksi dan rating
const topUsers = [
  { id: 1, name: "Amira Salma Nafisa", skill: "UI/UX Design", koneksi: 14, rating: 4.8, status: "Aktif" },
  { id: 2, name: "Farah Naylul Fauzia", skill: "Web Development", koneksi: 9, rating: 4.5, status: "Aktif" },
  { id: 3, name: "Yasmine Shavira Ahmad", skill: "Data Science", koneksi: 22, rating: 5.0, status: "Aktif" },
  { id: 4, name: "Tabina Naila Griselda", skill: "Mobile Dev", koneksi: 3, rating: 4.9, status: "Aktif" },
  { id: 5, name: "Sekar Suryawati", skill: "Graphic Design", koneksi: 15, rating: 4.7, status: "Tersuspend" },
];

const statCards = [
  { 
    label: "Total Pengguna", 
    key: "pengguna", 
    dataKey: "pengguna",
    value: "9", 
    sub: "+2 bulan ini", 
    subColor: "#22c55e", 
    icon: <Users size={20} color="#3b82f6" />, 
    iconBg: "#eff6ff",
    lineColor: "#3b82f6"
  },
  { 
    label: "Sesi Aktif", 
    key: "sesi", 
    dataKey: "sesi",
    value: "7", 
    sub: "+2 minggu ini", 
    subColor: "#22c55e", 
    icon: <Activity size={20} color="#22c55e" />, 
    iconBg: "#f0fdf4",
    lineColor: "#22c55e"
  },
  { 
    label: "Total Laporan", 
    key: "laporan", 
    dataKey: "laporan",
    value: "9", 
    sub: "+2 minggu ini", 
    subColor: "#ef4444", 
    icon: <AlertTriangle size={20} color="#f97316" />, 
    iconBg: "#fff7ed",
    lineColor: "#f97316"
  },
  { 
    label: "Pengguna Tersuspend", 
    key: "tersuspend", 
    dataKey: "tersuspend",
    value: "2", 
    sub: "+1 minggu ini", 
    subColor: "#ef4444", 
    icon: <UserX size={20} color="#ef4444" />, 
    iconBg: "#fef2f2",
    lineColor: "#ef4444"
  },
];

export default function Statistik() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2026);
  const [view, setView] = useState("bulanan");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Pilih data berdasarkan tahun
  const isYear2026 = year === 2026;
  
  const monthlyData = isYear2026 ? monthlyData2026 : emptyMonthlyData;
  const weeklyData = isYear2026 ? weeklyData2026 : emptyWeeklyData;
  
  const chartData = view === "bulanan" ? monthlyData : weeklyData;
  const xKey = view === "bulanan" ? "bulan" : "hari";

  // Nilai statistik berdasarkan tahun
  const getStatValue = (type) => {
    if (!isYear2026) return "0";
    switch(type) {
      case "pengguna": return "9";
      case "sesi": return "7";
      case "laporan": return "9";
      case "tersuspend": return "2";
      default: return "0";
    }
  };

  const getStatSub = (type) => {
    if (!isYear2026) return "Tidak ada data";
    switch(type) {
      case "pengguna": return "+2 bulan ini";
      case "sesi": return "+2 minggu ini";
      case "laporan": return "+2 minggu ini";
      case "tersuspend": return "+1 minggu ini";
      default: return "";
    }
  };

  // Filter berdasarkan metrik yang dipilih
  const filterByMetric = (key) => {
    setSelectedMetric(key);
  };

  const resetFilter = () => {
    setSelectedMetric("all");
  };

  const getChartLines = () => {
    if (selectedMetric === "all") {
      return statCards;
    }
    return statCards.filter(card => card.key === selectedMetric);
  };

  const chartLines = getChartLines();

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "#fcf5e8", fontFamily: "'Inter', 'Poppins', 'Segoe UI', sans-serif",
    }}>
      <Sidebar role="superadmin" active="statistik" />

      <main style={{ 
        flex: 1, 
        padding: "24px 28px", 
        overflowY: "auto",
        minWidth: 0 
      }}>

        {/* Header */}
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ 
              fontSize: "2rem", 
              fontWeight: 700, 
              color: "#1e293b", 
              margin: 0,
              fontFamily: "'Fraunces', 'Poppins', serif"
            }}>
              Statistik
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "8px 0 0" }}>
              Ringkasan aktivitas platform SkillSwap
            </p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "white", borderRadius: 12,
            padding: "6px 16px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            fontWeight: 600, color: "#1e293b",
          }}>
            <button onClick={() => setYear((y) => y - 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex" }}>
              <ChevronLeft size={16} />
            </button>
            <span>{year}</span>
            <button onClick={() => setYear((y) => y + 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex" }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Stat Cards - bisa ditekan */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {statCards.map((c) => (
            <div 
              key={c.label}
              onClick={() => filterByMetric(c.key)}
              style={{ 
                background: selectedMetric === c.key ? c.iconBg : "white",
                borderRadius: 16, padding: "16px 18px", 
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "all 0.2s",
                border: selectedMetric === c.key ? `1px solid ${c.subColor}` : "1px solid transparent"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: c.subColor }}>
                  {getStatSub(c.key) !== "Tidak ada data" ? (c.subColor === "#22c55e" ? "▲" : "▼") : ""} {getStatSub(c.key)}
                </span>
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
                {c.label}
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{getStatValue(c.key)}</div>
            </div>
          ))}
        </div>

        {/* Reset Filter Button */}
        {selectedMetric !== "all" && (
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={resetFilter}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                background: "#f1f5f9",
                color: "#64748b",
                fontSize: "0.7rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "12px" }}>✕</span> Reset Filter
            </button>
          </div>
        )}

        {/* Line Chart Aktivitas */}
        <div style={{
          background: "white", borderRadius: 20,
          padding: "20px 24px", marginBottom: 20,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Grafik Aktivitas Platform
              {selectedMetric !== "all" ? ` - ${statCards.find(c => c.key === selectedMetric)?.label || ""}` : ""}
            </h2>
            <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 10, padding: "3px", gap: 2 }}>
              <button
                onClick={() => setView("bulanan")}
                style={{
                  background: view === "bulanan" ? "white" : "none",
                  border: "none", borderRadius: 8,
                  padding: "5px 16px", fontSize: "0.8rem",
                  color: view === "bulanan" ? "#1e293b" : "#64748b",
                  cursor: "pointer", fontWeight: 500,
                  boxShadow: view === "bulanan" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                Bulanan
              </button>
              <button
                onClick={() => setView("mingguan")}
                style={{
                  background: view === "mingguan" ? "white" : "none",
                  border: "none", borderRadius: 8,
                  padding: "5px 16px", fontSize: "0.8rem",
                  color: view === "mingguan" ? "#1e293b" : "#64748b",
                  cursor: "pointer", fontWeight: 500,
                  boxShadow: view === "mingguan" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                Mingguan
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" iconSize={10} />
              {chartLines.map((card) => (
                <Line 
                  key={card.key}
                  type="monotone" 
                  dataKey={card.dataKey} 
                  name={card.label} 
                  stroke={card.lineColor} 
                  strokeWidth={2.5} 
                  dot={false} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart Laporan */}
        <div style={{
          background: "white", borderRadius: 20,
          padding: "20px 24px", marginBottom: 20,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Distribusi Laporan Per Bulan
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="laporan" name="Laporan" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabel Pengguna Paling Aktif */}
        <div style={{
          background: "white", borderRadius: 20,
          padding: "20px 24px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Pengguna Paling Aktif
            </h2>
            <button
              onClick={() => navigate("/superadmin/kelola-user")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 14px",
                borderRadius: 8,
                background: "#f1f5f9",
                color: "#64748b",
                fontSize: "0.72rem",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e2e8f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f1f5f9";
              }}
            >
              Lihat Selengkapnya <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <th style={{ padding: "14px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>#</th>
                  <th style={{ padding: "14px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>Nama</th>
                  <th style={{ padding: "14px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>Skill Utama</th>
                  <th style={{ padding: "14px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>Koneksi</th>
                  <th style={{ padding: "14px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>Rating</th>
                  <th style={{ padding: "14px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user, i) => (
                  <tr key={user.name} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={{ padding: "14px 12px", verticalAlign: "middle", color: "#64748b" }}>{i + 1}</td>
                    <td style={{ padding: "14px 12px", verticalAlign: "middle", fontWeight: 600, color: "#1e293b" }}>{user.name}</td>
                    <td style={{ padding: "14px 12px", verticalAlign: "middle", color: "#64748b" }}>{user.skill}</td>
                    <td style={{ padding: "14px 12px", verticalAlign: "middle", fontWeight: 500, color: "#475569" }}>{user.koneksi}</td>
                    <td style={{ padding: "14px 12px", verticalAlign: "middle", fontWeight: 500, color: "#475569" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Star size={12} fill="#fbbf24" color="#fbbf24" />
                        {user.rating}
                      </div>
                    </td>
                    <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: user.status === "Aktif" ? "#f0fdf4" : "#fef2f2",
                        color: user.status === "Aktif" ? "#22c55e" : "#ef4444",
                        fontSize: "0.7rem", fontWeight: 600,
                        padding: "4px 12px", borderRadius: 20,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: user.status === "Aktif" ? "#22c55e" : "#ef4444" }} />
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}