import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const SECTIONS = ['home', 'services', 'about', 'reviews', 'gallery', 'contact'];

const NAV_ITEMS = [
  { id: 'home', key: 'navHome' },
  { id: 'services', key: 'navServices' },
  { id: 'about', key: 'navAbout' },
  { id: 'reviews', key: 'navReviews' },
  { id: 'gallery', key: 'navGallery' },
  { id: 'contact', key: 'navContact' },
];

function FlagFR() {
  return (
    <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false">
      <rect width="1" height="2" x="0" fill="#002395" />
      <rect width="1" height="2" x="1" fill="#ffffff" />
      <rect width="1" height="2" x="2" fill="#ed2939" />
    </svg>
  );
}

function FlagDZ() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" focusable="false">
      <rect width="15" height="20" x="0" fill="#006233" />
      <rect width="15" height="20" x="15" fill="#ffffff" />
      <circle cx="16" cy="10" r="5" fill="#d21034" />
      <circle cx="17.5" cy="10" r="4.1" fill="#ffffff" />
      <path d="M19.5 10l3.2-1-2 2.7v-3.4l2 2.7z" fill="#d21034" />
    </svg>
  );
}

export default function Header() {
  const { lang, t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;
      for (const id of SECTIONS) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(id);
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="container">
        <nav className="navbar">
          <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
            <img className="logo-mark" src="assets/brand/logo-ahmad-alnour.svg" alt={t('pageTitle')} loading="lazy" />
            <span>{t('aboutTitle')}</span>
          </a>

          <ul className={`nav-menu${menuOpen ? ' active' : ''}`} id="navMenu">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="tel:+213555123456" className="btn btn-outline">
              <i className="fas fa-phone"></i>
              <span>{t('navCall')}</span>
            </a>

            <a href="#contact" className="btn btn-go">{t('navGoTo')}</a>

            <div className="language-switcher">
              <button
                className="lang-btn"
                type="button"
                onClick={toggleLang}
                aria-label={lang === 'ar' ? 'Passer au français' : 'التبديل إلى العربية'}
              >
                {lang === 'ar' ? <FlagFR /> : <FlagDZ />}
                <span>{lang === 'ar' ? 'FR' : 'AR'}</span>
              </button>
            </div>

            <button
              className={`mobile-toggle${menuOpen ? ' active' : ''}`}
              type="button"
              aria-label={t('navHome')}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
