import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Filter, Download, Plus, Search, Star,
  ChevronLeft, ChevronRight, Edit, Trash2, Ban,
} from "lucide-react";

// ── Data dummy pengguna ───────────────────────────────────
const dummyUsers = [
  {
    id: 1, inisial: "AN", warna: "#3b82f6",
    nama: "Amira Nafisa", email: "amira.nafisa@student.ub.ac.id",
    skills: ["UI/UX", "Figma"], bergabung: "12 Jan 2026",
    koneksi: 14, rating: 4.8, status: "Aktif",
  },
  {
    id: 2, inisial: "FF", warna: "#f97316",
    nama: "Farah Fauzia", email: "farah.fauzia@student.ub.ac.id",
    skills: ["Web Dev", "React", "+1"], bergabung: "3 Feb 2026",
    koneksi: 9, rating: 4.5, status: "Aktif",
  },
  {
    id: 3, inisial: "YS", warna: "#22c55e",
    nama: "Yasmine Shavira", email: "yasmine.shavira@student.ub.ac.id",
    skills: ["Python", "ML"], bergabung: "28 Jan 2026",
    koneksi: 22, rating: 5.0, status: "Aktif",
  },
  {
    id: 4, inisial: "BR", warna: "#8b5cf6",
    nama: "Bagas Rizky", email: "bagas.r@student.ub.ac.id",
    skills: ["Laravel"], bergabung: "5 Mar 2026",
    koneksi: 3, rating: null, status: "Tidak Aktif",
  },
  {
    id: 5, inisial: "DW", warna: "#ef4444",
    nama: "Dinda Wulandari", email: "dinda.w@student.ub.ac.id",
    skills: ["Copywriting", "SEO"], bergabung: "20 Feb 2026",
    koneksi: 7, rating: 2.1, status: "Suspended",
  },
  {
    id: 6, inisial: "RP", warna: "#14b8a6",
    nama: "Rafi Putra", email: "rafi.putra@student.ub.ac.id",
    skills: ["Android", "Kotlin"], bergabung: "15 Mar 2026",
    koneksi: 11, rating: 4.2, status: "Aktif",
  },
];

const STATUS_TABS = ["Semua", "Aktif", "Suspended", "Tidak Aktif"];

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
  "+1":          { bg: "#f1f5f9", text: "#64748b" },
};

function StatusBadge({ status }) {
  const map = {
    "Aktif":      { bg: "#f0fdf4", color: "#22c55e", dot: "#22c55e" },
    "Suspended":  { bg: "#fef2f2", color: "#ef4444", dot: "#ef4444" },
    "Tidak Aktif":{ bg: "#f1f5f9", color: "#94a3b8", dot: "#94a3b8" },
  };
  const s = map[status] || map["Tidak Aktif"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: s.bg, color: s.color,
      fontSize: "0.72rem", fontWeight: 600,
      padding: "3px 10px", borderRadius: 20,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: s.dot,
      }} />
      {status}
    </span>
  );
}

export default function KelolaUser() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState("Semua");
  const [search, setSearch]           = useState("");
  const [selected, setSelected]       = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter]       = useState(false);
  const [showTambah, setShowTambah]       = useState(false);

  const totalUser = 5284;
  const totalPages = 215;

  // Filter berdasarkan tab & search
  const filtered = dummyUsers.filter((u) => {
    const matchTab =
      activeTab === "Semua" || u.status === activeTab;
    const matchSearch =
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const toggleAll = () => {
    setSelected(
      selected.length === filtered.length ? [] : filtered.map((u) => u.id)
    );
  };

  const handleExport = () => {
  const headers = ["Nama", "Email", "Skill", "Bergabung", "Koneksi", "Rating", "Status"];
  const rows = filtered.map((u) => [
    u.nama, u.email, u.skills.join(" | "),
    u.bergabung, u.koneksi, u.rating ?? "-", u.status,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "daftar-pengguna.csv";
  a.click();
  URL.revokeObjectURL(url);
};
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f8f7f4", fontFamily: "'Poppins','Segoe UI',sans-serif" }}>
      <Sidebar role="superadmin" active="kelola-user" />

      <main style={{ flex: 1, padding: "20px 24px", overflowY: "auto", minWidth: 0, background: "#f8f7f4" }}>

        {/* ── Breadcrumb & Judul ── */}
        <div style={{ marginBottom: 20}}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
         Kelola User
        </h1>
        <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "6px 0 0" }}>
        Dashboard › Kelola User
        </p>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Total Pengguna", value: "5.284", sub: "▲ +12% bulan ini", subColor: "#22c55e" },
            { label: "Sesi Aktif",     value: "1.047", sub: "▲ +8% minggu ini", subColor: "#22c55e" },
            { label: "Laporan Masuk",  value: "23",    sub: "▼ +5 baru hari ini",   subColor: "#ef4444" },
            { label: "Pengguna Tersuspend",    value: "14",   sub: "▼ +2 minggu ini", subColor: "#ef4444" },
          ].map((c) => (
            <div key={c.label} style={{
            background: "white", borderRadius: 16,
            padding: "20px 24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <div style={{ fontSize: "0.73rem", color: "#94a3b8", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>{c.value}</div>
              {c.sub && (
                <div style={{ fontSize: "0.72rem", color: c.subColor, marginTop: 5 }}>{c.sub}</div>
              )}
            </div>
          ))}
        </div>

        {/* ── Tabel Card ── */}
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 22px" }}>

          {/* Header tabel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                Daftar Pengguna
              </h2>
              <span style={{
                background: "#f1f5f9", color: "#64748b",
                fontSize: "0.72rem", fontWeight: 600,
                padding: "2px 10px", borderRadius: 20,
              }}>
                {totalUser.toLocaleString()} user
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={btnOutline} onClick={() => setShowFilter(!showFilter)}>
              <Filter size={14} /> Filter
              </button>

              <button style={btnOutline} onClick={handleExport}>
              <Download size={14} /> Export
              </button>

              <button style={btnPrimary} onClick={() => setShowTambah(true)}>
               <Plus size={14} /> Tambah User
              </button>
            </div>
          </div>

          {/* Tab Status + Search */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                  style={{
                    padding: "6px 14px", borderRadius: 8, border: "none",
                    fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                    background: activeTab === tab ? "#3b82f6" : "transparent",
                    color: activeTab === tab ? "white" : "#64748b",
                    transition: "all 0.15s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                placeholder="Cari nama / email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  paddingLeft: 32, paddingRight: 12, paddingTop: 7, paddingBottom: 7,
                  border: "1px solid #e2e8f0", borderRadius: 8,
                  fontSize: "0.8rem", color: "#475569", outline: "none",
                  width: 200,
                }}
              />
            </div>
          </div>

          {/* Tabel */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <th style={th}>
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                  />
                </th>
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
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: "1px solid #f8fafc",
                    background: selected.includes(user.id) ? "#f8faff" : "white",
                    transition: "background 0.1s",
                  }}
                >
                  {/* Checkbox */}
                  <td style={td}>
                    <input
                      type="checkbox"
                      checked={selected.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                    />
                  </td>

                  {/* Nama / Email */}
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%",
                        background: user.warna, color: "white",
                        fontSize: "0.72rem", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {user.inisial}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.8rem" }}>
                          {user.nama}
                        </div>
                        <div style={{ color: "#94a3b8", fontSize: "0.7rem" }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Skill */}
                  <td style={td}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {user.skills.map((s) => {
                        const c = skillColors[s] || { bg: "#f1f5f9", text: "#64748b" };
                        return (
                          <span key={s} style={{
                            background: c.bg, color: c.text,
                            fontSize: "0.68rem", fontWeight: 600,
                            padding: "2px 8px", borderRadius: 6,
                          }}>
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  {/* Bergabung */}
                  <td style={{ ...td, color: "#64748b", fontSize: "0.78rem" }}>
                    {user.bergabung}
                  </td>

                  {/* Koneksi */}
                  <td style={{ ...td, color: "#475569", fontWeight: 500 }}>
                    {user.koneksi}
                  </td>

                  {/* Rating */}
                  <td style={td}>
                    {user.rating ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Star size={13} fill="#fbbf24" color="#fbbf24" />
                        <span style={{ fontWeight: 600, color: "#475569", fontSize: "0.8rem" }}>
                          {user.rating.toFixed(1)}
                        </span>
                      </div>
                    ) : (
                      <span style={{ color: "#cbd5e1", fontSize: "0.75rem" }}>—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td style={td}>
                    <StatusBadge status={user.status} />
                  </td>

                  {/* Aksi */}
                  <td style={{ ...td }}>
                    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                      <button title="Edit" style={actionBtn("#eff6ff", "#3b82f6")}>
                        <Edit size={13} />
                      </button>
                      <button title="Suspend" style={actionBtn("#fff7ed", "#f97316")}>
                        <Ban size={13} />
                      </button>
                      <button title="Hapus" style={actionBtn("#fef2f2", "#ef4444")}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 18, paddingTop: 14, borderTop: "1px solid #f1f5f9",
          }}>
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              Menampilkan 1–6 dari {totalUser.toLocaleString()} user
            </span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                style={pageBtn(false)}
              >
                <ChevronLeft size={14} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  style={pageBtn(currentPage === p)}
                >
                  {p}
                </button>
              ))}
              <span style={{ color: "#94a3b8", fontSize: "0.8rem", padding: "0 4px" }}>...</span>
              <button onClick={() => setCurrentPage(totalPages)} style={pageBtn(currentPage === totalPages)}>
                {totalPages}
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                style={pageBtn(false)}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        {/* ── Dropdown Filter ── */}
{showFilter && (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50,
  }} onClick={() => setShowFilter(false)}>
    <div style={{
      position: "absolute", top: 200, right: 120,
      background: "white", borderRadius: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      padding: "16px", minWidth: 200, zIndex: 51,
    }} onClick={(e) => e.stopPropagation()}>
      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>
        Filter berdasarkan:
      </div>
      {["Aktif", "Suspended", "Tidak Aktif"].map((s) => (
        <div
          key={s}
          onClick={() => { setActiveTab(s); setShowFilter(false); }}
          style={{
            padding: "8px 12px", borderRadius: 8, cursor: "pointer",
            fontSize: "0.83rem", color: "#475569",
            background: activeTab === s ? "#eff6ff" : "transparent",
            color: activeTab === s ? "#3b82f6" : "#475569",
            fontWeight: activeTab === s ? 600 : 400,
          }}
        >
          {s}
        </div>
      ))}
      <div
        onClick={() => { setActiveTab("Semua"); setShowFilter(false); }}
        style={{
          padding: "8px 12px", borderRadius: 8, cursor: "pointer",
          fontSize: "0.83rem", color: "#ef4444", marginTop: 4,
          borderTop: "1px solid #f1f5f9", paddingTop: 12,
        }}
      >
        Reset Filter
      </div>
    </div>
  </div>
)}

{/* ── Modal Tambah User ── */}
{showTambah && (
  <div style={{
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  }}>
    <div style={{
      background: "white", borderRadius: 16,
      padding: "28px", width: 480,
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 20px" }}>
        Tambah User Baru
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={labelModal}>Nama</label>
          <input type="text" placeholder="Masukkan nama" style={inputModal} />
        </div>
        <div>
          <label style={labelModal}>Email</label>
          <input type="email" placeholder="nama@email.com" style={inputModal} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <div>
          <label style={labelModal}>Skill</label>
          <input type="text" placeholder="Contoh: UI/UX, React" style={inputModal} />
        </div>
        <div>
          <label style={labelModal}>Status</label>
          <select style={inputModal}>
            <option>Aktif</option>
            <option>Tidak Aktif</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button
          onClick={() => setShowTambah(false)}
          style={{
            padding: "9px 20px", borderRadius: 10,
            border: "1px solid #e2e8f0", background: "white",
            color: "#64748b", fontSize: "0.85rem", cursor: "pointer",
          }}
        >
          Batal
        </button>
        <button
          onClick={() => setShowTambah(false)}
          style={{
            padding: "9px 20px", borderRadius: 10,
            border: "none", background: "#3b82f6",
            color: "white", fontSize: "0.85rem",
            fontWeight: 600, cursor: "pointer",
          }}
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
)}
{/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, fontSize: "0.75rem", color: "#94a3b8", paddingBottom: 16 }}>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </div>
      </main>
    </div>
  );
}

// ── Style helpers ─────────────────────────────────────────
const btnOutline = {
  display: "flex", alignItems: "center", gap: 5,
  padding: "7px 14px", borderRadius: 8,
  border: "1px solid #e2e8f0", background: "white",
  color: "#475569", fontSize: "0.8rem", fontWeight: 500,
  cursor: "pointer",
};
const btnPrimary = {
  display: "flex", alignItems: "center", gap: 5,
  padding: "7px 14px", borderRadius: 8,
  border: "none", background: "#3b82f6",
  color: "white", fontSize: "0.8rem", fontWeight: 500,
  cursor: "pointer",
};
const th = {
  padding: "8px 10px", color: "#94a3b8",
  fontWeight: 500, fontSize: "0.75rem",
  whiteSpace: "nowrap",
};
const td = {
  padding: "10px 10px", verticalAlign: "middle",
};
const actionBtn = (bg, color) => ({
  width: 28, height: 28, borderRadius: 7,
  background: bg, color, border: "none",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer",
});
const pageBtn = (active) => ({
  minWidth: 30, height: 30, borderRadius: 7,
  border: active ? "none" : "1px solid #e2e8f0",
  background: active ? "#3b82f6" : "white",
  color: active ? "white" : "#64748b",
  fontSize: "0.8rem", fontWeight: active ? 600 : 400,
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center",
  padding: "0 8px",
});
const labelModal = {
  display: "block", fontSize: "0.8rem",
  fontWeight: 500, color: "#475569", marginBottom: 6,
};
const inputModal = {
  width: "100%", padding: "9px 12px",
  border: "1px solid #e2e8f0", borderRadius: 8,
  fontSize: "0.83rem", color: "#1e293b",
  outline: "none", boxSizing: "border-box",
};