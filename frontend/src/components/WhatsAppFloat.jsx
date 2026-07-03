import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function WhatsAppFloat() {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/213555123456"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappLabel')}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
