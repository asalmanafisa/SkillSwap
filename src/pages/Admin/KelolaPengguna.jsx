// src/pages/Admin/KelolaPengguna.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText,
  LogOut, Plus, Eye, Edit2,
  ChevronLeft, ChevronRight, X,
  UserPlus, Mail, Shield, AlertCircle, Save,
  UserCheck, UserX, Users as UsersIcon, Search,
  CheckCircle, AlertTriangle
} from "lucide-react";

// ── Data dummy ────────────────────────────────────────────
const dummyPengguna = [
  { id: 1, nama: "Farah Naylul Fauzia", idUser: "ID: 882510", email: "farahfauzia@student.ub.ac.id",  peran: "User",     tanggal: "12 Okt 2023", status: "Aktif",    avatar: "FN", warna: "#f97316" },
  { id: 2, nama: "Yasmine Shavira Ahmad", idUser: "ID: 882511", email: "yasmineshavira@student.ub.ac.id",   peran: "User", tanggal: "15 Okt 2023", status: "Aktif",    avatar: "YS", warna: "#3b82f6" },
  { id: 3, nama: "Tabina Naila Griselda", idUser: "ID: 882912", email: "tabinaila@student.ub.ac.id",      peran: "User",      tanggal: "20 Nov 2023", status: "Aktif",avatar: "TN", warna: "#8b5cf6" },
  { id: 4, nama: "Sekar Suryawati", idUser: "ID: 882913", email: "sekarsuryawati@student.ub.ac.id",peran: "User",      tanggal: "05 Des 2023", status: "Tersuspend",    avatar: "SS", warna: "#22c55e" },
  { id: 6, nama: "Amira Salma Nafisa", idUser: "ID: 882915", email: "amira.nafisa@student.ub.ac.id",peran: "User",     tanggal: "15 Jan 2024", status: "Aktif", avatar: "AN", warna: "#ef4444" },
];

const peranColor = {
  "User":      { bg: "#f1f5f9", color: "#475569" },
};

const statusColor = {
  "Aktif":     { bg: "#f0fdf4", color: "#22c55e" },
  "Non-aktif": { bg: "#f1f5f9", color: "#94a3b8" },
  "Tersuspend":  { bg: "#fef2f2", color: "#ef4444" },
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
export default function KelolaPengguna() {
  const [penggunaList, setPenggunaList] = useState(dummyPengguna);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterDate, setFilterDate] = useState("Semua"); // Semua, bulan_ini
  const [currentPage, setCurrentPage] = useState(1);
  const [showTambah, setShowTambah] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [showEdit, setShowEdit] = useState(null);
  const [notification, setNotification] = useState(null);
  
  const [formNama, setFormNama] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPeran, setFormPeran] = useState("User");
  const [formStatus, setFormStatus] = useState("Aktif");

  // Filter berdasarkan status
  const filterByStatus = (status) => {
    setFilterStatus(status);
    setFilterDate("Semua");
    setCurrentPage(1);
  };

  // Filter berdasarkan pengguna baru (bulan ini)
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

  // Handle Tambah Pengguna
  const handleSimpan = () => {
    if (!formNama || !formEmail) {
      setNotification({ message: "Nama dan Email harus diisi!", type: "error" });
      return;
    }

    const warnaList = ["#3b82f6","#f97316","#22c55e","#8b5cf6","#ef4444","#14b8a6","#ec4899"];
    const warna = warnaList[Math.floor(Math.random() * warnaList.length)];
    const inisial = formNama.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    const today = new Date();
    const tgl = `${today.getDate()} ${["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"][today.getMonth()]} ${today.getFullYear()}`;

    const newUser = {
      id: Date.now(),
      nama: formNama,
      idUser: `ID: ${Math.floor(800000 + Math.random() * 99999)}`,
      email: formEmail,
      peran: "User",
      tanggal: tgl,
      status: formStatus,
      avatar: inisial,
      warna: warna,
    };

    setPenggunaList((prev) => [newUser, ...prev]);
    
    setFormNama("");
    setFormEmail("");
    setFormPeran("User");
    setFormStatus("Aktif");
    setShowTambah(false);
    setNotification({ message: "Pengguna baru berhasil ditambahkan!", type: "success" });
  };

  // Handle Edit Pengguna
  const handleEdit = (user) => {
    setShowEdit(user);
    setFormNama(user.nama);
    setFormEmail(user.email);
    setFormPeran(user.peran);
    setFormStatus(user.status);
  };

  const handleUpdate = () => {
    if (!formNama || !formEmail) {
      setNotification({ message: "Nama dan Email harus diisi!", type: "error" });
      return;
    }

    const inisial = formNama.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    
    setPenggunaList((prev) =>
      prev.map((user) =>
        user.id === showEdit.id
          ? {
              ...user,
              nama: formNama,
              email: formEmail,
              peran: "User",
              status: formStatus,
              avatar: inisial,
            }
          : user
      )
    );
    
    setShowEdit(null);
    setFormNama("");
    setFormEmail("");
    setFormPeran("User");
    setFormStatus("Aktif");
    setNotification({ message: "Data pengguna berhasil diupdate!", type: "success" });
  };

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

  // Filter data berdasarkan status dan tanggal
  const filtered = penggunaList.filter((u) => {
    const matchSearch =
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua" || u.status === filterStatus;
    
    let matchDate = true;
    if (filterDate === "bulan_ini") {
      matchDate = isNewThisMonth(u.tanggal);
    }
    
    return matchSearch && matchStatus && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Statistik
  const stats = {
    total: penggunaList.length,
    aktif: penggunaList.filter(u => u.status === "Aktif").length,
    tersuspend: penggunaList.filter(u => u.status === "Tersuspend").length,
    baruBulanIni: penggunaList.filter(u => isNewThisMonth(u.tanggal)).length,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fcf5e8", fontFamily: "'Inter', 'Poppins', 'Segoe UI', sans-serif" }}>
      <SidebarAdmin active="kelola-pengguna" />

      <main style={{ 
        flex: 1, 
        padding: "24px 28px", 
        overflow: "visible",
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
            Kelola Pengguna
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "8px 0 0" }}>
            Manajemen hak akses dan profil pengguna platform.
          </p>
        </div>

        {/* Stat Cards - semua bisa ditekan */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {/* Total Pengguna Card */}
          <div 
            onClick={() => resetFilter()}
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
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UsersIcon size={20} color="#3b82f6" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#3b82f6" }}>Semua</span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
              Total Pengguna
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.total}</div>
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
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserCheck size={20} color="#22c55e" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#22c55e" }}>Aktif</span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
              Pengguna Aktif
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.aktif}</div>
          </div>

          {/* Pengguna Baru Card - BISA DITEKAN */}
          <div 
            onClick={() => filterByNewUser()}
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
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserPlus size={20} color="#f97316" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#f97316" }}>Bulan Ini</span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
              Pengguna Baru
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.baruBulanIni}</div>
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
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserX size={20} color="#ef4444" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#ef4444" }}>Tersuspend</span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em", marginBottom: 6 }}>
              Pengguna Tersuspend
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b" }}>{stats.tersuspend}</div>
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

          {/* Header Tabel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Daftar Pengguna 
              {filterStatus !== "Semua" ? ` - ${filterStatus}` : ""}
              {filterDate === "bulan_ini" ? " - Pengguna Baru (Bulan Ini)" : ""}
            </h2>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  placeholder="Cari pengguna..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  style={{
                    paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                    border: "1px solid #e2e8f0", borderRadius: 10,
                    fontSize: "0.8rem", color: "#475569", outline: "none", width: 200,
                  }}
                />
              </div>

              <button
                onClick={() => {
                  setFormNama("");
                  setFormEmail("");
                  setFormPeran("User");
                  setFormStatus("Aktif");
                  setShowTambah(true);
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 10,
                  border: "none", background: "#1e3a5f",
                  color: "white", fontSize: "0.8rem",
                  fontWeight: 600, cursor: "pointer",
                }}
              >
                <Plus size={14} /> Tambah Pengguna
              </button>
            </div>
          </div>

          {/* Tabel */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse", 
              fontSize: "0.85rem",
              minWidth: 800
            }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {["NAMA", "EMAIL", "PERAN", "TANGGAL BERGABUNG", "STATUS", "AKSI"].map((h) => (
                    <th key={h} style={{ padding: "14px 12px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>
                      Tidak ada pengguna ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginated.map((user) => {
                    const pc = peranColor[user.peran] || { bg: "#f1f5f9", color: "#475569" };
                    const sc = statusColor[user.status] || { bg: "#f1f5f9", color: "#64748b" };
                    return (
                      <tr key={user.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                        <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                              width: 40, height: 40, borderRadius: "50%",
                              background: user.warna, color: "white",
                              fontSize: "0.8rem", fontWeight: 700,
                              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            }}>{user.avatar}</div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.88rem" }}>{user.nama}</div>
                              <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{user.idUser}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 12px", color: "#64748b", fontSize: "0.8rem", verticalAlign: "middle" }}>
                          {user.email}
                        </td>
                        <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                          <span style={{ background: pc.bg, color: pc.color, fontSize: "0.7rem", fontWeight: 600, padding: "4px 12px", borderRadius: 8 }}>
                            {user.peran}
                          </span>
                        </td>
                        <td style={{ padding: "14px 12px", color: "#64748b", fontSize: "0.8rem", verticalAlign: "middle" }}>
                          {user.tanggal}
                        </td>
                        <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: sc.bg, color: sc.color,
                            fontSize: "0.7rem", fontWeight: 600,
                            padding: "4px 12px", borderRadius: 20,
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc.color }} />
                            {user.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 12px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button 
                              title="Lihat" 
                              style={{ width: 32, height: 32, borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                              onClick={() => setShowDetail(user)}
                            >
                              <Eye size={14} />
                            </button>
                            <button 
                              title="Edit" 
                              style={{ width: 32, height: 32, borderRadius: 8, background: "#eff6ff", border: "none", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                              onClick={() => handleEdit(user)}
                            >
                              <Edit2 size={14} />
                            </button>
                          </div>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                Menampilkan {filtered.length === 0 ? 0 : ((currentPage-1)*ITEMS_PER_PAGE)+1} - {Math.min(currentPage*ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} pengguna
              </span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button 
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} 
                  style={pageBtn(false)} 
                  disabled={currentPage === 1}
                >
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
                <button 
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} 
                  style={pageBtn(false)} 
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Tambah Pengguna */}
        {showTambah && (
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
              width: 480,
              maxWidth: "90%",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "24px 28px",
                background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)",
                color: "white",
                position: "relative",
              }}>
                <button
                  onClick={() => setShowTambah(false)}
                  style={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <X size={18} />
                </button>
                <div style={{
                  width: 48,
                  height: 48,
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <UserPlus size={24} color="white" />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>Tambah Pengguna</h3>
                <p style={{ fontSize: "0.8rem", opacity: 0.8, margin: "4px 0 0" }}>Isi data pengguna baru dengan lengkap</p>
              </div>

              <div style={{ padding: "28px" }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 6 }}> <UserPlus size={14} /> Nama Lengkap <span style={{ color: "#ef4444" }}>*</span> </label>
                  <input type="text" placeholder="Masukkan nama lengkap" style={inputStyle} value={formNama} onChange={(e) => setFormNama(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 6 }}> <Mail size={14} /> Email <span style={{ color: "#ef4444" }}>*</span> </label>
                  <input type="email" placeholder="nama@email.com" style={inputStyle} value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 6 }}> <Shield size={14} /> Peran </label>
                  <select style={inputStyle} value={formPeran} onChange={(e) => setFormPeran(e.target.value)}>
                    <option value="User">User</option>
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 6 }}> <AlertCircle size={14} /> Status </label>
                  <select style={inputStyle} value={formStatus} onChange={(e) => setFormStatus(e.target.value)}>
                    <option value="Aktif">Aktif</option>
                    <option value="Tersuspend">Tersuspend</option>
                  </select>
                </div>
              </div>

              <div style={{ padding: "20px 28px", background: "#f8fafc", display: "flex", gap: 12, justifyContent: "flex-end", borderTop: "1px solid #e2e8f0" }}>
                <button onClick={() => { setShowTambah(false); setFormNama(""); setFormEmail(""); setFormPeran("User"); setFormStatus("Aktif"); }} style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>Batal</button>
                <button onClick={handleSimpan} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)", color: "white", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Simpan Pengguna</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Edit Pengguna */}
        {showEdit && (
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
              width: 480,
              maxWidth: "90%",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "24px 28px",
                background: `linear-gradient(135deg, ${showEdit.warna}80 0%, ${showEdit.warna} 100%)`,
                color: "white",
                position: "relative",
              }}>
                <button onClick={() => setShowEdit(null)} style={{ position: "absolute", right: 20, top: 20, background: "rgba(0,0,0,0.2)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}><X size={18} /></button>
                <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.2)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Edit2 size={24} color="white" /></div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>Edit Pengguna</h3>
                <p style={{ fontSize: "0.8rem", opacity: 0.8, margin: "4px 0 0" }}>Perbarui data pengguna</p>
              </div>

              <div style={{ padding: "28px" }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 6 }}> <UserPlus size={14} /> Nama Lengkap <span style={{ color: "#ef4444" }}>*</span> </label>
                  <input type="text" placeholder="Masukkan nama lengkap" style={inputStyle} value={formNama} onChange={(e) => setFormNama(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 6 }}> <Mail size={14} /> Email <span style={{ color: "#ef4444" }}>*</span> </label>
                  <input type="email" placeholder="nama@email.com" style={inputStyle} value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 6 }}> <Shield size={14} /> Peran </label>
                  <select style={inputStyle} value={formPeran} onChange={(e) => setFormPeran(e.target.value)}>
                    <option value="User">User</option>
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 6 }}> <AlertCircle size={14} /> Status </label>
                  <select style={inputStyle} value={formStatus} onChange={(e) => setFormStatus(e.target.value)}>
                    <option value="Aktif">Aktif</option>
                    <option value="Tersuspend">Tersuspend</option>
                  </select>
                </div>
              </div>

              <div style={{ padding: "20px 28px", background: "#f8fafc", display: "flex", gap: 12, justifyContent: "flex-end", borderTop: "1px solid #e2e8f0" }}>
                <button onClick={() => setShowEdit(null)} style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>Batal</button>
                <button onClick={handleUpdate} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)", color: "white", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Save size={16} /> Update Pengguna</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detail Pengguna */}
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
              width: 420,
              maxWidth: "90%",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "28px",
                background: `linear-gradient(135deg, ${showDetail.warna}20 0%, ${showDetail.warna}40 100%)`,
                textAlign: "center",
                position: "relative",
              }}>
                <button onClick={() => setShowDetail(null)} style={{ position: "absolute", right: 16, top: 16, background: "rgba(0,0,0,0.1)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b" }}><X size={18} /></button>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: showDetail.warna, color: "white", fontSize: "2rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: "4px solid white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>{showDetail.avatar}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{showDetail.nama}</h3>
                <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "4px 0 0" }}>{showDetail.idUser}</p>
              </div>

              <div style={{ padding: "24px" }}>
                <div style={{ background: "#f8fafc", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>EMAIL</span><span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>{showDetail.email}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>PERAN</span><span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>{showDetail.peran}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>TANGGAL BERGABUNG</span><span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>{showDetail.tanggal}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>STATUS</span><span style={{ fontSize: "0.85rem", padding: "2px 8px", borderRadius: 6, background: statusColor[showDetail.status]?.bg || "#f1f5f9", color: statusColor[showDetail.status]?.color || "#64748b", fontWeight: 600 }}>{showDetail.status}</span></div>
                </div>
              </div>

              <div style={{ padding: "20px 24px", background: "#f8fafc", display: "flex", gap: 12, justifyContent: "flex-end", borderTop: "1px solid #e2e8f0" }}>
                <button onClick={() => { setShowDetail(null); handleEdit(showDetail); }} style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #e2e8f0", background: "white", color: "#3b82f6", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Edit2 size={16} /> Edit Pengguna</button>
                <button onClick={() => setShowDetail(null)} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: "#1e3a5f", color: "white", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Tutup</button>
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

const pageBtn = (active) => ({
  minWidth: 30, height: 30, borderRadius: 8,
  border: active ? "none" : "1px solid #e2e8f0",
  background: active ? "#1e3a5f" : "white",
  color: active ? "white" : "#64748b",
  fontSize: "0.8rem", fontWeight: active ? 600 : 400,
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center", padding: "0 8px",
});

const labelStyle = {
  display: "block", fontSize: "0.78rem",
  fontWeight: 500, color: "#475569", marginBottom: 5,
};

const inputStyle = {
  width: "100%", padding: "8px 11px",
  border: "1px solid #e2e8f0", borderRadius: 8,
  fontSize: "0.82rem", color: "#1e293b",
  outline: "none", boxSizing: "border-box", background: "white",
};