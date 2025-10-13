// Enhanced Navigation functionality with Sidebar
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.hamburgerBtn = document.querySelector('.hamburger-btn');
        this.sidebar = document.querySelector('.sidebar');
        this.sidebarOverlay = document.querySelector('.sidebar-overlay');
        this.sidebarClose = document.querySelector('.sidebar-close');
        this.sidebarLinks = document.querySelectorAll('.sidebar-link');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupActiveLinks();
        this.setupSidebar();
        this.setupTouchInteractions();
    }

    setupScrollEffect() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.nav.style.background = 'rgba(255, 255, 255, 0.98)';
                this.nav.style.boxShadow = 'var(--shadow-lg)';
            } else {
                this.nav.style.background = 'rgba(255, 255, 255, 0.95)';
                this.nav.style.boxShadow = 'none';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            this.sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (current && link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupSidebar() {
        if (this.hamburgerBtn) {
            // Toggle sidebar on hamburger click
            this.hamburgerBtn.addEventListener('click', () => {
                this.toggleSidebar();
            });

            // Close sidebar on close button click
            if (this.sidebarClose) {
                this.sidebarClose.addEventListener('click', () => {
                    this.closeSidebar();
                });
            }

            // Close sidebar on overlay click
            if (this.sidebarOverlay) {
                this.sidebarOverlay.addEventListener('click', () => {
                    this.closeSidebar();
                });
            }

            // Auto-close sidebar when clicking navigation links
            this.sidebarLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeSidebar();
                });
            });

            // Close sidebar on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeSidebar();
                }
            });

            // Handle window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 1024 && this.isOpen) {
                    this.closeSidebar();
                }
            });
        }
    }

    toggleSidebar() {
        if (this.isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        this.isOpen = true;
        this.hamburgerBtn.classList.add('active');
        this.sidebar.classList.add('active');
        this.sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        this.isOpen = false;
        this.hamburgerBtn.classList.remove('active');
        this.sidebar.classList.remove('active');
        this.sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupTouchInteractions() {
        // Improve touch interactions for mobile devices
        if ('ontouchstart' in window) {
            // Add touch class for CSS targeting
            document.body.classList.add('touch-device');
            
            // Prevent zoom on double tap for buttons
            const buttons = document.querySelectorAll('.btn, .contact-btn');
            buttons.forEach(button => {
                button.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    button.click();
                });
            });
        }
    }
}

// Swiper configurations
class SwiperManager {
    constructor() {
        this.init();
    }

    init() {
        this.initCoachesSwiper();
        this.initTestimonialsSwiper();
        this.initAchievementsSwiper();
        this.initFacilitiesSwiper();
    }

    initCoachesSwiper() {
        new Swiper('.coaches-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.coaches-swiper .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.coaches-swiper .swiper-button-next',
                prevEl: '.coaches-swiper .swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
            effect: 'slide',
            speed: 600,
            grabCursor: true,
        });
    }

    initTestimonialsSwiper() {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.testimonials-swiper .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.testimonials-swiper .swiper-button-next',
                prevEl: '.testimonials-swiper .swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
            effect: 'slide',
            speed: 800,
            grabCursor: true,
            // Add special effects for testimonials
            on: {
                slideChangeTransitionStart: function() {
                    // Animate stars on slide change
                    const activeSlide = this.slides[this.activeIndex];
                    const stars = activeSlide.querySelectorAll('.star.active');
                    stars.forEach((star, index) => {
                        setTimeout(() => {
                            star.style.transform = 'scale(1.3)';
                            setTimeout(() => {
                                star.style.transform = 'scale(1)';
                            }, 200);
                        }, index * 100);
                    });
                },
            },
        });
    }

    initAchievementsSwiper() {
        new Swiper('.achievements-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.achievements-swiper .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.achievements-swiper .swiper-button-next',
                prevEl: '.achievements-swiper .swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
            effect: 'slide',
            speed: 600,
            grabCursor: true,
        });
    }

    initFacilitiesSwiper() {
        new Swiper('.facilities-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.facilities-swiper .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.facilities-swiper .swiper-button-next',
                prevEl: '.facilities-swiper .swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
            },
            effect: 'slide',
            speed: 600,
            grabCursor: true,
        });
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Enhanced button functionality
class ButtonManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupExploreButton();
        this.setupEnrollButton();
        this.setupContactButtons();
        this.setupSpecializedProgramButtons();
    }

    setupExploreButton() {
        const exploreBtn = document.querySelector('.btn--explore');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                const specializedSection = document.querySelector('#specialized');
                if (specializedSection) {
                    const offsetTop = specializedSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    setupEnrollButton() {
        const enrollBtn = document.querySelector('.btn--enroll');
        if (enrollBtn) {
            enrollBtn.addEventListener('click', () => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    setupContactButtons() {
        const phoneBtn = document.querySelector('.phone-btn');
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        
        if (phoneBtn) {
            phoneBtn.addEventListener('click', (e) => {
                // Analytics tracking would go here
                console.log('Phone button clicked');
            });
        }
        
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                // Analytics tracking would go here
                console.log('WhatsApp button clicked');
            });
        }
    }

    setupSpecializedProgramButtons() {
        const programCTAs = document.querySelectorAll('.program-cta');
        
        programCTAs.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const programCard = btn.closest('.specialized-card');
                let programName = 'Unknown';
                
                if (programCard.classList.contains('gym-program')) {
                    programName = 'Gym';
                } else if (programCard.classList.contains('badminton-program')) {
                    programName = 'Badminton';
                } else if (programCard.classList.contains('karate-program')) {
                    programName = 'Karate';
                }
                
                // Scroll to contact section
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Pre-fill the form if elements exist
                    setTimeout(() => {
                        const programSelect = contactSection.querySelector('select');
                        if (programSelect) {
                            const optionValue = programName.toLowerCase();
                            const option = programSelect.querySelector(`option[value="${optionValue}"]`);
                            if (option) {
                                programSelect.value = optionValue;
                            }
                        }
                    }, 1000);
                }
                
                console.log(`${programName} program CTA clicked`);
            });
        });
    }
}

// Form handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {};
        
        // Collect form data
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Get form values manually since FormData might not work with our form structure
        const nameInput = this.form.querySelector('input[type="text"]');
        const emailInput = this.form.querySelector('input[type="email"]');
        const programSelect = this.form.querySelector('select');
        const messageTextarea = this.form.querySelector('textarea');
        
        const submissionData = {
            name: nameInput.value,
            email: emailInput.value,
            program: programSelect.value,
            message: messageTextarea.value
        };
        
        // Validate required fields
        if (!submissionData.name || !submissionData.email || !submissionData.program) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show success message
        this.showMessage('Thank you for your interest! We\'ll contact you soon.', 'success');
        
        // Reset form
        this.form.reset();
        
        // Log the submission (in a real app, this would be sent to a server)
        console.log('Form submitted:', submissionData);
    }

    showMessage(message, type) {
        // Remove any existing message
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message--${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: var(--space-12) var(--space-16);
            border-radius: var(--radius-base);
            margin-bottom: var(--space-16);
            font-weight: var(--font-weight-medium);
            ${type === 'success' 
                ? 'background: var(--color-bg-3); color: var(--color-success); border: 1px solid var(--color-success);'
                : 'background: var(--color-bg-4); color: var(--color-error); border: 1px solid var(--color-error);'
            }
        `;
        
        this.form.insertBefore(messageElement, this.form.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Advanced Scroll Animations and Effects
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollObserver();
        this.setupStatsAnimation();
        this.setupParallaxEffect();
        this.setupTypewriterEffect();
        this.setupMorphingAnimations();
    }

    setupScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(this.handleIntersection.bind(this), observerOptions);
        
        // Observe elements that should animate on scroll
      
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.9)';
            el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    setupParallaxEffect() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    setupTypewriterEffect() {
        const typewriterElement = document.querySelector('.typewriter-text');
        if (typewriterElement && typewriterElement.dataset.text) {
            const text = typewriterElement.dataset.text;
            typewriterElement.innerHTML = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    typewriterElement.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        typewriterElement.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing after a delay
            setTimeout(typeWriter, 2000);
        }
    }

 
    setupStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(num => statObserver.observe(num));
    }
    
    animateNumber(element) {
        const target = element.textContent.replace(/[^0-9]/g, '');
        const targetNum = parseInt(target);
        const duration = 2000;
        const step = targetNum / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current >= targetNum) {
                element.textContent = element.textContent.replace(/[0-9]+/, targetNum.toString());
                return;
            }
            element.textContent = element.textContent.replace(/[0-9]+/, Math.floor(current).toString());
            requestAnimationFrame(updateNumber);
        };
        
        updateNumber();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add special effects for different elements
                if (entry.target.classList.contains('program-card')) {
                    entry.target.style.transform += ' rotateY(0deg)';
                }
                
                if (entry.target.classList.contains('specialized-card')) {
                    // Add subtle glow effect for specialized cards
                    entry.target.style.boxShadow = 'var(--shadow-lg), 0 0 30px rgba(255, 215, 0, 0.1)';
                }
                
                if (entry.target.classList.contains('section-title')) {
                    // Trigger glow effect
                    entry.target.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
                }
            }
        });
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalImages();
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalImages() {
        const criticalImages = [
            'https://pplx-res.cloudinary.com/image/upload/v1760203816/pplx_project_search_images/75899dde759f76f4f6cc800434363c72a3aa6f30.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// Dynamic Cursor Effects
class CursorEffects {
    constructor() {
        if ('ontouchstart' in window) return; // Skip on touch devices
        this.init();
    }

    init() {
        // Create custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Special effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .program-card, .coach-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)'; // Reduced from scale(2)
                cursor.style.background = 'var(--color-gold)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--color-primary)';
            });
        });
    }
}

// Innovative Loading Screen
class LoadingManager {
    constructor() {
        this.init();
    }

    init() {
        // Create loading screen
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-shuttlecock">🏸</div>
                <div class="loader-text">Loading My Dream Academy...</div>
                <div class="loader-progress">
                    <div class="loader-bar"></div>
                </div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, var(--color-primary), var(--color-gold));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        `;
        
        document.body.prepend(loader);
        document.body.style.overflow = 'hidden';

        
        // Simulate loading progress
        let progress_val = 0;
        const interval = setInterval(() => {
            progress_val += Math.random() * 30;
            if (progress_val >= 100) {
                progress_val = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.visibility = 'hidden';
                    document.body.style.overflow = '';
                    
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }, 500);
            }
            bar.style.width = progress_val + '%';
        }, 200);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen first
    new LoadingManager();
    
    // Initialize core functionality
    new Navigation();
    new SwiperManager();
    new SmoothScroll();
    new ButtonManager();
    new ContactForm();
    new ScrollAnimations();
    new PerformanceOptimizer();
    new CursorEffects();
    
    // Add loading complete class for any CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2000);
    
    // Mobile-specific optimizations
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
        // Disable complex hover effects on mobile
        document.body.classList.add('mobile-hover-disabled');
    }
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
        // Disable complex animations for accessibility
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('My Dream Academy website initialized with innovative features!');
});

// Advanced Performance and Interaction Optimizations
class AdvancedOptimizations {
    constructor() {
        this.init();
    }

    init() {
        this.setupGestureRecognition();
        this.setupPreloadingStrategy();
        this.setupPWAFeatures();
    }

    setupGestureRecognition() {
        if ('ontouchstart' in window) {
            let touchStartX = 0;
            let touchStartY = 0;
            
            document.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            });
            
            document.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const diffX = touchStartX - touchEndX;
                const diffY = touchStartY - touchEndY;
                
                // Detect swipe gestures
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (Math.abs(diffX) > 100) {
                        if (diffX > 0) {
                            // Left swipe - open sidebar
                            const nav = document.querySelector('.nav');
                            if (nav && nav.navigation) {
                                nav.navigation.openSidebar();
                            }
                        } else {
                            // Right swipe - close sidebar
                            const nav = document.querySelector('.nav');
                            if (nav && nav.navigation) {
                                nav.navigation.closeSidebar();
                            }
                        }
                    }
                }
            });
        }
    }

    setupPreloadingStrategy() {
        // Preload critical resources
        const criticalImages = [
            'https://pplx-res.cloudinary.com/image/upload/v1760203816/pplx_project_search_images/75899dde759f76f4f6cc800434363c72a3aa6f30.png'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        // Preload next section content when user approaches
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const nextSection = entry.target.nextElementSibling;
                    if (nextSection && nextSection.tagName === 'SECTION') {
                        // Preload images in next section
                        const images = nextSection.querySelectorAll('img[data-src]');
                        images.forEach(img => {
                            if (!img.src && img.dataset.src) {
                                img.src = img.dataset.src;
                            }
                        });
                    }
                }
            });
        }, { rootMargin: '200px' });
        
        sections.forEach(section => sectionObserver.observe(section));
    }

    setupPWAFeatures() {
        // Add to homescreen prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show custom install button after user explores the site
            setTimeout(() => {
                if (deferredPrompt) {
                    const installBtn = document.createElement('button');
                    installBtn.className = 'install-btn';
                    installBtn.innerHTML = '📱 Install App';
                    installBtn.style.cssText = `
                        position: fixed;
                        bottom: 100px;
                        right: 20px;
                        background: var(--color-primary);
                        color: white;
                        border: none;
                        padding: 12px 16px;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        z-index: 1000;
                        animation: slideInUp 0.5s ease;
                    `;
                    
                    installBtn.addEventListener('click', async () => {
                        deferredPrompt.prompt();
                        const result = await deferredPrompt.userChoice;
                        deferredPrompt = null;
                        installBtn.remove();
                    });
                    
                    document.body.appendChild(installBtn);
                }
            }, 5000);
        });
    }
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Update mobile class based on screen size
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
        
        // Re-initialize Swiper instances if needed
        const swipers = document.querySelectorAll('.swiper');
        swipers.forEach(swiper => {
            if (swiper.swiper) {
                swiper.swiper.update();
            }
        });
        
        console.log('Window resized, optimizations updated');
    }, 250);
});

// Initialize advanced optimizations after initial load
setTimeout(() => {
    new AdvancedOptimizations();
}, 3000);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Enhanced Service Worker and PWA Features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log(' My Dream Academy - Ultimate Sports Academy Experience Loaded!');
        console.log(' Features: Sidebar Navigation | Innovative Animations | Smart Testimonials');
        console.log(' Optimized for Performance and Accessibility');
    });
}

// Add CSS for ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(rippleStyles);
