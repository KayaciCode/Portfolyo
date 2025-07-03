document.addEventListener('DOMContentLoaded', () => {
    // Bu fonksiyon, tüm HTML yüklendiğinde çalışır.
    // Tüm script'lerimizi bunun içine yazarak "element not found" hatalarını önleriz.

    /**
     * UYGULAMAYI BAŞLATAN ANA FONKSİYONLAR
     */
    initTheme();
    initParticles(localStorage.getItem('theme') || 'dark');
    initTyped();
    initScrollAnimations();
    initLightbox();
    initScrollProgressBar();
    initContactForm();

    /**
     * 1. TEMA DEĞİŞTİRME FONKSİYONU
     * Kaydedilmiş temayı yükler ve butona tıklandığında temayı değiştirir.
     */
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
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
            // Temayı değiştirince parçacıkları yeniden yükle
            initParticles(newTheme); 
        });
    }

    /**
     * 2. PARTİCULES.JS ARKA PLAN EFEKTİ
     * Verilen temaya göre parçacık efektini oluşturur.
     * @param {string} theme - 'light' veya 'dark'
     */
    function initParticles(theme) {
        const isLight = theme === 'light';
        const particleColor = isLight ? '#007BFF' : '#00f2ea';
        const lineColor = isLight ? '#007BFF' : '#00f2ea';

        // Eğer mevcut bir particles.js varsa, onu yok et
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
        }

        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": particleColor }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": lineColor, "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 4, "direction": "none", "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } }, "modes": { "repulse": { "distance": 100, "duration": 0.4 } } }, "retina_detect": true
        });
    }

    /**
     * 3. TYPED.JS YAZI ANİMASYONU
     * Hero bölümündeki yazıyı yazıp silme animasyonunu başlatır.
     */
    function initTyped() {
        // Typed.js kütüphanesinin yüklü olup olmadığını kontrol et
        if (typeof Typed !== 'undefined') {
            new Typed('#typed-text', {
                strings: ['Frontend Geliştirici', 'Backend Geliştirici', 'Teknoloji Meraklısı'],
                typeSpeed: 50,
                backSpeed: 25,
                backDelay: 2000,
                loop: true
            });
        }
    }

    /**
     * 4. KAYDIRMA ANİMASYONLARI
     * Bölümler ekrana girdiğinde belirmelerini sağlar (fade-in).
     */
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        const options = {
            root: null, // viewport
            threshold: 0.1, // %10'u görününce tetikle
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Bir kere göründükten sonra tekrar izlemeyi bırak
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

     /**
     * 5. SCROLL PROGRESS BAR
     * Sayfanın en üstündeki ilerleme çubuğunu günceller.
     */
    function initScrollProgressBar() {
        const progressBar = document.getElementById('scroll-progress-bar');
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            progressBar.style.transform = `scaleX(${scrollProgress / 100})`;
        });
    }


    /**
     * 6. LIGHTBOX (PROJE DETAY POPUP) MANTIĞI
     * Portfolyo kartlarındaki detay butonlarına tıklama olaylarını yönetir.
     */
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeLightboxBtn = document.getElementById('close-lightbox');
        const detailButtons = document.querySelectorAll('.details-button');

        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDesc = document.getElementById('lightbox-description');
        const lightboxDemoLink = document.getElementById('lightbox-link-demo');
        const lightboxCodeLink = document.getElementById('lightbox-link-code');

        function openLightbox(card) {
            lightboxImg.src = card.dataset.image;
            lightboxTitle.textContent = card.dataset.title;
            lightboxDesc.textContent = card.dataset.description;
            lightboxDemoLink.href = card.dataset.linkDemo;
            lightboxCodeLink.href = card.dataset.linkCode;
            lightbox.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Arka planın kaymasını engelle
        }

        function closeLightbox() {
            lightbox.classList.remove('visible');
            document.body.style.overflow = 'auto'; // Kaydırmayı geri aç
        }

        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Sayfanın en üste gitmesini engelle
                const portfolioCard = button.closest('.portfolio-card');
                openLightbox(portfolioCard);
            });
        });

        closeLightboxBtn.addEventListener('click', closeLightbox);
        // Dışarıya tıklandığında kapat
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    /**
     * 7. İLETİŞİM FORMU GÖNDERİMİ
     * Formu sayfayı yenilemeden gönderir ve kullanıcıya durum bilgisi verir.
     */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return; // Sayfada form yoksa fonksiyonu çalıştırma

        const statusEl = document.getElementById('form-status');

        async function handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            
            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    statusEl.textContent = "Mesajınız gönderildi. Teşekkürler!";
                    statusEl.style.color = "var(--accent-color)";
                    form.reset();
                } else {
                    const responseData = await response.json();
                    if (Object.hasOwn(responseData, 'errors')) {
                        statusEl.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        statusEl.textContent = "Oops! Bir sorun oluştu, form gönderilemedi.";
                    }
                    statusEl.style.color = "#ff6b6b"; // Hata rengi
                }
            } catch (error) {
                statusEl.textContent = "Oops! Bir sorun oluştu, form gönderilemedi.";
                statusEl.style.color = "#ff6b6b"; // Hata rengi
            }
        }

        form.addEventListener("submit", handleSubmit);
    }

});