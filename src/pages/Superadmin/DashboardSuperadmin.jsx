// src/pages/Superadmin/DashboardSuperadmin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Users, Activity, AlertTriangle, UserX,
  ChevronDown, X
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ── Data dummy chart (Mingguan) ──────────────────────────
const weeklyData = [
  { hari: "Sen", pengguna: 8, sesi: 6, laporan: 2, tersuspend: 1 },
  { hari: "Sel", pengguna: 10, sesi: 9, laporan: 5, tersuspend: 1 },
  { hari: "Rab", pengguna: 9, sesi: 7, laporan: 3, tersuspend: 0 },
  { hari: "Kam", pengguna: 7, sesi: 8, laporan: 7, tersuspend: 1 },
  { hari: "Jum", pengguna: 11, sesi: 9, laporan: 4, tersuspend: 1 },
  { hari: "Sab", pengguna: 6, sesi: 5, laporan: 2, tersuspend: 0 },
  { hari: "Min", pengguna: 5, sesi: 8, laporan: 1, tersuspend: 1 },
];

// ── Data dummy chart (Bulanan) ───────────────────────────
const monthlyData = [
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

// ── Data dummy laporan ────────────────────────────────────
const laporanMasuk = [
  { id: 1, title: "Konten tidak pantas",         desc: "Dilaporkan oleh Amira Salma Nafisa", color: "#ef4444" },
  { id: 2, title: "Spam atau penipuan skill", desc: "Dilaporkan oleh Farah Naylul Fauzia",    color: "#f97316" },
  { id: 3, title: "Pelecehan atau bullying",        desc: "Dilaporkan oleh Yasmine Shavira Ahmad",  color: "#ef4444" },
  { id: 4, title: "Akun palsu/duplikat", desc: "Dilaporkan oleh Tabina Naila Griselda", color: "#3b82f6" },
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
    label: "Laporan Masuk", 
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

export default function DashboardSuperadmin() {
  const navigate = useNavigate(); 
  const [view, setView] = useState("mingguan"); // "mingguan" | "bulanan"
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("all");

  const chartData = view === "mingguan" ? weeklyData : monthlyData;
  const xKey = view === "mingguan" ? "hari" : "bulan";

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
    <div className="dashboard-layout">
      <Sidebar role="superadmin" active="dashboard" />

      <main className="dashboard-main">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard Superadmin</h1>
            <p className="dashboard-subtitle">Ringkasan aktivitas platform SkillSwap</p>
          </div>
        </div>

        {/* Stat Cards - bisa ditekan */}
        <div className="stat-cards">
          {statCards.map((c) => (
            <div 
              key={c.label}
              onClick={() => filterByMetric(c.key)}
              className={`stat-card ${selectedMetric === c.key ? 'active' : ''}`}
              style={{ 
                background: selectedMetric === c.key ? c.iconBg : "white",
                border: selectedMetric === c.key ? `1px solid ${c.subColor}` : "1px solid transparent"
              }}
            >
              <div className="stat-card-top">
                <span className="stat-label">{c.label}</span>
                <div className={`stat-icon ${c.key === "pengguna" ? "blue" : c.key === "sesi" ? "green" : c.key === "laporan" ? "orange" : "red"}`}>
                  {c.icon}
                </div>
              </div>
              <div className="stat-value">{c.value}</div>
              <div className={`stat-change ${c.subColor === "#22c55e" ? "positive" : "negative"}`}>
                {c.subColor === "#22c55e" ? "▲" : "▼"} {c.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Reset Filter Button */}
        {selectedMetric !== "all" && (
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={resetFilter}
              className="reset-filter-btn"
            >
              <X size={12} /> Reset Filter
            </button>
          </div>
        )}

        {/* Tengah: Laporan + Chart */}
        <div className="middle-section">

          {/* Laporan Masuk */}
          <div className="laporan-card">
            <div className="laporan-header">
              <h2>Laporan Masuk</h2>
              <a
                href="#"
                className="lihat-semua"
                onClick={(e) => { e.preventDefault(); navigate("/superadmin/laporan"); }}
              >
                Lihat semua
              </a>
            </div>
            <ul className="laporan-list">
              {laporanMasuk.map((item) => (
                <li key={item.id} className="laporan-item">
                  <span className="laporan-dot" style={{ background: item.color }} />
                  <div className="laporan-content">
                    <div className="laporan-title">{item.title}</div>
                    <div className="laporan-desc">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Chart Statistik */}
          <div className="chart-card">
            <div className="chart-header">
              <h2>Statistik</h2>
              <div className="chart-controls">
                {/* Period dropdown */}
                <div className="period-selector">
                  <button
                    className="period-select-btn"
                    onClick={() => setShowPeriodMenu(!showPeriodMenu)}
                  >
                    {view === "mingguan" ? "Mingguan" : "Bulanan"} <ChevronDown size={14} />
                  </button>
                  {showPeriodMenu && (
                    <div className="period-dropdown">
                      <div
                        className="period-option"
                        onClick={() => { setView("mingguan"); setShowPeriodMenu(false); }}
                      >
                        Mingguan
                      </div>
                      <div
                        className="period-option"
                        onClick={() => { setView("bulanan"); setShowPeriodMenu(false); }}
                      >
                        Bulanan
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Tombol Lihat Rincian */}
                <button 
                  className="lihat-rincian-btn"
                  onClick={() => navigate("/superadmin/statistik")}
                >
                  Lihat Rincian
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey={xKey} 
                  tick={{ fontSize: 9, fill: "#94a3b8" }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis hide />
                <Tooltip />
                <Legend 
                  iconType="circle" 
                  iconSize={10} 
                  wrapperStyle={{ fontSize: "12px", paddingTop: "6px" }}
                  formatter={(value) => <span style={{ fontSize: "12px" }}>{value}</span>}
                />
                {chartLines.map((card) => (
                  <Line 
                    key={card.key}
                    type="monotone" 
                    dataKey={card.dataKey} 
                    name={card.label} 
                    stroke={card.lineColor} 
                    strokeWidth={1.5} 
                    dot={false} 
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #fcf5e8;
          font-family: 'Poppins', 'Segoe UI', sans-serif;
        }
        .dashboard-main {
          flex: 1;
          padding: 24px 28px;
          overflow-y: auto;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          font-family: 'Fraunces', 'Poppins', serif;
        }
        .dashboard-subtitle {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 8px 0 0;
        }

        /* Stat Cards */
        .stat-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          border-radius: 16px;
          padding: 16px 18px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          cursor: pointer;
          transition: all 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .stat-card.active {
          background: #e0e7ff;
        }
        .stat-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .stat-label { 
          font-size: 0.75rem; 
          color: #94a3b8; 
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-icon.blue   { background: #eff6ff; color: #3b82f6; }
        .stat-icon.green  { background: #f0fdf4; color: #22c55e; }
        .stat-icon.orange { background: #fff7ed; color: #f97316; }
        .stat-icon.red    { background: #fef2f2; color: #ef4444; }
        .stat-value {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 6px;
        }
        .stat-change { 
          font-size: 0.72rem; 
          font-weight: 600;
        }
        .stat-change.positive { color: #22c55e; }
        .stat-change.negative { color: #ef4444; }

        /* Reset Filter Button */
        .reset-filter-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #64748b;
          font-size: 0.7rem;
          border: none;
          cursor: pointer;
        }

        /* Middle Section */
        .middle-section {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 16px;
        }
        .laporan-card, .chart-card {
          background: white;
          border-radius: 20px;
          padding: 20px 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .laporan-header, .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .laporan-header h2, .chart-header h2 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
        .lihat-semua {
          font-size: 0.78rem;
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }
        .lihat-rincian-btn {
          background: #1e3a5f;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 0.7rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .lihat-rincian-btn:hover {
          background: #2d4a6e;
        }
        .laporan-list { 
          list-style: none; 
          padding: 0; 
          margin: 0; 
        }
        .laporan-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .laporan-item:last-child { border-bottom: none; }
        .laporan-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }
        .laporan-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1e293b;
        }
        .laporan-desc {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        /* Chart Controls */
        .chart-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .period-selector { 
          position: relative; 
        }
        .period-select-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 0.75rem;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .period-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 4px);
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          z-index: 10;
          min-width: 100px;
        }
        .period-option {
          padding: 8px 14px;
          font-size: 0.8rem;
          cursor: pointer;
          color: #475569;
        }
        .period-option:hover { 
          background: #f8fafc; 
        }
      `}</style>
    </div>
  );
}