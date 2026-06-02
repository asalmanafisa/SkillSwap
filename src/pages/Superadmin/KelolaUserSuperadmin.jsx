// src/pages/Superadmin/KelolaUserSuperadmin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Filter, Download, Search, Star,
  ChevronLeft, ChevronRight, Ban, X,
  UserCheck, AlertTriangle, CheckCircle, Edit2
} from "lucide-react";

// ── Modal Notifikasi ──────────────────────────────────────
function NotificationModal({ message, type, onClose }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    }}>
      <div style={{
        background: "white",
        borderRadius: 20,
        padding: "28px 32px",
        width: 360,
        maxWidth: "90%",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: type === "success" ? "#dcfce7" : "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          {type === "success" ? (
            <CheckCircle size={28} color="#22c55e" />
          ) : (
            <AlertTriangle size={28} color="#ef4444" />
          )}
        </div>
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#1e293b",
          margin: "0 0 8px",
        }}>
          {type === "success" ? "Berhasil!" : "Perhatian"}
        </h3>
        <p style={{
          fontSize: "0.85rem",
          color: "#64748b",
          margin: "0 0 24px",
          lineHeight: 1.5,
        }}>
          {message}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "10px 24px",
            borderRadius: 12,
            border: "none",
            background: "#1e3a5f",
            color: "white",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            width: "100%",
          }}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

// ── Data dummy pengguna ───────────────────────────────────
const dummyUsers = [
  {
    id: 1, inisial: "AN", warna: "#3b82f6",
    nama: "Amira Salma Nafisa", email: "amira.nafisa@student.ub.ac.id",
    skills: ["UI/UX", "Figma"], bergabung: "12 Jan 2026",
    koneksi: 14, rating: 4.8, status: "Aktif", bio: "UI/UX Designer berpengalaman",
  },
  {
    id: 2, inisial: "FN", warna: "#f97316",
    nama: "Farah Naylul Fauzia", email: "farahfauzia@student.ub.ac.id",
    skills: ["Web Dev", "React", "+1"], bergabung: "3 Feb 2026",
    koneksi: 9, rating: 4.5, status: "Aktif", bio: "Frontend Developer",
  },
  {
    id: 3, inisial: "YS", warna: "#22c55e",
    nama: "Yasmine Shavira Ahmad", email: "yasmineshavira@student.ub.ac.id",
    skills: ["Python", "ML"], bergabung: "28 Jan 2026",
    koneksi: 22, rating: 5.0, status: "Aktif", bio: "Machine Learning Engineer",
  },
  {
    id: 4, inisial: "TN", warna: "#8b5cf6",
    nama: "Tabina Naila Griselda", email: "tabinaila@student.ub.ac.id",
    skills: ["Laravel"], bergabung: "5 Mar 2026",
    koneksi: 3, rating: 4.9, status: "Aktif", bio: "Backend Developer",
  },
  {
    id: 5, inisial: "SS", warna: "#ef4444",
    nama: "Sekar Suryawati", email: "sekar.suryawati@student.ub.ac.id",
    skills: ["Graphic Design"], bergabung: "10 Mar 2026",
    koneksi: 15, rating: 4.7, status: "Tersuspend", bio: "Graphic Designer",
  },
];

const skillColors = {
  "UI/UX":       { bg: "#ede9fe", text: "#7c3aed" },
  "Figma":       { bg: "#fce7f3", text: "#db2777" },
  "Web Dev":     { bg: "#dbeafe", text: "#2563eb" },
  "React":       { bg: "#e0f2fe", text: "#0284c7" },
  "Python":      { bg: "#dcfce7", text: "#16a34a" },
  "ML":          { bg: "#fef9c3", text: "#ca8a04" },
  "Laravel":     { bg: "#fee2e2", text: "#dc2626" },
  "Copywriting": { bg: "#fff7ed", text: "#ea580c" },
  "SEO":         { bg: "#f0fdf4", text: "#15803d" },
  "Android":     { bg: "#f0fdf4", text: "#15803d" },
  "Kotlin":      { bg: "#ede9fe", text: "#7c3aed" },
  "Graphic Design": { bg: "#fce7f3", text: "#db2777" },
  "+1":          { bg: "#f1f5f9", text: "#64748b" },
};

function StatusBadge({ status }) {
  const map = {
    "Aktif":      { bg: "#f0fdf4", color: "#22c55e", dot: "#22c55e" },
    "Tersuspend": { bg: "#fef2f2", color: "#ef4444", dot: "#ef4444" },
  };
  const s = map[status] || map["Aktif"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: s.bg, color: s.color,
      fontSize: "0.72rem", fontWeight: 600,
      padding: "3px 10px", borderRadius: 20,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
}

export default function KelolaUserSuperadmin() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterDate, setFilterDate] = useState("Semua");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showSuspend, setShowSuspend] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [users, setUsers] = useState(dummyUsers);

  // Fungsi untuk cek apakah user bergabung bulan ini
  const isNewThisMonth = (tanggal) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const bulanMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mei': 4, 'Jun': 5,
      'Jul': 6, 'Agu': 7, 'Sep': 8, 'Okt': 9, 'Nov': 10, 'Des': 11
    };
    const parts = tanggal.split(' ');
    const userMonth = bulanMap[parts[1]];
    const userYear = parseInt(parts[2]);
    
    return (userMonth === currentMonth && userYear === currentYear);
  };

  // Filter berdasarkan status
  const filterByStatus = (status) => {
    setFilterStatus(status);
    setFilterDate("Semua");
    setCurrentPage(1);
  };

  // Filter berdasarkan pengguna baru
  const filterByNewUser = () => {
    setFilterDate("bulan_ini");
    setFilterStatus("Semua");
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setFilterStatus("Semua");
    setFilterDate("Semua");
    setCurrentPage(1);
  };

  // Filter data
  const filtered = users.filter((u) => {
    const matchSearch = u.nama.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua" || u.status === filterStatus;
    
    let matchDate = true;
    if (filterDate === "bulan_ini") {
      matchDate = isNewThisMonth(u.bergabung);
    }
    
    return matchSearch && matchStatus && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / 5);
  const paginated = filtered.slice((currentPage - 1) * 5, currentPage * 5);

  // Handle Suspend/Ban (Toggle status)
  const handleSuspendToggle = (user) => {
    const newStatus = user.status === "Tersuspend" ? "Aktif" : "Tersuspend";
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    setShowSuspend(null);
    setNotification({
      message: `${user.nama} berhasil ${newStatus === "Tersuspend" ? "disuspend" : "diaktifkan kembali"}!`,
      type: "success"
    });
  };

  // Handle Delete
  const handleDelete = (user) => {
    setUsers(prev => prev.filter(u => u.id !== user.id));
    setShowDelete(null);
    setNotification({
      message: `User ${user.nama} berhasil dihapus!`,
      type: "success"
    });
  };

  const handleExport = () => {
    const headers = ["Nama", "Email", "Skill", "Bergabung", "Koneksi", "Rating", "Status"];
    const rows = filtered.map((u) => [
      u.nama, u.email, u.skills.join(" | "), u.bergabung, u.koneksi, u.rating ?? "-", u.status
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "daftar-pengguna.csv";
    a.click();
    URL.revokeObjectURL(url);
    setNotification({ message: "Data berhasil diekspor!", type: "success" });
  };

  const stats = {
    total: users.length,
    aktif: users.filter(u => u.status === "Aktif").length,
    tersuspend: users.filter(u => u.status === "Tersuspend").length,
    baruBulanIni: users.filter(u => isNewThisMonth(u.bergabung)).length,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fcf5e8", fontFamily: "'Inter', 'Poppins', 'Segoe UI', sans-serif" }}>
      <Sidebar role="superadmin" active="kelola-user" />

      <main style={{ 
        flex: 1, 
        padding: "24px 28px", 
        overflowY: "auto",
        minWidth: 0 
      }}>

        {/* Header */}
        <div style={{ marginBottom: 24, textAlign: "left" }}>
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: 700, 
            color: "#1e293b", 
            margin: 0,
            fontFamily: "'Fraunces', 'Poppins', serif"
          }}>
            Kelola User
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "8px 0 0" }}>
            Kelola semua pengguna yang terdaftar di platform SkillSwap.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {/* Total Pengguna Card */}
          <div 
            onClick={resetFilter}
            style={{ 
              background: filterStatus === "Semua" && filterDate === "Semua" ? "#e0e7ff" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterStatus === "Semua" && filterDate === "Semua" ? "1px solid #3b82f6" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>Total Pengguna</div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.total}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#22c55e", marginTop: 6 }}>▲ +2 bulan ini</div>
          </div>

          {/* Pengguna Aktif Card */}
          <div 
            onClick={() => filterByStatus("Aktif")}
            style={{ 
              background: filterStatus === "Aktif" && filterDate === "Semua" ? "#dcfce7" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterStatus === "Aktif" && filterDate === "Semua" ? "1px solid #22c55e" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>Pengguna Aktif</div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.aktif}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#22c55e", marginTop: 6 }}>▲ +2 minggu ini</div>
          </div>

          {/* Pengguna Baru Card */}
          <div 
            onClick={filterByNewUser}
            style={{ 
              background: filterDate === "bulan_ini" ? "#fff7ed" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterDate === "bulan_ini" ? "1px solid #f97316" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>Pengguna Baru</div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.baruBulanIni}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#f97316", marginTop: 6 }}>▲ Bulan Ini</div>
          </div>

          {/* Pengguna Tersuspend Card */}
          <div 
            onClick={() => filterByStatus("Tersuspend")}
            style={{ 
              background: filterStatus === "Tersuspend" && filterDate === "Semua" ? "#fef2f2" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterStatus === "Tersuspend" && filterDate === "Semua" ? "1px solid #ef4444" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>Pengguna Tersuspend</div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.tersuspend}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#ef4444", marginTop: 6 }}>▼ +1 minggu ini</div>
          </div>
        </div>

        {/* Reset Filter Button */}
        {(filterStatus !== "Semua" || filterDate !== "Semua") && (
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
              <X size={12} /> Reset Filter
            </button>
          </div>
        )}

        {/* Tabel Card */}
        <div style={{ background: "white", borderRadius: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 24px" }}>

          {/* Header tabel dengan search di samping filter */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                Daftar Pengguna
                {filterStatus !== "Semua" ? ` - ${filterStatus}` : ""}
                {filterDate === "bulan_ini" ? " - Pengguna Baru (Bulan Ini)" : ""}
              </h2>
              <span style={{ background: "#f1f5f9", color: "#64748b", fontSize: "0.72rem", fontWeight: 600, padding: "2px 10px", borderRadius: 20 }}>
                {filtered.length} user
              </span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {/* Search Bar - di samping filter */}
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input 
                  placeholder="Cari nama / email..." 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  style={{
                    paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, 
                    border: "1px solid #e2e8f0", borderRadius: 10,
                    fontSize: "0.8rem", color: "#475569", outline: "none", width: 220
                  }} 
                />
              </div>
              
              {/* Filter Button */}
              <div style={{ position: "relative" }}>
                <button 
                  style={btnOutline} 
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <Filter size={14} /> Filter
                </button>
                {showFilter && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "white",
                    borderRadius: 12,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    padding: "12px",
                    minWidth: 160,
                    zIndex: 50,
                    border: "1px solid #e2e8f0",
                  }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", marginBottom: 8 }}>FILTER STATUS</div>
                    {["Aktif", "Tersuspend"].map((s) => (
                      <div 
                        key={s} 
                        onClick={() => { filterByStatus(s); setShowFilter(false); }} 
                        style={{ 
                          padding: "8px 12px", 
                          borderRadius: 8, 
                          cursor: "pointer", 
                          fontSize: "0.8rem",
                          background: filterStatus === s && filterDate === "Semua" ? "#eff6ff" : "transparent",
                          color: filterStatus === s && filterDate === "Semua" ? "#3b82f6" : "#475569",
                          fontWeight: filterStatus === s && filterDate === "Semua" ? 600 : 400,
                          marginBottom: 4
                        }}
                      >
                        {s}
                      </div>
                    ))}
                    <div 
                      onClick={() => { filterByNewUser(); setShowFilter(false); }} 
                      style={{ 
                        padding: "8px 12px", 
                        borderRadius: 8, 
                        cursor: "pointer", 
                        fontSize: "0.8rem",
                        background: filterDate === "bulan_ini" ? "#eff6ff" : "transparent",
                        color: filterDate === "bulan_ini" ? "#3b82f6" : "#475569",
                        fontWeight: filterDate === "bulan_ini" ? 600 : 400,
                        marginBottom: 8
                      }}
                    >
                      Pengguna Baru (Bulan Ini)
                    </div>
                    <div style={{ borderTop: "1px solid #f1f5f9", margin: "8px 0" }} />
                    <div 
                      onClick={() => { resetFilter(); setShowFilter(false); }} 
                      style={{ 
                        padding: "8px 12px", 
                        borderRadius: 8, 
                        cursor: "pointer", 
                        fontSize: "0.8rem",
                        color: "#ef4444",
                        textAlign: "center"
                      }}
                    >
                      Reset Filter
                    </div>
                  </div>
                )}
              </div>
              
              {/* Export Button */}
              <button style={btnOutline} onClick={handleExport}>
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          {/* Tabel */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: 800 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <th style={{ ...th, textAlign: "left" }}>Nama / Email</th>
                  <th style={{ ...th, textAlign: "left" }}>Skill</th>
                  <th style={{ ...th, textAlign: "left" }}>Bergabung</th>
                  <th style={{ ...th, textAlign: "left" }}>Koneksi</th>
                  <th style={{ ...th, textAlign: "left" }}>Rating</th>
                  <th style={{ ...th, textAlign: "left" }}>Status</th>
                  <th style={{ ...th, textAlign: "left" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((user) => (
                  <tr key={user.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: user.warna, color: "white", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{user.inisial}</div>
                        <div>
                          <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem" }}>{user.nama}</div>
                          <div style={{ color: "#94a3b8", fontSize: "0.7rem" }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {user.skills.map((s) => {
                          const c = skillColors[s] || { bg: "#f1f5f9", text: "#64748b" };
                          return <span key={s} style={{ background: c.bg, color: c.text, fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: 6 }}>{s}</span>;
                        })}
                      </div>
                    </td>
                    <td style={{ ...td, color: "#64748b", fontSize: "0.8rem" }}>{user.bergabung}</td>
                    <td style={{ ...td, color: "#475569", fontWeight: 500 }}>{user.koneksi}</td>
                    <td style={td}>
                      {user.rating ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <Star size={13} fill="#fbbf24" color="#fbbf24" />
                          <span style={{ fontWeight: 600, color: "#475569", fontSize: "0.8rem" }}>{user.rating.toFixed(1)}</span>
                        </div>
                      ) : <span style={{ color: "#cbd5e1", fontSize: "0.75rem" }}>—</span>}
                    </td>
                    <td style={td}><StatusBadge status={user.status} /></td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button 
                          title={user.status === "Tersuspend" ? "Aktifkan" : "Suspend"} 
                          style={actionBtn("#eff6ff", "#3b82f6")} 
                          onClick={() => setShowSuspend(user)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          title="Hapus" 
                          style={actionBtn("#fef2f2", "#ef4444")} 
                          onClick={() => setShowDelete(user)}
                        >
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Menampilkan {((currentPage-1)*5)+1} - {Math.min(currentPage*5, filtered.length)} dari {filtered.length} user</span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} style={pageBtn(false)} disabled={currentPage === 1}><ChevronLeft size={14} /></button>
                {[...Array(Math.min(3, totalPages))].map((_, idx) => {
                  let pageNum = idx + 1;
                  if (totalPages > 3 && currentPage > 2) pageNum = currentPage - 1 + idx;
                  if (pageNum > totalPages) return null;
                  return <button key={pageNum} onClick={() => setCurrentPage(pageNum)} style={pageBtn(currentPage === pageNum)}>{pageNum}</button>;
                })}
                {totalPages > 3 && currentPage < totalPages - 1 && <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>...</span>}
                {totalPages > 3 && <button onClick={() => setCurrentPage(totalPages)} style={pageBtn(currentPage === totalPages)}>{totalPages}</button>}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} style={pageBtn(false)} disabled={currentPage === totalPages}><ChevronRight size={14} /></button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Suspend/Aktifkan */}
        {showSuspend && (
          <div style={modalOverlay} onClick={() => setShowSuspend(null)}>
            <div style={{ ...modalContent, width: 400 }} onClick={(e) => e.stopPropagation()}>
              <div style={{ textAlign: "center", padding: "28px 24px" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: showSuspend.status === "Tersuspend" ? "#dcfce7" : "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  {showSuspend.status === "Tersuspend" ? <UserCheck size={28} color="#22c55e" /> : <Ban size={28} color="#d97706" />}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>{showSuspend.status === "Tersuspend" ? "Aktifkan User?" : "Suspend User?"}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 20 }}>
                  {showSuspend.status === "Tersuspend" ? `User ${showSuspend.nama} akan diaktifkan kembali.` : `User ${showSuspend.nama} akan di-suspend sementara.`}
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button style={modalCancelBtn} onClick={() => setShowSuspend(null)}>Batal</button>
                  <button style={{ ...modalSaveBtn, background: showSuspend.status === "Tersuspend" ? "#22c55e" : "#d97706" }} onClick={() => handleSuspendToggle(showSuspend)}>
                    {showSuspend.status === "Tersuspend" ? "Ya, Aktifkan" : "Ya, Suspend"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Delete */}
        {showDelete && (
          <div style={modalOverlay} onClick={() => setShowDelete(null)}>
            <div style={{ ...modalContent, width: 400 }} onClick={(e) => e.stopPropagation()}>
              <div style={{ textAlign: "center", padding: "28px 24px" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><AlertTriangle size={28} color="#ef4444" /></div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>Hapus User?</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 20 }}>Hapus user <strong>{showDelete.nama}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button style={modalCancelBtn} onClick={() => setShowDelete(null)}>Batal</button>
                  <button style={{ ...modalSaveBtn, background: "#ef4444" }} onClick={() => handleDelete(showDelete)}>Ya, Hapus</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Notifikasi */}
        {notification && (
          <NotificationModal
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </main>
    </div>
  );
}

// ── Style helpers ─────────────────────────────────────────
const btnOutline = { display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 10, border: "1px solid #e2e8f0", background: "white", color: "#475569", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer" };
const th = { padding: "14px 12px", color: "#94a3b8", fontWeight: 600, fontSize: "0.7rem", whiteSpace: "nowrap", letterSpacing: "0.05em" };
const td = { padding: "14px 12px", verticalAlign: "middle" };
const actionBtn = (bg, color) => ({ width: 32, height: 32, borderRadius: 8, background: bg, color, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" });
const pageBtn = (active) => ({ minWidth: 30, height: 30, borderRadius: 8, border: active ? "none" : "1px solid #e2e8f0", background: active ? "#1e3a5f" : "white", color: active ? "white" : "#64748b", fontSize: "0.8rem", fontWeight: active ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" });
const modalOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalContent = { background: "white", borderRadius: 24, width: 500, maxWidth: "90%", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", overflow: "hidden" };
const modalCancelBtn = { padding: "10px 20px", borderRadius: 10, border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontSize: "0.8rem", cursor: "pointer" };
const modalSaveBtn = { padding: "10px 24px", borderRadius: 10, border: "none", background: "#1e3a5f", color: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" };