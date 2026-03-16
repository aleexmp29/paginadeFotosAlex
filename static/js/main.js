document.addEventListener('DOMContentLoaded', () => {
    // --- Lando Norris Style Smooth Scroll (Lenis) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
    });

    const heroContent = document.getElementById('hero-content');
    const heroBg = document.querySelector('.hero-bg-image');
    const heroSection = document.getElementById('hero-section');

    lenis.on('scroll', (e) => {
        // Parallax Effect for Hero
        if (heroContent && heroBg) {
            const scrollY = window.scrollY;
            heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
            heroBg.style.transform = `translateY(${scrollY * 0.15}px) scale(1.05)`;
        }
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // ------------------------------------------------
    const nav = document.querySelector('nav');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove the initial hidden states
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                obs.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bento-item, .video-card, .section-title, .reveal').forEach((item, index) => {
        item.style.opacity = '0';
        // Add a slight scale and heavier Y translation like Lando's site
        item.style.transform = 'translateY(60px) scale(0.98)';
        // Stagger the transition if elements are on the same line
        item.style.transition = `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${index % 4 * 0.1}s`;
        observer.observe(item);
    });

    // Gallery Logic
    const galleryTriggers = document.querySelectorAll('.gallery-trigger');
    const lightbox = document.getElementById('gallery-lightbox');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryLoader = document.getElementById('gallery-loader');
    const galleryTitle = document.querySelector('.lightbox-title');

    if (galleryTriggers.length > 0 && lightbox) {
        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('click', async () => {
                const category = trigger.dataset.category;

                // Set title
                const titles = {
                    'deporte': 'GALERÍA DE DEPORTE',
                    'sesiones': 'GALERÍA DE SESIONES',
                    'eventos': 'GALERÍA DE EVENTOS',
                    'empresas': 'GALERÍA DE EMPRESAS'
                };
                galleryTitle.textContent = titles[category] || 'GALERÍA';

                // Open Lightbox
                lightbox.classList.add('active');

                // Show loader & clear previous items
                galleryLoader.style.display = 'block';
                galleryGrid.innerHTML = '';

                try {
                    const res = await fetch(`/api/gallery/${category}`);
                    const images = await res.json();

                    galleryLoader.style.display = 'none';

                    if (images.length === 0) {
                        galleryGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No hay fotos disponibles en esta categoría.</p>';
                        return;
                    }

                    images.forEach((src) => {
                        const img = document.createElement('img');
                        img.src = src;
                        img.className = 'gallery-item';
                        img.loading = 'lazy';
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.8s ease';

                        img.onload = () => {
                            img.style.opacity = '1';
                        };

                        galleryGrid.appendChild(img);
                    });
                } catch (error) {
                    console.error("Error fetching gallery: ", error);
                    galleryLoader.style.display = 'none';
                    galleryGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: red;">Error cargando galería.</p>';
                }
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        // Close on click outside
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Video Play on Hover & Custom Lightbox Open
    const videoCards = document.querySelectorAll('.video-card');
    const videoLightbox = document.getElementById('video-lightbox');
    const lightboxVideoPlayer = document.getElementById('lightbox-video-player');
    const closeVideoBtn = document.getElementById('close-video-btn');

    videoCards.forEach(card => {
        const video = card.querySelector('.portfolio-video');
        if (video) {
            // Hover to play preview silently
            card.addEventListener('mouseenter', () => {
                video.play().catch(e => console.error("Video play failed:", e));
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // resetting 
            });

            // Click to open custom vertical lightbox with audio
            card.addEventListener('click', () => {
                if (videoLightbox && lightboxVideoPlayer) {
                    const src = video.getAttribute('src');
                    lightboxVideoPlayer.src = src;
                    videoLightbox.classList.add('active');
                    // wait a tick for display to become flex before playing
                    setTimeout(() => {
                        lightboxVideoPlayer.play().catch(e => console.error("Lightbox Video play failed:", e));
                    }, 50);
                }
            });
        }
    });

    if (videoLightbox && closeVideoBtn && lightboxVideoPlayer) {
        closeVideoBtn.addEventListener('click', () => {
            videoLightbox.classList.remove('active');
            lightboxVideoPlayer.pause();
            lightboxVideoPlayer.src = "";
        });

        // Close on click outside
        videoLightbox.addEventListener('click', (e) => {
            if (e.target === videoLightbox || e.target.classList.contains('lightbox-content')) {
                videoLightbox.classList.remove('active');
                lightboxVideoPlayer.pause();
                lightboxVideoPlayer.src = "";
            }
        });
    }

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.transform = `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))`;

            cursorOutline.animate({
                transform: `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))`
            }, { duration: 500, fill: 'forwards', easing: 'ease-out' });
        });

        const interactives = document.querySelectorAll('a, .gallery-trigger, .video-card, .hero-title, button');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.backgroundColor = 'transparent';
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(223, 255, 0, 0.15)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.backgroundColor = 'var(--accent)';
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // 3D Parallax & Topography Background Effect
    const canvas = document.getElementById('hero-canvas');

    if (heroSection && heroContent) {
        // Smooth 3D Move
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            const rotateX = -y * 10;
            const rotateY = x * 10;
            const moveX = x * 20;
            const moveY = y * 20;

            requestAnimationFrame(() => {
                heroContent.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                if (heroBg) heroBg.style.transform = `translate(${-moveX}px, ${-moveY}px) scale(1.05)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                heroContent.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
                if (heroBg) heroBg.style.transform = `translate(0px, 0px) scale(1)`;
            });
        });

        // Interactive Topography Animation via Canvas
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let time = 0;

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resize);
            resize();

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                ctx.lineWidth = 1;

                // Draw multiple topographic sine waves
                for (let j = -20; j <= 20; j++) {
                    ctx.beginPath();
                    for (let x = 0; x <= canvas.width; x += 30) {
                        const yBase = canvas.height / 2 + j * 50;
                        const yOffset1 = Math.sin(x * 0.002 + time) * 100;
                        const yOffset2 = Math.cos(x * 0.005 - time * 0.5 + j * 0.1) * 60;
                        const y = yBase + yOffset1 + yOffset2;

                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }

                time += 0.003;
                requestAnimationFrame(draw);
            }
            draw();
        }
    }

    // --- Light / Dark Theme Toggle (Checkbox Switch) ---
    const themeCheckbox = document.getElementById('theme-checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeCheckbox) themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinksList = document.querySelectorAll('.nav-links a');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Portfolio Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            filterItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
            }, 1000);
        }, 1200);
    }

    // --- Magnetic Buttons (Desktop only) ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const position = el.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // --- Contact Modal ---
    const contactModal = document.getElementById('contact-modal');
    const openContactModal = document.getElementById('open-contact-modal');
    const closeContactModal = document.getElementById('close-contact-modal');
    const contactForm = document.getElementById('contactForm');
    const submitBtnText = document.getElementById('submit-btn-text');

    if (openContactModal && contactModal && closeContactModal) {
        openContactModal.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
        });

        closeContactModal.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });

        // Close when clicking outside box
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
            }
        });

        // Mock Handle Form Submit
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(contactForm);
                const action = contactForm.getAttribute('action');

                submitBtnText.textContent = 'ENVIANDO...';

                fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            submitBtnText.textContent = '¡MENSAJE ENVIADO!';
                            submitBtnText.style.background = '#4CAF50';
                            submitBtnText.style.color = 'white';

                            setTimeout(() => {
                                contactModal.classList.remove('active');
                                contactForm.reset();
                                submitBtnText.textContent = 'ENVIAR MENSAJE';
                                submitBtnText.style.background = '';
                                submitBtnText.style.color = '';
                            }, 2000);
                        } else {
                            throw new Error('Error al enviar');
                        }
                    })
                    .catch(error => {
                        submitBtnText.textContent = 'ERROR AL ENVIAR';
                        submitBtnText.style.background = '#f44336';
                        submitBtnText.style.color = 'white';

                        setTimeout(() => {
                            submitBtnText.textContent = 'REINTENTAR';
                            submitBtnText.style.background = '';
                            submitBtnText.style.color = '';
                        }, 2000);
                    });
            });
        }
    }
});
