// src/pages/Superadmin/Laporan.jsx
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Search, ChevronLeft, ChevronRight, Filter, X, CheckCircle, AlertTriangle, Eye, FileText, Image } from "lucide-react";

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

// ── Data dummy laporan dengan deskripsi dan bukti ─────────
const dummyLaporan = [
  { 
    id: 1, 
    nama: "Amira Salma Nafisa",    
    email: "amira.nafisa@student.ub.ac.id", 
    jenis: "Konten tidak pantas",          
    tanggal: "25 Apr 2026", 
    status: "Pending",
    deskripsi: "Pengguna ini mengirimkan pesan yang mengandung kata-kata kasar dan tidak pantas di forum diskusi. Saya sudah melaporkan sebelumnya tapi masih terus mengulangi.",
    bukti: "screenshot_konten_tidak_pantas.jpg"
  },
  { 
    id: 2, 
    nama: "Farah Naylul Fauzia",         
    email: "farahfauzia@student.ub.ac.id",    
    jenis: "Spam atau penipuan skill",
    tanggal: "20 Apr 2026", 
    status: "Selesai",
    deskripsi: "Saya ditipu oleh pengguna ini. Janji akan memberikan materi pelatihan setelah transfer uang, tapi setelah transfer tidak ada kabar.",
    bukti: "bukti_transfer_spam.jpg"
  },
  { 
    id: 3, 
    nama: "Yasmine Shavira Ahmad", 
    email: "yasmineshavira@student.ub.ac.id",    
    jenis: "Pelecehan atau bullying",              
    tanggal: "18 Apr 2026", 
    status: "Ditolak",
    deskripsi: "Pengguna ini melakukan bullying di grup diskusi, mengucilkan anggota baru dan menggunakan kata-kata yang merendahkan.",
    bukti: "screenshot_bullying.png"
  },
  { 
    id: 4, 
    nama: "Tabina Naila Griselda",
    email: "tabinaila@student.ub.ac.id",   
    jenis: "Akun duplikat/palsu",           
    tanggal: "15 Apr 2026", 
    status: "Pending",
    deskripsi: "Akun ini menggunakan foto profil dan nama yang sama dengan akun saya yang sudah terdaftar sebelumnya. Diduga akun palsu/duplikat.",
    bukti: "bukti_akun_duplikat.jpg"
  },
];

const STATUS_TABS = ["Semua", "Pending", "Selesai", "Ditolak"];
const STATUS_FILTERS = ["Semua", "Pending", "Selesai", "Ditolak"];

const jenisColor = {
  "Konten tidak pantas":          { bg: "#fef2f2", color: "#ef4444" },
  "Spam atau penipuan skill":           { bg: "#fff7ed", color: "#f97316" },
  "Pelecehan atau bullying":{ bg: "#fdf4ff", color: "#a855f7" },
  "Akun duplikat/palsu":               { bg: "#eff6ff", color: "#3b82f6" },
};

const statusColor = {
  "Pending": { bg: "#fff7ed", color: "#f97316", dot: "#f97316" },
  "Selesai": { bg: "#f0fdf4", color: "#22c55e", dot: "#22c55e" },
  "Ditolak": { bg: "#fef2f2", color: "#ef4444", dot: "#ef4444" },
};

const ITEMS_PER_PAGE = 6;

export default function Laporan() {
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [laporanList, setLaporanList] = useState(dummyLaporan);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [notification, setNotification] = useState(null);

  // Filter berdasarkan status
  const filterByStatus = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setFilterStatus("Semua");
    setCurrentPage(1);
  };

  // Filter data
  const filtered = laporanList.filter((l) => {
    const matchStatus = filterStatus === "Semua" || l.status === filterStatus;
    const matchSearch =
      l.nama.toLowerCase().includes(search.toLowerCase()) ||
      l.jenis.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Hitung summary
  const total = laporanList.length;
  const pending = laporanList.filter((l) => l.status === "Pending").length;
  const selesai = laporanList.filter((l) => l.status === "Selesai").length;
  const ditolak = laporanList.filter((l) => l.status === "Ditolak").length;
  const pctSelesai = total > 0 ? Math.round((selesai / total) * 100) : 0;

  const handleUbahStatus = (id, statusBaru) => {
    setLaporanList((prev) =>
      prev.map((l) => l.id === id ? { ...l, status: statusBaru } : l)
    );
    setNotification({ message: `Status laporan berhasil diubah menjadi ${statusBaru}`, type: "success" });
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "#fcf5e8", fontFamily: "'Inter', 'Poppins', 'Segoe UI', sans-serif",
    }}>
      <Sidebar role="superadmin" active="laporan" />

      <main style={{ 
        flex: 1, 
        padding: "24px 28px", 
        overflowY: "auto",
        minWidth: 0 
      }}>

        {/* Judul */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: 700, 
            color: "#1e293b", 
            margin: 0,
            fontFamily: "'Fraunces', 'Poppins', serif"
          }}>
            Laporan
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "8px 0 0" }}>
            Manajemen laporan pengguna platform SkillSwap.
          </p>
        </div>

        {/* Stat Cards - bisa ditekan */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {/* Total Laporan Card */}
          <div 
            onClick={() => resetFilter()}
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
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>Total Laporan</div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{total}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#3b82f6", marginTop: 6 }}>Semua laporan masuk</div>
          </div>

          {/* Menunggu Card */}
          <div 
            onClick={() => filterByStatus("Pending")}
            style={{ 
              background: filterStatus === "Pending" ? "#fef3c7" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterStatus === "Pending" ? "1px solid #f97316" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>Menunggu Tindakan</div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#f97316" }}>{pending}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#f97316", marginTop: 6 }}>Perlu segera ditangani</div>
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
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>Selesai Ditangani</div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#22c55e" }}>{selesai}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#22c55e", marginTop: 6 }}>{pctSelesai}% dari total</div>
          </div>

          {/* Ditolak Card */}
          <div 
            onClick={() => filterByStatus("Ditolak")}
            style={{ 
              background: filterStatus === "Ditolak" ? "#fef2f2" : "white",
              borderRadius: 16, padding: "16px 18px", 
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all 0.2s",
              border: filterStatus === "Ditolak" ? "1px solid #ef4444" : "1px solid transparent"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>Laporan Ditolak</div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ef4444" }}>{ditolak}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#ef4444", marginTop: 6 }}>Tidak terbukti</div>
          </div>
        </div>

        {/* Reset Filter Button */}
        {filterStatus !== "Semua" && (
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
        <div style={{
          background: "white", borderRadius: 20,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 24px",
        }}>
          {/* Header tabel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Daftar Laporan Masuk
              {filterStatus !== "Semua" ? ` - ${filterStatus}` : ""}
            </h2>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {/* Search Bar */}
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  placeholder="Cari laporan..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  style={{
                    paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                    border: "1px solid #e2e8f0", borderRadius: 10,
                    fontSize: "0.8rem", color: "#475569", outline: "none", width: 200,
                  }}
                />
              </div>

              {/* Filter Dropdown */}
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
                    {["Pending", "Selesai", "Ditolak"].map((s) => (
                      <div 
                        key={s} 
                        onClick={() => { filterByStatus(s); setShowFilter(false); }} 
                        style={{ 
                          padding: "8px 12px", 
                          borderRadius: 8, 
                          cursor: "pointer", 
                          fontSize: "0.8rem",
                          background: filterStatus === s ? "#eff6ff" : "transparent",
                          color: filterStatus === s ? "#3b82f6" : "#475569",
                          fontWeight: filterStatus === s ? 600 : 400,
                          marginBottom: 4
                        }}
                      >
                        {s}
                      </div>
                    ))}
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
            </div>
          </div>

          {/* Tabel */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <th style={th}>PELAPOR</th>
                  <th style={th}>JENIS LAPORAN</th>
                  <th style={th}>TANGGAL</th>
                  <th style={th}>STATUS</th>
                  <th style={{ ...th, textAlign: "center" }}>AKSI</th>
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
                  paginated.map((item) => {
                    const jColor = jenisColor[item.jenis] || { bg: "#f1f5f9", color: "#64748b" };
                    const sColor = statusColor[item.status] || { bg: "#f1f5f9", color: "#64748b" };
                    return (
                      <tr key={item.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                        <td style={td}>
                          <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem" }}>
                            {item.nama}
                          </div>
                          <div style={{ color: "#94a3b8", fontSize: "0.7rem" }}>
                            {item.email}
                          </div>
                        </td>
                        <td style={td}>
                          <span style={{
                            background: jColor.bg, color: jColor.color,
                            fontSize: "0.7rem", fontWeight: 600,
                            padding: "4px 10px", borderRadius: 8,
                          }}>
                            {item.jenis}
                          </span>
                        </td>
                        <td style={{ ...td, color: "#64748b", fontSize: "0.8rem" }}>
                          {item.tanggal}
                        </td>
                        <td style={td}>
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: sColor.bg, color: sColor.color,
                            fontSize: "0.7rem", fontWeight: 600,
                            padding: "4px 12px", borderRadius: 20,
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: sColor.color }} />
                            {item.status}
                          </span>
                        </td>
                        <td style={{ ...td, textAlign: "center" }}>
                          <button
                            onClick={() => setSelectedLaporan(item)}
                            style={{
                              display: "flex", alignItems: "center", gap: 6,
                              padding: "6px 14px", borderRadius: 8,
                              border: "none", background: "#1e3a5f",
                              color: "white", fontSize: "0.72rem",
                              fontWeight: 600, cursor: "pointer",
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

          {/* Pagination */}
          {filtered.length > 0 && (
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: 24, paddingTop: 16, borderTop: "1px solid #f1f5f9",
            }}>
              <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                Menampilkan {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} laporan
              </span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={pageBtn(false)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setCurrentPage(p)} style={pageBtn(currentPage === p)}>
                    {p}
                  </button>
                ))}
                {totalPages > 3 && (
                  <>
                    <span style={{ color: "#94a3b8", fontSize: "0.85rem", padding: "0 2px" }}>...</span>
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
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Detail Laporan */}
        {selectedLaporan && (
          <div style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000,
          }}>
            <div style={{
              background: "white", borderRadius: 24,
              width: 520, maxWidth: "90%",
              maxHeight: "85vh", overflow: "auto",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}>
              {/* Header Modal */}
              <div style={{
                padding: "24px 28px",
                background: `linear-gradient(135deg, ${statusColor[selectedLaporan.status]?.color}20 0%, ${statusColor[selectedLaporan.status]?.color}40 100%)`,
                position: "relative",
                borderBottom: "1px solid #e2e8f0",
              }}>
                <button
                  onClick={() => setSelectedLaporan(null)}
                  style={{
                    position: "absolute", right: 20, top: 20,
                    background: "rgba(0,0,0,0.1)", border: "none",
                    borderRadius: "50%", width: 32, height: 32,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "#64748b",
                  }}
                >
                  <X size={18} />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "#3b82f6", color: "white",
                    fontSize: "1rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {selectedLaporan.nama.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                      {selectedLaporan.nama}
                    </h3>
                    <p style={{ fontSize: "0.7rem", color: "#64748b", margin: "2px 0 0" }}>
                      {selectedLaporan.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body Modal */}
              <div style={{ padding: "24px" }}>
                {/* Jenis Laporan & Tanggal */}
                <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <FileText size={12} /> JENIS LAPORAN
                    </div>
                    <span style={{
                      background: jenisColor[selectedLaporan.jenis]?.bg || "#f1f5f9",
                      color: jenisColor[selectedLaporan.jenis]?.color || "#64748b",
                      fontSize: "0.75rem", fontWeight: 600,
                      padding: "4px 12px", borderRadius: 20,
                      display: "inline-block",
                    }}>
                      {selectedLaporan.jenis}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <AlertTriangle size={12} /> TANGGAL
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#1e293b" }}>{selectedLaporan.tanggal}</div>
                  </div>
                </div>

                {/* Deskripsi Laporan (Alasan) */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertTriangle size={12} /> DESKRIPSI / ALASAN
                  </div>
                  <div style={{
                    background: "#f8fafc", padding: "14px", borderRadius: 12,
                    fontSize: "0.85rem", color: "#475569", lineHeight: 1.5,
                  }}>
                    {selectedLaporan.deskripsi || "Tidak ada deskripsi tambahan."}
                  </div>
                </div>

                {/* Bukti Laporan */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <Image size={12} /> BUKTI LAPORAN
                  </div>
                  <div style={{
                    background: "#f1f5f9", padding: "12px 16px", borderRadius: 12,
                    fontSize: "0.8rem", color: "#3b82f6", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <FileText size={14} />
                    <span>{selectedLaporan.bukti || "Tidak ada bukti yang dilampirkan."}</span>
                  </div>
                </div>

                {/* Status - bisa diubah */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertTriangle size={12} /> STATUS
                  </div>
                  <select
                    value={selectedLaporan.status}
                    onChange={(e) => {
                      const statusBaru = e.target.value;
                      handleUbahStatus(selectedLaporan.id, statusBaru);
                      setSelectedLaporan({ ...selectedLaporan, status: statusBaru });
                    }}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 10,
                      border: "1px solid #e2e8f0", fontSize: "0.85rem",
                      fontWeight: 600, outline: "none", cursor: "pointer",
                      background: statusColor[selectedLaporan.status]?.bg || "#f1f5f9",
                      color: statusColor[selectedLaporan.status]?.color || "#64748b",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>
              </div>

              {/* Footer Modal */}
              <div style={{
                padding: "16px 24px", background: "#f8fafc",
                display: "flex", gap: 12, justifyContent: "flex-end",
                borderTop: "1px solid #e2e8f0",
              }}>
                <button
                  onClick={() => setSelectedLaporan(null)}
                  style={{
                    padding: "8px 20px", borderRadius: 10,
                    border: "1px solid #e2e8f0", background: "white",
                    color: "#64748b", fontSize: "0.8rem", cursor: "pointer",
                  }}
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    handleUbahStatus(selectedLaporan.id, "Selesai");
                    setSelectedLaporan(null);
                  }}
                  disabled={selectedLaporan.status === "Selesai"}
                  style={{
                    padding: "8px 24px", borderRadius: 10,
                    border: "none",
                    background: selectedLaporan.status === "Selesai" ? "#94a3b8" : "#1e3a5f",
                    color: "white", fontSize: "0.8rem", fontWeight: 600,
                    cursor: selectedLaporan.status === "Selesai" ? "not-allowed" : "pointer",
                  }}
                >
                  {selectedLaporan.status === "Selesai" ? "Sudah Selesai" : "Tandai Selesai"}
                </button>
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
const btnOutline = {
  display: "flex", alignItems: "center", gap: 5,
  padding: "7px 14px", borderRadius: 10,
  border: "1px solid #e2e8f0", background: "white",
  color: "#475569", fontSize: "0.8rem", fontWeight: 500,
  cursor: "pointer",
};
const th = {
  padding: "14px 12px", textAlign: "left",
  fontSize: "0.7rem", fontWeight: 700,
  color: "#94a3b8", letterSpacing: "0.05em",
};
const td = {
  padding: "14px 12px", verticalAlign: "middle",
};
const pageBtn = (active) => ({
  minWidth: 30, height: 30, borderRadius: 8,
  border: active ? "none" : "1px solid #e2e8f0",
  background: active ? "#1e3a5f" : "white",
  color: active ? "white" : "#64748b",
  fontSize: "0.8rem", fontWeight: active ? 600 : 400,
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center",
  padding: "0 8px",
});