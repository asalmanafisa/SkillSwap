// src/pages/Admin/KelolaLaporan.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText,
  LogOut, Filter, Eye, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle, Clock, X,
  RefreshCw, MessageCircle, Calendar, User, Tag,
  Search, ArrowUpDown
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
    tanggalSort: "2024-10-24T14:20:00",
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
    tanggalSort: "2024-10-24T11:05:00",
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
    tanggalSort: "2024-10-23T18:45:00",
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
    tanggalSort: "2024-10-22T09:30:00",
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
      borderRight: "1px solid #e5e0d8",
      display: "flex", flexDirection: "column",
      padding: "20px 0", flexShrink: 0,
    }}>
      <div style={{ padding: "0 16px 20px", borderBottom: "1px solid #e5e0d8", marginBottom: 12 }}>
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
  const [sortOrder, setSortOrder] = useState("terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setLaporanList(prev =>
      prev.map(laporan =>
        laporan.id === id
          ? { ...laporan, status: newStatus }
          : laporan
      )
    );
    setShowEditStatus(null);
    setNotification({
      message: `Status laporan berhasil diubah menjadi ${newStatus}`,
      type: "success"
    });
  };

  const filteredByStatusKategori = laporanList.filter((l) => {
    const matchSearch =
      l.pelapor.toLowerCase().includes(search.toLowerCase()) ||
      l.kategori.toLowerCase().includes(search.toLowerCase());
    const matchKategori = filterKategori === "Semua" || l.kategori === filterKategori;
    const matchStatus = filterStatus === "Semua" || l.status === filterStatus;
    return matchSearch && matchKategori && matchStatus;
  });

  const getSortedData = () => {
    if (sortOrder === "terbaru") {
      return [...filteredByStatusKategori].sort((a, b) => 
        new Date(b.tanggalSort) - new Date(a.tanggalSort)
      );
    } else if (sortOrder === "terlama") {
      return [...filteredByStatusKategori].sort((a, b) => 
        new Date(a.tanggalSort) - new Date(b.tanggalSort)
      );
    }
    return filteredByStatusKategori;
  };

  const filtered = getSortedData();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const filterByStatus = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setFilterStatus("Semua");
    setFilterKategori("Semua");
    setCurrentPage(1);
  };

  const stats = {
    total: laporanList.length,
    menunggu: laporanList.filter(l => l.status === "Menunggu").length,
    diproses: laporanList.filter(l => l.status === "Diproses").length,
    selesai: laporanList.filter(l => l.status === "Selesai").length,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fcf5e8", fontFamily: "'Inter', 'Poppins', 'Segoe UI', sans-serif" }}>
      <SidebarAdmin active="kelola-laporan" />

      <main style={{ 
        flex: 1, 
        padding: "24px 28px", 
        overflow: "visible",
        minWidth: 0 
      }}>

        <div style={{ marginBottom: 24, textAlign: "left" }}>
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: 700, 
            color: "#1e293b", 
            margin: 0,
            fontFamily: "'Fraunces', 'Poppins', serif"
          }}>
            Kelola Laporan
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "8px 0 0" }}>
            Ringkasan aktivitas laporan platform secara real-time.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {/* Total Laporan Card */}
          <div style={{ position: "relative" }}>
            <div 
              onClick={() => {
                resetFilter();
                setShowSortDropdown(!showSortDropdown);
              }}
              style={{ 
                background: filterStatus === "Semua" ? "#e0e7ff" : "white",
                borderRadius: 16, padding: "16px 18px", 
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "all 0.2s",
                border: filterStatus === "Semua" ? "1px solid #3b82f6" : "1px solid transparent"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FileText size={20} color="#3b82f6" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#3b82f6" }}>
                    {sortOrder === "terbaru" ? "Terbaru" : sortOrder === "terlama" ? "Terlama" : "Semua"}
                  </span>
                  <ArrowUpDown size={14} color="#94a3b8" />
                </div>
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
                Total Laporan
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.total}</div>
            </div>

            {showSortDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: 8,
                background: "white",
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                zIndex: 100,
                minWidth: 160,
                overflow: "hidden",
                border: "1px solid #e2e8f0",
              }}>
                <div
                  onClick={() => { setSortOrder("terbaru"); setShowSortDropdown(false); setCurrentPage(1); }}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    background: sortOrder === "terbaru" ? "#f1f5f9" : "white",
                    color: "#475569",
                    fontSize: "0.8rem",
                  }}
                >
                  📅 Terbaru
                </div>
                <div
                  onClick={() => { setSortOrder("terlama"); setShowSortDropdown(false); setCurrentPage(1); }}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    background: sortOrder === "terlama" ? "#f1f5f9" : "white",
                    color: "#475569",
                    fontSize: "0.8rem",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  📆 Terlama
                </div>
              </div>
            )}
          </div>

          {/* Menunggu Card */}
          <div 
            onClick={() => filterByStatus("Menunggu")}
            style={{ 
              background: filterStatus === "Menunggu" ? "#fef3c7" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterStatus === "Menunggu" ? "1px solid #d97706" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Clock size={20} color="#d97706" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#d97706" }}>Butuh Tindakan</span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
              Menunggu
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.menunggu}</div>
          </div>

          {/* Diproses Card */}
          <div 
            onClick={() => filterByStatus("Diproses")}
            style={{ 
              background: filterStatus === "Diproses" ? "#dbeafe" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterStatus === "Diproses" ? "1px solid #2563eb" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <RefreshCw size={20} color="#2563eb" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#2563eb" }}>Sedang Diproses</span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
              Diproses
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.diproses}</div>
          </div>

          {/* Selesai Card */}
          <div 
            onClick={() => filterByStatus("Selesai")}
            style={{ 
              background: filterStatus === "Selesai" ? "#dcfce7" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterStatus === "Selesai" ? "1px solid #22c55e" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={20} color="#22c55e" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#22c55e" }}>Terselesaikan</span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
              Selesai
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.selesai}</div>
          </div>
        </div>

        {(filterStatus !== "Semua" || filterKategori !== "Semua") && (
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Daftar Laporan {filterStatus !== "Semua" ? `- ${filterStatus}` : ""}
            </h2>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  placeholder="Cari laporan..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  style={{
                    paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                    border: "1px solid #e2e8f0", borderRadius: 10,
                    fontSize: "0.8rem", color: "#475569", outline: "none", width: 200,
                  }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "8px 14px", borderRadius: 10,
                    border: "1px solid #e2e8f0", background: "white",
                    color: "#475569", fontSize: "0.8rem", cursor: "pointer",
                  }}
                >
                  <Filter size={14} /> Filter
                </button>
                {showFilter && (
                  <div style={{
                    position: "absolute", right: 0, top: "calc(100% + 4px)",
                    background: "white", borderRadius: 12, padding: 12,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10, minWidth: 220,
                    border: "1px solid #e2e8f0",
                  }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", marginBottom: 6 }}>KATEGORI</div>
                      {["Semua", "Konten tidak pantas", "Spam atau penipuan skill", "Pelecehan atau bullying", "Akun palsu/duplikat"].map((k) => (
                        <div key={k} onClick={() => { setFilterKategori(k); setCurrentPage(1); setShowFilter(false); }} style={{
                          padding: "6px 10px", borderRadius: 6, cursor: "pointer",
                          fontSize: "0.75rem",
                          background: filterKategori === k ? "#eff6ff" : "transparent",
                          color: filterKategori === k ? "#3b82f6" : "#475569",
                          fontWeight: filterKategori === k ? 600 : 400,
                        }}>{k}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: 800 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {["PELAPOR", "KATEGORI", "TANGGAL", "STATUS", "AKSI"].map((h) => (
                    <th key={h} style={{ padding: "14px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>
                      Tidak ada laporan ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginated.map((laporan) => {
                    const sc = statusColor[laporan.status] || { bg: "#f1f5f9", color: "#64748b", icon: Clock };
                    const kc = kategoriColor[laporan.kategori] || { bg: "#f1f5f9", color: "#64748b" };
                    const StatusIcon = sc.icon;
                    return (
                      <tr key={laporan.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                        <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                              width: 40, height: 40, borderRadius: "50%",
                              background: laporan.warna, color: "white",
                              fontSize: "0.8rem", fontWeight: 700,
                              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            }}>{laporan.avatar}</div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.88rem" }}>{laporan.pelapor}</div>
                              <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{laporan.idPelapor}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                          <span style={{
                            background: kc.bg, color: kc.color,
                            fontSize: "0.7rem", fontWeight: 600,
                            padding: "4px 12px", borderRadius: 20,
                            display: "inline-block",
                          }}>
                            {laporan.kategori}
                          </span>
                        </td>
                        <td style={{ padding: "14px 12px", color: "#64748b", fontSize: "0.8rem", verticalAlign: "middle" }}>
                          {laporan.tanggal}
                        </td>
                        <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                          <div style={{ position: "relative" }}>
                            <button
                              onClick={() => setShowEditStatus(showEditStatus === laporan.id ? null : laporan.id)}
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 6,
                                background: sc.bg, color: sc.color,
                                fontSize: "0.7rem", fontWeight: 600,
                                padding: "5px 14px", borderRadius: 20,
                                border: "none", cursor: "pointer",
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
                                        padding: "10px 14px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        cursor: "pointer",
                                        background: laporan.status === status ? "#f1f5f9" : "white",
                                        color: statusConf.color,
                                        fontSize: "0.75rem",
                                        fontWeight: 500,
                                      }}
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
                        <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                          <button
                            onClick={() => setShowDetail(laporan)}
                            style={{
                              display: "flex", alignItems: "center", gap: 6,
                              padding: "6px 16px",
                              borderRadius: 10,
                              background: "#1e3a5f",
                              color: "white",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <Eye size={14} /> Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                Menampilkan {((currentPage-1)*ITEMS_PER_PAGE)+1} - {Math.min(currentPage*ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} laporan
              </span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} style={pageBtn(false)} disabled={currentPage === 1}>
                  <ChevronLeft size={14} />
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
                    <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>...</span>
                    <button onClick={() => setCurrentPage(totalPages)} style={pageBtn(currentPage === totalPages)}>
                      {totalPages}
                    </button>
                  </>
                )}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} style={pageBtn(false)} disabled={currentPage === totalPages}>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
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
              <div style={{
                padding: "24px 28px",
                background: `linear-gradient(135deg, ${showDetail.warna}20 0%, ${showDetail.warna}40 100%)`,
                position: "relative",
                borderBottom: "1px solid #e2e8f0",
              }}>
                <button onClick={() => setShowDetail(null)} style={{
                  position: "absolute", right: 20, top: 20,
                  background: "rgba(0,0,0,0.1)", border: "none", borderRadius: "50%",
                  width: 32, height: 32, display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", color: "#64748b",
                }}>
                  <X size={18} />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: showDetail.warna, color: "white",
                    fontSize: "1rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{showDetail.avatar}</div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{showDetail.pelapor}</h3>
                    <p style={{ fontSize: "0.7rem", color: "#64748b", margin: "2px 0 0" }}>{showDetail.idPelapor}</p>
                  </div>
                </div>
              </div>

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
                        fontSize: "0.75rem", fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                        display: "inline-block",
                      }}>{showDetail.kategori}</span>
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
                      background: "#f8fafc", padding: "12px", borderRadius: 12,
                      fontSize: "0.8rem", color: "#475569", lineHeight: 1.5,
                    }}>{showDetail.deskripsi}</div>
                  </div>

                  {showDetail.dilaporkan !== "-" && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <User size={12} /> DILAPORKAN
                      </div>
                      <div style={{
                        background: "#fef3c7", padding: "10px 12px", borderRadius: 12,
                        fontSize: "0.8rem", color: "#d97706",
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
                      background: "#f1f5f9", padding: "10px 12px", borderRadius: 12,
                      fontSize: "0.75rem", color: "#3b82f6", cursor: "pointer",
                    }}>📎 {showDetail.bukti}</div>
                  </div>
                </div>
              </div>

              <div style={{
                padding: "16px 24px", background: "#f8fafc", display: "flex",
                gap: 12, justifyContent: "flex-end", borderTop: "1px solid #e2e8f0",
              }}>
                <select
                  value={showDetail.status}
                  onChange={(e) => { handleStatusChange(showDetail.id, e.target.value); setShowDetail(null); }}
                  style={{
                    padding: "8px 16px", borderRadius: 10, border: "1px solid #e2e8f0",
                    background: "white", fontSize: "0.8rem", cursor: "pointer",
                  }}
                >
                  {statusOptions.map(s => (<option key={s} value={s}>{s}</option>))}
                </select>
                <button onClick={() => setShowDetail(null)} style={{
                  padding: "8px 20px", borderRadius: 10, border: "none",
                  background: "#1e3a5f", color: "white", fontSize: "0.8rem",
                  fontWeight: 600, cursor: "pointer",
                }}>Tutup</button>
              </div>
            </div>
          </div>
        )}

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

const pageBtn = (active) => ({
  minWidth: 30, height: 30, borderRadius: 8,
  border: active ? "none" : "1px solid #e2e8f0",
  background: active ? "#1e3a5f" : "white",
  color: active ? "white" : "#64748b",
  fontSize: "0.8rem", fontWeight: active ? 600 : 400,
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center", padding: "0 8px",
});