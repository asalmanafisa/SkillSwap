// src/components/FloatingChatButton.jsx
import { Link } from 'react-router-dom';

const FloatingChatButton = () => {
  return (
    <Link
      to="/chat"
      className="fixed bottom-6 right-6 bg-[#234c6a] text-white p-4 rounded-full shadow-lg hover:bg-[#1a3d55] transition-all duration-300 z-50 group"
    >
      <svg
        className="w-6 h-6 group-hover:scale-110 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </Link>
  );
};

export default FloatingChatButton;