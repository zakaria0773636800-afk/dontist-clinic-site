import { useLanguage } from '../i18n/LanguageContext.jsx';

const STATS = [
  { value: '15', key: 'statExp' },
  { value: '5000', key: 'statPatients' },
  { value: '98', key: 'statSatisfaction' },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text" data-aos="fade-left" data-aos-duration="1000">
            <h1 className="hero-title">
              <span>{t('heroTitle1')}</span>{' '}
              <span className="highlight">{t('heroTitle2')}</span>
            </h1>
            <p className="hero-description">{t('heroDesc')}</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary btn-lg">
                <i className="fas fa-calendar-check"></i>
                <span>{t('heroBook')}</span>
              </a>
              <a href="tel:+213555123456" className="btn btn-white btn-lg">
                <i className="fas fa-phone-alt"></i>
                <span>{t('heroCall')}</span>
              </a>
            </div>
            <div className="hero-stats">
              {STATS.map((stat) => (
                <div className="stat-item" key={stat.key}>
                  <span className="stat-number">{stat.value}</span>
                  <span className="stat-label">{t(stat.key)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-image" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
            <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt={t('pageTitle')}
                loading="lazy"
              />
              <div className="floating-card card-1">
                <i className="fas fa-certificate"></i>
                <div>
                  <strong>{t('cardCertified')}</strong>
                  <span>{t('cardCertifiedSub')}</span>
                </div>
              </div>
              <div className="floating-card card-2">
                <i className="fas fa-shield-virus"></i>
                <div>
                  <strong>{t('cardSterile')}</strong>
                  <span>{t('cardSterileSub')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
