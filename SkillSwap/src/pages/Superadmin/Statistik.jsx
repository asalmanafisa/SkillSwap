import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

// ── Data dummy ────────────────────────────────────────────
const monthlyData = [
  { bulan: "Jan", pengguna: 320, sesi: 210, laporan: 8  },
  { bulan: "Feb", pengguna: 410, sesi: 290, laporan: 12 },
  { bulan: "Mar", pengguna: 530, sesi: 380, laporan: 6  },
  { bulan: "Apr", pengguna: 620, sesi: 470, laporan: 23 },
  { bulan: "Mei", pengguna: 480, sesi: 350, laporan: 10 },
  { bulan: "Jun", pengguna: 700, sesi: 540, laporan: 15 },
  { bulan: "Jul", pengguna: 650, sesi: 490, laporan: 9  },
  { bulan: "Agu", pengguna: 780, sesi: 600, laporan: 18 },
  { bulan: "Sep", pengguna: 590, sesi: 420, laporan: 7  },
  { bulan: "Okt", pengguna: 820, sesi: 650, laporan: 20 },
  { bulan: "Nov", pengguna: 760, sesi: 580, laporan: 14 },
  { bulan: "Des", pengguna: 900, sesi: 720, laporan: 11 },
];

const weeklyData = [
  { hari: "Sen", pengguna: 80,  sesi: 60,  laporan: 2 },
  { hari: "Sel", pengguna: 120, sesi: 90,  laporan: 5 },
  { hari: "Rab", pengguna: 95,  sesi: 70,  laporan: 3 },
  { hari: "Kam", pengguna: 150, sesi: 110, laporan: 7 },
  { hari: "Jum", pengguna: 130, sesi: 95,  laporan: 4 },
  { hari: "Sab", pengguna: 160, sesi: 130, laporan: 2 },
  { hari: "Min", pengguna: 110, sesi: 80,  laporan: 1 },
];

const topUsers = [
  { name: "Amira Salma Nafisa", skill: "UI/UX Design",    sesi: 48, status: "Aktif"      },
  { name: "Farah Naylul Fauzia", skill: "Web Development", sesi: 42, status: "Aktif"      },
  { name: "Diana Putri",         skill: "Data Science",    sesi: 39, status: "Verifikasi" },
  { name: "Budi Santoso",        skill: "Mobile Dev",      sesi: 35, status: "Aktif"      },
  { name: "Citra Dewi",          skill: "Graphic Design",  sesi: 30, status: "Aktif"      },
];

export default function Statistik() {
  const [year, setYear] = useState(2026);
  const [view, setView] = useState("bulanan"); // "bulanan" | "mingguan"

  const chartData = view === "bulanan" ? monthlyData : weeklyData;
  const xKey     = view === "bulanan" ? "bulan" : "hari";

  return (
    <div className="stat-layout">
      <Sidebar role="superadmin" active="statistik" />

      <main className="stat-main">

        {/* ── Header ───────────────────────────────────── */}
        <div className="stat-page-header">
          <div>
            <h1 className="stat-page-title">Statistik</h1>
            <p className="stat-page-sub">Ringkasan aktivitas platform SkillSwap</p>
          </div>
          <div className="year-control">
            <button onClick={() => setYear((y) => y - 1)}><ChevronLeft size={16} /></button>
            <span>{year}</span>
            <button onClick={() => setYear((y) => y + 1)}><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* ── Summary Cards ────────────────────────────── */}
        <div className="summary-cards">
          {[
            { label: "Total Pengguna", value: "5.284", sub: "+12% dari bulan lalu",  color: "#3b82f6" },
            { label: "Sesi Aktif",     value: "1.047", sub: "+8% dari minggu lalu",  color: "#22c55e" },
            { label: "Total Laporan",  value: "23",    sub: "+5 baru hari ini",       color: "#f97316" },
            { label: "Pengguna Baru",  value: "318",   sub: "Bulan April 2026",       color: "#8b5cf6" },
          ].map((item) => (
            <div key={item.label} className="summary-card">
              <div className="summary-accent" style={{ background: item.color }} />
              <div className="summary-body">
                <div className="summary-label">{item.label}</div>
                <div className="summary-val" style={{ color: item.color }}>{item.value}</div>
                <div className="summary-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Line Chart Aktivitas ──────────────────────── */}
        <div className="chart-section">
          <div className="chart-section-header">
            <h2>Grafik Aktivitas Platform</h2>
            <div className="view-toggle">
              <button
                className={view === "bulanan" ? "toggle-btn active" : "toggle-btn"}
                onClick={() => setView("bulanan")}
              >
                Bulanan
              </button>
              <button
                className={view === "mingguan" ? "toggle-btn active" : "toggle-btn"}
                onClick={() => setView("mingguan")}
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
              <Line type="monotone" dataKey="pengguna" name="Pengguna"   stroke="#3b82f6" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="sesi"     name="Sesi Aktif" stroke="#22c55e" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="laporan"  name="Laporan"    stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── Bar Chart Laporan ─────────────────────────── */}
        <div className="chart-section" style={{ marginTop: 20 }}>
          <div className="chart-section-header">
            <h2>Distribusi Laporan Per Bulan</h2>
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

        {/* ── Tabel Pengguna Aktif ──────────────────────── */}
        <div className="table-section">
          <div className="chart-section-header">
            <h2>Pengguna Paling Aktif</h2>
          </div>
          <table className="stat-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Skill Utama</th>
                <th>Total Sesi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, i) => (
                <tr key={user.name}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.skill}</td>
                  <td>{user.sesi}</td>
                  <td>
                    <span className={`status-badge ${user.status === "Aktif" ? "aktif" : "verif"}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, fontSize: "0.75rem", color: "#94a3b8", paddingBottom: 16 }}>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </div>
      </main>

      <style>{`
        .stat-layout {
          display: flex;
          min-height: 100vh;
          background: #f8f7f4;
          font-family: 'Poppins', 'Segoe UI', sans-serif;
        }
        .stat-main {
          flex: 1;
          padding: 32px 36px;
          overflow-y: auto;
        }
        .stat-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        .stat-page-title {
          font-size: 1.5rem; font-weight: 700; color: #1e293b; margin: 0;
        }
        .stat-page-sub {
          font-size: 0.85rem; color: #94a3b8; margin: 4px 0 0;
        }
        .year-control {
          display: flex; align-items: center; gap: 10px;
          background: white; border-radius: 10px;
          padding: 8px 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          font-weight: 600; color: #1e293b;
        }
        .year-control button {
          background: none; border: none; cursor: pointer;
          color: #94a3b8; display: flex;
        }

        /* Summary Cards */
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .summary-card {
          background: white; border-radius: 16px;
          display: flex; overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .summary-accent { width: 6px; flex-shrink: 0; }
        .summary-body { padding: 16px 16px 14px; }
        .summary-label { font-size: 0.8rem; color: #94a3b8; margin-bottom: 6px; }
        .summary-val   { font-size: 1.7rem; font-weight: 700; margin-bottom: 4px; }
        .summary-sub   { font-size: 0.75rem; color: #64748b; }

        /* Chart Section */
        .chart-section {
          background: white; border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .chart-section-header {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 18px;
        }
        .chart-section-header h2 {
          font-size: 1rem; font-weight: 600; color: #1e293b; margin: 0;
        }
        .view-toggle {
          display: flex; background: #f1f5f9;
          border-radius: 8px; padding: 3px; gap: 2px;
        }
        .toggle-btn {
          background: none; border: none; border-radius: 6px;
          padding: 5px 14px; font-size: 0.82rem;
          color: #64748b; cursor: pointer; font-weight: 500;
          transition: all 0.2s;
        }
        .toggle-btn.active {
          background: white; color: #1e293b;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* Table */
        .table-section {
          background: white; border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          margin-top: 20px;
        }
        .stat-table {
          width: 100%; border-collapse: collapse; font-size: 0.87rem;
        }
        .stat-table th {
          text-align: left; color: #94a3b8; font-weight: 500;
          padding: 10px 12px; border-bottom: 1px solid #f1f5f9;
          font-size: 0.8rem;
        }
        .stat-table td {
          padding: 12px 12px; color: #475569;
          border-bottom: 1px solid #f8fafc;
        }
        .stat-table tr:last-child td { border-bottom: none; }
        .status-badge {
          display: inline-block; padding: 3px 10px;
          border-radius: 20px; font-size: 0.75rem; font-weight: 500;
        }
        .status-badge.aktif { background: #f0fdf4; color: #22c55e; }
        .status-badge.verif { background: #eff6ff; color: #3b82f6; }
      `}</style>
    </div>
  );
}