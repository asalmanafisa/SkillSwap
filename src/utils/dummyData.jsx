// src/utils/dummyData.js
export const users = {
  0: {
    id: 0,
    name: 'User Name',
    email: 'user@gmail.com',
    role: 'Frontend Developer',
    location: 'Depok, Indonesia',
    activeTime: 'Malam Hari',
    connections: 142,
    rating: 4.9,
    about: 'Saya adalah seorang Frontend Developer yang antusias dalam membangun UI interaktif menggunakan React dan Tailwind CSS. Saya mencari partner untuk belajar Backend Development (Node.js/Go) dalam rangka memperluas kemampuan saya menjadi Fullstack.',
    fotoProfil: '',
    portfolio: [
      { id: 1, title: 'E-commerce App', pdfUrl: '/files/ecommerce.pdf' },
      { id: 2, title: 'Portfolio Website', pdfUrl: '/files/portfolio.pdf' },
    ],
  },
  1: {
    id: 1,
    name: 'Farah Naylul Fauzia',
    email: 'farah@gmail.com',
    role: 'Desainer',
    location: 'Surabaya',
    activeTime: 'Malam Hari',
    connections: 88,
    rating: 4.8,
    about: 'Saya seorang desainer UI/UX dengan pengalaman 3 tahun. Saya ingin bertukar skill desain dengan programming agar bisa membuat prototype yang lebih interaktif.',
    fotoProfil: '',
    portfolio: [
      { id: 1, title: 'Mobile App Design', pdfUrl: '/files/mobile-design.pdf' },
      { id: 2, title: 'Landing Page', pdfUrl: '/files/landing.pdf' },
    ],
  },
  2: {
    id: 2,
    name: 'Yasmine Shavira Ahmad',
    email: 'yasmine@gmail.com',
    role: 'Programmer',
    location: 'Malang',
    activeTime: 'Malam Hari',
    connections: 120,
    rating: 5.0,
    about: 'Fullstack developer dengan spesialisasi React dan Node.js. Saya ingin mengajarkan programming dan belajar UI/UX.',
    fotoProfil: '',
    portfolio: [
      { id: 1, title: 'Task Manager App', pdfUrl: '/files/task.pdf' },
      { id: 2, title: 'API Gateway', pdfUrl: '/files/api.pdf' },
    ],
  },
  3: {
    id: 3,
    name: 'Sekar Suryawati',
    email: 'sekar@gmail.com',
    role: 'Digital Marketing',
    location: 'Jakarta',
    activeTime: 'Flexible',
    connections: 95,
    rating: 4.7,
    about: 'Expert dalam SEO, SEM, dan social media strategy. Saya ingin belajar data analytics untuk meningkatkan performa kampanye.',
    fotoProfil: '',
    portfolio: [
      { id: 1, title: 'SEO Campaign', pdfUrl: '/files/seo.pdf' },
      { id: 2, title: 'Social Media Report', pdfUrl: '/files/social.pdf' },
    ],
  },
  4: {
    id: 4,
    name: 'Tabina Naila Griselda',
    email: 'tabina@gmail.com',
    role: 'Data Analyst',
    location: 'Surabaya',
    activeTime: 'Siang Hari',
    connections: 67,
    rating: 4.9,
    about: 'Menganalisis data untuk pengambilan keputusan bisnis menggunakan Python dan SQL. Saya ingin belajar visualisasi data yang lebih menarik.',
    fotoProfil: '',
    portfolio: [
      { id: 1, title: 'Data Analysis Report', pdfUrl: '/files/data-analysis.pdf' },
      { id: 2, title: 'Dashboard Visualization', pdfUrl: '/files/dashboard.pdf' },
    ],
  },
};

export const getDefaultNotifications = () => [
  { id: 1, type: 'request', fromUserId: 1, fromName: users[1].name, action: 'ingin belajar React denganmu', status: 'pending', time: '2 menit lalu', read: false },
  { id: 2, type: 'request', fromUserId: 2, fromName: users[2].name, action: 'ingin bertukar skill UI/UX', status: 'pending', time: '1 jam lalu', read: false },
  { id: 3, type: 'rating', fromUserId: 2, fromName: users[2].name, rating: 5, skill: 'React', time: '2 jam lalu', read: false },
  { id: 4, type: 'message', fromUserId: 3, fromName: users[3].name, message: 'Halo, apakah kamu tertarik belajar Python bersama?', time: '5 jam lalu', read: false },
  { id: 5, type: 'request', fromUserId: 4, fromName: users[4].name, action: 'ingin belajar Data Analysis', status: 'pending', time: '1 hari lalu', read: false },
];

export const getUserData = (id, fromLocalStorage = true) => {
  if (id === 0 && fromLocalStorage) {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const profile = JSON.parse(saved);
      return {
        ...users[0],
        name: profile.namaLengkap || users[0].name,
        role: profile.profesi || users[0].role,
        location: profile.lokasi || users[0].location,
        about: profile.bio || users[0].about,
        fotoProfil: profile.fotoProfil || users[0].fotoProfil,
      };
    }
  }
  return users[id] || users[0];
};