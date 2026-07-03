import { useLanguage } from '../i18n/LanguageContext.jsx';

const REVIEWS = [
  {
    textKey: 'review1',
    nameKey: 'review1Name',
    roleKey: 'review1Role',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    textKey: 'review2',
    nameKey: 'review2Name',
    roleKey: 'review2Role',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    textKey: 'review3',
    nameKey: 'review3Name',
    roleKey: 'review3Role',
    stars: 4.5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
];

function Stars({ count }) {
  const full = Math.floor(count);
  const hasHalf = count % 1 !== 0;
  return (
    <div className="review-rating">
      {Array.from({ length: full }, (_, i) => (
        <i className="fas fa-star" key={i}></i>
      ))}
      {hasHalf && <i className="fas fa-star-half-alt"></i>}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLanguage();

  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-subtitle">{t('reviewsSubtitle')}</span>
          <h2 className="section-title">{t('reviewsTitle')}</h2>
          <p className="section-description">{t('reviewsDesc')}</p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((review, index) => (
            <div className="review-card" data-aos="fade-up" data-aos-delay={index * 100} key={review.nameKey}>
              <Stars count={review.stars} />
              <p className="review-text">{t(review.textKey)}</p>
              <div className="review-author">
                <img src={review.avatar} alt={t(review.nameKey)} loading="lazy" />
                <div>
                  <h4>{t(review.nameKey)}</h4>
                  <span>{t(review.roleKey)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
