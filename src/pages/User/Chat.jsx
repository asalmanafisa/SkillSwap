// src/pages/User/Chat.jsx
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { users } from '../../utils/dummyData';

const STORAGE_CHATS = 'user_chats';
const STORAGE_MESSAGES = 'user_messages';
const STORAGE_GROUPS = 'user_groups';
const STORAGE_NOTIFICATIONS = 'allNotifications';
const STORAGE_ACTIVITIES = 'beranda_activities';

const Chat = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [showGroupDetailModal, setShowGroupDetailModal] = useState(false);
  const [showThreeDotsMenu, setShowThreeDotsMenu] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  
  // Form states
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupPhoto, setGroupPhoto] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [joinCode, setJoinCode] = useState('');
  const [groupCodeError, setGroupCodeError] = useState('');
  
  const threeDotsRef = useRef(null);
  const attachmentRef = useRef(null);
  const fileInputRef = useRef(null);
  const [attachmentType, setAttachmentType] = useState('');

  // Rating state
  const [showInlineRating, setShowInlineRating] = useState(false);
  const [inlineRatingPartner, setInlineRatingPartner] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);
  const [ratingReview, setRatingReview] = useState('');
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);
  const [ratedPartnerName, setRatedPartnerName] = useState('');

  // Fungsi untuk menambah notifikasi
  const addNotification = (notification) => {
    const stored = localStorage.getItem(STORAGE_NOTIFICATIONS);
    const notifications = stored ? JSON.parse(stored) : [];
    notifications.unshift(notification);
    localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(notifications));
  };

  // Fungsi untuk menambah aktivitas di Beranda
  const addActivity = (activity) => {
    const stored = localStorage.getItem(STORAGE_ACTIVITIES);
    const activities = stored ? JSON.parse(stored) : [];
    activities.unshift(activity);
    localStorage.setItem(STORAGE_ACTIVITIES, JSON.stringify(activities));
  };

  // Custom notification modal
  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotificationModal(true);
    setTimeout(() => {
      setShowNotificationModal(false);
    }, 3000);
  };

  // Generate kode grup 6 digit
  const generateGroupCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  // Tutup menu member saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.member-menu') && !event.target.closest('.member-menu-button')) {
        document.querySelectorAll('.member-menu').forEach(menu => {
          menu.classList.add('hidden');
        });
      }
      if (threeDotsRef.current && !threeDotsRef.current.contains(event.target)) {
        setShowThreeDotsMenu(false);
      }
      if (attachmentRef.current && !attachmentRef.current.contains(event.target)) {
        setShowAttachmentMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Load data awal
  useEffect(() => {
    const storedChats = localStorage.getItem(STORAGE_CHATS);
    const storedMessages = localStorage.getItem(STORAGE_MESSAGES);
    let initialChats = [];
    let initialMessages = {};

    if (storedChats) {
      initialChats = JSON.parse(storedChats);
    } else {
      Object.values(users).forEach(user => {
        if (user.id !== 0) {
          initialChats.push({
            id: user.id,
            type: 'personal',
            name: user.name,
            lastMessage: 'Mulai percakapan...',
            time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
            avatar: user.name.charAt(0),
            unread: 0,
            online: true,
            lastSeen: null,
            rated: false
          });
        }
      });
      localStorage.setItem(STORAGE_CHATS, JSON.stringify(initialChats));
    }

    if (storedMessages) {
      initialMessages = JSON.parse(storedMessages);
    } else {
      const now = new Date();
      initialMessages = {
        1: [
          { id: 1, sender: 'Farah', text: 'Halo, apakah kamu bisa mengajarkan React?', time: new Date(now.getTime() - 2*60*60*1000).toISOString(), isMe: false, status: 'read' },
          { id: 2, sender: 'Saya', text: 'Tentu, saya bisa. Ada materi spesifik?', time: new Date(now.getTime() - 1.5*60*60*1000).toISOString(), isMe: true, status: 'read' },
          { id: 3, sender: 'Farah', text: 'Saya ingin belajar hooks dan context', time: new Date(now.getTime() - 1*60*60*1000).toISOString(), isMe: false, status: 'read' },
        ],
        2: [
          { id: 1, sender: 'Yasmine', text: 'Hi, saya tertarik dengan skill UI/UX-mu', time: new Date(now.getTime() - 3*60*60*1000).toISOString(), isMe: false, status: 'read' },
          { id: 2, sender: 'Saya', text: 'Senang mendengarnya! Mulai kapan?', time: new Date(now.getTime() - 2.5*60*60*1000).toISOString(), isMe: true, status: 'read' },
        ],
        3: [
          { id: 1, sender: 'Sekar', text: 'Halo, apakah kamu tertarik belajar Python bersama?', time: new Date(now.getTime() - 24*60*60*1000).toISOString(), isMe: false, status: 'read' },
        ],
        4: [
          { id: 1, sender: 'Tabina', text: 'Halo, saya tertarik belajar data analysis denganmu!', time: new Date(now.getTime() - 5*60*60*1000).toISOString(), isMe: false, status: 'read' },
        ],
      };
      localStorage.setItem(STORAGE_MESSAGES, JSON.stringify(initialMessages));
    }

    const storedGroups = localStorage.getItem(STORAGE_GROUPS);
    if (storedGroups) {
      const groups = JSON.parse(storedGroups);
      groups.forEach(group => {
        if (!initialChats.find(c => c.id === group.id)) {
          initialChats.unshift(group);
        }
        if (!initialMessages[group.id]) {
          initialMessages[group.id] = [
            { id: 1, sender: '', text: `Grup "${group.name}" dibuat`, time: new Date().toISOString(), isSystem: true }
          ];
        }
      });
    }

    setChats(initialChats);
    setMessages(initialMessages);
    setIsLoading(false);
  }, []);

  // Simpan ke localStorage
  useEffect(() => {
    if (chats.length) localStorage.setItem(STORAGE_CHATS, JSON.stringify(chats));
  }, [chats]);
  useEffect(() => {
    if (Object.keys(messages).length) localStorage.setItem(STORAGE_MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // Set selected chat dari URL
  useEffect(() => {
    if (isLoading) return;
    
    let targetChatId = null;
    if (id) {
      const parsedId = parseInt(id);
      if (chats.find(c => c.id === parsedId)) targetChatId = parsedId;
    }
    if (!targetChatId && location.state?.chatId) {
      if (chats.find(c => c.id === location.state.chatId)) targetChatId = location.state.chatId;
    }
    if (!targetChatId && chats.length > 0 && !selectedChatId) targetChatId = chats[0].id;
    if (targetChatId && targetChatId !== selectedChatId) setSelectedChatId(targetChatId);
  }, [id, location.state, chats, isLoading, selectedChatId]);

  // Reset unread saat chat dibuka
  useEffect(() => {
    if (selectedChatId) {
      setChats(prev => prev.map(chat => chat.id === selectedChatId ? { ...chat, unread: 0 } : chat));
    }
  }, [selectedChatId]);

  const getDateLabel = (msgDate) => {
    const today = new Date().setHours(0,0,0,0);
    const yesterday = new Date(today - 86400000);
    const msgDay = new Date(msgDate).setHours(0,0,0,0);
    if (msgDay === today) return 'Hari ini';
    if (msgDay === yesterday) return 'Kemarin';
    return new Date(msgDate).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
  };

  const groupMessagesByDate = (msgs) => {
    const groups = [];
    let currentDate = null;
    msgs.forEach(msg => {
      const dateLabel = getDateLabel(msg.time);
      if (dateLabel !== currentDate) {
        currentDate = dateLabel;
        groups.push({ type: 'date', label: dateLabel });
      }
      groups.push(msg);
    });
    return groups;
  };

  const handleFileUpload = (type) => {
    setAttachmentType(type);
    fileInputRef.current?.click();
    setShowAttachmentMenu(false);
  };

  const onFileSelected = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showNotification('Ukuran file maksimal 10 MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      sendMessageWithFile({
        type: attachmentType,
        name: file.name,
        url: ev.target.result
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const sendMessageWithFile = (fileData) => {
    const now = new Date().toISOString();
    const tempId = Date.now();
    
    const newMsg = {
      id: tempId,
      sender: 'Saya',
      text: `📎 ${fileData.name}`,
      time: now,
      isMe: true,
      status: 'sending',
      attachment: { type: fileData.type, url: fileData.url, name: fileData.name }
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMsg]
    }));
    
    setChats(prev => {
      const updatedChats = prev.map(chat => 
        chat.id === selectedChatId 
          ? { ...chat, lastMessage: `📎 ${fileData.name}`, time: new Date(now).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) } 
          : chat
      );
      const sortedChats = [...updatedChats];
      const chatIndex = sortedChats.findIndex(c => c.id === selectedChatId);
      if (chatIndex > -1) {
        const [movedChat] = sortedChats.splice(chatIndex, 1);
        sortedChats.unshift(movedChat);
      }
      return sortedChats;
    });
    
    // Simulasi status sent
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedChatId]: prev[selectedChatId].map(msg =>
          msg.id === tempId ? { ...msg, status: 'sent' } : msg
        )
      }));
    }, 500);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const now = new Date().toISOString();
    const tempId = Date.now();
    const messageText = newMessage;
    const selectedChatObj = chats.find(c => c.id === selectedChatId);
    
    const newMsg = {
      id: tempId,
      sender: 'Saya',
      text: messageText,
      time: now,
      isMe: true,
      status: 'sending'
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMsg]
    }));
    
    setChats(prev => {
      const updatedChats = prev.map(chat => 
        chat.id === selectedChatId 
          ? { ...chat, lastMessage: messageText, time: new Date(now).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) } 
          : chat
      );
      const sortedChats = [...updatedChats];
      const chatIndex = sortedChats.findIndex(c => c.id === selectedChatId);
      if (chatIndex > -1) {
        const [movedChat] = sortedChats.splice(chatIndex, 1);
        sortedChats.unshift(movedChat);
      }
      return sortedChats;
    });
    
    setNewMessage('');
    
    // Simulasi status sent
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedChatId]: prev[selectedChatId].map(msg =>
          msg.id === tempId ? { ...msg, status: 'sent' } : msg
        )
      }));
      
      // Simulasi status read untuk personal chat
      if (selectedChatObj && selectedChatObj.type === 'personal') {
        setTimeout(() => {
          setMessages(prev => ({
            ...prev,
            [selectedChatId]: prev[selectedChatId].map(msg =>
              msg.id === tempId ? { ...msg, status: 'read' } : msg
            )
          }));
        }, 2000);
      }
    }, 500);
    
    // Trigger rating setelah 3 pesan berturut-turut (bukan 2)
    if (selectedChatObj && selectedChatObj.type === 'personal') {
      const userMsgCount = (messages[selectedChatId]?.filter(m => m.isMe && !m.isSystem).length || 0) + 1;
      const ratedKey = `rated_${selectedChatId}`;
      const hasRated = localStorage.getItem(ratedKey);
      if (userMsgCount === 3 && !hasRated && !showInlineRating) {
        setTimeout(() => {
          setInlineRatingPartner(selectedChatObj);
          setShowInlineRating(true);
        }, 1000);
      }
    }
    
    // Tambah notifikasi dan aktivitas untuk pesan baru
    if (selectedChatObj && selectedChatObj.type === 'personal') {
      addNotification({
        id: Date.now(),
        type: 'message',
        fromUserId: selectedChatId,
        fromName: selectedChatObj.name,
        message: messageText.substring(0, 50),
        time: 'baru saja',
        read: false
      });
      
      addActivity({
        id: Date.now(),
        type: 'message',
        text: `Pesan baru dari ${selectedChatObj.name}`,
        time: 'baru saja',
        isNew: true
      });
    }
  };

  // Fungsi navigasi ke profil
  const goToProfile = (userId) => {
    navigate(`/profil/${userId}`);
  };

  // ========== FUNGSI GRUP ==========
  const toggleMember = (userId) => {
    setSelectedMembers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleGroupPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setGroupPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const createGroup = () => {
    if (!groupName.trim()) {
      showNotification('Nama grup harus diisi', 'error');
      return;
    }
    if (selectedMembers.length === 0) {
      showNotification('Pilih minimal 1 anggota', 'error');
      return;
    }

    const newGroupId = Date.now();
    const groupCode = generateGroupCode();
    const currentUser = { id: 0, name: 'Saya', isAdmin: true };
    const membersList = [currentUser, ...selectedMembers.map(id => ({ id, name: users[id]?.name || `User ${id}`, isAdmin: false }))];

    const newGroup = {
      id: newGroupId, type: 'group', name: groupName, description: groupDescription, photo: groupPhoto,
      code: groupCode, lastMessage: 'Grup baru dibuat', time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
      memberCount: membersList.length, members: membersList, unread: 0, avatar: groupPhoto || '👥', createdBy: 0
    };

    setChats(prev => [newGroup, ...prev]);
    setMessages(prev => ({ ...prev, [newGroupId]: [{ id: 1, sender: '', text: `Grup "${groupName}" dibuat dengan kode: ${groupCode}`, time: new Date().toISOString(), isSystem: true }] }));

    const storedGroups = localStorage.getItem(STORAGE_GROUPS);
    const groups = storedGroups ? JSON.parse(storedGroups) : [];
    groups.push(newGroup);
    localStorage.setItem(STORAGE_GROUPS, JSON.stringify(groups));

    setGroupName(''); setGroupDescription(''); setGroupPhoto(''); setSelectedMembers([]);
    setShowGroupModal(false); setSelectedChatId(newGroupId); setShowThreeDotsMenu(false);
    showNotification(`Grup "${groupName}" berhasil dibuat! Kode grup: ${groupCode}`, 'success');
  };

  const joinGroupWithCode = () => {
    if (!joinCode.trim()) {
      setGroupCodeError('Masukkan kode grup');
      return;
    }
    const storedGroups = localStorage.getItem(STORAGE_GROUPS);
    const groups = storedGroups ? JSON.parse(storedGroups) : [];
    const targetGroup = groups.find(g => g.code === joinCode.toUpperCase());

    if (!targetGroup) {
      setGroupCodeError('Kode grup tidak ditemukan');
      showNotification('Kode grup tidak ditemukan', 'error');
      return;
    }
    if (chats.find(c => c.id === targetGroup.id)) {
      setGroupCodeError('Anda sudah tergabung');
      showNotification('Anda sudah tergabung dalam grup ini', 'error');
      return;
    }

    const updatedGroup = { ...targetGroup, members: [...targetGroup.members, { id: 0, name: 'Saya', isAdmin: false }], memberCount: targetGroup.memberCount + 1 };
    setChats(prev => [updatedGroup, ...prev]);
    
    const updatedGroups = groups.map(g => g.id === targetGroup.id ? updatedGroup : g);
    localStorage.setItem(STORAGE_GROUPS, JSON.stringify(updatedGroups));

    setMessages(prev => ({ ...prev, [targetGroup.id]: [...(prev[targetGroup.id] || []), { id: Date.now(), sender: '', text: 'Saya bergabung ke grup', time: new Date().toISOString(), isSystem: true }] }));

    setJoinCode(''); setGroupCodeError(''); setShowJoinGroupModal(false); setSelectedChatId(targetGroup.id);
    showNotification(`Berhasil bergabung ke grup ${targetGroup.name}`, 'success');
  };

  const leaveGroup = () => {
    const group = chats.find(c => c.id === selectedChatId);
    if (!group || group.type !== 'group') return;
    if (window.confirm(`Apakah Anda yakin ingin keluar dari grup "${group.name}"?`)) {
      const updatedMembers = group.members.filter(m => m.id !== 0);
      const updatedGroup = { ...group, members: updatedMembers, memberCount: updatedMembers.length };
      setChats(prev => prev.map(c => c.id === selectedChatId ? updatedGroup : c));
      
      const storedGroups = localStorage.getItem(STORAGE_GROUPS);
      const groups = storedGroups ? JSON.parse(storedGroups) : [];
      const updatedGroups = groups.map(g => g.id === selectedChatId ? updatedGroup : g);
      localStorage.setItem(STORAGE_GROUPS, JSON.stringify(updatedGroups));

      setMessages(prev => ({ ...prev, [selectedChatId]: [...(prev[selectedChatId] || []), { id: Date.now(), sender: '', text: 'Saya keluar dari grup', time: new Date().toISOString(), isSystem: true }] }));
      setShowGroupDetailModal(false);
      setSelectedChatId(chats.find(c => c.id !== selectedChatId)?.id || null);
      showNotification(`Anda telah keluar dari grup ${group.name}`, 'info');
    }
  };

  const deleteGroup = () => {
    const group = chats.find(c => c.id === selectedChatId);
    if (!group || group.type !== 'group') return;
    if (window.confirm(`Apakah Anda yakin ingin menghapus grup "${group.name}"?`)) {
      setChats(prev => prev.filter(c => c.id !== selectedChatId));
      const storedGroups = localStorage.getItem(STORAGE_GROUPS);
      const groups = storedGroups ? JSON.parse(storedGroups) : [];
      const updatedGroups = groups.filter(g => g.id !== selectedChatId);
      localStorage.setItem(STORAGE_GROUPS, JSON.stringify(updatedGroups));
      setShowGroupDetailModal(false);
      setSelectedChatId(chats.find(c => c.id !== selectedChatId)?.id || null);
      showNotification(`Grup "${group.name}" telah dihapus`, 'success');
    }
  };

  const copyGroupCode = () => {
    const group = chats.find(c => c.id === selectedChatId);
    if (group?.code) {
      navigator.clipboard.writeText(group.code);
      showNotification('Kode grup disalin!', 'success');
    }
  };

  const makeAdmin = (memberId, memberName) => {
    const group = chats.find(c => c.id === selectedChatId);
    if (!group || group.type !== 'group') return;
    const updatedMembers = group.members.map(m => m.id === memberId ? { ...m, isAdmin: true } : m);
    const updatedGroup = { ...group, members: updatedMembers };
    setChats(prev => prev.map(c => c.id === selectedChatId ? updatedGroup : c));
    
    const storedGroups = localStorage.getItem(STORAGE_GROUPS);
    const groups = storedGroups ? JSON.parse(storedGroups) : [];
    const updatedGroups = groups.map(g => g.id === selectedChatId ? updatedGroup : g);
    localStorage.setItem(STORAGE_GROUPS, JSON.stringify(updatedGroups));

    setMessages(prev => ({ ...prev, [selectedChatId]: [...(prev[selectedChatId] || []), { id: Date.now(), sender: '', text: `${memberName} dijadikan admin`, time: new Date().toISOString(), isSystem: true }] }));
    showNotification(`${memberName} dijadikan admin`, 'success');
    setShowGroupDetailModal(false);
  };

  const removeAdmin = (memberId, memberName) => {
    const group = chats.find(c => c.id === selectedChatId);
    if (!group || group.type !== 'group') return;
    const updatedMembers = group.members.map(m => m.id === memberId ? { ...m, isAdmin: false } : m);
    const updatedGroup = { ...group, members: updatedMembers };
    setChats(prev => prev.map(c => c.id === selectedChatId ? updatedGroup : c));
    
    const storedGroups = localStorage.getItem(STORAGE_GROUPS);
    const groups = storedGroups ? JSON.parse(storedGroups) : [];
    const updatedGroups = groups.map(g => g.id === selectedChatId ? updatedGroup : g);
    localStorage.setItem(STORAGE_GROUPS, JSON.stringify(updatedGroups));

    setMessages(prev => ({ ...prev, [selectedChatId]: [...(prev[selectedChatId] || []), { id: Date.now(), sender: '', text: `${memberName} dicopot dari admin`, time: new Date().toISOString(), isSystem: true }] }));
    showNotification(`${memberName} dicopot dari admin`, 'info');
    setShowGroupDetailModal(false);
  };

  const kickMember = (memberId, memberName) => {
    const group = chats.find(c => c.id === selectedChatId);
    if (!group || group.type !== 'group') return;
    if (memberId === 0) {
      showNotification('Tidak bisa mengeluarkan diri sendiri', 'error');
      return;
    }
    const updatedMembers = group.members.filter(m => m.id !== memberId);
    const updatedGroup = { ...group, members: updatedMembers, memberCount: updatedMembers.length };
    setChats(prev => prev.map(c => c.id === selectedChatId ? updatedGroup : c));
    
    const storedGroups = localStorage.getItem(STORAGE_GROUPS);
    const groups = storedGroups ? JSON.parse(storedGroups) : [];
    const updatedGroups = groups.map(g => g.id === selectedChatId ? updatedGroup : g);
    localStorage.setItem(STORAGE_GROUPS, JSON.stringify(updatedGroups));

    setMessages(prev => ({ ...prev, [selectedChatId]: [...(prev[selectedChatId] || []), { id: Date.now(), sender: '', text: `${memberName} dikeluarkan dari grup`, time: new Date().toISOString(), isSystem: true }] }));
    showNotification(`${memberName} dikeluarkan dari grup`, 'info');
    setShowGroupDetailModal(false);
  };

  const handleRatingSkip = () => {
    setShowInlineRating(false);
    setRatingValue(0);
    setRatingReview('');
  };

  const handleRatingSubmit = () => {
    if (inlineRatingPartner) {
      localStorage.setItem(`rated_${inlineRatingPartner.id}`, 'true');
      setRatedPartnerName(inlineRatingPartner.name);
      setShowInlineRating(false);
      setShowRatingSuccess(true);
      setRatingValue(0);
      setRatingReview('');
    }
  };

  const selectedChat = chats.find(c => c.id === selectedChatId);
  const currentMessages = messages[selectedChatId] || [];
  const groupedMessages = groupMessagesByDate(currentMessages);
  const availableContacts = Object.values(users).filter(u => u.id !== 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Memuat chat...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*,application/pdf,.doc,.docx" onChange={onFileSelected} />
      
      <div className="flex-1 flex overflow-hidden w-full">
        {/* Daftar Chat */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-[#e5e0d8] dark:border-gray-700 flex flex-col overflow-y-auto flex-shrink-0">
          <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b border-[#e5e0d8] dark:border-gray-700 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 dark:text-white">Pesan</h2>
            <div className="relative" ref={threeDotsRef}>
              <button onClick={() => setShowThreeDotsMenu(!showThreeDotsMenu)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              {showThreeDotsMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-[#e5e0d8] dark:border-gray-700 z-20">
                  <button onClick={() => setShowGroupModal(true)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Buat Grup</button>
                  <button onClick={() => setShowJoinGroupModal(true)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Gabung Grup</button>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.length === 0 ? (
              <div className="text-center text-gray-400 py-8">Belum ada chat</div>
            ) : (
              chats.map(chat => (
                <div 
                  key={chat.id} 
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${selectedChatId === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`} 
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${chat.type === 'group' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-[#234c6a]'}`}>
                    {chat.type === 'group' ? (chat.photo ? <img src={chat.photo} className="w-full h-full rounded-full object-cover" /> : '👥') : chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-gray-800 dark:text-white truncate">{chat.name}</span>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{chat.unread}</span>}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Area Chat */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
          {selectedChat ? (
            <>
              {/* Header Chat - Bisa klik ke profil untuk personal chat */}
              <div 
                className="sticky top-0 bg-white dark:bg-gray-800 border-b border-[#e5e0d8] dark:border-gray-700 p-4 flex items-center gap-3 z-10 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                onClick={() => {
                  if (selectedChat.type === 'personal') {
                    goToProfile(selectedChat.id);
                  } else if (selectedChat.type === 'group') {
                    setShowGroupDetailModal(true);
                  }
                }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${selectedChat.type === 'group' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-[#234c6a]'}`}>
                  {selectedChat.type === 'group' ? (selectedChat.photo ? <img src={selectedChat.photo} className="w-full h-full rounded-full object-cover" /> : '👥') : selectedChat.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{selectedChat.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedChat.type === 'group' ? `${selectedChat.memberCount} anggota` : 'Klik untuk lihat profil'}
                  </p>
                </div>
                {selectedChat.type === 'group' && (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>

              {/* Area Pesan - dengan grouping tanggal */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {groupedMessages.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">Belum ada pesan</div>
                ) : (
                  groupedMessages.map((item, idx) => {
                    if (item.type === 'date') {
                      return (
                        <div key={`date-${idx}`} className="text-center my-4">
                          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                            {item.label}
                          </span>
                        </div>
                      );
                    }
                    const msg = item;
                    if (msg.isSystem) {
                      return (
                        <div key={msg.id} className="text-center my-2">
                          <span className="text-xs text-gray-400">{msg.text}</span>
                        </div>
                      );
                    }
                    return (
                      <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.isMe ? 'bg-[#234c6a] text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-sm'}`}>
                          {!msg.isMe && selectedChat?.type === 'group' && (
                            <div className="text-xs font-semibold text-[#234c6a] dark:text-[#f5c842] mb-1">{msg.sender}</div>
                          )}
                          
                          {/* Pesan text atau attachment */}
                          {msg.attachment ? (
                            msg.attachment.type === 'gambar' ? (
                              <img src={msg.attachment.url} alt="attachment" className="max-w-full rounded-lg max-h-40" />
                            ) : msg.attachment.type === 'video' ? (
                              <video src={msg.attachment.url} controls className="max-w-full rounded-lg max-h-40" />
                            ) : (
                              <a href={msg.attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                📄 {msg.attachment.name}
                              </a>
                            )
                          ) : (
                            <div className="text-sm">{msg.text}</div>
                          )}
                          
                          {/* Status pesan untuk pesan sendiri */}
                          {msg.isMe && (
                            <div className="flex justify-end items-center gap-1 mt-1">
                              <span className="text-[10px] text-white/70">
                                {new Date(msg.time).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                              </span>
                              {msg.status === 'sending' && (
                                <svg className="w-3 h-3 animate-spin text-white/70" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                              )}
                              {msg.status === 'sent' && <span className="text-[10px] text-white/70">✓</span>}
                              {msg.status === 'read' && <span className="text-[10px] text-blue-300">✓✓</span>}
                            </div>
                          )}
                          
                          {/* Waktu untuk pesan orang lain */}
                          {!msg.isMe && (
                            <div className="text-[10px] text-gray-400 text-right mt-1">
                              {new Date(msg.time).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                
                {/* Rating inline setelah 3 pesan */}
                {showInlineRating && inlineRatingPartner && (
                  <div className="mx-auto my-4 w-full max-w-md bg-white dark:bg-gray-800 border border-[#e5e0d8] dark:border-gray-700 rounded-2xl shadow-md relative">
                    <button onClick={handleRatingSkip} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="p-5">
                      <h4 className="font-bold text-gray-800 dark:text-white">Bagaimana sesi dengan {inlineRatingPartner.name}?</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Kami sudah 3 kali berturut-turut bersama {inlineRatingPartner.name}</p>
                      <div className="flex justify-center gap-3 my-4">
                        {[1,2,3,4,5].map(star => (
                          <button key={star} onClick={() => setRatingValue(star)} onMouseEnter={() => setRatingHover(star)} onMouseLeave={() => setRatingHover(0)} className="text-4xl focus:outline-none">
                            <span className={star <= (ratingHover || ratingValue) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                          </button>
                        ))}
                      </div>
                      <textarea rows="2" placeholder="Tulis komentar..." value={ratingReview} onChange={e => setRatingReview(e.target.value)} className="w-full border rounded-lg p-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                      <div className="flex gap-3 mt-3">
                        <button onClick={handleRatingSkip} className="flex-1 py-1.5 border rounded-full hover:bg-gray-50 dark:hover:bg-gray-700">Lewati</button>
                        <button onClick={handleRatingSubmit} className="flex-1 py-1.5 bg-[#234c6a] text-white rounded-full hover:bg-[#1a3d55]">Kirim</button>
                      </div>
                    </div>
                  </div>
                )}

                {showRatingSuccess && (
                  <div className="mx-auto my-4 w-full max-w-md bg-green-50 dark:bg-green-900/30 border border-green-200 rounded-2xl shadow-md">
                    <div className="p-5 text-center">
                      <div className="text-3xl mb-2">🎉</div>
                      <h4 className="font-bold text-gray-800 dark:text-white">Terima kasih atas ratingnya!</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Senang melihat progres belajarmu bersama {ratedPartnerName}!</p>
                      <button onClick={() => setShowRatingSuccess(false)} className="w-full mt-4 bg-[#234c6a] text-white py-2 rounded-full">Kembali</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Pesan dengan attachment */}
              <div className="border-t border-[#e5e0d8] dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <div className="relative" ref={attachmentRef}>
                    <button onClick={() => setShowAttachmentMenu(!showAttachmentMenu)} className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    {showAttachmentMenu && (
                      <div className="absolute bottom-full left-0 mb-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[#e5e0d8] dark:border-gray-700 z-20">
                        <button onClick={() => handleFileUpload('gambar')} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          Gambar
                        </button>
                        <button onClick={() => handleFileUpload('video')} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          Video
                        </button>
                        <button onClick={() => handleFileUpload('dokumen')} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                          Dokumen
                        </button>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Tulis pesan..."
                    className="flex-1 border border-[#e5e0d8] dark:border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#234c6a] bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <button onClick={sendMessage} className="w-9 h-9 rounded-full bg-[#234c6a] flex items-center justify-center hover:bg-[#1a3d55]">
                    <svg className="w-5 h-5 text-white rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">Pilih chat untuk memulai percakapan</div>
          )}
        </div>
      </div>

      {/* Modal Notifikasi */}
      {showNotificationModal && (
        <div className="fixed top-20 right-5 z-50 animate-slide-in">
          <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] ${
            notificationType === 'success' ? 'bg-green-500 text-white' : 
            notificationType === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
          }`}>
            {notificationType === 'success' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {notificationType === 'error' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {notificationType === 'info' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm font-medium">{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Modal Buat Grup */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowGroupModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-[500px] max-w-[90%] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Buat Grup Baru</h3>
              <button onClick={() => setShowGroupModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {groupPhoto ? <img src={groupPhoto} className="w-full h-full object-cover" /> : (
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-[#234c6a] rounded-full p-1 cursor-pointer">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                    <input type="file" accept="image/*" onChange={handleGroupPhoto} hidden />
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Grup <span className="text-red-500">*</span></label>
                <input type="text" value={groupName} onChange={e => setGroupName(e.target.value)} placeholder="Contoh: Belajar React Bareng" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi (Opsional)</label>
                <textarea rows="2" value={groupDescription} onChange={e => setGroupDescription(e.target.value)} placeholder="Ceritakan tujuan grup ini..." className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pilih Anggota <span className="text-red-500">*</span></label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg max-h-48 overflow-y-auto">
                  {availableContacts.map(contact => (
                    <label key={contact.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b last:border-0">
                      <input type="checkbox" checked={selectedMembers.includes(contact.id)} onChange={() => toggleMember(contact.id)} className="w-4 h-4 text-[#234c6a] rounded" />
                      <div className="w-8 h-8 rounded-full bg-[#234c6a] text-white flex items-center justify-center text-xs">{contact.name.charAt(0)}</div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{contact.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{contact.role}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-5">
                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">{selectedMembers.length + 1}</span> anggota termasuk Anda</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowGroupModal(false)} className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Batal</button>
                <button onClick={createGroup} className="flex-1 py-2 rounded-lg bg-[#234c6a] text-white hover:bg-[#1a3d55]">Buat Grup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Gabung Grup */}
      {showJoinGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowJoinGroupModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 max-w-[90%]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Gabung Grup</h3>
              <button onClick={() => setShowJoinGroupModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Masukkan Kode Grup</label>
              <input type="text" placeholder="Contoh: REACT42" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-center text-lg font-mono tracking-wider uppercase focus:ring-2 focus:ring-[#234c6a] focus:border-transparent dark:bg-gray-700 dark:text-white" maxLength={8} autoFocus />
              {groupCodeError && <p className="text-red-500 text-xs mt-2">{groupCodeError}</p>}
              <p className="text-xs text-gray-400 mt-2">Masukkan kode 6 digit yang didapat dari admin grup</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowJoinGroupModal(false)} className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Batal</button>
              <button onClick={joinGroupWithCode} className="flex-1 py-2 rounded-lg bg-[#234c6a] text-white">Gabung</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Grup */}
      {showGroupDetailModal && selectedChat?.type === 'group' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowGroupDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-[400px] max-w-[90%] max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-5 text-center border-b border-[#e5e0d8] dark:border-gray-700">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-3 flex items-center justify-center overflow-hidden">
                {selectedChat.photo ? <img src={selectedChat.photo} className="w-full h-full object-cover" /> : <span className="text-4xl">👥</span>}
              </div>
              <h3 className="font-bold text-xl text-gray-800 dark:text-white">{selectedChat.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{selectedChat.memberCount} anggota</p>
              {selectedChat.description && <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">"{selectedChat.description}"</p>}
            </div>
            <div className="p-4 border-b border-[#e5e0d8] dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Dibuat oleh Anda</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Kode Grup</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-mono text-sm font-bold tracking-wider">{selectedChat.code}</code>
                  <button onClick={copyGroupCode} className="text-gray-400 hover:text-gray-600" title="Salin kode">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800 dark:text-white">Anggota</h4>
                <span className="text-xs text-gray-400">{selectedChat.memberCount} orang</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedChat.members?.map(member => {
                  const isCurrentUserAdmin = selectedChat.createdBy === 0;
                  const isAdmin = member.isAdmin;
                  const isCreator = member.id === 0;
                  return (
                    <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#234c6a] text-white flex items-center justify-center text-xs font-bold">{member.name.charAt(0)}</div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{member.name}</p>
                          {isAdmin && <span className="text-xs text-[#234c6a]">Admin</span>}
                          {isCreator && <span className="text-xs text-gray-400 ml-1">(Anda)</span>}
                        </div>
                      </div>
                      {isCurrentUserAdmin && !isCreator && (
                        <div className="relative">
                          <button className="member-menu-button opacity-0 group-hover:opacity-100 transition p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" onClick={() => { const menuId = `member-menu-${member.id}`; const menu = document.getElementById(menuId); document.querySelectorAll('.member-menu').forEach(m => m.classList.add('hidden')); if (menu) menu.classList.toggle('hidden'); }}>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                          </button>
                          <div id={`member-menu-${member.id}`} className="member-menu hidden absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                            {!isAdmin ? 
                              <button onClick={() => makeAdmin(member.id, member.name)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Jadikan Admin</button> : 
                              <button onClick={() => removeAdmin(member.id, member.name)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Copot Admin</button>
                            }
                            <button onClick={() => kickMember(member.id, member.name)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">Keluarkan</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-[#e5e0d8] dark:border-gray-700 p-4 flex gap-2">
              <button onClick={leaveGroup} className="flex-1 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition">Keluar dari Grup</button>
              {selectedChat.createdBy === 0 && <button onClick={deleteGroup} className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">Hapus Grup</button>}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default Chat;