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
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3d55'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#234c6a'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </Link>
  );
};

export default FloatingChatButton;