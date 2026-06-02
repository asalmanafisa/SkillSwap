import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import FloatingChatButton from '../../components/FloatingChatButton';

const RatingSaya = () => {
  const ratings = [
    { id: 1, from: 'Ahmad Fauzi', rating: 5, comment: 'Partner yang sangat sabar dan jelas dalam menjelaskan konsep React.', skill: 'Programmer', date: '2 hari lalu' },
    { id: 2, from: 'Rina Wulandari', rating: 5, comment: 'Menyenangkan diajak diskusi. Sangat terbuka.', skill: 'Design', date: '3 hari lalu' },
    { id: 3, from: 'Doni Saputra', rating: 4.8, comment: 'Komunikatif dan tepat waktu.', skill: 'Programmer', date: '5 hari lalu' },
    { id: 4, from: 'Maya Sari', rating: 4.5, comment: 'Kadang sedikit terburu-buru, tapi materi berkualitas.', skill: 'Digital Marketing', date: '1 minggu lalu' },
  ];
  const avgRating = (ratings.reduce((a,b) => a + b.rating, 0) / ratings.length).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcf5e8' }}>
      <div className="max-w-4xl mx-auto px-5 py-8 flex-1">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Rating untuk Anda</h1>
        <p className="text-gray-500 mt-2 mb-8">Apa kata partner tentang Anda</p>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e0d8] mb-8 text-center">
          <div className="text-4xl font-bold text-gray-800">{avgRating}</div>
          <div className="flex justify-center text-yellow-400 text-xl">★★★★★</div>
          <p className="text-sm text-gray-500 mt-1">dari {ratings.length} ulasan</p>
        </div>
        <div className="space-y-4">
          {ratings.map(r => (
            <div key={r.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#e5e0d8]">
              <div className="flex justify-between items-start">
                <div><h3 className="font-semibold">{r.from}</h3><p className="text-xs text-gray-500">{r.skill} • {r.date}</p></div>
                <div className="flex text-yellow-400">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
              </div>
              <p className="text-gray-600 text-sm mt-2 italic">"{r.comment}"</p>
            </div>
          ))}
        </div>
      </div>
      <FloatingChatButton />
    </div>
  );
};

export default RatingSaya;