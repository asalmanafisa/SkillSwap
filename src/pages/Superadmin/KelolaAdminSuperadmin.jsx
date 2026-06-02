// src/pages/Superadmin/KelolaAdmin.jsx
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { CheckCircle, AlertTriangle, Edit2, Trash2, Plus, ChevronDown } from "lucide-react";

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

const initialAdmins = [
  { id: 1, nama: "Farah Naylul Fauzia",   email: "farahfauzia@student.ub.ac.id",  status: "Aktif" },
  { id: 2, nama: "Amira Salma Nafisa",    email: "amira.nafisa@student.ub.ac.id", status: "Aktif" },
  { id: 3, nama: "Yasmine Shavira Ahmad", email: "yasmineshavira@student.ub.ac.id",   status: "Aktif" },
];

const statusOptions = ["Aktif", "Hiatus", "Tidak Aktif"];
const statusColor = {
  "Aktif":      { bg: "#f0fdf4", color: "#22c55e", dot: "#22c55e" },
  "Hiatus":     { bg: "#fef3c7", color: "#d97706", dot: "#d97706" },
  "Tidak Aktif": { bg: "#fef2f2", color: "#ef4444", dot: "#ef4444" },
};

export default function KelolaAdmin() {
  const [admins, setAdmins]         = useState(initialAdmins);
  const [nama, setNama]             = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [status, setStatus]         = useState(""); // Default kosong
  const [editId, setEditId]         = useState(null);
  const [notification, setNotification] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);

  // Handle update status dari tabel
  const handleStatusChange = (id, newStatus) => {
    setAdmins((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: newStatus } : a)
    );
    setOpenStatusDropdown(null);
    setNotification({ message: `Status admin berhasil diubah menjadi ${newStatus}`, type: "success" });
  };

  const handleSubmit = () => {
    if (!nama || !email || (!editId && !password)) {
      setNotification({ message: "Semua field wajib diisi.", type: "error" });
      return;
    }
    if (!editId && password !== konfirmasi) {
      setNotification({ message: "Password dan konfirmasi password tidak cocok.", type: "error" });
      return;
    }
    if (!editId && !status) {
      setNotification({ message: "Status harus dipilih!", type: "error" });
      return;
    }
    
    if (editId) {
      setAdmins((prev) =>
        prev.map((a) => a.id === editId ? { ...a, nama, email, status } : a)
      );
      setEditId(null);
      setNotification({ message: "Perubahan berhasil disimpan!", type: "success" });
    } else {
      setAdmins((prev) => [
        ...prev,
        { id: Date.now(), nama, email, status },
      ]);
      setNotification({ message: "Admin baru berhasil ditambahkan!", type: "success" });
    }
    
    // Reset form
    setNama("");
    setEmail("");
    setPassword("");
    setKonfirmasi("");
    setStatus("");
  };

  const handleEdit = (admin) => {
    setEditId(admin.id);
    setNama(admin.nama);
    setEmail(admin.email);
    setStatus(admin.status);
    setPassword("");
    setKonfirmasi("");
  };

  const handleHapus = (id) => {
    setShowDeleteConfirm(id);
  };

  const konfirmasiHapus = () => {
    const adminToDelete = admins.find(a => a.id === showDeleteConfirm);
    setAdmins((prev) => prev.filter((a) => a.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
    setNotification({ message: `Admin ${adminToDelete?.nama} berhasil dihapus!`, type: "success" });
  };

  const handleBatal = () => {
    setEditId(null);
    setNama("");
    setEmail("");
    setPassword("");
    setKonfirmasi("");
    setStatus("");
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "#fcf5e8", fontFamily: "'Inter', 'Poppins', 'Segoe UI', sans-serif",
    }}>
      <Sidebar role="superadmin" active="kelola-admin" />

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
            Kelola Admin
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "8px 0 0" }}>
            Kelola administrator yang memiliki akses ke panel admin.
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: "white", borderRadius: 20,
          padding: "24px 28px", marginBottom: 24,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: 20 }}>
            {editId ? "Edit Admin" : "Tambah Admin Baru"}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama" value={nama}
                onChange={(e) => setNama(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="nama@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
              {editId && (
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: 4, display: "block" }}>
                  Kosongkan jika tidak ingin mengubah password
                </span>
              )}
            </div>
            <div>
              <label style={labelStyle}>Konfirmasi Password</label>
              <input type="password" placeholder="••••••••" value={konfirmasi}
                onChange={(e) => setKonfirmasi(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              style={{ ...inputStyle, color: status ? "#1e293b" : "#94a3b8" }}
            >
              <option value="" disabled>Pilih Status</option>
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleSubmit} style={btnPrimary}>
              {editId ? "Simpan Perubahan" : "Tambah Admin"}
            </button>
            {editId && (
              <button onClick={handleBatal} style={btnOutline}>Batal</button>
            )}
          </div>
        </div>

        {/* Tabel */}
        <div style={{
          background: "white", borderRadius: 20,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <th style={th}>ADMIN</th>
                  <th style={th}>EMAIL</th>
                  <th style={th}>STATUS</th>
                  <th style={{ ...th, textAlign: "center" }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {admins.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>
                      Belum ada admin terdaftar.
                    </td>
                  </tr>
                ) : (
                  admins.map((admin) => {
                    const sc = statusColor[admin.status] || statusColor["Aktif"];
                    return (
                      <tr key={admin.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                        <td style={td}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 9, height: 9, borderRadius: "50%", background: sc.color, flexShrink: 0 }} />
                            <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem" }}>{admin.nama}</span>
                          </div>
                        </td>
                        <td style={{ ...td, color: "#64748b", fontSize: "0.8rem" }}>{admin.email}</td>
                        <td style={td}>
                          <div style={{ position: "relative" }}>
                            <button
                              onClick={() => setOpenStatusDropdown(openStatusDropdown === admin.id ? null : admin.id)}
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                background: sc.bg, color: sc.color,
                                fontSize: "0.72rem", fontWeight: 600,
                                padding: "5px 14px", borderRadius: 20,
                                border: "none", cursor: "pointer",
                              }}
                            >
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc.color }} />
                              {admin.status}
                              <ChevronDown size={12} />
                            </button>
                            {openStatusDropdown === admin.id && (
                              <div style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                marginTop: 4,
                                background: "white",
                                borderRadius: 10,
                                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                                zIndex: 100,
                                minWidth: 130,
                                overflow: "hidden",
                                border: "1px solid #e2e8f0",
                              }}>
                                {statusOptions.map((s) => {
                                  const sColor = statusColor[s];
                                  return (
                                    <div
                                      key={s}
                                      onClick={() => handleStatusChange(admin.id, s)}
                                      style={{
                                        padding: "8px 14px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        cursor: "pointer",
                                        background: admin.status === s ? "#f1f5f9" : "white",
                                        color: sColor.color,
                                        fontSize: "0.75rem",
                                        fontWeight: 500,
                                      }}
                                    >
                                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: sColor.color }} />
                                      {s}
                                      {admin.status === s && (
                                        <span style={{ marginLeft: "auto", fontSize: "10px" }}>✓</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </td>
                        <td style={{ ...td, textAlign: "center" }}>
                          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                            <button onClick={() => handleEdit(admin)} style={{
                              padding: "6px 16px", borderRadius: 8,
                              border: "1px solid #3b82f6", background: "white",
                              color: "#3b82f6", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
                              display: "flex", alignItems: "center", gap: 4,
                            }}>
                              <Edit2 size={12} /> Edit
                            </button>
                            <button onClick={() => handleHapus(admin.id)} style={{
                              padding: "6px 16px", borderRadius: 8,
                              border: "none", background: "#ef4444",
                              color: "white", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
                              display: "flex", alignItems: "center", gap: 4,
                            }}>
                              <Trash2 size={12} /> Hapus
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
        </div>

        {/* Modal Konfirmasi Hapus */}
        {showDeleteConfirm && (
          <div style={modalOverlay} onClick={() => setShowDeleteConfirm(null)}>
            <div style={{ ...modalContent, width: 400 }} onClick={(e) => e.stopPropagation()}>
              <div style={{ textAlign: "center", padding: "28px 24px" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "#fee2e2", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <AlertTriangle size={28} color="#ef4444" />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>Hapus Admin?</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 20 }}>
                  Apakah Anda yakin ingin menghapus admin ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button onClick={() => setShowDeleteConfirm(null)} style={modalCancelBtn}>Batal</button>
                  <button onClick={konfirmasiHapus} style={{ ...modalSaveBtn, background: "#ef4444" }}>Ya, Hapus</button>
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

// Style helpers
const labelStyle = {
  display: "block", fontSize: "0.78rem",
  fontWeight: 500, color: "#475569", marginBottom: 6,
};
const inputStyle = {
  width: "100%", padding: "10px 14px",
  border: "1px solid #e2e8f0", borderRadius: 10,
  fontSize: "0.85rem", color: "#1e293b",
  outline: "none", boxSizing: "border-box", background: "white",
};
const btnPrimary = {
  padding: "10px 22px", borderRadius: 10, border: "none",
  background: "#1e3a5f", color: "white",
  fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
};
const btnOutline = {
  padding: "10px 22px", borderRadius: 10,
  border: "1px solid #e2e8f0", background: "white",
  color: "#64748b", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
};
const th = {
  padding: "14px 20px", textAlign: "left",
  fontSize: "0.7rem", fontWeight: 700,
  color: "#94a3b8", letterSpacing: "0.05em",
};
const td = { padding: "14px 20px", verticalAlign: "middle" };
const modalOverlay = {
  position: "fixed", inset: 0,
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(4px)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 1000,
};
const modalContent = {
  background: "white", borderRadius: 24,
  width: 500, maxWidth: "90%",
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
  overflow: "hidden",
};
const modalCancelBtn = {
  padding: "10px 20px", borderRadius: 10,
  border: "1px solid #e2e8f0", background: "white",
  color: "#64748b", fontSize: "0.8rem", cursor: "pointer",
};
const modalSaveBtn = {
  padding: "10px 24px", borderRadius: 10,
  border: "none", background: "#1e3a5f",
  color: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
};