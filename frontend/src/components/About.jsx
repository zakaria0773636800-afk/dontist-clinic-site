import { useLanguage } from '../i18n/LanguageContext.jsx';

const FEATURES = [
  { icon: 'fa-graduation-cap', key: 'aboutFeat1' },
  { icon: 'fa-award', key: 'aboutFeat2' },
  { icon: 'fa-users', key: 'aboutFeat3' },
  { icon: 'fa-heartbeat', key: 'aboutFeat4' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image" data-aos="fade-left">
            <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt={t('aboutTitle')}
                loading="lazy"
              />
              <div className="experience-badge">
                <span className="exp-number">15+</span>
                <span className="exp-text">{t('expYears')}</span>
                <span className="exp-text">{t('expText')}</span>
              </div>
            </div>
          </div>

          <div className="about-text" data-aos="fade-right">
            <span className="section-subtitle">{t('aboutSubtitle')}</span>
            <h2 className="section-title">{t('aboutTitle')}</h2>
            <h3 className="about-subtitle">{t('aboutRole')}</h3>
            <p className="about-description">{t('aboutDesc')}</p>

            <div className="about-features">
              {FEATURES.map((feature) => (
                <div className="about-feature" key={feature.key}>
                  <i className={`fas ${feature.icon}`}></i>
                  <span>{t(feature.key)}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn-primary">
              <i className="fas fa-calendar-check"></i>
              <span>{t('aboutBook')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
