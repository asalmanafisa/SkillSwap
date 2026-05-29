// src/pages/Admin/KelolaLaporan.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText,
  LogOut, Filter, Eye, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle, Clock, X,
  RefreshCw, MessageCircle, Calendar, User, Tag
} from "lucide-react";

// ── Data dummy ────────────────────────────────────────────
const dummyLaporan = [
  { 
    id: 1,
    pelapor: "Amira Salma Nafisa",
    idPelapor: "ID: #REP-8821",
    avatar: "AN",
    warna: "#ef4444",
    kategori: "Konten tidak pantas",
    tanggal: "24 Okt 2024, 14:20",
    status: "Menunggu",
    deskripsi: "Pengguna ini melakukan spam dan mengirimkan pesan yang tidak pantas di forum diskusi. Sudah saya laporkan berkali-kali tapi masih terus mengganggu.",
    bukti: "screenshot_spam.jpg",
    dilaporkan: "Budi Santoso",
    idDilaporkan: "ID: #REP-7654"
  },
  { 
    id: 2,
    pelapor: "Farah Naylul Fauzia",
    idPelapor: "ID: #REP-8822",
    avatar: "FN",
    warna: "#3b82f6",
    kategori: "Spam atau penipuan skill",
    tanggal: "24 Okt 2024, 11:05",
    status: "Diproses",
    deskripsi: "Akun saya tiba-tiba tidak bisa login setelah reset password. Sudah mencoba beberapa kali tetapi selalu gagal.",
    bukti: "screenshot_error.jpg",
    dilaporkan: "-",
    idDilaporkan: "-"
  },
  { 
    id: 3,
    pelapor: "Yasmine Shavira Ahmad",
    idPelapor: "ID: #REP-8819",
    avatar: "YS",
    warna: "#22c55e",
    kategori: "Pelecehan atau bullying",
    tanggal: "23 Okt 2024, 18:45",
    status: "Selesai",
    deskripsi: "Konten yang diunggah mengandung unsur SARA dan ujaran kebencian. Mohon segera ditindaklanjuti.",
    bukti: "bukti_konten.jpg",
    dilaporkan: "Sarah Fitriani",
    idDilaporkan: "ID: #REP-7890"
  },
  { 
    id: 4,
    pelapor: "Tabina Naila Griselda",
    idPelapor: "ID: #REP-8823",
    avatar: "TN",
    warna: "#8b5cf6",
    kategori: "Akun palsu/duplikat",
    tanggal: "22 Okt 2024, 09:30",
    status: "Menunggu",
    deskripsi: "Saya ditipu oleh pengguna ini. Janji akan mengirimkan produk tapi setelah transfer uang tidak ada kabar.",
    bukti: "bukti_transfer.jpg",
    dilaporkan: "Rudi Hartono",
    idDilaporkan: "ID: #REP-7912"
  },
  
];

const statusColor = {
  "Menunggu": { bg: "#fef3c7", color: "#d97706", icon: Clock },
  "Diproses": { bg: "#dbeafe", color: "#2563eb", icon: RefreshCw },
  "Selesai": { bg: "#dcfce7", color: "#22c55e", icon: CheckCircle },
};

const statusOptions = ["Menunggu", "Diproses", "Selesai"];

const kategoriColor = {
  "Konten tidak pantas": { bg: "#fee2e2", color: "#ef4444" },
  "Spam atau penipuan skill": { bg: "#dbeafe", color: "#3b82f6" },
  "Pelecehan atau bullying": { bg: "#fef3c7", color: "#d97706" },
  "Akun palsu/duplikat": { bg: "#fce7f3", color: "#ec4899" },
};

const ITEMS_PER_PAGE = 5;

// ── Sidebar ───────────────────────────────────────────────
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
                <button onClick={() => navigate(item.path)} style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "9px 10px", borderRadius: 8,
                  width: "100%", border: "none", cursor: "pointer",
                  fontSize: "0.83rem", fontWeight: isActive ? 600 : 500,
                  background: isActive ? "#1e3a5f" : "transparent",
                  color: isActive ? "white" : "#64748b",
                  transition: "all 0.15s", textAlign: "left",
                }}>
                  <Icon size={16} /> {item.label}
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
            <button onClick={() => setShowLogout(true)} style={{
              display: "flex", alignItems: "center", gap: 9,
              padding: "9px 10px", borderRadius: 8,
              width: "100%", border: "none", cursor: "pointer",
              fontSize: "0.83rem", fontWeight: 500,
              background: "transparent", color: "#ef4444", textAlign: "left",
            }}>
              <LogOut size={16} /> Keluar
            </button>
          </li>
        </ul>
      </nav>

      {showLogout && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: 20, padding: "32px 28px", width: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef2f2", fontSize: "1.8rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>👋</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Keluar dari Panel?</h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 24px", lineHeight: 1.5 }}>Apakah Anda yakin ingin keluar dari panel Admin SkillSwap?</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowLogout(false)} style={{ flex: 1, padding: "10px", borderRadius: 12, border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>Batal</button>
              <button onClick={() => { window.location.href = "/"; }} style={{ flex: 1, padding: "10px", borderRadius: 12, border: "none", background: "#ef4444", color: "white", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ── Main ──────────────────────────────────────────────────
export default function KelolaLaporan() {
  const [laporanList, setLaporanList] = useState(dummyLaporan);
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(null);

  // Fungsi untuk mengupdate status laporan
  const handleStatusChange = (id, newStatus) => {
    setLaporanList(prev =>
      prev.map(laporan =>
        laporan.id === id
          ? { ...laporan, status: newStatus }
          : laporan
      )
    );
    setShowEditStatus(null);
    // Optional: Tampilkan notifikasi sukses
    alert(`Status laporan berhasil diubah menjadi ${newStatus}`);
  };

  // Filter laporan
  const filtered = laporanList.filter((l) => {
    const matchSearch =
      l.pelapor.toLowerCase().includes(search.toLowerCase()) ||
      l.kategori.toLowerCase().includes(search.toLowerCase());
    const matchKategori = filterKategori === "Semua" || l.kategori === filterKategori;
    const matchStatus = filterStatus === "Semua" || l.status === filterStatus;
    return matchSearch && matchKategori && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Statistik
  const stats = {
    total: laporanList.length,
    menunggu: laporanList.filter(l => l.status === "Menunggu").length,
    diproses: laporanList.filter(l => l.status === "Diproses").length,
    selesai: laporanList.filter(l => l.status === "Selesai").length,
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f8f7f4", fontFamily: "'Inter', 'Poppins', 'Segoe UI', sans-serif" }}>
      <SidebarAdmin active="kelola-laporan" />

      <main style={{ flex: 1, padding: "18px 22px", overflowY: "auto", minWidth: 0 }}>

        {/* Header */}
        <div style={{ marginBottom: 20, textAlign: "left" }}>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
            Kelola Laporan
          </h1>
          <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: "4px 0 0" }}>
            Ringkasan aktivitas laporan platform secara real-time.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total Laporan", value: stats.total, icon: FileText, color: "#3b82f6", bg: "#dbeafe" },
            { label: "Menunggu", value: stats.menunggu, icon: Clock, color: "#d97706", bg: "#fef3c7" },
            { label: "Diproses", value: stats.diproses, icon: RefreshCw, color: "#2563eb", bg: "#dbeafe" },
            { label: "Selesai", value: stats.selesai, icon: CheckCircle, color: "#22c55e", bg: "#dcfce7" },
          ].map((c) => (
            <div key={c.label} style={{ background: "white", borderRadius: 14, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <c.icon size={20} color={c.color} />
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: c.color }}>
                  {c.label === "Total Laporan" ? "Semua" : ""}
                </span>
              </div>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", marginBottom: 4 }}>
                {c.label}
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b" }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* Tabel Card */}
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "18px 20px" }}>

          {/* Header Tabel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Daftar Laporan Terbaru
            </h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.8rem" }}>🔍</span>
                <input
                  placeholder="Cari laporan..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  style={{
                    paddingLeft: 28, paddingRight: 10, paddingTop: 7, paddingBottom: 7,
                    border: "1px solid #e2e8f0", borderRadius: 8,
                    fontSize: "0.78rem", color: "#475569", outline: "none", width: 180,
                  }}
                />
              </div>

              {/* Filter Button */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "7px 12px", borderRadius: 8,
                    border: "1px solid #e2e8f0", background: "white",
                    color: "#475569", fontSize: "0.78rem", cursor: "pointer",
                  }}
                >
                  <Filter size={13} /> Filter
                </button>
                {showFilter && (
                  <div style={{
                    position: "absolute", right: 0, top: "calc(100% + 4px)",
                    background: "white", borderRadius: 10, padding: 12,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10, minWidth: 200,
                    border: "1px solid #f1f5f9",
                  }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", marginBottom: 6 }}>KATEGORI</div>
                      {["Semua", "Konten tidak pantas", "Spam atau penipuan skill", "Pelecehan atau bullying", "Akun palsu/duplikat"].map((k) => (
                        <div key={k} onClick={() => { setFilterKategori(k); setCurrentPage(1); }} style={{
                          padding: "6px 10px", borderRadius: 6, cursor: "pointer",
                          fontSize: "0.75rem",
                          background: filterKategori === k ? "#eff6ff" : "transparent",
                          color: filterKategori === k ? "#3b82f6" : "#475569",
                          fontWeight: filterKategori === k ? 600 : 400,
                        }}>{k}</div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", marginBottom: 6 }}>STATUS</div>
                      {["Semua", "Menunggu", "Diproses", "Selesai"].map((s) => (
                        <div key={s} onClick={() => { setFilterStatus(s); setCurrentPage(1); }} style={{
                          padding: "6px 10px", borderRadius: 6, cursor: "pointer",
                          fontSize: "0.75rem",
                          background: filterStatus === s ? "#eff6ff" : "transparent",
                          color: filterStatus === s ? "#3b82f6" : "#475569",
                          fontWeight: filterStatus === s ? 600 : 400,
                        }}>{s}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabel */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {["PELAPOR", "KATEGORI", "TANGGAL", "STATUS", "AKSI"].map((h) => (
                    <th key={h} style={{ padding: "12px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                      Tidak ada laporan ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginated.map((laporan) => {
                    const sc = statusColor[laporan.status] || { bg: "#f1f5f9", color: "#64748b", icon: Clock };
                    const kc = kategoriColor[laporan.kategori] || { bg: "#f1f5f9", color: "#64748b" };
                    const StatusIcon = sc.icon;
                    
                    return (
                      <tr key={laporan.id} style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}>
                        {/* Pelapor */}
                        <td style={{ padding: "12px 12px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 36, height: 36, borderRadius: "50%",
                              background: laporan.warna, color: "white",
                              fontSize: "0.75rem", fontWeight: 700,
                              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            }}>{laporan.avatar}</div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem" }}>{laporan.pelapor}</div>
                              <div style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{laporan.idPelapor}</div>
                            </div>
                          </div>
                        </td>

                        {/* Kategori */}
                        <td style={{ padding: "12px 12px", verticalAlign: "middle" }}>
                          <span style={{
                            background: kc.bg, color: kc.color,
                            fontSize: "0.7rem", fontWeight: 600,
                            padding: "4px 10px", borderRadius: 20,
                            display: "inline-block",
                          }}>
                            {laporan.kategori}
                          </span>
                        </td>

                        {/* Tanggal */}
                        <td style={{ padding: "12px 12px", color: "#64748b", fontSize: "0.78rem", verticalAlign: "middle" }}>
                          {laporan.tanggal}
                        </td>

                        {/* Status - Bisa Langsung Diganti */}
                        <td style={{ padding: "12px 12px", verticalAlign: "middle" }}>
                          <div style={{ position: "relative" }}>
                            <button
                              onClick={() => setShowEditStatus(showEditStatus === laporan.id ? null : laporan.id)}
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 6,
                                background: sc.bg, color: sc.color,
                                fontSize: "0.7rem", fontWeight: 600,
                                padding: "5px 12px", borderRadius: 20,
                                border: "none", cursor: "pointer",
                                transition: "all 0.2s",
                              }}
                            >
                              <StatusIcon size={12} />
                              {laporan.status}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 4 }}>
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </button>
                            
                            {showEditStatus === laporan.id && (
                              <div style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                marginTop: 8,
                                background: "white",
                                borderRadius: 12,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                zIndex: 100,
                                minWidth: 140,
                                overflow: "hidden",
                                border: "1px solid #e2e8f0",
                              }}>
                                {statusOptions.map((status) => {
                                  const statusConf = statusColor[status];
                                  const Icon = statusConf.icon;
                                  return (
                                    <div
                                      key={status}
                                      onClick={() => handleStatusChange(laporan.id, status)}
                                      style={{
                                        padding: "8px 12px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        cursor: "pointer",
                                        transition: "background 0.2s",
                                        background: laporan.status === status ? "#f1f5f9" : "white",
                                        color: statusConf.color,
                                        fontSize: "0.75rem",
                                        fontWeight: 500,
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                                      onMouseLeave={(e) => e.currentTarget.style.background = laporan.status === status ? "#f1f5f9" : "white"}
                                    >
                                      <Icon size={14} />
                                      {status}
                                      {laporan.status === status && (
                                        <span style={{ marginLeft: "auto", fontSize: "10px" }}>✓</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Aksi */}
                        <td style={{ padding: "12px 12px", verticalAlign: "middle" }}>
                          <button
                            onClick={() => setShowDetail(laporan)}
                            style={{
                              display: "flex", alignItems: "center", gap: 6,
                              padding: "6px 14px",
                              borderRadius: 8,
                              background: "#1e3a5f",
                              color: "white",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              border: "none",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            <Eye size={13} /> Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 14, borderTop: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                Menampilkan {((currentPage-1)*ITEMS_PER_PAGE)+1} - {Math.min(currentPage*ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} laporan
              </span>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={pageBtn(false)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={13} />
                </button>
                {[...Array(Math.min(3, totalPages))].map((_, idx) => {
                  let pageNum = idx + 1;
                  if (totalPages > 3 && currentPage > 2) {
                    pageNum = currentPage - 1 + idx;
                    if (pageNum > totalPages) return null;
                  }
                  return (
                    <button key={pageNum} onClick={() => setCurrentPage(pageNum)} style={pageBtn(currentPage === pageNum)}>
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <>
                    <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>...</span>
                    <button onClick={() => setCurrentPage(totalPages)} style={pageBtn(currentPage === totalPages)}>
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  style={pageBtn(false)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 24, fontSize: "0.72rem", color: "#94a3b8", paddingBottom: 16 }}>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </div>

        {/* Modal Detail Laporan */}
        {showDetail && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}>
            <div style={{
              background: "white",
              borderRadius: 24,
              width: 520,
              maxWidth: "90%",
              maxHeight: "85vh",
              overflow: "auto",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}>
              {/* Header */}
              <div style={{
                padding: "24px 28px",
                background: `linear-gradient(135deg, ${showDetail.warna}20 0%, ${showDetail.warna}40 100%)`,
                position: "relative",
                borderBottom: "1px solid #e2e8f0",
              }}>
                <button
                  onClick={() => setShowDetail(null)}
                  style={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    background: "rgba(0,0,0,0.1)",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#64748b",
                  }}
                >
                  <X size={18} />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: showDetail.warna,
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {showDetail.avatar}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                      {showDetail.pelapor}
                    </h3>
                    <p style={{ fontSize: "0.7rem", color: "#64748b", margin: "2px 0 0" }}>
                      {showDetail.idPelapor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <Tag size={12} /> KATEGORI
                      </div>
                      <span style={{
                        background: kategoriColor[showDetail.kategori]?.bg || "#f1f5f9",
                        color: kategoriColor[showDetail.kategori]?.color || "#64748b",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: 20,
                        display: "inline-block",
                      }}>
                        {showDetail.kategori}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <Calendar size={12} /> TANGGAL
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#1e293b" }}>{showDetail.tanggal}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <AlertTriangle size={12} /> DESKRIPSI LAPORAN
                    </div>
                    <div style={{
                      background: "#f8fafc",
                      padding: "12px",
                      borderRadius: 12,
                      fontSize: "0.8rem",
                      color: "#475569",
                      lineHeight: 1.5,
                    }}>
                      {showDetail.deskripsi}
                    </div>
                  </div>

                  {showDetail.dilaporkan !== "-" && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <User size={12} /> DILAPORKAN
                      </div>
                      <div style={{
                        background: "#fef3c7",
                        padding: "10px 12px",
                        borderRadius: 12,
                        fontSize: "0.8rem",
                        color: "#d97706",
                      }}>
                        <strong>{showDetail.dilaporkan}</strong> ({showDetail.idDilaporkan})
                      </div>
                    </div>
                  )}

                  <div>
                    <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <MessageCircle size={12} /> BUKTI
                    </div>
                    <div style={{
                      background: "#f1f5f9",
                      padding: "10px 12px",
                      borderRadius: 12,
                      fontSize: "0.75rem",
                      color: "#3b82f6",
                      cursor: "pointer",
                    }}>
                      📎 {showDetail.bukti}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: "16px 24px",
                background: "#f8fafc",
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
                borderTop: "1px solid #e2e8f0",
              }}>
                <select
                  value={showDetail.status}
                  onChange={(e) => {
                    handleStatusChange(showDetail.id, e.target.value);
                    setShowDetail(null);
                  }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    border: "1px solid #e2e8f0",
                    background: "white",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  {statusOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowDetail(null)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 10,
                    border: "none",
                    background: "#1e3a5f",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const pageBtn = (active) => ({
  minWidth: 28, height: 28, borderRadius: 6,
  border: active ? "none" : "1px solid #e2e8f0",
  background: active ? "#1e3a5f" : "white",
  color: active ? "white" : "#64748b",
  fontSize: "0.78rem", fontWeight: active ? 600 : 400,
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center", padding: "0 6px",
});