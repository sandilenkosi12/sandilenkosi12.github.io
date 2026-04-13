// Loader
window.addEventListener('load', () => { setTimeout(() => { document.querySelector('.loader').classList.add('hidden'); }, 1000); });

// Typing Animation
const typingElement = document.querySelector('.typing-text');
const roles = ['Cloud Engineer', 'Web Developer', 'AWS Certified', 'Cisco Certified', 'Full Stack Developer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) { typingElement.textContent = currentRole.substring(0, charIndex - 1); charIndex--; }
    else { typingElement.textContent = currentRole.substring(0, charIndex + 1); charIndex++; }
    if (!isDeleting && charIndex === currentRole.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
    if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeEffect, 500); return; }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    setTimeout(() => { cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; }, 50);
});
document.querySelectorAll('a, button, .project-card, .skill-category, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; cursorFollower.style.transform = 'scale(1.5)'; cursorFollower.style.borderColor = 'var(--primary)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; cursorFollower.style.transform = 'scale(1)'; cursorFollower.style.borderColor = 'rgba(255,184,28,0.5)'; });
});

// Navbar Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => { if (window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled'); });

// Active Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => { const sectionTop = section.offsetTop; if (scrollY >= sectionTop - 200) current = section.getAttribute('id'); });
    navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === `#${current}`) link.classList.add('active'); });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) { e.preventDefault(); const target = document.querySelector(this.getAttribute('href')); if (target) target.scrollIntoView({ behavior: 'smooth' }); });
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinksContainer = document.querySelector('.nav-links');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        const spans = menuBtn.querySelectorAll('span');
        if (menuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '70px';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.width = '100%';
            navLinksContainer.style.background = 'var(--dark)';
            navLinksContainer.style.padding = '2rem';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            navLinksContainer.style.display = '';
        }
    });
}

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => { current += increment; if (current < target) { counter.textContent = Math.floor(current); requestAnimationFrame(updateCounter); } else counter.textContent = target; };
    updateCounter();
};
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); } }); }, observerOptions);
counters.forEach(counter => observer.observe(counter));

// Skill Bars
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { const width = entry.target.style.width; entry.target.style.width = '0'; setTimeout(() => { entry.target.style.width = width; }, 100); skillObserver.unobserve(entry.target); } }); }, observerOptions);
skillBars.forEach(bar => skillObserver.observe(bar));

// Reveal Animations
const revealElements = document.querySelectorAll('.project-card, .skill-category, .cert-card');
const revealObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; revealObserver.unobserve(entry.target); } }); }, { threshold: 0.1 });
revealElements.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; revealObserver.observe(el); });

// Resume Download

window.downloadResume = function() {
    const link = document.createElement('a');
    link.href = 'assets/Sandile_Nkosi_Resume.pdf.pdf';
    link.download = 'Sandile_Nkosi_Resume.pdf.pdf';
    link.click();
    return false;
};


console.log('%c🚀 Portfolio Loaded!', 'color: #FFB81C; font-size: 16px; font-weight; bold;');
console.log('%c👋 Welcome to Sandile Nkosi\'s Portfolio', 'color: #fff; font-size: 14px;');
console.log('%c📧 Contact: Abelnkosi2000@gmail.com', 'color: #94a3b8;');