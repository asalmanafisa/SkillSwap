import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap');

  :root {
    --primary: #234c6a;
    --primary-light: #234c6a;
    --accent: #f5c842;
    --bg: #fcf5e8;
    --card-bg: #ffffff;
    --text: #1a1a1a;
    --text-muted: #6b7280;
    --border: #e5e0d8;
    --hero-bg: #234c6a;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
  }

  .skillswap-root { font-family: 'Plus Jakarta Sans', sans-serif; }

  /* NAVBAR */
  .ss-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 48px;
    background: #fff;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .ss-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 800;
    font-size: 18px;
    color: var(--primary);
    text-decoration: none;
    cursor: pointer;
  }

  .ss-logo-icon {
    width: 32px; height: 32px;
    background: var(--primary);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: white;
    font-size: 14px;
    font-weight: 800;
  }

  .ss-nav-search {
    flex: 1;
    max-width: 340px;
    margin: 0 32px;
    position: relative;
  }

  .ss-nav-search input {
    width: 100%;
    padding: 9px 16px 9px 40px;
    border: 1.5px solid var(--border);
    border-radius: 24px;
    font-size: 13.5px;
    background: var(--bg);
    outline: none;
    font-family: inherit;
    color: var(--text);
    transition: border-color .2s;
  }

  .ss-nav-search input:focus { border-color: var(--primary); }

  .ss-search-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }

  .ss-nav-actions { display: flex; align-items: center; gap: 12px; }

  .ss-btn-outline {
    padding: 8px 18px;
    border: 1.5px solid var(--primary);
    border-radius: 24px;
    background: transparent;
    color: var(--primary);
    font-weight: 600;
    font-size: 13.5px;
    cursor: pointer;
    font-family: inherit;
    transition: all .2s;
  }
  .ss-btn-outline:hover { background: var(--primary); color: white; }

  .ss-btn-primary {
    padding: 8px 18px;
    background: var(--primary);
    border: none;
    border-radius: 24px;
    color: white;
    font-weight: 600;
    font-size: 13.5px;
    cursor: pointer;
    font-family: inherit;
    transition: background .2s;
  }
  .ss-btn-primary:hover { background: var(--primary-light); }

  /* HERO */
  .ss-hero {
    background: var(--hero-bg);
    padding: 64px 48px;
    position: relative;
    overflow: hidden;
    min-height: 300px;
    display: flex;
    align-items: center;
  }

  .ss-hero::before {
    content: '';
    position: absolute;
    right: -60px; top: -60px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .ss-hero::after {
    content: '';
    position: absolute;
    left: 40%; bottom: -80px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(45,155,111,0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .ss-hero-content {
    max-width: 540px;
    position: relative;
    z-index: 1;
    animation: ssfadeUp .7s ease both;
  }

  .ss-hero h1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(28px, 4vw, 44px);
    color: white;
    line-height: 1.18;
    margin-bottom: 14px;
    font-weight: 700;
  }

  .ss-hero p {
    color: rgba(255,255,255,0.72);
    font-size: 14.5px;
    line-height: 1.7;
    margin-bottom: 28px;
    max-width: 420px;
  }

  .ss-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }

  .ss-btn-hero-primary {
    padding: 12px 26px;
    background: var(--accent);
    border: none;
    border-radius: 28px;
    color: #1a1a1a;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    font-family: inherit;
    transition: transform .15s, box-shadow .15s;
    box-shadow: 0 4px 20px rgba(245,200,66,0.35);
  }
  .ss-btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,200,66,0.45); }

  .ss-btn-hero-outline {
    padding: 12px 26px;
    background: rgba(255,255,255,0.1);
    border: 1.5px solid rgba(255,255,255,0.3);
    border-radius: 28px;
    color: white;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: inherit;
    transition: background .2s;
    backdrop-filter: blur(4px);
  }
  .ss-btn-hero-outline:hover { background: rgba(255,255,255,0.2); }

  /* TICKER */
  .ss-ticker-wrap {
    background: var(--primary);
    padding: 10px 0;
    overflow: hidden;
  }

  .ss-ticker-track {
    display: flex;
    animation: ssTicker 22s linear infinite;
    white-space: nowrap;
  }

  .ss-ticker-item {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 0 24px;
    color: rgba(255,255,255,0.9);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .ss-ticker-dot {
    width: 5px; height: 5px;
    background: var(--accent);
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* MATCH SECTION */
  .ss-section { padding: 64px 48px; background: var(--bg); }

  .ss-section-narrow { max-width: 860px; margin: 0 auto; }

  .ss-match-card {
    background: white;
    border-radius: 20px;
    padding: 36px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    box-shadow: 0 2px 24px rgba(0,0,0,0.06);
    border: 1px solid var(--border);
    animation: ssfadeUp .6s ease both;
  }

  .ss-match-icon {
    width: 52px; height: 52px;
    background: var(--primary);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 22px;
  }

  .ss-match-text h3 {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .ss-match-text p {
    color: var(--text-muted);
    line-height: 1.7;
    font-size: 14px;
    max-width: 560px;
  }

  /* CATEGORIES */
  .ss-categories { padding: 64px 48px; background: white; }

  .ss-section-header { text-align: center; margin-bottom: 40px; }

  .ss-section-header h2 {
    font-family: 'Fraunces', serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 700;
    margin-bottom: 8px;
  }

  .ss-section-header p { color: var(--text-muted); font-size: 14.5px; }

  .ss-cat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    max-width: 900px;
    margin: 0 auto;
  }

  .ss-cat-card {
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 24px 20px;
    cursor: pointer;
    transition: all .22s;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .ss-cat-card:hover {
    border-color: var(--primary);
    background: white;
    box-shadow: 0 8px 24px rgba(26,107,74,0.1);
    transform: translateY(-3px);
  }

  .ss-cat-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    background: rgba(26,107,74,0.08);
  }

  .ss-cat-card h4 { font-size: 14.5px; font-weight: 700; }
  .ss-cat-card span { font-size: 12px; color: var(--text-muted); }

  /* SUCCESS */
  .ss-success { padding: 64px 48px; background: var(--bg); }

  .ss-success-card {
    background: var(--hero-bg);
    border-radius: 24px;
    padding: 44px;
    max-width: 820px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .ss-success-card::before {
    content: '"';
    position: absolute;
    right: 32px; top: -10px;
    font-family: 'Fraunces', serif;
    font-size: 160px;
    color: rgba(245,200,66,0.1);
    line-height: 1;
    pointer-events: none;
  }

  .ss-success-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(245,200,66,0.15);
    border: 1px solid rgba(245,200,66,0.3);
    border-radius: 20px;
    padding: 5px 14px;
    margin-bottom: 20px;
  }

  .ss-success-badge span {
    color: var(--accent);
    font-size: 12.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .ss-success-card h3 {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    color: white;
    margin-bottom: 20px;
    font-weight: 700;
  }

  .ss-testimonial {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    background: rgba(255,255,255,0.05);
    border-radius: 14px;
    padding: 20px;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .ss-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-light), var(--accent));
    display: flex; align-items: center; justify-content: center;
    font-weight: 800;
    color: white;
    font-size: 16px;
    flex-shrink: 0;
  }

  .ss-testimonial-name { font-weight: 700; color: white; font-size: 14px; margin-bottom: 2px; }
  .ss-testimonial-role { color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 10px; }
  .ss-testimonial-text { color: rgba(255,255,255,0.78); font-size: 13.5px; line-height: 1.65; }

  .ss-testimonial-likes { display: flex; align-items: center; gap: 16px; margin-top: 12px; }

  .ss-like-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    color: rgba(255,255,255,0.5);
    font-size: 12px;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    transition: color .2s;
  }
  .ss-like-btn:hover { color: var(--accent); }

  /* HOW IT WORKS */
  .ss-how { padding: 72px 48px; background: white; }

  .ss-steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    max-width: 860px;
    margin: 0 auto;
    position: relative;
  }

  .ss-steps-grid::before {
    content: '';
    position: absolute;
    top: 28px; left: 16.6%; right: 16.6%;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent), var(--primary));
    z-index: 0;
    opacity: 0.2;
  }

  .ss-step-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .ss-step-num {
    width: 56px; height: 56px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800;
    font-size: 20px;
    color: white;
    margin-bottom: 20px;
  }

  .ss-step-num.s1 { background: var(--primary); box-shadow: 0 8px 24px rgba(26,107,74,0.3); }
  .ss-step-num.s2 { background: var(--accent); color: #1a1a1a; box-shadow: 0 8px 24px rgba(245,200,66,0.35); }
  .ss-step-num.s3 { background: var(--primary); box-shadow: 0 8px 24px rgba(26,107,74,0.3); }

  .ss-step-icon {
    width: 64px; height: 64px;
    background: var(--bg);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin-bottom: 16px;
    border: 1.5px solid var(--border);
  }

  .ss-step-card h4 { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
  .ss-step-card p { color: var(--text-muted); font-size: 13.5px; line-height: 1.65; max-width: 200px; }

  /* CTA */
  .ss-cta { background: var(--primary); padding: 64px 48px; text-align: center; }

  .ss-cta h2 {
    font-family: 'Fraunces', serif;
    font-size: clamp(24px, 3.5vw, 36px);
    color: white;
    margin-bottom: 12px;
    font-weight: 700;
  }

  .ss-cta p { color: rgba(255,255,255,0.7); font-size: 15px; margin-bottom: 28px; }

  /* ANIMATIONS */
  @keyframes ssfadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ssTicker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .ss-nav { padding: 12px 20px; }
    .ss-nav-search { display: none; }
    .ss-hero { padding: 40px 20px; }
    .ss-section, .ss-categories, .ss-success, .ss-how, .ss-cta { padding: 48px 20px; }
    .ss-cat-grid { grid-template-columns: repeat(2, 1fr); }
    .ss-steps-grid { grid-template-columns: 1fr; gap: 24px; }
    .ss-steps-grid::before { display: none; }
    .ss-match-card { flex-direction: column; }
  }
`;

const TICKER_ITEMS = Array(16).fill("SKILLSWAP");

const CATEGORIES = [
  { icon: "💻", name: "Programming", count: "1.200+ Partner" },
  { icon: "🎨", name: "Design", count: "800+ Partner" },
  { icon: "📷", name: "Fotografi", count: "520+ Partner" },
  { icon: "📚", name: "Bahasa", count: "980+ Partner" },
];

const STEPS = [
  {
    num: "1",
    cls: "s1",
    icon: "🔍",
    title: "Cari Partner",
    desc: "Temukan partner skill yang memiliki keahlian yang ingin kamu pelajari dan yang sesuai dengan keahlianmu.",
  },
  {
    num: "2",
    cls: "s2",
    icon: "📬",
    title: "Kirim Request",
    desc: "Kirim permintaan koneksi, dan mulai diskusi untuk menentukan jadwal dan cara belajar.",
  },
  {
    num: "3",
    cls: "s3",
    icon: "🎓",
    title: "Mulai Belajar",
    desc: "Lakukan sesi pertukaran pengetahuan dan nikmati proses belajar bersama yang menyenangkan.",
  },
];

export default function LandingPage() {
  const [searchVal, setSearchVal] = useState("");
  const [liked, setLiked] = useState(false);
  const styleInjected = useRef(false);

  useEffect(() => {
    if (!styleInjected.current) {
      const el = document.createElement("style");
      el.textContent = styles;
      document.head.appendChild(el);
      styleInjected.current = true;
    }
  }, []);

  return (
    <div className="skillswap-root">
      {/* NAVBAR */}
      <nav className="ss-nav">
        <div className="ss-logo">
          <div className="ss-logo-icon">S</div>
          SkillSwap
        </div>

        <div className="ss-nav-search">
          <svg className="ss-search-icon" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Cari ahli atau keahlian..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>

        <div className="ss-nav-actions">
          <button className="ss-btn-outline">Sign Up</button>
          <button className="ss-btn-primary">Log In</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="ss-hero">
        <div className="ss-hero-content">
          <h1>Tingkatkan Keahlian<br />Bersama Ahli di Bidangnya</h1>
          <p>
            SkillSwap menghubungkan Anda dengan profesional untuk berbagi
            keberhasilan, belajar, berkembang, dan perluas jaringan Anda
            dengan cara yang inovatif.
          </p>
          <div className="ss-hero-btns">
            <button className="ss-btn-hero-primary">Temukan Partner →</button>
            <button className="ss-btn-hero-outline">Pelajari Lebih Lanjut</button>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ss-ticker-wrap">
        <div className="ss-ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="ss-ticker-item">
              {item}
              <span className="ss-ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* PARTNER MATCH */}
      <section className="ss-section">
        <div className="ss-section-narrow">
          <div className="ss-match-card">
            <div className="ss-match-icon">🤝</div>
            <div className="ss-match-text">
              <h3>Temukan Pasangan Belajar yang Tepat</h3>
              <p>
                SkillSwap membantu Anda menemukan partner yang sama-sama aktif
                berkembangkan keahlian. Tidak perlu membuang biaya mahal, cukup
                tukarkan skill Anda dengan orang lain dan raih partner-mitra
                untuk membantu tujuan yang lebih baik!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="ss-categories">
        <div className="ss-section-header">
          <h2>Kategori Keahlian Populer</h2>
          <p>Eksplorasi berbagai kategori dari yang paling banyak dicari</p>
        </div>
        <div className="ss-cat-grid">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="ss-cat-card">
              <div className="ss-cat-icon">{cat.icon}</div>
              <h4>{cat.name}</h4>
              <span>{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS STORY */}
      <section className="ss-success">
        <div className="ss-section-header">
          <h2>Kisah Sukses</h2>
          <p>Mereka yang telah mengembangkan skill mereka</p>
        </div>
        <div className="ss-success-card">
          <div className="ss-success-badge">
            <span>⭐ Kisah Sukses</span>
          </div>
          <h3>Mereka yang telah mengubah karier mereka</h3>
          <div className="ss-testimonial">
            <div className="ss-avatar">Y</div>
            <div>
              <div className="ss-testimonial-name">Yasmine Shavira Ahmad</div>
              <div className="ss-testimonial-role">Mahasiswa — Jakarta</div>
              <p className="ss-testimonial-text">
                "Berkat SkillSwap, saya berhasil menemukan teman baru di dunia
                untuk mengajarkan UX/UI ke partner saya, sekarang saya bisa
                mendesain aplikasi sendiri!"
              </p>
              <div className="ss-testimonial-likes">
                <button
                  className="ss-like-btn"
                  onClick={() => setLiked(!liked)}
                  style={{ color: liked ? "var(--accent)" : undefined }}
                >
                  {liked ? "❤️" : "🤍"} {liked ? 43 : 42}
                </button>
                <span className="ss-like-btn">💬 11 min lalu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ss-how">
        <div className="ss-section-header">
          <h2>Mulai Dalam 3 Langkah Mudah</h2>
          <p>Proses yang dirancang untuk memudahkan perjalanan keahlian Anda</p>
        </div>
        <div className="ss-steps-grid">
          {STEPS.map((step) => (
            <div key={step.num} className="ss-step-card">
              <div className={`ss-step-num ${step.cls}`}>{step.num}</div>
              <div className="ss-step-icon">{step.icon}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="ss-cta">
        <h2>Siap Memulai Perjalananmu?</h2>
        <p>Bergabung bersama ribuan pengguna yang telah meningkatkan keahlian mereka</p>
        <button className="ss-btn-hero-primary" style={{ fontSize: "15px", padding: "13px 32px" }}>
          Daftar Gratis Sekarang →
        </button>
      </section>
    </div>
  );
}