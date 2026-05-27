import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';

const Partners = () => {
  const partners = [
    { id: 1, name: 'Farah Niyati', skill: 'UI/UX Design', avatar: 'F', status: 'online' },
    { id: 2, name: 'Yasmine Shavira', skill: 'React JS', avatar: 'Y', status: 'offline' },
    { id: 3, name: 'Sekar Suryawati', skill: 'Digital Marketing', avatar: 'S', status: 'online' },
  ];
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-5 py-8 flex-1">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Partner Aktif</h1>
        <p className="text-gray-500 mt-2 mb-8">Semua partner yang pernah berinteraksi dengan Anda</p>
        <div className="space-y-3">
          {partners.map(partner => (
            <Link to={`/chat/${partner.id}`} key={partner.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#e5e0d8] hover:shadow-md transition">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#234c6a] text-white flex items-center justify-center text-lg font-bold">{partner.avatar}</div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${partner.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white`}></span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{partner.name}</h3>
                <p className="text-sm text-[#234c6a]">{partner.skill}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>
      </div>
      <footer className="bg-[#234c6a] text-white/80 py-3 text-center text-[11px] w-full">© 2026 SkillSwap — Universitas Brawijaya. All Rights Reserved.</footer>
      <FloatingChatButton />
    </div>
  );
};
export default Partners;