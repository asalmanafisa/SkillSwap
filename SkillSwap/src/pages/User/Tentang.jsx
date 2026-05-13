import UserNavbar from '../../components/Navbar';

const Tentang = () => {
  return (
    <div className="bg-[#fcf5e8] font-sans min-h-screen flex flex-col">
      <UserNavbar />
      <div className="flex-1 max-w-4xl mx-auto px-5 py-16">
        <h1 className="font-serif text-4xl font-bold text-gray-800 mb-6">Tentang SkillSwap</h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          Pengalaman Belajar Tampak Indonesia. Semua dimulai dengan langkah sederhana. Kami merancang aja yang kami buat dan aja yang ingin kamu pelajari. Sistem kami akan mengembangkan diri dengan orang-orang yang memiliki keinginan untuk belajar yang kamu cari.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Melalui ciboran, diskusi, dan sesi berbagi, kamu tidak hanya mendapatkan ilmu berasaskan dunia-cuma, tetapi juga membangun jaringan penerimaan yang luas di komunitas.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Di SkillSwap, kita tidak hanya belajar tentang hardskill, tapi kita belajar tentang kolaborasi, agensi, dan pemahaman terbesar.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Jika seringmingmu untuk berinteraksi sejauh dari metode belajar yang sudah mulai berkembang inspirasi. Muti berbagi. Karena ilmu yang dibagikan tidak akan berkurang, ia justru akan bertapak ganda.
        </p>
      </div>
      <footer className="bg-white border-t border-[#e5e0d8] py-4 text-center text-xs text-gray-400">
        © 2023 SkillSwap — Universiti Brunei Darussalam. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Tentang;