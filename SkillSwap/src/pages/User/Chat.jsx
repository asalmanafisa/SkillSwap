import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RatingModal from '../../components/RatingModal';

const Chat = () => {
  const location = useLocation();

  // Data dummy: daftar chat (personal dan grup)
  const [chats, setChats] = useState([
    { id: 1, type: 'personal', name: 'Farah', lastMessage: 'Halo juga', time: '09:05', avatar: 'F', unread: 0 },
    { id: 2, type: 'personal', name: 'Yasmine', lastMessage: 'Halo! Ya tentu saja...', time: '09:05', unread: 2 },
    { id: 3, type: 'personal', name: 'Sekar', lastMessage: 'Halo! Ya tentu saja...', time: '09:05', unread: 0 },
    { id: 4, type: 'group', name: 'Grup UI/UX', lastMessage: 'Halo juga', time: '12:05', memberCount: 4, unread: 1, members: ['Farah', 'Yasmine', 'Sekar', 'Andi'] },
  ]);

  // Pesan per chat
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 'Farah', text: 'Halo juga', time: '12:05', isMe: false },
      { id: 2, sender: 'Saya', text: 'Terima kasih!', time: '12:10', isMe: true },
    ],
    2: [
      { id: 1, sender: 'Yasmine', text: 'Halo! Ya tentu saja...', time: '09:05', isMe: false },
    ],
    3: [
      { id: 1, sender: 'Sekar', text: 'Halo! Ya tentu saja...', time: '09:05', isMe: false },
    ],
    4: [
      { id: 1, sender: 'Farah', text: 'Halo juga', time: '12:05', isMe: false },
      { id: 2, sender: 'Sistem', text: 'Andi bergabung ke grup', time: '12:06', isMe: false, isSystem: true },
    ]
  });

  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState('');
  const [joinGroupId, setJoinGroupId] = useState('');

  // State untuk rating modal
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentRatingPartner, setCurrentRatingPartner] = useState(null);

  // Ambil chatId dari navigasi state (dari notifikasi)
  useEffect(() => {
    const chatId = location.state?.chatId;
    if (chatId && chats.find(c => c.id === chatId)) {
      setSelectedChatId(chatId);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, chats]);

  // Kirim pesan
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Saya',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMsg]
    }));
    // Update last message di daftar chat
    setChats(prev => prev.map(chat => 
      chat.id === selectedChatId ? { ...chat, lastMessage: newMessage, time: newMsg.time } : chat
    ));
    setNewMessage('');
  };

  // Cek rating untuk semua chat personal (bukan grup)
  useEffect(() => {
    if (selectedChatId) {
      const selectedChatObj = chats.find(c => c.id === selectedChatId);
      if (selectedChatObj && selectedChatObj.type === 'personal') {
        const ratedKey = `rated_${selectedChatId}`;
        const hasRated = localStorage.getItem(ratedKey);
        if (!hasRated) {
          // Hitung jumlah pesan dari user (isMe true) di chat ini
          const userMsgCount = messages[selectedChatId]?.filter(m => m.isMe).length || 0;
          if (userMsgCount >= 2) {
            setCurrentRatingPartner({ name: selectedChatObj.name, id: selectedChatId });
            setShowRatingModal(true);
          }
        }
      }
    }
  }, [selectedChatId, messages, chats]);

  const handleRatingSubmit = (ratingData) => {
    console.log(`Rating untuk ${currentRatingPartner.name}:`, ratingData);
    localStorage.setItem(`rated_${currentRatingPartner.id}`, 'true');
    // Bisa tambahkan alert atau notifikasi sukses
  };

  const handleRatingSkip = () => {
    setShowRatingModal(false);
  };

  // Buat grup baru
  const createGroup = () => {
    if (!groupName.trim()) return;
    const membersList = groupMembers.split(',').map(m => m.trim()).filter(m => m);
    const newGroup = {
      id: chats.length + 1,
      type: 'group',
      name: groupName,
      lastMessage: 'Grup baru dibuat',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      memberCount: membersList.length + 1,
      members: ['Saya', ...membersList],
      unread: 0
    };
    setChats(prev => [...prev, newGroup]);
    setMessages(prev => ({ ...prev, [newGroup.id]: [{ id: 1, sender: 'Sistem', text: `Grup "${groupName}" dibuat`, time: newGroup.time, isSystem: true }] }));
    setGroupName('');
    setGroupMembers('');
    setShowGroupModal(false);
    setSelectedChatId(newGroup.id);
  };

  // Gabung grup via prompt
  const joinGroup = () => {
    const groupId = parseInt(prompt('Masukkan ID Grup (angka):'), 10);
    if (isNaN(groupId)) return;
    const group = chats.find(c => c.id === groupId && c.type === 'group');
    if (!group) {
      alert('Grup tidak ditemukan');
      return;
    }
    if (group.members.includes('Saya')) {
      alert('Anda sudah tergabung');
      return;
    }
    setChats(prev => prev.map(chat => 
      chat.id === groupId ? { ...chat, members: [...chat.members, 'Saya'], memberCount: chat.memberCount + 1 } : chat
    ));
    setMessages(prev => ({
      ...prev,
      [groupId]: [...(prev[groupId] || []), { id: Date.now(), sender: 'Sistem', text: 'Saya bergabung ke grup', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isSystem: true }]
    }));
    alert(`Berhasil bergabung ke grup ${group.name}`);
  };

  const selectedChat = chats.find(c => c.id === selectedChatId);
  const currentMessages = messages[selectedChatId] || [];

  return (
    <>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fcf5e8; }
        .chat-root { height: 100vh; display: flex; flex-direction: column; background: #fcf5e8; }
        /* Navbar */
        .navbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 40px; background: white; border-bottom: 1px solid #e5e0d8;
          position: sticky; top:0; z-index:100;
        }
        .logo { display: flex; align-items: center; gap:8px; font-weight:800; color:#234c6a; font-size:18px; text-decoration:none; }
        .logo-icon { width:32px; height:32px; background:#234c6a; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; }
        .nav-links { display: flex; gap: 32px; }
        .nav-link { text-decoration: none; font-size:14px; font-weight:500; color:#4b5563; padding-bottom:4px; }
        .nav-link.active { color:#234c6a; border-bottom:2px solid #234c6a; }
        .nav-link:hover { color:#234c6a; }
        .user-info { display: flex; align-items: center; gap:12px; }
        .avatar { width:32px; height:32px; background:#f5c842; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; color:black; }

        /* Layout dua kolom */
        .chat-container { display: flex; flex: 1; overflow: hidden; max-width: 1400px; margin: 0 auto; width: 100%; }
        .chat-list { width: 320px; background: white; border-right: 1px solid #e5e0d8; display: flex; flex-direction: column; overflow-y: auto; }
        .chat-list-header { padding: 20px; border-bottom: 1px solid #e5e0d8; display: flex; justify-content: space-between; align-items: center; }
        .chat-list-header h2 { font-size: 18px; }
        .group-actions { display: flex; gap: 8px; }
        .group-btn { background: #234c6a; color: white; border: none; padding: 4px 8px; border-radius: 8px; font-size: 12px; cursor: pointer; }
        .chat-item { display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; border-bottom: 1px solid #f0f0f0; transition: 0.2s; }
        .chat-item:hover { background: #fcf5e8; }
        .chat-item.active { background: #f0f4f8; border-left: 3px solid #234c6a; }
        .chat-avatar { width: 48px; height: 48px; border-radius: 50%; background: #234c6a; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
        .group-avatar { background: #f5c842; color: black; }
        .chat-info { flex: 1; }
        .chat-name { font-weight: 600; display: flex; justify-content: space-between; }
        .chat-last { font-size: 12px; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 180px; }
        .chat-time { font-size: 10px; color: #9ca3af; }
        .unread { background: #ef4444; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; margin-left: 8px; }

        /* Chatbox */
        .chatbox { flex: 1; display: flex; flex-direction: column; background: #fcf5e8; }
        .chat-header { padding: 16px 24px; background: white; border-bottom: 1px solid #e5e0d8; display: flex; justify-content: space-between; align-items: center; }
        .chat-header h3 { margin: 0; }
        .chat-header p { font-size: 12px; color: #6b7280; margin-top: 4px; }
        .messages-area { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .message { display: flex; flex-direction: column; max-width: 70%; }
        .message-mine { align-self: flex-end; background: #234c6a; color: white; border-radius: 18px 18px 4px 18px; padding: 8px 14px; }
        .message-other { align-self: flex-start; background: white; border: 1px solid #e5e0d8; border-radius: 18px 18px 18px 4px; padding: 8px 14px; }
        .message-system { align-self: center; background: #f3f4f6; color: #6b7280; font-size: 12px; padding: 4px 12px; border-radius: 20px; max-width: 80%; text-align: center; }
        .message-sender { font-size: 11px; font-weight: bold; margin-bottom: 4px; }
        .message-time { font-size: 10px; margin-top: 4px; opacity: 0.7; text-align: right; }
        .input-area { display: flex; gap: 12px; padding: 16px 24px; background: white; border-top: 1px solid #e5e0d8; }
        .input-area input { flex: 1; padding: 12px 16px; border: 1px solid #e5e0d8; border-radius: 30px; outline: none; }
        .input-area button { background: #234c6a; color: white; border: none; padding: 0 24px; border-radius: 30px; cursor: pointer; }

        /* Modal grup */
        .modal { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; }
        .modal-content { background: white; border-radius: 24px; padding: 24px; width: 400px; max-width: 90%; }
        .modal-content h3 { margin-bottom: 16px; }
        .modal-content input, .modal-content textarea { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #e5e0d8; border-radius: 12px; }
        .modal-buttons { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }
        .modal-buttons button { padding: 8px 16px; border-radius: 30px; cursor: pointer; }
        .modal-buttons button:first-child { background: #e5e0d8; border: none; }
        .modal-buttons button:last-child { background: #234c6a; color: white; border: none; }

        /* Rating modal */
        .rating-modal-overlay {
          position: fixed; top:0; left:0; width:100%; height:100%;
          background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .rating-modal {
          background: white; border-radius: 24px; padding: 32px; width: 400px; max-width: 90%;
          text-align: center;
        }
        .rating-stars { margin: 16px 0; }
        .rating-stars span { font-size: 32px; cursor: pointer; transition: 0.1s; }
        .rating-modal textarea { width: 100%; padding: 12px; border: 1px solid #e5e0d8; border-radius: 12px; margin: 16px 0; resize: vertical; font-family: inherit; }
        .rating-buttons { display: flex; justify-content: center; gap: 16px; margin: 16px 0; }
        .rating-buttons button { padding: 8px 24px; border-radius: 30px; cursor: pointer; font-weight: 600; }
        .btn-secondary { background: #e5e0d8; border: none; }
        .btn-primary { background: #234c6a; color: white; border: none; }
        .rating-note { font-size: 12px; color: #6b7280; }

        @media (max-width: 768px) {
          .navbar { padding: 12px 20px; flex-wrap: wrap; }
          .nav-links { order: 3; width: 100%; justify-content: center; margin-top: 12px; gap: 24px; }
          .chat-list { width: 100px; }
          .chat-info { display: none; }
          .chat-avatar { width: 40px; height: 40px; }
        }
      `}</style>

      <div className="chat-root">
        <div className="navbar">
          <Link to="/beranda" className="logo"><div className="logo-icon">S</div>SkillSwap</Link>
          <div className="nav-links">
            <Link to="/beranda" className="nav-link">Beranda</Link>
            <Link to="/temukan" className="nav-link">Temukan</Link>
            <Link to="/notifikasi" className="nav-link">Notifikasi</Link>
            <Link to="/chat" className="nav-link active">Chat</Link>
            <Link to="/profil" className="nav-link">Profil</Link>
          </div>
          <div className="user-info"><div className="avatar">U</div><span>User</span></div>
        </div>

        <div className="chat-container">
          {/* Daftar chat */}
          <div className="chat-list">
            <div className="chat-list-header">
              <h2>Pesan</h2>
              <div className="group-actions">
                <button className="group-btn" onClick={() => setShowGroupModal(true)}>Buat Grup</button>
                <button className="group-btn" onClick={joinGroup}>Gabung Grup</button>
              </div>
            </div>
            {chats.map(chat => (
              <div key={chat.id} className={`chat-item ${selectedChatId === chat.id ? 'active' : ''}`} onClick={() => setSelectedChatId(chat.id)}>
                <div className={`chat-avatar ${chat.type === 'group' ? 'group-avatar' : ''}`}>{chat.type === 'group' ? '👥' : chat.avatar}</div>
                <div className="chat-info">
                  <div className="chat-name">{chat.name} {chat.type === 'group' && <span style={{fontSize:'10px', color:'#6b7280'}}>({chat.memberCount})</span>}</div>
                  <div className="chat-last">{chat.lastMessage}</div>
                  <div className="chat-time">{chat.time}</div>
                </div>
                {chat.unread > 0 && <span className="unread">{chat.unread}</span>}
              </div>
            ))}
          </div>

          {/* Chatbox */}
          <div className="chatbox">
            {selectedChat ? (
              <>
                <div className="chat-header">
                  <div>
                    <h3>{selectedChat.name}</h3>
                    {selectedChat.type === 'group' && <p>{selectedChat.memberCount} anggota</p>}
                  </div>
                </div>
                <div className="messages-area">
                  {currentMessages.map(msg => (
                    <div key={msg.id} className={msg.isSystem ? 'message-system' : (msg.isMe ? 'message message-mine' : 'message message-other')}>
                      {!msg.isSystem && !msg.isMe && <div className="message-sender">{msg.sender}</div>}
                      <div>{msg.text}</div>
                      <div className="message-time">{msg.time}</div>
                    </div>
                  ))}
                </div>
                <div className="input-area">
                  <input type="text" placeholder="Tulis pesan..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
                  <button onClick={sendMessage}>Kirim</button>
                </div>
              </>
            ) : (
              <div style={{textAlign:'center', marginTop:'40px'}}>Pilih chat untuk memulai percakapan</div>
            )}
          </div>
        </div>

        {/* Modal Buat Grup */}
        {showGroupModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Buat Grup Baru</h3>
              <input type="text" placeholder="Nama Grup" value={groupName} onChange={e => setGroupName(e.target.value)} />
              <textarea placeholder="Anggota (pisahkan dengan koma): Farah, Yasmine" value={groupMembers} onChange={e => setGroupMembers(e.target.value)} rows={3} />
              <div className="modal-buttons">
                <button onClick={() => setShowGroupModal(false)}>Batal</button>
                <button onClick={createGroup}>Buat</button>
              </div>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && currentRatingPartner && (
          <RatingModal 
            partnerName={currentRatingPartner.name}
            onSubmit={handleRatingSubmit}
            onSkip={handleRatingSkip}
          />
        )}
      </div>
    </>
  );
};

export default Chat;