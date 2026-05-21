import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Filter, Download, Plus, Search, Star,
  ChevronLeft, ChevronRight, Edit, Trash2, Ban,
  X, UserCheck, AlertTriangle
} from "lucide-react";

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

const STATUS_TABS = ["Semua", "Aktif", "Tersuspend", "Tidak Aktif"];

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
    "Tersuspend": { bg: "#fef2f2", color: "#ef4444", dot: "#ef4444" },
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
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
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
  const [showFilter, setShowFilter]   = useState(false);
  const [showTambah, setShowTambah]   = useState(false);
  const [showEdit, setShowEdit]       = useState(null);
  const [showSuspend, setShowSuspend] = useState(null);
  const [showDelete, setShowDelete]   = useState(null);
  const [users, setUsers]             = useState(dummyUsers);

  // Form states
  const [editForm, setEditForm] = useState({
    nama: "", email: "", skills: "", status: "Aktif", bio: ""
  });
  const [tambahForm, setTambahForm] = useState({
    nama: "", email: "", skills: "", status: "Aktif", bio: ""
  });

  const totalUser = users.length;
  const totalPages = Math.ceil(users.length / 5);

  // Filter berdasarkan tab & search
  const filtered = users.filter((u) => {
    const matchTab = activeTab === "Semua" || u.status === activeTab;
    const matchSearch = u.nama.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  // Pagination
  const paginated = filtered.slice((currentPage - 1) * 5, currentPage * 5);

  // Handle Edit
  const handleEditClick = (user) => {
    setShowEdit(user);
    setEditForm({
      nama: user.nama,
      email: user.email,
      skills: user.skills.join(", "),
      status: user.status,
      bio: user.bio || ""
    });
  };

  const handleEditSave = () => {
    if (!editForm.nama || !editForm.email) {
      alert("Nama dan Email harus diisi!");
      return;
    }

    const updatedUser = {
      ...showEdit,
      nama: editForm.nama,
      email: editForm.email,
      skills: editForm.skills.split(",").map(s => s.trim()),
      status: editForm.status,
      bio: editForm.bio,
      inisial: editForm.nama.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    };

    setUsers(prev => prev.map(user => user.id === showEdit.id ? updatedUser : user));
    setShowEdit(null);
    alert("Data user berhasil diupdate!");
  };

  // Handle Suspend/Ban
  const handleSuspend = (user) => {
    const newStatus = user.status === "Suspended" ? "Aktif" : "Suspended";
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    setShowSuspend(null);
    alert(`User ${user.nama} ${newStatus === "Suspended" ? "di-suspend" : "di-aktifkan kembali"}!`);
  };

  // Handle Delete
  const handleDelete = (user) => {
    setUsers(prev => prev.filter(u => u.id !== user.id));
    setShowDelete(null);
    alert(`User ${user.nama} berhasil dihapus!`);
  };

  // Handle Tambah
  const handleTambah = () => {
    if (!tambahForm.nama || !tambahForm.email) {
      alert("Nama dan Email harus diisi!");
      return;
    }

    const warnaList = ["#3b82f6", "#f97316", "#22c55e", "#8b5cf6", "#ef4444", "#ec4899"];
    const newUser = {
      id: Date.now(),
      nama: tambahForm.nama,
      email: tambahForm.email,
      inisial: tambahForm.nama.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
      warna: warnaList[Math.floor(Math.random() * warnaList.length)],
      skills: tambahForm.skills.split(",").map(s => s.trim()).filter(s => s),
      bergabung: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      koneksi: 0,
      rating: null,
      status: tambahForm.status,
      bio: tambahForm.bio
    };

    setUsers(prev => [newUser, ...prev]);
    setTambahForm({ nama: "", email: "", skills: "", status: "Aktif", bio: "" });
    setShowTambah(false);
    alert("User berhasil ditambahkan!");
  };

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map((u) => u.id));
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
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f8f7f4", fontFamily: "'Poppins','Segoe UI',sans-serif" }}>
      <Sidebar role="superadmin" active="kelola-user" />

      <main style={{ flex: 1, padding: "20px 24px", overflowY: "auto", minWidth: 0, background: "#f8f7f4" }}>

        {/* Breadcrumb & Judul */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>Kelola User</h1>
          <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "6px 0 0" }}>Dashboard › Kelola User</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Total Pengguna", value: users.length.toString(), sub: "▲ +12% bulan ini", subColor: "#22c55e" },
            { label: "Sesi Aktif", value: users.filter(u => u.status === "Aktif").length.toString(), sub: "▲ +8% minggu ini", subColor: "#22c55e" },
            { label: "Laporan Masuk", value: "4", sub: "▼ +2 minggu ini", subColor: "#ef4444" },
            { label: "Pengguna Tersuspend", value: users.filter(u => u.status === "Tersuspend").length.toString(), sub: "▼ +1 minggu ini", subColor: "#ef4444" },
          ].map((c) => (
            <div key={c.label} style={{ background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "0.73rem", color: "#94a3b8", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>{c.value}</div>
              {c.sub && <div style={{ fontSize: "0.72rem", color: c.subColor, marginTop: 5 }}>{c.sub}</div>}
            </div>
          ))}
        </div>

        {/* Tabel Card */}
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 22px" }}>

          {/* Header tabel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>Daftar Pengguna</h2>
              <span style={{ background: "#f1f5f9", color: "#64748b", fontSize: "0.72rem", fontWeight: 600, padding: "2px 10px", borderRadius: 20 }}>
                {users.length} user
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={btnOutline} onClick={() => setShowFilter(!showFilter)}><Filter size={14} /> Filter</button>
              <button style={btnOutline} onClick={handleExport}><Download size={14} /> Export</button>
              <button style={btnPrimary} onClick={() => setShowTambah(true)}><Plus size={14} /> Tambah User</button>
            </div>
          </div>

          {/* Tab Status + Search */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {STATUS_TABS.map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} style={{
                  padding: "6px 14px", borderRadius: 8, border: "none", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                  background: activeTab === tab ? "#3b82f6" : "transparent", color: activeTab === tab ? "white" : "#64748b"
                }}>{tab}</button>
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input placeholder="Cari nama / email..." value={search} onChange={(e) => setSearch(e.target.value)} style={{
                paddingLeft: 32, paddingRight: 12, paddingTop: 7, paddingBottom: 7, border: "1px solid #e2e8f0", borderRadius: 8,
                fontSize: "0.8rem", color: "#475569", outline: "none", width: 200
              }} />
            </div>
          </div>

          {/* Tabel */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <th style={th}><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} /></th>
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
                <tr key={user.id} style={{ borderBottom: "1px solid #f8fafc", background: selected.includes(user.id) ? "#f8faff" : "white" }}>
                  <td style={td}><input type="checkbox" checked={selected.includes(user.id)} onChange={() => toggleSelect(user.id)} /></td>
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: user.warna, color: "white", fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{user.inisial}</div>
                      <div><div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.8rem" }}>{user.nama}</div><div style={{ color: "#94a3b8", fontSize: "0.7rem" }}>{user.email}</div></div>
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
                  <td style={{ ...td, color: "#64748b", fontSize: "0.78rem" }}>{user.bergabung}</td>
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
                    <div style={{ display: "flex", gap: 4 }}>
                      {/* Tombol EDIT */}
                      <button title="Edit" style={actionBtn("#eff6ff", "#3b82f6")} onClick={() => handleEditClick(user)}>
                        <Edit size={13} />
                      </button>
                      {/* Tombol SUSPEND */}
                      <button title={user.status === "Suspended" ? "Aktifkan" : "Suspend"} style={actionBtn("#fff7ed", "#f97316")} onClick={() => setShowSuspend(user)}>
                        <Ban size={13} />
                      </button>
                      {/* Tombol HAPUS */}
                      <button title="Hapus" style={actionBtn("#fef2f2", "#ef4444")} onClick={() => setShowDelete(user)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, paddingTop: 14, borderTop: "1px solid #f1f5f9" }}>
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Menampilkan 1–{paginated.length} dari {filtered.length} user</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} style={pageBtn(false)} disabled={currentPage === 1}><ChevronLeft size={14} /></button>
              {[...Array(Math.min(3, totalPages))].map((_, idx) => {
                let pageNum = idx + 1;
                if (totalPages > 3 && currentPage > 2) pageNum = currentPage - 1 + idx;
                if (pageNum > totalPages) return null;
                return <button key={pageNum} onClick={() => setCurrentPage(pageNum)} style={pageBtn(currentPage === pageNum)}>{pageNum}</button>;
              })}
              {totalPages > 3 && currentPage < totalPages - 1 && <span style={{ color: "#94a3b8", fontSize: "0.8rem", padding: "0 4px" }}>...</span>}
              {totalPages > 3 && <button onClick={() => setCurrentPage(totalPages)} style={pageBtn(currentPage === totalPages)}>{totalPages}</button>}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} style={pageBtn(false)} disabled={currentPage === totalPages}><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, fontSize: "0.75rem", color: "#94a3b8", paddingBottom: 16 }}>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </div>
      </main>

      {/* ── MODAL EDIT ── */}
      {showEdit && (
        <div style={modalOverlay} onClick={() => setShowEdit(null)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader(showEdit.warna)}>
              <button style={modalClose} onClick={() => setShowEdit(null)}><X size={18} /></button>
              <div style={modalIcon}><Edit size={24} color="white" /></div>
              <h3 style={modalTitle}>Edit User</h3>
              <p style={modalSubtitle}>Perbarui data pengguna</p>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Nama Lengkap *</label><input type="text" style={inputModal} value={editForm.nama} onChange={(e) => setEditForm({...editForm, nama: e.target.value})} /></div>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Email *</label><input type="email" style={inputModal} value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} /></div>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Skills (pisahkan dengan koma)</label><input type="text" style={inputModal} placeholder="UI/UX, React, Figma" value={editForm.skills} onChange={(e) => setEditForm({...editForm, skills: e.target.value})} /></div>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Status</label><select style={inputModal} value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}><option>Aktif</option><option>Suspended</option><option>Tidak Aktif</option></select></div>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Bio</label><textarea rows="3" style={{...inputModal, resize: "none"}} value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} /></div>
            </div>
            <div style={modalFooter}><button style={modalCancelBtn} onClick={() => setShowEdit(null)}>Batal</button><button style={modalSaveBtn} onClick={handleEditSave}>Simpan Perubahan</button></div>
          </div>
        </div>
      )}

      {/* ── MODAL SUSPEND ── */}
      {showSuspend && (
        <div style={modalOverlay} onClick={() => setShowSuspend(null)}>
          <div style={{ ...modalContent, width: 400 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center", padding: "28px 24px" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: showSuspend.status === "Suspended" ? "#dcfce7" : "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                {showSuspend.status === "Suspended" ? <UserCheck size={28} color="#22c55e" /> : <Ban size={28} color="#d97706" />}
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>{showSuspend.status === "Suspended" ? "Aktifkan User?" : "Suspend User?"}</h3>
              <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: 20 }}>
                {showSuspend.status === "Suspended" ? `User ${showSuspend.nama} akan diaktifkan kembali.` : `User ${showSuspend.nama} akan di-suspend sementara.`}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button style={modalCancelBtn} onClick={() => setShowSuspend(null)}>Batal</button>
                <button style={{ ...modalSaveBtn, background: showSuspend.status === "Suspended" ? "#22c55e" : "#d97706" }} onClick={() => handleSuspend(showSuspend)}>
                  {showSuspend.status === "Suspended" ? "Ya, Aktifkan" : "Ya, Suspend"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL DELETE ── */}
      {showDelete && (
        <div style={modalOverlay} onClick={() => setShowDelete(null)}>
          <div style={{ ...modalContent, width: 400 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center", padding: "28px 24px" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><AlertTriangle size={28} color="#ef4444" /></div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>Hapus User?</h3>
              <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: 20 }}>Hapus user <strong>{showDelete.nama}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button style={modalCancelBtn} onClick={() => setShowDelete(null)}>Batal</button>
                <button style={{ ...modalSaveBtn, background: "#ef4444" }} onClick={() => handleDelete(showDelete)}>Ya, Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL TAMBAH ── */}
      {showTambah && (
        <div style={modalOverlay} onClick={() => setShowTambah(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader("#3b82f6")}>
              <button style={modalClose} onClick={() => setShowTambah(false)}><X size={18} /></button>
              <div style={modalIcon}><Plus size={24} color="white" /></div>
              <h3 style={modalTitle}>Tambah User Baru</h3>
              <p style={modalSubtitle}>Isi data pengguna baru</p>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Nama Lengkap *</label><input type="text" style={inputModal} placeholder="Masukkan nama" value={tambahForm.nama} onChange={(e) => setTambahForm({...tambahForm, nama: e.target.value})} /></div>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Email *</label><input type="email" style={inputModal} placeholder="nama@email.com" value={tambahForm.email} onChange={(e) => setTambahForm({...tambahForm, email: e.target.value})} /></div>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Skills (pisahkan dengan koma)</label><input type="text" style={inputModal} placeholder="UI/UX, React, Figma" value={tambahForm.skills} onChange={(e) => setTambahForm({...tambahForm, skills: e.target.value})} /></div>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Status</label><select style={inputModal} value={tambahForm.status} onChange={(e) => setTambahForm({...tambahForm, status: e.target.value})}><option>Aktif</option><option>Suspended</option><option>Tidak Aktif</option></select></div>
              <div style={{ marginBottom: 16 }}><label style={labelModal}>Bio</label><textarea rows="3" style={{...inputModal, resize: "none"}} placeholder="Tentang user..." value={tambahForm.bio} onChange={(e) => setTambahForm({...tambahForm, bio: e.target.value})} /></div>
            </div>
            <div style={modalFooter}><button style={modalCancelBtn} onClick={() => setShowTambah(false)}>Batal</button><button style={modalSaveBtn} onClick={handleTambah}>Simpan User</button></div>
          </div>
        </div>
      )}

      {/* ── FILTER DROPDOWN ── */}
      {showFilter && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setShowFilter(false)}>
          <div style={{ position: "absolute", top: 200, right: 120, background: "white", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", padding: "16px", minWidth: 200 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Filter berdasarkan:</div>
            {["Aktif", "Suspended", "Tidak Aktif"].map((s) => (
              <div key={s} onClick={() => { setActiveTab(s); setShowFilter(false); }} style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.83rem", background: activeTab === s ? "#eff6ff" : "transparent", color: activeTab === s ? "#3b82f6" : "#475569", fontWeight: activeTab === s ? 600 : 400 }}>{s}</div>
            ))}
            <div onClick={() => { setActiveTab("Semua"); setShowFilter(false); }} style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.83rem", color: "#ef4444", marginTop: 4, borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>Reset Filter</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Style helpers ─────────────────────────────────────────
const btnOutline = { display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: "1px solid #e2e8f0", background: "white", color: "#475569", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer" };
const btnPrimary = { display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: "none", background: "#3b82f6", color: "white", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer" };
const th = { padding: "8px 10px", color: "#94a3b8", fontWeight: 500, fontSize: "0.75rem", whiteSpace: "nowrap" };
const td = { padding: "10px 10px", verticalAlign: "middle" };
const actionBtn = (bg, color) => ({ width: 28, height: 28, borderRadius: 7, background: bg, color, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" });
const pageBtn = (active) => ({ minWidth: 30, height: 30, borderRadius: 7, border: active ? "none" : "1px solid #e2e8f0", background: active ? "#3b82f6" : "white", color: active ? "white" : "#64748b", fontSize: "0.8rem", fontWeight: active ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" });
const labelModal = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#475569", marginBottom: 6 };
const inputModal = { width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: "0.8rem", outline: "none", boxSizing: "border-box" };
const modalOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalContent = { background: "white", borderRadius: 24, width: 500, maxWidth: "90%", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", overflow: "hidden" };
const modalHeader = (color) => ({ padding: "24px 28px", background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`, position: "relative" });
const modalClose = { position: "absolute", right: 20, top: 20, background: "rgba(0,0,0,0.1)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
const modalIcon = { width: 48, height: 48, borderRadius: 16, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 };
const modalTitle = { fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", margin: 0 };
const modalSubtitle = { fontSize: "0.75rem", color: "#64748b", margin: "4px 0 0" };
const modalFooter = { padding: "16px 24px", background: "#f8fafc", display: "flex", gap: 12, justifyContent: "flex-end", borderTop: "1px solid #e2e8f0" };
const modalCancelBtn = { padding: "8px 20px", borderRadius: 10, border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontSize: "0.8rem", cursor: "pointer" };
const modalSaveBtn = { padding: "8px 24px", borderRadius: 10, border: "none", background: "#3b82f6", color: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" };