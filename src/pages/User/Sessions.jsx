// src/pages/User/Sessions.jsx
import { Link } from 'react-router-dom';
import FloatingChatButton from '../../components/FloatingChatButton';

const Sessions = () => {
  const sessions = [
    { id: 1, partnerId: 1, partnerName: 'Farah Niyati', skill: 'UI/UX Design', date: 'Senin, 20 Mei 2024', status: 'completed', time: '14:00 - 16:00' },
    { id: 2, partnerId: 2, partnerName: 'Yasmine Shavira', skill: 'React JS', date: 'Rabu, 22 Mei 2024', status: 'upcoming', time: '19:00 - 21:00' },
    { id: 3, partnerId: 3, partnerName: 'Sekar Suryawati', skill: 'Digital Marketing', date: 'Jumat, 24 Mei 2024', status: 'upcoming', time: '10:00 - 12:00' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <div className="max-w-4xl mx-auto px-5 py-8 flex-1">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Sesi Belajar</h1>
        <p className="text-gray-500 mt-2 mb-8">Jadwal belajar bersama partner</p>
        
        <div className="space-y-3">
          {sessions.map(session => (
            <Link to={`/chat/${session.partnerId}`} key={session.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#e5e0d8] hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-[#f5c842] text-black flex items-center justify-center text-lg font-bold">
                {session.partnerName.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{session.partnerName}</h3>
                <p className="text-sm text-[#234c6a]">{session.skill}</p>
                <p className="text-xs text-gray-500">{session.date} • {session.time}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {session.status === 'completed' ? 'Selesai' : 'Akan datang'}
              </span>
            </Link>
          ))}
        </div>
        
        {sessions.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e0d8] p-8 text-center text-gray-500">
            Belum ada sesi belajar.
          </div>
        )}
      </div>
      <FloatingChatButton />
    </div>
  );
};

export default Sessions;