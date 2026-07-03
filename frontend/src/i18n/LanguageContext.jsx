import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import translations from './translations.js';

const LanguageContext = createContext(null);

function getSavedLang() {
  try {
    const saved = localStorage.getItem('site_lang');
    return saved === 'fr' ? 'fr' : 'ar';
  } catch {
    return 'ar';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getSavedLang);

  useEffect(() => {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t.pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && t.metaDescription) {
      metaDescription.setAttribute('content', t.metaDescription);
    }
    try {
      localStorage.setItem('site_lang', lang);
    } catch {
      // Private browsing modes may block storage; language still switches.
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'ar' ? 'fr' : 'ar'));
  }, []);

  const t = useCallback((key) => translations[lang][key] ?? key, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
