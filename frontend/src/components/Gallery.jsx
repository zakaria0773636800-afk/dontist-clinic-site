import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const ITEMS = [
  {
    labelKey: 'galleryWhitening',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    labelKey: 'galleryBraces',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    labelKey: 'galleryImplant',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    labelKey: 'galleryFilling',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    if (!lightboxItem) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxItem]);

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-subtitle">{t('gallerySubtitle')}</span>
          <h2 className="section-title">{t('galleryTitle')}</h2>
          <p className="section-description">{t('galleryDesc')}</p>
        </div>

        <div className="gallery-grid">
          {ITEMS.map((item, index) => (
            <div
              className="gallery-item"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              key={item.labelKey}
              onClick={() => setLightboxItem(item)}
            >
              <img src={item.image} alt={t(item.labelKey)} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-label">{t(item.labelKey)}</span>
                <i className="fas fa-search-plus"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxItem && (
        <div
          className="lightbox"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxItem(null);
          }}
        >
          <div className="lightbox-content">
            <button className="lightbox-close" type="button" onClick={() => setLightboxItem(null)}>
              &times;
            </button>
            <img src={lightboxItem.image} alt={t(lightboxItem.labelKey)} />
            <p>{t(lightboxItem.labelKey)}</p>
          </div>
        </div>
      )}
    </section>
  );
}
