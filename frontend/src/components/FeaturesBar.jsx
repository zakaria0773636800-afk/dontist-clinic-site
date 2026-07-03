import { useLanguage } from '../i18n/LanguageContext.jsx';

const FEATURES = [
  {
    titleKey: 'featFlexible',
    subKey: 'featFlexibleSub',
    path: 'M12 1a11 11 0 1 0 11 11A11.01 11.01 0 0 0 12 1zm1 11.41 3.3 3.3-1.41 1.41L11 13V6h2z',
  },
  {
    titleKey: 'featTeam',
    subKey: 'featTeamSub',
    path: 'M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z',
  },
  {
    titleKey: 'featTech',
    subKey: 'featTechSub',
    path: 'M10 2a3 3 0 0 1 3 3v3.17A4 4 0 0 1 15 12v1h2a1 1 0 0 1 0 2h-2a5 5 0 0 1-5 5H5a1 1 0 0 1 0-2h5a3 3 0 0 0 3-3v-3a2 2 0 1 0-4 0v1a1 1 0 0 1-2 0v-1a4 4 0 0 1 2-3.48V5a3 3 0 0 1 1-2.24V2z',
  },
  {
    titleKey: 'featPrice',
    subKey: 'featPriceSub',
    path: 'M12.1 21.35 10 19.28C5 14.36 2 11.5 2 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 3.5-3 6.36-8 11.28l-1.9 2.07z',
  },
];

export default function FeaturesBar() {
  const { t } = useLanguage();

  return (
    <section className="features-bar">
      <div className="container">
        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <div className="feature-item" data-aos="fade-up" data-aos-delay={index * 100} key={feature.titleKey}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d={feature.path} />
                </svg>
              </div>
              <div className="feature-text">
                <h4>{t(feature.titleKey)}</h4>
                <p>{t(feature.subKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
