import { Link, useLocation } from 'react-router-dom';
<Link to="/profil" className="nav-link">Profil</Link>

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Beranda', path: '/beranda' },
    { name: 'Temukan', path: '/temukan' },
    { name: 'Notifikasi', path: '/notifikasi' },
    { name: 'Profil', path: '/profil' },
  ];

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 40px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e0d8',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Link to="/beranda" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '32px', height: '32px', background: '#234c6a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>S</div>
        <span style={{ fontWeight: 'extrabold', color: '#234c6a', fontSize: '18px' }}>SkillSwap</span>
      </Link>

      <div style={{ display: 'flex', gap: '32px' }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              fontSize: '14px',
              fontWeight: 'medium',
              color: location.pathname === item.path ? '#234c6a' : '#4b5563',
              borderBottom: location.pathname === item.path ? '2px solid #234c6a' : 'none',
              paddingBottom: '4px',
              textDecoration: 'none'
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5c842', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>U</div>
        <span style={{ fontSize: '14px', fontWeight: 'medium', color: '#374151' }}>User</span>
      </div>
    </nav>
  );
};

export default Navbar;