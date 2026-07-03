import { useEffect } from 'react';
import AOS from 'aos';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import FeaturesBar from './components/FeaturesBar.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Reviews from './components/Reviews.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';

export default function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 100,
      duration: 800,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <LanguageProvider>
      <Header />
      <Hero />
      <FeaturesBar />
      <Services />
      <About />
      <Reviews />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </LanguageProvider>
  );
}
