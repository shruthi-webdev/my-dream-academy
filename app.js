
gsap.registerPlugin(ScrollTrigger);


class LoadingScreen {
    constructor() {
        this.counter = document.getElementById('loaderCounter');
        this.bar = document.getElementById('loaderBar');
        this.loader = document.getElementById('pageLoader');
        this.progress = 0;
        this.init();
    }

    init() {
        document.body.style.overflow = 'hidden';
        this.animate();
    }

    animate() {
        const interval = setInterval(() => {
            this.progress += Math.random() * 12 + 3;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                this.complete();
            }
            this.counter.textContent = Math.floor(this.progress);
            this.bar.style.width = this.progress + '%';
        }, 80);
    }

    complete() {
        setTimeout(() => {
            this.loader.classList.add('loaded');
            document.body.style.overflow = '';

          
            setTimeout(() => {
                heroAnimations();
            }, 300);
        }, 600);
    }
}


class CustomCursor {
    constructor() {
        this.dot = document.getElementById('cursorDot');
        this.outline = document.getElementById('cursorOutline');
        if (!this.dot || !this.outline) return;
        if ('ontouchstart' in window || window.innerWidth <= 768) {
            this.dot.style.display = 'none';
            this.outline.style.display = 'none';
            return;
        }
        this.mouseX = 0;
        this.mouseY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

     
        const interactiveElements = document.querySelectorAll(
            'a, button, .program-card, .coach-card, .specialized-card, .testimonial-card, .stat-card, .contact-btn, .achievement-card, input, select, textarea'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.dot.classList.add('active');
                this.outline.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                this.dot.classList.remove('active');
                this.outline.classList.remove('active');
            });
        });

        document.addEventListener('mouseleave', () => {
            this.dot.style.opacity = '0';
            this.outline.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.dot.style.opacity = '1';
            this.outline.style.opacity = '1';
        });

        this.render();
    }

    render() {

        this.dotX += (this.mouseX - this.dotX) * 0.2;
        this.dotY += (this.mouseY - this.dotY) * 0.2;
        this.outlineX += (this.mouseX - this.outlineX) * 0.08;
        this.outlineY += (this.mouseY - this.outlineY) * 0.08;

        this.dot.style.left = this.dotX + 'px';
        this.dot.style.top = this.dotY + 'px';
        this.outline.style.left = this.outlineX + 'px';
        this.outline.style.top = this.outlineY + 'px';

        requestAnimationFrame(() => this.render());
    }
}


class MagneticButtons {
    constructor() {
        if ('ontouchstart' in window || window.innerWidth <= 768) return;
        this.buttons = document.querySelectorAll('.magnetic-btn');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }
}


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
    }

    setupScrollEffect() {
        ScrollTrigger.create({
            start: 'top -100',
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === 1 || self.progress > 0) {
                    this.nav.classList.add('scrolled');
                }
                if (self.progress === 0) {
                    this.nav.classList.remove('scrolled');
                }
            }
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
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
            this.hamburgerBtn.addEventListener('click', () => this.toggleSidebar());
            if (this.sidebarClose) {
                this.sidebarClose.addEventListener('click', () => this.closeSidebar());
            }
            if (this.sidebarOverlay) {
                this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
            }
            this.sidebarLinks.forEach(link => {
                link.addEventListener('click', () => this.closeSidebar());
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) this.closeSidebar();
            });
        }
    }

    toggleSidebar() {
        this.isOpen ? this.closeSidebar() : this.openSidebar();
    }

    openSidebar() {
        this.isOpen = true;
        this.hamburgerBtn.classList.add('active');
        this.sidebar.classList.add('active');
        this.sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

   
        gsap.fromTo('.sidebar-link',
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.2 }
        );
    }

    closeSidebar() {
        this.isOpen = false;
        this.hamburgerBtn.classList.remove('active');
        this.sidebar.classList.remove('active');
        this.sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}


function heroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2
    })
        .to('.hero-tagline', {
            opacity: 1,
            y: 0,
            duration: 1,
        }, '-=0.7')
        .to('.hero-vision', {
            opacity: 1,
            y: 0,
            duration: 1,
        }, '-=0.6')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.5');

    gsap.to('.hero-background video, .hero-background img, .hero-bg-fallback', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        }
    });
}


class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.revealElements();
        this.animateStats();
        this.animateSections();
    }

    revealElements() {
        
        gsap.utils.toArray('.reveal-text').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        gsap.utils.toArray('.reveal-up').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        gsap.utils.toArray('.reveal-scale').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });

        
        gsap.utils.toArray('.reveal-left').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });

        
        gsap.utils.toArray('.reveal-right').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
            ScrollTrigger.create({
                trigger: num,
                start: 'top 85%',
                once: true,
                onEnter: () => this.countUp(num)
            });
        });
    }

    countUp(element) {
        const text = element.textContent;
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        const duration = 2;

        gsap.fromTo(element,
            { innerText: 0 },
            {
                innerText: target,
                duration: duration,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function () {
                    element.textContent = Math.floor(element.innerText) + suffix;
                }
            }
        );
    }

    animateSections() {
       
        ScrollTrigger.create({
            trigger: '.specialized-grid',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                const cards = gsap.utils.toArray('.specialized-card');
        
                if(cards[0]) {
                    gsap.fromTo(cards[0], 
                        { x: -150, y: 50, opacity: 0 }, 
                        { x: 0, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
                    );
                }
                if(cards[1]) {
                    gsap.fromTo(cards[1], 
                        { y: 150, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
                    );
                }
                if(cards[2]) {
                    gsap.fromTo(cards[2], 
                        { x: 150, y: 50, opacity: 0 }, 
                        { x: 0, y: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: 'power3.out' }
                    );
                }
            }
        });

        ScrollTrigger.create({
            trigger: '.programs-grid',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to('.program-card', {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            }
        });

     
        ScrollTrigger.create({
            trigger: '.coaches-wrapper',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to('.coach-card', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out'
                });
            }
        });

        ScrollTrigger.create({
            trigger: '.achievements-wrapper',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to('.achievement-card', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out'
                });
            }
        });

  
        const testSection = document.querySelector('#testimonials');
        if (testSection) {
            const cards = testSection.querySelectorAll('.testimonial-card');
            
            if (window.innerWidth > 768) {
                
                gsap.set(cards, { opacity: 1 });
                
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: testSection,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
                
                const centerIndex = (cards.length - 1) / 2;
                const distance = 120; 

                cards.forEach((card, i) => {
                    const offset = i - centerIndex;
                    const initialX = offset * distance;
                  
                    tl.fromTo(card, { x: initialX }, { x: 0, duration: 1, ease: 'none' }, 0);
                    
                    
                    tl.to(card, { x: initialX, duration: 1, ease: 'none' }, 1);
                });
            } else {
             
                ScrollTrigger.create({
                    trigger: testSection,
                    start: 'top 80%',
                    once: true,
                    onEnter: () => {
                        gsap.fromTo(cards, 
                            { opacity: 0, y: 40 },
                            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
                        );
                    }
                });
            }
        }

        ScrollTrigger.create({
            trigger: '.contact-content',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to('.contact-item', {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            }
        });

        gsap.utils.toArray('.section-label').forEach(label => {
            gsap.to(label, {
                x: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: label,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }
}

class SwiperManager {
    constructor() {
        this.init();
    }

    init() {
        this.initCoachesSwiper();
        this.initAchievementsSwiper();
    }

    initCoachesSwiper() {
        new Swiper('.coaches-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.coaches-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.coaches-swiper .swiper-button-next',
                prevEl: '.coaches-swiper .swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
            speed: 800,
            grabCursor: true,
        });
    }

    initAchievementsSwiper() {
        new Swiper('.achievements-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.achievements-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.achievements-swiper .swiper-button-next',
                prevEl: '.achievements-swiper .swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
            speed: 800,
            grabCursor: true,
        });
    }
}

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
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

class ButtonManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupExploreButton();
        this.setupEnrollButton();
        this.setupHeroCTA();
        this.setupSpecializedProgramButtons();
    }

    setupExploreButton() {
        const exploreBtn = document.querySelector('.btn--explore');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                const section = document.querySelector('#specialized');
                if (section) {
                    window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
                }
            });
        }
    }

    setupEnrollButton() {
        const enrollBtn = document.querySelector('.btn--enroll');
        if (enrollBtn) {
            enrollBtn.addEventListener('click', () => {
                const section = document.querySelector('#contact');
                if (section) {
                    window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
                }
            });
        }
    }

    setupHeroCTA() {
        const heroCTA = document.querySelector('.hero-cta');
        if (heroCTA) {
            heroCTA.addEventListener('click', () => {
                const section = document.querySelector('#contact');
                if (section) {
                    window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
                }
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
                if (programCard) {
                    if (programCard.querySelector('.gym-program') || programCard.querySelector('.specialized-background.gym-program') || programCard.classList.toString().includes('gym')) programName = 'fitness';
                    else if (programCard.querySelector('.badminton-program') || programCard.classList.toString().includes('badminton')) programName = 'badminton';
                    else if (programCard.querySelector('.karate-program') || programCard.classList.toString().includes('karate')) programName = 'karate';

                    const bg = programCard.querySelector('.specialized-background');
                    if (bg) {
                        if (bg.classList.contains('gym-program')) programName = 'fitness';
                        else if (bg.classList.contains('badminton-program')) programName = 'badminton';
                        else if (bg.classList.contains('karate-program')) programName = 'karate';
                    }
                }

                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    window.scrollTo({ top: contactSection.offsetTop - 80, behavior: 'smooth' });
                    setTimeout(() => {
                        const programSelect = contactSection.querySelector('select');
                        if (programSelect) {
                            programSelect.value = programName;
                        }
                    }, 800);
                }
            });
        });
    }
}

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

        const nameInput = this.form.querySelector('input[type="text"]');
        const emailInput = this.form.querySelector('input[type="email"]');
        const programSelect = this.form.querySelector('select');

        if (!nameInput.value || !emailInput.value || !programSelect.value) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        this.showMessage('Thank you for your interest! We\'ll contact you soon.', 'success');
        this.form.reset();
    }

    showMessage(message, type) {
        const existing = this.form.querySelector('.form-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message';
        msg.textContent = message;
        msg.style.cssText = `
            padding: 14px 18px;
            border-radius: 12px;
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 14px;
            ${type === 'success'
                ? 'background: rgba(200, 255, 0, 0.1); color: #c8ff00; border: 1px solid rgba(200, 255, 0, 0.2);'
                : 'background: rgba(255, 84, 89, 0.1); color: #ff5459; border: 1px solid rgba(255, 84, 89, 0.2);'
            }
        `;
        this.form.insertBefore(msg, this.form.firstChild);

        setTimeout(() => {
            if (msg.parentNode) {
                gsap.to(msg, { opacity: 0, y: -10, duration: 0.3, onComplete: () => msg.remove() });
            }
        }, 5000);
    }
}

class VideoBackground {
    constructor() {
        this.video = document.getElementById('heroVideo');
        this.init();
    }

    init() {
        if (!this.video) return;

        this.video.addEventListener('error', () => {
            this.video.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'hero-bg-fallback';
            fallback.style.cssText = `
                width: 100%; height: 100%;
                background-image: url('https://i.postimg.cc/wvHG8xLJ/court-final.jpg');
                background-size: cover; background-position: center;
            `;
            this.video.parentElement.insertBefore(fallback, this.video);
        });

    }
}

class DragScroll {
    constructor() {
        this.container = document.querySelector('.programs-grid');
        if (!this.container) return;
        this.init();
    }

    init() {
        let isDown = false;
        let startX;
        let scrollLeft;

        this.container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - this.container.offsetLeft;
            scrollLeft = this.container.scrollLeft;
            this.container.style.cursor = 'grabbing';
        });

        this.container.addEventListener('mouseleave', () => {
            isDown = false;
            this.container.style.cursor = 'grab';
        });

        this.container.addEventListener('mouseup', () => {
            isDown = false;
            this.container.style.cursor = 'grab';
        });

        this.container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - this.container.offsetLeft;
            const walk = (x - startX) * 1.5;
            this.container.scrollLeft = scrollLeft - walk;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();

    new CustomCursor();
    new MagneticButtons();
    new Navigation();
    new SwiperManager();
    new SmoothScroll();
    new ButtonManager();
    new ContactForm();
    new VideoBackground();
    new DragScroll();

    setTimeout(() => {
        new ScrollAnimations();
    }, 100);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
        gsap.globalTimeline.timeScale(100);
    }

    console.log('⚡ My Dream Academy — Premium Experience Loaded');
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();

        const dot = document.getElementById('cursorDot');
        const outline = document.getElementById('cursorOutline');
        if (dot && outline) {
            if (window.innerWidth <= 768) {
                dot.style.display = 'none';
                outline.style.display = 'none';
            } else {
                dot.style.display = '';
                outline.style.display = '';
            }
        }
    }, 250);
});
