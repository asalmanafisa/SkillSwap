import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  BarChart2,
  LogOut,
} from "lucide-react";

const menuItems = {
  superadmin: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/superadmin/dashboard", key: "dashboard" },
    { label: "Kelola User", icon: Users, path: "/superadmin/kelola-user", key: "kelola-user" },
    { label: "Kelola Admin", icon: Shield, path: "/superadmin/kelola-admin", key: "kelola-admin" },
    { label: "Laporan", icon: FileText, path: "/superadmin/laporan", key: "laporan"},
    { label: "Statistik", icon: BarChart2, path: "/superadmin/statistik", key: "statistik" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard", key: "dashboard" },
    { label: "Kelola User", icon: Users, path: "/admin/kelola-user", key: "kelola-user" },
    { label: "Laporan", icon: FileText, path: "/admin/laporan", key: "laporan" },
  ],
};

export default function Sidebar({ role = "superadmin", active = "dashboard" }) {
  const items = menuItems[role] || menuItems.superadmin;
  const [showLogout, setShowLogout] = useState(false);

  return (
    <aside className="sidebar">
      {/* Brand / Logo */}
      <div className="sidebar-brand">
        <div className="brand-logo">SS</div>
        <span className="brand-name">SkillSwap</span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">MENU</div>
        <ul className="nav-list">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="nav-section-label" style={{ marginTop: 24 }}>LAINNYA</div>
        <ul className="nav-list">
          <li>
            <button
            onClick={() => setShowLogout(true)}
            className="nav-item nav-item-logout"
            style={{ background: "none", border: "none", width: "100%", cursor: "pointer" }}
          >
           <LogOut size={18} />
         <span>Keluar</span>
          </button>
          </li>
        </ul>
      </nav>

      <style>{`
        .sidebar {
          width: 200px;
          min-height: 100vh;
          background: white;
          border-right: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          padding: 24px 0;
          flex-shrink: 0;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 20px 28px;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 16px;
        }
        .brand-logo {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #1e293b;
        }
        .sidebar-nav {
          flex: 1;
          padding: 0 12px;
        }
        .nav-section-label {
          font-size: 0.68rem;
          font-weight: 600;
          color: #cbd5e1;
          letter-spacing: 0.08em;
          padding: 0 8px;
          margin-bottom: 6px;
        }
        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0 0 8px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: #64748b;
          font-size: 0.87rem;
          font-weight: 500;
          transition: all 0.15s;
        }
        .nav-item:hover {
          background: #f8fafc;
          color: #1e293b;
        }
        .nav-item-active {
          background: #eff6ff !important;
          color: #3b82f6 !important;
          font-weight: 600;
        }
        .nav-item-logout { color: #ef4444; }
        .nav-item-logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }
        .nav-badge {
          margin-left: auto;
          background: #ef4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      {/* Popup Konfirmasi Keluar */}
      {showLogout && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "white", borderRadius: 16,
            padding: "28px 24px", width: 320,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}>
            {/* Icon */}
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "#fef2f2",
              fontSize: "1.4rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              👋
            </div>

            <h3 style={{
              fontSize: "1rem", fontWeight: 700,
              color: "#0f172a", margin: "0 0 8px",
            }}>
              Keluar?
            </h3>
            <p style={{
              fontSize: "0.82rem", color: "#64748b",
              margin: "0 0 22px", lineHeight: 1.5,
            }}>
              Apakah anda yakin ingin keluar?
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowLogout(false)}
                style={{
                  flex: 1, padding: "10px",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0", background: "white",
                  color: "#64748b", fontSize: "0.85rem",
                  fontWeight: 500, cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  window.location.href = "/superadmin/login";
                }}
                style={{
                  flex: 1, padding: "10px",
                  borderRadius: 10, border: "none",
                  background: "#ef4444", color: "white",
                  fontSize: "0.85rem", fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

    </aside>
  );
}