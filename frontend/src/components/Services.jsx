import { useLanguage } from '../i18n/LanguageContext.jsx';

export const SERVICES = [
  { id: 'whitening', titleKey: 'serviceWhitening', descKey: 'serviceWhiteningDesc', image: 'assets/images/services/whitening.jpg' },
  { id: 'braces', titleKey: 'serviceBraces', descKey: 'serviceBracesDesc', image: 'assets/images/services/braces.jpg' },
  { id: 'implant', titleKey: 'serviceImplant', descKey: 'serviceImplantDesc', image: 'assets/images/services/implant.jpg' },
  { id: 'filling', titleKey: 'serviceFilling', descKey: 'serviceFillingDesc', image: 'assets/images/services/filling.jpg' },
  { id: 'cleaning', titleKey: 'serviceCleaning', descKey: 'serviceCleaningDesc', image: 'assets/images/services/cleaning.jpg' },
  { id: 'pediatric', titleKey: 'servicePediatric', descKey: 'servicePediatricDesc', image: 'assets/images/services/pediatric.jpg' },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-subtitle">{t('servicesSubtitle')}</span>
          <h2 className="section-title">{t('servicesTitle')}</h2>
          <p className="section-description">{t('servicesDesc')}</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div className="service-card" data-aos="fade-up" data-aos-delay={index * 100} key={service.id}>
              <div className="service-media">
                <img src={service.image} alt={t(service.titleKey)} loading="lazy" />
              </div>
              <h3 className="service-title">{t(service.titleKey)}</h3>
              <p className="service-description">{t(service.descKey)}</p>
              <a href="#contact" className="service-link">
                <span>{t('serviceBook')}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
