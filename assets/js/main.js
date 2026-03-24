// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.pricing-card, .feature-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle (for future implementation)
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '☰';
mobileMenuBtn.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
`;

if (window.innerWidth <= 768) {
    mobileMenuBtn.style.display = 'block';
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
    } else {
        mobileMenuBtn.style.display = 'none';
    }
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS class for fade animation
const style = document.createElement('style');
style.textContent = `
    .pricing-card, .feature-card, .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .pricing-card.fade-in, .feature-card.fade-in, .gallery-item.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .pricing-card:nth-child(1) { transition-delay: 0.1s; }
    .pricing-card:nth-child(2) { transition-delay: 0.2s; }
    .pricing-card:nth-child(3) { transition-delay: 0.3s; }
    .feature-card:nth-child(1) { transition-delay: 0.1s; }
    .feature-card:nth-child(2) { transition-delay: 0.2s; }
    .feature-card:nth-child(3) { transition-delay: 0.3s; }
    .feature-card:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);

// Form handling (if forms are added later)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted');
    });
});

console.log('MySelfie Studio - Site loaded successfully');
