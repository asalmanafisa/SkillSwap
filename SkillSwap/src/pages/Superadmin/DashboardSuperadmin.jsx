import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Users, Activity, AlertTriangle, UserX,
  ChevronLeft, ChevronRight, ChevronDown, ExternalLink,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ── Data dummy chart ──────────────────────────────────────
const statsData7Days = [
  { day: "Sen", thisMonth: 3, lastMonth: 2 },
  { day: "Sel", thisMonth: 4, lastMonth: 3 },
  { day: "Rab", thisMonth: 3, lastMonth: 5 },
  { day: "Kam", thisMonth: 6, lastMonth: 4 },
  { day: "Jum", thisMonth: 5, lastMonth: 3 },
  { day: "Sab", thisMonth: 7, lastMonth: 4 },
  { day: "Min", thisMonth: 6, lastMonth: 5 },
];

const statsData30Days = [
  { day: "1",  thisMonth: 2, lastMonth: 1 },
  { day: "5",  thisMonth: 3, lastMonth: 3 },
  { day: "10", thisMonth: 5, lastMonth: 4 },
  { day: "15", thisMonth: 4, lastMonth: 5 },
  { day: "20", thisMonth: 6, lastMonth: 3 },
  { day: "25", thisMonth: 5, lastMonth: 4 },
  { day: "30", thisMonth: 7, lastMonth: 5 },
];

// ── Data dummy laporan ────────────────────────────────────
const laporanMasuk = [
  { id: 1, title: "Konten tidak pantas",         desc: "Dilaporkan oleh Amira Salma Nafisa", color: "#ef4444" },
  { id: 2, title: "Spam atau penipuan skill", desc: "Dilaporkan oleh Farah Naylul Fauzia",    color: "#f97316" },
  { id: 3, title: "Pelecehan atau bullying",        desc: "Dilaporkan oleh Yasmine Shavira Ahmad",  color: "#ef4444" },
  { id: 4, title: "Akun palsu/duplikat", desc: "Dilaporkan oleh Tabina Naila Griselda", color: "#3b82f6" },
];

export default function DashboardSuperadmin() {
  const navigate = useNavigate(); 
  const [year, setYear] = useState(2026);
  const [period, setPeriod] = useState("7 days");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const chartData = period === "7 days" ? statsData7Days : statsData30Days;

  return (
    <div className="dashboard-layout">
      {/* Sidebar dengan prop role & active */}
      <Sidebar role="superadmin" active="dashboard" />

      <main className="dashboard-main">

        {/* ── Header ───────────────────────────────────── */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard Superadmin</h1>
            <p className="dashboard-subtitle">Periode: April 2026</p>
          </div>
          <button className="period-btn" onClick={() => navigate("/superadmin/statistik")}>
            Bulan Ini <ChevronDown size={16} />
          </button>
        </div>

        {/* ── 4 Stat Cards ─────────────────────────────── */}
        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-label">Total Pengguna</span>
              <div className="stat-icon blue"><Users size={20} /></div>
            </div>
            <div className="stat-value">5</div>
            <div className="stat-change positive">▲ +2 bulan ini</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-label">Sesi Aktif</span>
              <div className="stat-icon green"><Activity size={20} /></div>
            </div>
            <div className="stat-value">4</div>
            <div className="stat-change positive">▲ +2 minggu ini</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-label">Laporan Masuk</span>
              <div className="stat-icon orange"><AlertTriangle size={20} /></div>
            </div>
            <div className="stat-value">4</div>
            <div className="stat-change negative">▼ +2 minggu ini</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-label">Pengguna Tersuspend</span>
              <div className="stat-icon red"><UserX size={20} /></div>
            </div>
            <div className="stat-value">1</div>
            <div className="stat-change negative">▼ +1 minggu ini</div>
          </div>
        </div>

        {/* ── Tengah: Laporan + Chart ───────────────────── */}
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
                    <div className="laporan-title">
                      {item.title}
                      {item.count && (
                        <span className="laporan-count">{item.count}</span>
                      )}
                    </div>
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
                <button onClick={() => setYear((y) => y - 1)}>
                  <ChevronLeft size={16} />
                </button>
                <span>{year}</span>
                <button onClick={() => setYear((y) => y + 1)}>
                  <ChevronRight size={16} />
                </button>

                {/* Dropdown period */}
                <div className="period-selector">
                  <button
                    className="period-select-btn"
                    onClick={() => setShowPeriodMenu(!showPeriodMenu)}
                  >
                    {period} <ChevronDown size={14} />
                  </button>
                  {showPeriodMenu && (
                    <div className="period-dropdown">
                      {["7 days", "30 days"].map((p) => (
                        <div
                          key={p}
                          className="period-option"
                          onClick={() => { setPeriod(p); setShowPeriodMenu(false); }}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

           

            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(val) => val === "thisMonth" ? "This Month" : "Last Month"}
                />
                <Line type="monotone" dataKey="thisMonth" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="lastMonth" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, fontSize: "0.75rem", color: "#94a3b8", paddingBottom: 16 }}>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </div>
      </main>
      

      <style>{`
        .dashboard-layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: #f8f7f4;
          font-family: 'Poppins', 'Segoe UI', sans-serif;
        }
        .dashboard-main {
          flex: 1;
          padding: 32px 36px;
          overflow-y: auto;
        }
          background: #f8f7f4;
          font-family: 'Poppins', 'Segoe UI', sans-serif;
        }
        .dashboard-main {
          flex: 1;
          padding: 32px 36px;
          overflow-y: auto;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        .dashboard-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        .dashboard-subtitle {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 4px 0 0;
        }
        .period-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1e3a5f;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
        }

        /* Stat Cards */
        .stat-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }
        .stat-card {
          background: white;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
          .stat-value {
            font-size: 1.5rem;      /* dari 1.8rem */
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 4px;
        }
        .stat-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .stat-label { font-size: 0.75rem; color: #94a3b8; font-weight: 500; }
        .stat-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-icon.blue   { background: #eff6ff; color: #3b82f6; }
        .stat-icon.green  { background: #f0fdf4; color: #22c55e; }
        .stat-icon.orange { background: #fff7ed; color: #f97316; }
        .stat-icon.red    { background: #fef2f2; color: #ef4444; }
        .stat-value {
          font-size: 1.5rem; font-weight: 700;
          color: #1e293b; margin-bottom: 4px;
        }
        .stat-change { font-size: 0.78rem; font-weight: 500; }
        .stat-change.positive { color: #22c55e; }
        .stat-change.negative { color: #ef4444; }

        /* Middle Section */
        .middle-section {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 14px;
          margin-bottom: 20px;
        }
        .laporan-card, .chart-card {
          background: white;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .laporan-header, .chart-header, .monitoring-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .laporan-header h2, .chart-header h2, .monitoring-header h2 {
          font-size: 1rem; font-weight: 600; color: #1e293b; margin: 0;
        }
        .lihat-semua {
          font-size: 0.82rem; color: #3b82f6;
          text-decoration: none; font-weight: 500;
          display: flex; align-items: center; gap: 4px;
        }
        .laporan-list { list-style: none; padding: 0; margin: 0; }
        .laporan-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .laporan-item:last-child { border-bottom: none; }
        .laporan-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          margin-top: 5px; flex-shrink: 0;
        }
        .laporan-title {
          font-size: 0.88rem; font-weight: 600; color: #1e293b;
          display: flex; align-items: center; gap: 8px;
        }
        .laporan-count {
          background: #f1f5f9; color: #64748b;
          font-size: 0.75rem; padding: 1px 7px; border-radius: 20px;
        }
        .laporan-desc {
          font-size: 0.78rem; color: #94a3b8; margin-top: 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Chart Controls */
        .chart-controls {
          display: flex; align-items: center;
          gap: 8px; font-size: 0.85rem; color: #64748b;
        }
        .chart-controls button {
          background: none; border: none;
          cursor: pointer; color: #94a3b8; display: flex;
        }
        .period-selector { position: relative; }
        .period-select-btn {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px;
          padding: 5px 10px !important;
          font-size: 0.82rem; color: #64748b !important;
          cursor: pointer;
          display: flex; align-items: center; gap: 4px;
        }
        .period-dropdown {
          position: absolute; right: 0;
          top: calc(100% + 4px);
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          z-index: 10; min-width: 100px;
        }
        .period-option {
          padding: 8px 14px;
          font-size: 0.83rem; cursor: pointer; color: #475569;
        }
        .period-option:hover { background: #f8fafc; }

        /* Monitoring */
        .monitoring-card {
          background: white;
          border-radius: 14px;
          padding: 16px 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .monitoring-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .mon-stat { text-align: center; }
        .mon-value { font-size: 1.6rem; font-weight: 700; margin-bottom: 4px; }
        .mon-value.blue   { color: #3b82f6; }
        .mon-value.green  { color: #22c55e; }
        .mon-value.orange { color: #f97316; }
        .mon-label { font-size: 0.82rem; color: #94a3b8; margin-bottom: 10px; }
        .mon-bar {
          height: 4px; background: #f1f5f9;
          border-radius: 4px; overflow: hidden;
        }
        .mon-bar-fill {
          height: 100%; border-radius: 4px;
          transition: width 0.6s ease;
        }
        .mon-bar-fill.blue   { background: #3b82f6; }
        .mon-bar-fill.green  { background: #22c55e; }
        .mon-bar-fill.orange { background: #f97316; }
      `}</style>
    </div>
  );
}