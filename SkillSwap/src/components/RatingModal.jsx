import { useState } from 'react';

const RatingModal = ({ partnerName, onSubmit, onSkip }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Harap beri rating bintang');
      return;
    }
    onSubmit({ rating, comment });
    setSubmitted(true);
  };

  // Tampilan setelah submit (pop-up sukses)
  if (submitted) {
    return (
      <div className="rating-modal-overlay">
        <div className="rating-modal">
          <h3>Terimakasih atas ratingnya!</h3>
          <p>Senang melihat progres belajarmu bersama {partnerName}!</p>
          <div className="rating-buttons">
            <button onClick={onSkip} className="btn-secondary">Kembali</button>
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#234c6a' }}>
            Pertahankan semangat belajarmu, ya!
          </p>
        </div>
      </div>
    );
  }

  // Tampilan form rating (belum submit)
  return (
    <div className="rating-modal-overlay">
      <div className="rating-modal">
        <h3>Bagaimana sesi dengan {partnerName}?</h3>
        <p>Kami sudah 2 hari berturut-turut bersama {partnerName}</p>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                fontSize: '32px',
                cursor: 'pointer',
                color: star <= rating ? '#f5c842' : '#e5e0d8',
                transition: '0.1s'
              }}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Tulis komentar untuk sesi ini..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
        <div className="rating-buttons">
          <button onClick={onSkip} className="btn-secondary">Lewati</button>
          <button onClick={handleSubmit} className="btn-primary">Kirim Rating</button>
        </div>
        <p className="rating-note">Rating membantu meningkatkan reputasi partner</p>
      </div>
    </div>
  );
};

export default RatingModal;