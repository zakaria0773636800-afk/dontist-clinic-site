import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="logo">
              <img className="logo-mark" src="assets/brand/logo-ahmad-alnour.svg" alt={t('aboutTitle')} loading="lazy" />
              <span>{t('aboutTitle')}</span>
            </a>
            <p>{t('footerDesc')}</p>
          </div>

          <div className="footer-links">
            <h4>{t('footerQuick')}</h4>
            <ul>
              <li><a href="#home">{t('navHome')}</a></li>
              <li><a href="#services">{t('navServices')}</a></li>
              <li><a href="#about">{t('navAbout')}</a></li>
              <li><a href="#contact">{t('navContact')}</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('footerServices')}</h4>
            <ul>
              <li><a href="#services">{t('serviceWhitening')}</a></li>
              <li><a href="#services">{t('serviceBraces')}</a></li>
              <li><a href="#services">{t('serviceImplant')}</a></li>
              <li><a href="#services">{t('serviceFilling')}</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>{t('footerContact')}</h4>
            <p><i className="fas fa-map-marker-alt"></i> <span>{t('contactAddressVal')}</span></p>
            <p><i className="fas fa-phone-alt"></i> <a href="tel:+213555123456" className="phone-ltr">+213 555 123 456</a></p>
            <p><i className="fas fa-envelope"></i> <a href="mailto:contact@dentalcare-dz.com">contact@dentalcare-dz.com</a></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footerCopyright')}</p>
          <p className="credit-line">تم تطويره بواسطة dev zikou 0771202892 قسنطينة</p>
        </div>
      </div>
    </footer>
  );
}
