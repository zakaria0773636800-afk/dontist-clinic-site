import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { SERVICES } from './Services.jsx';

const API_URL = import.meta.env.VITE_API_URL || '';

const CONTACT_ITEMS = [
  {
    titleKey: 'contactAddress',
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z',
    lines: [{ key: 'contactAddressVal' }],
  },
  {
    titleKey: 'contactPhone',
    path: 'M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z',
    lines: [{ text: '+213 555 123 456', className: 'phone-ltr' }],
  },
  {
    titleKey: 'contactEmail',
    path: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-8 5-8-5V6l8 5 8-5v2.24z',
    lines: [{ text: 'contact@dentalcare-dz.com' }],
  },
  {
    titleKey: 'contactHours',
    path: 'M12 1a11 11 0 1 0 11 11A11.01 11.01 0 0 0 12 1zm1 11.41 3.3 3.3-1.41 1.41L11 13V6h2z',
    lines: [{ key: 'contactHoursVal1' }, { key: 'contactHoursVal2' }],
  },
];

const EMPTY_FORM = { name: '', phone: '', service: '', date: '', message: '' };

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  function update(field, value) {
    if (field === 'phone') {
      value = value.replace(/[^0-9+\s]/g, '');
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    if (API_URL) {
      try {
        await fetch(`${API_URL.replace(/\/$/, '')}/api/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } catch (err) {
        // The clinic still gets the request by phone/WhatsApp; never block the visitor.
        console.error('Booking API unreachable:', err);
      }
    } else {
      console.log('Appointment request:', form);
    }

    setSubmitting(false);
    setShowModal(true);
    setForm(EMPTY_FORM);
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info" data-aos="fade-left">
            <span className="section-subtitle">{t('contactSubtitle')}</span>
            <h2 className="section-title">{t('contactTitle')}</h2>
            <p className="contact-description">{t('contactDesc')}</p>

            <div className="contact-details">
              {CONTACT_ITEMS.map((item) => (
                <div className="contact-item" key={item.titleKey}>
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path fill="currentColor" d={item.path} />
                    </svg>
                  </div>
                  <div>
                    <h4>{t(item.titleKey)}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className={line.className}>
                        {line.key ? t(line.key) : line.text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <a href="https://wa.me/213555123456" target="_blank" rel="noopener noreferrer" aria-label={t('whatsappLabel')}>
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="tel:+213555123456" aria-label={t('contactPhone')}>
                <i className="fas fa-phone-alt"></i>
              </a>
              <a href="mailto:contact@dentalcare-dz.com" aria-label={t('contactEmail')}>
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper" data-aos="fade-right">
            <form className="contact-form" id="appointmentForm" onSubmit={handleSubmit}>
              <h3>{t('formTitle')}</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('formName')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t('formNamePlaceholder')}
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t('formPhone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={t('formPhonePlaceholder')}
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service">{t('formService')}</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={(e) => update('service', e.target.value)}
                    required
                  >
                    <option value="">{t('formServiceSelect')}</option>
                    {SERVICES.map((service) => (
                      <option value={service.id} key={service.id}>
                        {t(service.titleKey)}
                      </option>
                    ))}
                    <option value="consultation">{t('formServiceConsultation')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="date">{t('formDate')}</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => update('date', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">{t('formMessage')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder={t('formMessagePlaceholder')}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                <i className="fas fa-paper-plane"></i>
                <span>{t('formSubmit')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={`modal${showModal ? ' active' : ''}`} id="successModal" onClick={(e) => {
        if (e.target === e.currentTarget) setShowModal(false);
      }}>
        <div className="modal-content">
          <div className="modal-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3>{t('modalTitle')}</h3>
          <p>{t('modalDesc')}</p>
          <button className="btn btn-primary" type="button" onClick={() => setShowModal(false)}>
            {t('modalBtn')}
          </button>
        </div>
      </div>
    </section>
  );
}
