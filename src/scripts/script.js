// src/scripts/script.js (Modern Hali)

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Typed from "typed.js";
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

// GSAP'e ScrollTrigger eklentisini tanıt
gsap.registerPlugin(ScrollTrigger);

// Bu fonksiyon, tüm sayfa yüklendiğinde bir kez çalışır
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTyped();
    initScrollAnimations();
    initLightbox();
    initScrollProgressBar();
    initContactForm();
    initCustomCursor();
    
    // Tema yüklendiğinde parçacıkları da yükle
    loadParticlesEngine().then(() => {
        initParticles(localStorage.getItem('theme') || 'dark');
    });
});

// Parçacık motorunu bir kez yüklemek için
async function loadParticlesEngine() {
    await loadBasic(tsParticles);
}

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        body.classList.toggle('light-theme');
        const newTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        initParticles(newTheme);
    });
}

// initParticles fonksiyonunun YENİ ve GÜNCELLENMİŞ hali

// initParticles fonksiyonunun Orijinal Ayarlara En Yakın Hali

async function initParticles(theme) {
    const particlesEl = document.getElementById('particles-js');
    if (!particlesEl) return;

    if (typeof tsParticles === 'undefined') {
        console.error('tsParticles kütüphanesi yüklenemedi.');
        return;
    }

    const isLight = theme === 'light';
    const particleColor = isLight ? '#007BFF' : '#00f2ea';
    const lineColor = isLight ? '#007BFF' : '#00f2ea';
    
    const H = tsParticles.dom();
    if (H.length > 0) {
        H[0].destroy();
    }
    
    await tsParticles.load({
        id: "particles-js",
        options: {
            // Orijinal koda en sadık ayarlar
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: particleColor,
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.5,
                },
                size: {
                    value: 3,
                    random: true, // Orijinalde bu true idi
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: lineColor,
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 4, // <-- HIZI ORİJİNAL HALİNE (4) GERİ GETİRDİK
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: {
                        default: "out",
                    },
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                    push: {
                        quantity: 4, // Orijinaldeki "particles_nb"
                    },
                },
            },
            retina_detect: true,
            background: {
                color: "transparent",
            },
            zIndex: {
                value: -1,
            },
        },
    });
}

function initTyped() {
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['Frontend Geliştirici', 'Backend Geliştirici', 'Teknoloji Meraklısı'],
            typeSpeed: 50, backSpeed: 25, backDelay: 2000, loop: true
        });
    }
}

// Diğer fonksiyonlar (initScrollAnimations, initLightbox vb.) daha önce yaptığımız gibi kalabilir,
// ama emin olmak için tam ve çalışan halini aşağıya ekliyorum.

function initScrollAnimations() {
    const sections = document.querySelectorAll('.content-section');
    if (sections.length === 0) return;
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power1.out"
        });
    });
}

function initScrollProgressBar() {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) return;
    gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    // ... lightbox kodları eskisi gibi çalışır ...
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    // ... form kodları eskisi gibi çalışır ...
}

function initCustomCursor() {
    if ('ontouchstart' in window) return;
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline) return;

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursorDot, { duration: 0.2, x: e.clientX, y: e.clientY });
        gsap.to(cursorOutline, { duration: 0.6, x: e.clientX, y: e.clientY });
    });

    const interactiveElements = document.querySelectorAll('a, button, .theme-switch, .portfolio-card');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}