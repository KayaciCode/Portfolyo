// src/scripts/script.js

// DEĞİŞİKLİK: GSAP ve ScrollTrigger'ı 'isimleriyle' (named import) içe aktarıyoruz.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Diğer kütüphaneler
import Typed from "typed.js";
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

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
    initMobileMenu();
    
    // Tema yüklendiğinde parçacıkları da yükle
    loadParticlesEngine().then(() => {
        initParticles(localStorage.getItem('theme') || 'dark');
    });
});

// Parçacık motorunu bir kez yüklemek için
async function loadParticlesEngine() {
    await loadFull(tsParticles);
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
        const H = tsParticles.dom();
        if (H.length > 0) {
            H[0].destroy();
        }
        initParticles(newTheme);
    });
}

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
    
    const existingParticles = tsParticles.dom();
    if (existingParticles.length > 0) {
        existingParticles[0].destroy();
    }
    
    await tsParticles.load({
        id: "particles-js",
        options: {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: particleColor },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                links: { enable: true, distance: 150, color: lineColor, opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false, straight: false, outModes: "out" },
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" },
                    onClick: { enable: true, mode: "push" },
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { quantity: 4 },
                },
            },
            retina_detect: true,
            background: { color: "transparent" },
            zIndex: { value: 0 },
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

    const closeLightboxBtn = lightbox.querySelector('.close-lightbox');
    const closeLightbox = () => lightbox.classList.remove('visible');

    document.addEventListener('click', (event) => {
        const detailsButton = event.target.closest('.details-button');
        if (!detailsButton) return;

        event.preventDefault();
        const card = detailsButton.closest('.portfolio-card');
        if (!card) return;

        const title = card.dataset.title;
        const image = card.dataset.image;
        const description = card.dataset.description;
        const linkDemo = card.dataset.linkDemo;
        const linkCode = card.dataset.linkCode;

        lightbox.querySelector('#lightbox-title').textContent = title;
        lightbox.querySelector('#lightbox-img').src = image;
        lightbox.querySelector('#lightbox-description').textContent = description;
        
        const linksContainer = lightbox.querySelector('#lightbox-links');
        linksContainer.innerHTML = '';

        if (linkDemo) {
            const demoButton = document.createElement('a');
            demoButton.href = linkDemo;
            demoButton.target = '_blank';
            demoButton.className = 'contact-button';
            demoButton.innerHTML = '<i class="fas fa-external-link-alt"></i> Canlı Demo';
            linksContainer.appendChild(demoButton);
        }
        if (linkCode) {
            const codeButton = document.createElement('a');
            codeButton.href = linkCode;
            codeButton.target = '_blank';
            codeButton.className = 'contact-button secondary';
            codeButton.innerHTML = '<i class="fab fa-github"></i> Kodu Gör';
            linksContainer.appendChild(codeButton);
        }

        lightbox.classList.add('visible');
    });

    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeLightbox();
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const status = document.getElementById('form-status');
    if (!status) return;

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            status.innerHTML = "Gönderiliyor...";
            status.style.color = 'var(--text-muted-color)';
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                status.innerHTML = "Teşekkürler! Mesajınız gönderildi.";
                status.style.color = 'var(--accent-color)';
                form.reset();
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    status.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! Bir hata oluştu, mesaj gönderilemedi.";
                }
                status.style.color = '#ff4d4d';
            }
        } catch (error) {
            status.innerHTML = "Oops! Bir hata oluştu, mesaj gönderilemedi.";
            status.style.color = '#ff4d4d';
        }
    }
    form.addEventListener("submit", handleSubmit);
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
}function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const nav = document.getElementById('main-nav');

    if (!hamburgerBtn || !nav || !closeMenuBtn) {
        return;
    }

    // Hamburger'a tıklayınca menüyü aç
    hamburgerBtn.addEventListener('click', () => {
        document.body.classList.add('mobile-menu-open');
    });

    // Kapatma butonuna tıklayınca menüyü kapat
    closeMenuBtn.addEventListener('click', () => {
        document.body.classList.remove('mobile-menu-open');
    });

    // Bir menü linkine tıklayınca da menüyü kapat (tek sayfa navigasyonu için kullanışlı)
    nav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            document.body.classList.remove('mobile-menu-open');
        }
    });
}