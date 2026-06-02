// src/pages/User/Notifikasi.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FloatingChatButton from '../../components/FloatingChatButton';
import { users } from '../../utils/dummyData';

const Notifikasi = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Semua');
  const [notifications, setNotifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fungsi untuk trigger update badge di navbar
  const triggerNavbarUpdate = () => {
    window.dispatchEvent(new Event('notifications-updated'));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser({ name: 'Pengguna', id: 0 });
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('allNotifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      const defaultNotif = [
        { id: 1, type: 'request', fromUserId: 1, fromName: users[1]?.name || 'Farah', toUserId: 0, action: 'ingin belajar React denganmu', status: 'pending', time: '2 menit lalu', read: false },
        { id: 2, type: 'request', fromUserId: 2, fromName: users[2]?.name || 'Yasmine', toUserId: 0, action: 'ingin bertukar skill UI/UX', status: 'pending', time: '1 jam lalu', read: false },
        { id: 3, type: 'rating', fromUserId: 2, fromName: users[2]?.name || 'Yasmine', rating: 5, skill: 'React', time: '2 jam lalu', read: false },
        { id: 4, type: 'message', fromUserId: 3, fromName: users[3]?.name || 'Sekar', message: 'Halo, apakah kamu tertarik belajar Python bersama?', time: '5 jam lalu', read: false },
      ];
      setNotifications(defaultNotif);
      localStorage.setItem('allNotifications', JSON.stringify(defaultNotif));
    }
  }, []);

  useEffect(() => {
    if (notifications.length) {
      localStorage.setItem('allNotifications', JSON.stringify(notifications));
      triggerNavbarUpdate(); // Trigger update badge setiap ada perubahan
    }
  }, [notifications]);

  const getAvatarColor = (name) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const Avatar = ({ name, size = 'w-10 h-10' }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    const bgColor = getAvatarColor(name);
    return (
      <div className={`${size} rounded-full ${bgColor} flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0`}>
        {initial}
      </div>
    );
  };

  const ChatIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const openModal = (id, type) => {
    setPendingAction({ id, type });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPendingAction(null);
  };

  const confirmAction = () => {
    if (!pendingAction) return;
    const { id, type } = pendingAction;
    const targetNotif = notifications.find(n => n.id === id);
    
    if (type === 'accept') {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id && notif.type === 'request' && notif.status === 'pending'
            ? { ...notif, status: 'accepted', action: 'telah menerima request belajarmu' }
            : notif
        )
      );
      
      if (targetNotif) {
        const acceptedNotif = {
          id: Date.now(),
          type: 'request',
          fromUserId: 0,
          fromName: currentUser?.name || 'Saya',
          toUserId: targetNotif.fromUserId,
          toName: targetNotif.fromName,
          action: 'telah menerima request belajarmu',
          status: 'accepted',
          time: 'baru saja',
          read: false
        };
        
        const existing = JSON.parse(localStorage.getItem('allNotifications') || '[]');
        existing.unshift(acceptedNotif);
        localStorage.setItem('allNotifications', JSON.stringify(existing));
        triggerNavbarUpdate(); // Update badge setelah update storage
      }
    } else {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id && notif.type === 'request' && notif.status === 'pending'
            ? { ...notif, status: 'rejected' }
            : notif
        )
      );
    }
    closeModal();
  };

  const goToChat = (userId) => {
    navigate('/chat', { state: { chatId: userId } });
  };

  const goToProfil = (userId) => {
    navigate(`/profil/${userId}`);
  };

  const filteredNotif = notifications.filter(notif => {
    if (filter === 'Semua') return true;
    if (filter === 'Request') return notif.type === 'request';
    if (filter === 'Rating') return notif.type === 'rating';
    if (filter === 'Pesan') return notif.type === 'message';
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      );
      // Trigger update badge setelah mark as read
      setTimeout(() => triggerNavbarUpdate(), 0);
      return updated;
    });
  };

  const renderNotifItem = (notif) => {
    switch (notif.type) {
      case 'request':
        const isFromMe = notif.fromUserId === 0;
        
        if (isFromMe) {
          const partnerRole = users[notif.toUserId]?.role || 'skill';
          const partnerName = notif.toName || 'partner';
          
          return (
            <div key={notif.id} className={`bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-4 mb-3 flex items-center gap-4 transition hover:shadow-md ${!notif.read ? 'bg-blue-50/30 border-l-4 border-l-[#234c6a]' : ''}`}>
              <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => { markAsRead(notif.id); }}>
                <Avatar name={notif.fromName} size="w-10 h-10" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <strong className="font-semibold">{currentUser?.name || 'Anda'}</strong> ingin belajar <strong>{partnerRole}</strong> dengan <strong>{partnerName}</strong>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </div>
              
              {notif.status === 'pending' && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center gap-1">
                  ⏳ Menunggu Konfirmasi
                </span>
              )}
              {notif.status === 'accepted' && (
                <div className="flex gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                    ✓ Diterima
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); goToChat(notif.toUserId); }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f5c842] text-black hover:bg-[#e5b830] transition flex items-center gap-1"
                  >
                    <ChatIcon /> Mulai Chat
                  </button>
                </div>
              )}
              {notif.status === 'rejected' && (
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">✗ Ditolak</span>
              )}
            </div>
          );
        }
        
        return (
          <div key={notif.id} className={`bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-4 mb-3 flex items-center gap-4 transition hover:shadow-md ${!notif.read ? 'bg-blue-50/30 border-l-4 border-l-[#234c6a]' : ''}`}>
            <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => { markAsRead(notif.id); goToProfil(notif.fromUserId); }}>
              <Avatar name={notif.fromName} size="w-10 h-10" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <strong className="font-semibold">{notif.fromName}</strong> {notif.action}
                </p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            </div>
            
            {notif.status === 'pending' && (
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-red-400 text-red-500 bg-white hover:bg-red-50" onClick={(e) => { e.stopPropagation(); openModal(notif.id, 'reject'); }}>Tolak</button>
                <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#234c6a] text-white hover:bg-[#1a3d55]" onClick={(e) => { e.stopPropagation(); openModal(notif.id, 'accept'); }}>Terima</button>
              </div>
            )}
            {notif.status === 'accepted' && (
              <div className="flex gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">✓ Diterima</span>
                <button onClick={(e) => { e.stopPropagation(); goToChat(notif.fromUserId); }} className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f5c842] text-black hover:bg-[#e5b830] transition flex items-center gap-1"><ChatIcon /> Mulai Chat</button>
              </div>
            )}
            {notif.status === 'rejected' && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">✗ Ditolak</span>
            )}
          </div>
        );
        
      case 'rating':
        return (
          <Link to={`/profil/${notif.fromUserId}`} key={notif.id} className={`bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-4 mb-3 flex items-center gap-4 transition hover:shadow-md cursor-pointer ${!notif.read ? 'bg-blue-50/30 border-l-4 border-l-[#234c6a]' : ''}`} onClick={() => markAsRead(notif.id)} style={{ textDecoration: 'none', display: 'flex' }}>
            <Avatar name={notif.fromName} size="w-10 h-10" />
            <div className="flex-1">
              <p className="text-sm text-gray-800"><strong className="font-semibold">{notif.fromName}</strong> memberi rating {notif.rating}★ untuk sesi <strong className="font-semibold">{notif.skill}</strong></p>
              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
            </div>
          </Link>
        );
        
      case 'message':
        return (
          <div key={notif.id} className={`bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-4 mb-3 flex items-center gap-4 transition hover:shadow-md cursor-pointer ${!notif.read ? 'bg-blue-50/30 border-l-4 border-l-[#234c6a]' : ''}`} onClick={() => { markAsRead(notif.id); goToChat(notif.fromUserId); }}>
            <Avatar name={notif.fromName} size="w-10 h-10" />
            <div className="flex-1">
              <p className="text-sm text-gray-800"><strong className="font-semibold">{notif.fromName}</strong>: {notif.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
            </div>
          </div>
        );
        
      default: 
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins'", backgroundColor: '#fcf5e8' }}>
      <div className="flex-1 max-w-3xl mx-auto w-full px-5 py-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center">Notifikasi</h1>
        <p className="text-gray-500 text-center mt-2 mb-8 text-base">Semua aktivitas terbaru Anda</p>
        
        <div className="flex justify-center gap-6 border-b border-[#e5e0d8] mb-6">
          {['Semua', 'Request', 'Rating', 'Pesan'].map(tab => (
            <button key={tab} className={`pb-2 text-sm font-medium transition ${filter === tab ? 'text-[#234c6a] border-b-2 border-[#234c6a]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setFilter(tab)}>
              {tab}
            </button>
          ))}
        </div>
        
        {filteredNotif.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-8 text-center text-gray-500 text-base">
            Tidak ada notifikasi.
          </div>
        ) : (
          filteredNotif.map(notif => renderNotifItem(notif))
        )}
      </div>
      
      <FloatingChatButton />

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#fcf5e8] flex items-center justify-center text-2xl mb-3">
                {pendingAction?.type === 'accept' ? '✅' : '❌'}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Konfirmasi</h3>
              <p className="text-gray-500 text-sm mt-1 text-base">
                Apakah Anda yakin ingin {pendingAction?.type === 'accept' ? 'menerima' : 'menolak'} request ini?
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={closeModal} className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">Batal</button>
              <button onClick={confirmAction} className="flex-1 py-2 rounded-lg bg-[#234c6a] text-white hover:bg-[#1a3d55] transition">Ya, {pendingAction?.type === 'accept' ? 'Terima' : 'Tolak'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifikasi;