document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library (skip gracefully if the CDN failed to load)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 100,
            duration: 800,
            easing: 'ease-out-cubic'
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (!header) {
            return;
        }
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const langToggle = document.getElementById('langToggle');
    const langToggleFlag = document.getElementById('langToggleFlag');
    const langToggleText = document.getElementById('langToggleText');

    function updateLanguageToggle(currentLang) {
        if (!langToggle || !langToggleFlag || !langToggleText) {
            return;
        }

        if (currentLang === 'ar') {
            langToggleFlag.src = 'https://flagcdn.com/w40/fr.png';
            langToggleFlag.alt = 'Français';
            langToggleText.textContent = 'FR';
            langToggle.setAttribute('aria-label', 'Switch to French');
        } else {
            langToggleFlag.src = 'https://flagcdn.com/w40/dz.png';
            langToggleFlag.alt = 'العربية';
            langToggleText.textContent = 'AR';
            langToggle.setAttribute('aria-label', 'التبديل إلى العربية');
        }
    }

    function applyTranslations(lang) {
        if (!window.translations || !window.translations[lang]) {
            return;
        }

        const t = window.translations[lang];

        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        Object.keys(t).forEach((key) => {
            const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
            elements.forEach((el) => {
                if (el.tagName.toLowerCase() === 'title') {
                    document.title = t[key];
                } else {
                    el.textContent = t[key];
                }
            });
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                el.setAttribute('placeholder', t[key]);
            }
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
            const key = el.getAttribute('data-i18n-aria-label');
            if (t[key]) {
                el.setAttribute('aria-label', t[key]);
            }
        });

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && t.metaDescription) {
            metaDescription.setAttribute('content', t.metaDescription);
        }

        updateLanguageToggle(lang);

        localStorage.setItem('site_lang', lang);
    }

    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const currentLang = document.documentElement.lang === 'fr' ? 'fr' : 'ar';
            const nextLang = currentLang === 'ar' ? 'fr' : 'ar';
            applyTranslations(nextLang);
        });
    }

    const savedLang = localStorage.getItem('site_lang') || 'ar';
    applyTranslations(savedLang);
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileToggle && navMenu) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);

    // Keep hero stats fixed to avoid distracting re-animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-count'), 10);
        if (!Number.isNaN(target)) {
            stat.textContent = target;
        }
    });

    // Appointment form handling
    const appointmentForm = document.getElementById('appointmentForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    if (appointmentForm && successModal) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData.entries());

            // Here you would normally send data to a server
            console.log('Appointment request:', data);

            // Show success modal
            successModal.classList.add('active');

            // Reset form
            appointmentForm.reset();
        });
    }

    if (closeModal && successModal) {
        closeModal.addEventListener('click', function() {
            successModal.classList.remove('active');
        });

        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gallery lightbox effect (simple)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const label = this.querySelector('.gallery-label').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${img.src}" alt="${label}">
                    <p>${label}</p>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    });

    // Add lightbox styles dynamically
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 900px;
            width: 100%;
            text-align: center;
        }
        
        .lightbox-content img {
            width: 100%;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-content p {
            color: #fff;
            margin-top: 16px;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: #fff;
            font-size: 2.5rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: var(--primary, #0ea5e9);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(lightboxStyles);

    // Phone number validation
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Allow only numbers, spaces, and +
            this.value = this.value.replace(/[^0-9+\s]/g, '');
        });
    }

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
