import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// ── Data dummy laporan ────────────────────────────────────
const dummyLaporan = [
  { id: 1, nama: "Bagas Rizky",        email: "bagas.r@student.ub.ac.id",       jenis: "Pelecehan",         tanggal: "27 Apr 2026", status: "Pending"  },
  { id: 2, nama: "Yasmine Shavira",    email: "yasmineshavira@student.ub.ac.id", jenis: "Penipuan",          tanggal: "25 Apr 2026", status: "Pending"  },
  { id: 3, nama: "Rafi Putra",         email: "rafi.putra@student.ub.ac.id",    jenis: "Konten Tidak Pantas",tanggal: "20 Apr 2026", status: "Pending"  },
  { id: 4, nama: "Amira Salma Nafisa", email: "amirasalma@student.ub.ac.id",    jenis: "Spam",              tanggal: "18 Apr 2026", status: "Pending"  },
  { id: 5, nama: "Farah Naylul Fauzia",email: "farahnaylul@student.ub.ac.id",   jenis: "Lainnya",           tanggal: "15 Apr 2026", status: "Pending"  },
  { id: 6, nama: "Diana Putri",        email: "diana.putri@student.ub.ac.id",   jenis: "Spam",              tanggal: "12 Apr 2026", status: "Selesai"  },
  { id: 7, nama: "Budi Santoso",       email: "budi.s@student.ub.ac.id",        jenis: "Pelecehan",         tanggal: "10 Apr 2026", status: "Ditolak"  },
  { id: 8, nama: "Citra Dewi",         email: "citra.d@student.ub.ac.id",       jenis: "Penipuan",          tanggal: "8 Apr 2026",  status: "Selesai"  },
];

const STATUS_TABS = ["Semua", "Pending", "Selesai", "Ditolak"];

const jenisColor = {
  "Pelecehan":          { bg: "#fef2f2", color: "#ef4444" },
  "Penipuan":           { bg: "#fff7ed", color: "#f97316" },
  "Konten Tidak Pantas":{ bg: "#fdf4ff", color: "#a855f7" },
  "Spam":               { bg: "#eff6ff", color: "#3b82f6" },
  "Lainnya":            { bg: "#f0fdf4", color: "#22c55e" },
};

const statusColor = {
  "Pending": { bg: "#fff7ed", color: "#f97316" },
  "Selesai": { bg: "#f0fdf4", color: "#22c55e" },
  "Ditolak": { bg: "#fef2f2", color: "#ef4444" },
};

const ITEMS_PER_PAGE = 6;

export default function Laporan() {
  const [activeTab, setActiveTab]   = useState("Semua");
  const [search, setSearch]         = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filtered = dummyLaporan.filter((l) => {
    const matchTab    = activeTab === "Semua" || l.status === activeTab;
    const matchSearch =
      l.nama.toLowerCase().includes(search.toLowerCase()) ||
      l.jenis.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Hitung summary
  const total    = dummyLaporan.length;
  const pending  = dummyLaporan.filter((l) => l.status === "Pending").length;
  const selesai  = dummyLaporan.filter((l) => l.status === "Selesai").length;
  const ditolak  = dummyLaporan.filter((l) => l.status === "Ditolak").length;
  const pctSelesai = Math.round((selesai / total) * 100);

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: "#f8f7f4", fontFamily: "'Poppins','Segoe UI',sans-serif",
    }}>
      <Sidebar role="superadmin" active="laporan" />

      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", minWidth: 0 }}>

        {/* ── Judul ── */}
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
            Laporan
          </h1>
          <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "4px 0 0" }}>
            Manajemen Laporan Pengguna
          </p>
        </div>

        {/* ── Summary Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
          {/* Total Laporan */}
          <div style={{ ...cardStyle, borderLeft: "4px solid #3b82f6" }}>
            <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 6 }}>Total Laporan</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>{total}</div>
            <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 6 }}>Semua laporan masuk</div>
          </div>

          {/* Menunggu Tindakan */}
          <div style={{ ...cardStyle, borderLeft: "4px solid #f97316" }}>
            <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 6 }}>Menunggu Tindakan</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#f97316", lineHeight: 1 }}>{pending}</div>
            <div style={{ fontSize: "0.72rem", color: "#f97316", marginTop: 6 }}>Perlu segera ditangani</div>
          </div>

          {/* Selesai Ditangani */}
          <div style={{ ...cardStyle, borderLeft: "4px solid #22c55e" }}>
            <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 6 }}>Selesai Ditangani</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#22c55e", lineHeight: 1 }}>{selesai}</div>
            <div style={{ fontSize: "0.72rem", color: "#22c55e", marginTop: 6 }}>{pctSelesai}% dari total</div>
          </div>

          {/* Laporan Ditolak */}
          <div style={{ ...cardStyle, borderLeft: "4px solid #ef4444" }}>
            <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 6 }}>Laporan Ditolak</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#ef4444", lineHeight: 1 }}>{ditolak}</div>
            <div style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: 6 }}>Tidak terbukti</div>
          </div>
        </div>

        {/* ── Tabel Card ── */}
        <div style={{
          background: "white", borderRadius: 16,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 22px",
        }}>
          {/* Header tabel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Daftar Laporan Masuk
            </h2>

            {/* Filter tabs + Search */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Filter:</span>
              <div style={{ display: "flex", gap: 4 }}>
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    style={{
                      padding: "5px 12px", borderRadius: 20, border: "none",
                      fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
                      background: activeTab === tab ? "#1e293b" : "#f1f5f9",
                      color: activeTab === tab ? "white" : "#64748b",
                      transition: "all 0.15s",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div style={{ position: "relative" }}>
                <Search size={13} style={{
                  position: "absolute", left: 9, top: "50%",
                  transform: "translateY(-50%)", color: "#94a3b8",
                }} />
                <input
                  placeholder="Cari pelapor / terlap..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  style={{
                    paddingLeft: 28, paddingRight: 10,
                    paddingTop: 6, paddingBottom: 6,
                    border: "1px solid #e2e8f0", borderRadius: 8,
                    fontSize: "0.78rem", color: "#475569",
                    outline: "none", width: 180,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Tabel */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <th style={th}>TERLAPOR</th>
                <th style={th}>JENIS LAPORAN</th>
                <th style={th}>TANGGAL</th>
                <th style={th}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>
                    Tidak ada laporan ditemukan.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => {
                  const jColor = jenisColor[item.jenis] || { bg: "#f1f5f9", color: "#64748b" };
                  const sColor = statusColor[item.status] || { bg: "#f1f5f9", color: "#64748b" };
                  return (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                      {/* Terlapor */}
                      <td style={td}>
                        <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.83rem" }}>
                          {item.nama}
                        </div>
                        <div style={{ color: "#94a3b8", fontSize: "0.72rem" }}>
                          {item.email}
                        </div>
                      </td>

                      {/* Jenis */}
                      <td style={td}>
                        <span style={{
                          background: jColor.bg, color: jColor.color,
                          fontSize: "0.72rem", fontWeight: 600,
                          padding: "3px 10px", borderRadius: 6,
                        }}>
                          {item.jenis}
                        </span>
                      </td>

                      {/* Tanggal */}
                      <td style={{ ...td, color: "#64748b", fontSize: "0.8rem" }}>
                        {item.tanggal}
                      </td>

                      {/* Status */}
                      <td style={td}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          background: sColor.bg, color: sColor.color,
                          fontSize: "0.72rem", fontWeight: 600,
                          padding: "3px 10px", borderRadius: 20,
                        }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: sColor.color,
                          }} />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 16, paddingTop: 14, borderTop: "1px solid #f1f5f9",
          }}>
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              Menampilkan {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} laporan
            </span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
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
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem", padding: "0 2px" }}>...</span>
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
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 28,
          fontSize: "0.75rem", color: "#94a3b8", paddingBottom: 16,
        }}>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </div>
      </main>
    </div>
  );
}

// ── Style helpers ─────────────────────────────────────────
const cardStyle = {
  background: "white", borderRadius: 14,
  padding: "14px 18px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};
const th = {
  padding: "10px 14px", textAlign: "left",
  fontSize: "0.72rem", fontWeight: 700,
  color: "#94a3b8", letterSpacing: "0.05em",
};
const td = {
  padding: "12px 14px", verticalAlign: "middle",
};
const pageBtn = (active) => ({
  minWidth: 30, height: 30, borderRadius: 7,
  border: active ? "none" : "1px solid #e2e8f0",
  background: active ? "#1e293b" : "white",
  color: active ? "white" : "#64748b",
  fontSize: "0.8rem", fontWeight: active ? 600 : 400,
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center",
  padding: "0 8px",
});