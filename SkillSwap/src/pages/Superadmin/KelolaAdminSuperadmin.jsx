import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const initialAdmins = [
  { id: 1, nama: "Farah Naylul Fauzia",   email: "farahfauzia@student.ub.ac.id",  status: "Aktif" },
  { id: 2, nama: "Amira Salma Nafisa",    email: "amira.nafisa@student.ub.ac.id", status: "Aktif" },
  { id: 3, nama: "Yasmine Shavira Ahmad", email: "yasmineshavira@student.ub.ac.id",   status: "Aktif" },
];

export default function KelolaAdmin() {
  const [admins, setAdmins]         = useState(initialAdmins);
  const [nama, setNama]             = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [editId, setEditId]         = useState(null);
  const [error, setError]           = useState("");
  const [popup, setPopup]           = useState(null);
  const [hapusId, setHapusId]       = useState(null);

  const handleSubmit = () => {
    setError("");
    if (!nama || !email || (!editId && !password)) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (!editId && password !== konfirmasi) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (editId) {
      setAdmins((prev) =>
        prev.map((a) => a.id === editId ? { ...a, nama, email } : a)
      );
      setEditId(null);
      setPopup("edit");
    } else {
      setAdmins((prev) => [
        ...prev,
        { id: Date.now(), nama, email, status: "Aktif" },
      ]);
      setPopup("tambah");
    }
    setNama("");
    setEmail("");
    setPassword("");
    setKonfirmasi("");
  };

  const handleEdit = (admin) => {
    setEditId(admin.id);
    setNama(admin.nama);
    setEmail(admin.email);
    setPassword("");
    setKonfirmasi("");
    setError("");
  };

  const handleHapus = (id) => {
    setHapusId(id);
    setPopup("hapus");
  };

  const konfirmasiHapus = () => {
    setAdmins((prev) => prev.filter((a) => a.id !== hapusId));
    setHapusId(null);
    setPopup(null);
  };

  const handleBatal = () => {
    setEditId(null);
    setNama("");
    setEmail("");
    setPassword("");
    setKonfirmasi("");
    setError("");
  };

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: "#f8f7f4", fontFamily: "'Poppins','Segoe UI',sans-serif",
    }}>
      <Sidebar role="superadmin" active="kelola-admin" />

      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", minWidth: 0 }}>

        {/* Judul */}
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
            Kelola Admin
          </h1>
          <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "4px 0 0" }}>
            Kelola Admin
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: "white", borderRadius: 16,
          padding: "24px 28px", marginBottom: 24,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: 20 }}>
            {editId ? "Edit Admin" : "Tambah Admin Baru"}
          </h2>

          {error && (
            <div style={{
              background: "#fef2f2", color: "#ef4444",
              fontSize: "0.8rem", padding: "10px 14px",
              borderRadius: 8, marginBottom: 16,
              border: "1px solid #fecaca",
            }}>
              {error}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Nama</label>
              <input type="text" placeholder="Masukan nama" value={nama}
                onChange={(e) => setNama(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="nama@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Konfirmasi Password</label>
              <input type="password" placeholder="••••••••" value={konfirmasi}
                onChange={(e) => setKonfirmasi(e.target.value)} style={inputStyle} />
            </div>
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
          background: "white", borderRadius: 16,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={th}>ADMIN</th>
                <th style={th}>EMAIL</th>
                <th style={th}>STATUS</th>
                <th style={{ ...th, textAlign: "center" }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>
                    Belum ada admin terdaftar.
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444", flexShrink: 0 }} />
                        <span style={{ fontWeight: 600, color: "#1e293b" }}>{admin.nama}</span>
                      </div>
                    </td>
                    <td style={{ ...td, color: "#64748b", fontSize: "0.8rem" }}>{admin.email}</td>
                    <td style={td}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        background: "#f0fdf4", color: "#22c55e",
                        fontSize: "0.75rem", fontWeight: 600,
                        padding: "4px 12px", borderRadius: 20,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                        {admin.status}
                      </span>
                    </td>
                    <td style={{ ...td, textAlign: "center" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        <button onClick={() => handleEdit(admin)} style={{
                          padding: "5px 16px", borderRadius: 8,
                          border: "1px solid #22c55e", background: "white",
                          color: "#22c55e", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
                        }}>
                          edit
                        </button>
                        <button onClick={() => handleHapus(admin.id)} style={{
                          padding: "5px 16px", borderRadius: 8,
                          border: "none", background: "#ef4444",
                          color: "white", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
                        }}>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, fontSize: "0.75rem", color: "#94a3b8", paddingBottom: 16 }}>
          © 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.
        </div>

        {/* Popup Tambah */}
        {popup === "tambah" && (
          <div style={overlayStyle}>
            <div style={popupStyle}>
              <div style={iconStyle("#f0fdf4", "#22c55e")}>✓</div>
              <h3 style={popupTitle}>Berhasil!</h3>
              <p style={popupMsg}>Admin berhasil ditambahkan.</p>
              <button onClick={() => setPopup(null)} style={{ ...btnPrimary, width: "100%" }}>OK</button>
            </div>
          </div>
        )}

        {/* Popup Edit */}
        {popup === "edit" && (
          <div style={overlayStyle}>
            <div style={popupStyle}>
              <div style={iconStyle("#eff6ff", "#3b82f6")}>✓</div>
              <h3 style={popupTitle}>Tersimpan!</h3>
              <p style={popupMsg}>Perubahan tersimpan.</p>
              <button onClick={() => setPopup(null)} style={{ ...btnPrimary, width: "100%" }}>OK</button>
            </div>
          </div>
        )}

        {/* Popup Hapus */}
        {popup === "hapus" && (
          <div style={overlayStyle}>
            <div style={popupStyle}>
              <div style={iconStyle("#fef2f2", "#ef4444")}>!</div>
              <h3 style={popupTitle}>Hapus Admin?</h3>
              <p style={popupMsg}>Apakah anda yakin ingin menghapus admin ini?</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setPopup(null); setHapusId(null); }}
                  style={{ ...btnOutline, flex: 1 }}>Batal</button>
                <button onClick={konfirmasiHapus}
                  style={{ ...btnPrimary, flex: 1, background: "#ef4444" }}>Hapus</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Style helpers
const labelStyle = {
  display: "block", fontSize: "0.82rem",
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
  background: "#3b82f6", color: "white",
  fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
};
const btnOutline = {
  padding: "10px 22px", borderRadius: 10,
  border: "1px solid #e2e8f0", background: "white",
  color: "#64748b", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
};
const th = {
  padding: "12px 20px", textAlign: "left",
  fontSize: "0.72rem", fontWeight: 700,
  color: "#94a3b8", letterSpacing: "0.05em",
};
const td = { padding: "14px 20px", verticalAlign: "middle" };
const overlayStyle = {
  position: "fixed", inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 1000,
};
const popupStyle = {
  background: "white", borderRadius: 16,
  padding: "32px 28px", width: 340,
  boxShadow: "0 8px 32px rgba(0,0,0,0.15)", textAlign: "center",
};
const iconStyle = (bg, color) => ({
  width: 52, height: 52, borderRadius: "50%",
  background: bg, color: color,
  fontSize: "1.4rem", fontWeight: 700,
  display: "flex", alignItems: "center", justifyContent: "center",
  margin: "0 auto 16px",
});
const popupTitle = { fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 8px" };
const popupMsg   = { fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px", lineHeight: 1.5 };