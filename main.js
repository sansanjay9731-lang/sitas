/* ═══════════════════════════════════════════════════════════════
   SITA'S — LUXURY BEAUTY & FASHION ACADEMY
   Interactive Behaviors & Animations
   ═══════════════════════════════════════════════════════════════ */

// ─── PRELOADER ───────────────────────────────────────────────
document.body.classList.add('loading');
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
        document.body.classList.remove('loading');
    }, 800);
});

// ─── HEADER SCROLL EFFECT ────────────────────────────────────
const header = document.getElementById('main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ─── MOBILE MENU ─────────────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ─── SMOOTH SCROLL ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ─── SCROLL REVEAL (INTERSECTION OBSERVER) ───────────────────
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── HERO PARTICLES ─────────────────────────────────────────
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${6 + Math.random() * 10}s`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.width = `${1 + Math.random() * 3}px`;
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

createParticles();

// ─── STAT COUNTER ANIMATION ─────────────────────────────────
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(target * easeOut);

        el.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

// ─── TESTIMONIAL CAROUSEL ───────────────────────────────────
const testimonialTrack = document.getElementById('testimonial-track');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');
const dotsContainer = document.getElementById('testimonial-dots');

let currentSlide = 0;
const totalSlides = testimonialTrack ? testimonialTrack.children.length : 0;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

function goToSlide(index) {
    currentSlide = index;
    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    updateDots();
}

function updateDots() {
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

prevBtn?.addEventListener('click', () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    goToSlide(currentSlide);
});

nextBtn?.addEventListener('click', () => {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    goToSlide(currentSlide);
});

// Auto-advance
let autoSlideInterval = setInterval(() => {
    currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    goToSlide(currentSlide);
}, 5000);

// Pause on hover
testimonialTrack?.parentElement?.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

testimonialTrack?.parentElement?.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        goToSlide(currentSlide);
    }, 5000);
});

// ─── GALLERY FILTER ──────────────────────────────────────────
const filterBtns = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
    });
});

// ─── CONTACT FORM ────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<span>✓ Inquiry Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';

        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2500);
    }, 1500);
});

// ─── WHATSAPP BUTTON VISIBILITY ──────────────────────────────
const whatsappBtn = document.getElementById('whatsapp-float');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        whatsappBtn?.classList.add('visible');
    } else {
        whatsappBtn?.classList.remove('visible');
    }
});

// ─── HERO SLIDESHOW ──────────────────────────────────────────
const heroSlides = document.querySelectorAll('.hero-bgslide');
let currentHeroSlide = 0;

if (heroSlides.length > 1) {
    setInterval(() => {
        heroSlides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
    }, 5000); // 5 seconds per slide
}

// ─── PARALLAX ON SCROLL ──────────────────────────────────────
window.addEventListener('scroll', () => {
    if (heroSlides.length && window.scrollY < window.innerHeight) {
        const offset = window.scrollY * 0.35;
        heroSlides.forEach(slide => {
            slide.style.transform = `scale(1.1) translateY(${offset}px)`;
        });
    }
});

// ─── CURSOR GLOW EFFECT (Desktop only) ──────────────────────
if (window.matchMedia('(min-width: 1024px)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212, 168, 83, 0.06), transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.3s ease, top 0.3s ease;
  `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
}

// ─── SERVICE CARD TILT EFFECT ────────────────────────────────
if (window.matchMedia('(min-width: 1024px)').matches) {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
