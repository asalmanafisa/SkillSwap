import { Link } from 'react-router-dom';

const FloatingChatButton = () => {
  return (
    <Link
      to="/chat"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#234c6a',
        color: 'white',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 1000,
        transition: '0.2s',
        textDecoration: 'none',
        fontSize: '24px'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3d55'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#234c6a'}
    >
      💬
    </Link>
  );
};

export default FloatingChatButton;