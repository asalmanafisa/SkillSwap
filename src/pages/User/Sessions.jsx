import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';

const Sessions = () => {
    const sessions = [
    { id: 1, partnerId: 1, partnerName: 'Farah Niyati', skill: 'UI/UX Design', date: 'Senin, 20 Mei 2024', status: 'completed' },
    { id: 2, partnerId: 2, partnerName: 'Yasmine Shavira', skill: 'React JS', date: 'Rabu, 22 Mei 2024', status: 'upcoming' },
    ];
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-5 py-8 flex-1">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Sesi Minggu Ini</h1>
        <p className="text-gray-500 mt-2 mb-8">Jadwal belajar bersama partner</p>
        <div className="space-y-3">
          {sessions.map(session => (
            <Link to={`/chat/${session.partnerId}`} key={session.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#e5e0d8] hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-[#f5c842] text-black flex items-center justify-center text-lg font-bold">{session.partnerName.charAt(0)}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{session.partnerName}</h3>
                <p className="text-sm text-[#234c6a]">{session.skill}</p>
                <p className="text-xs text-gray-500">{session.date} • {session.time}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{session.status === 'completed' ? 'Selesai' : 'Akan datang'}</span>
            </Link>
          ))}
        </div>
      </div>
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">© 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.</footer>
      <FloatingChatButton />
    </div>
  );
};
export default Sessions;