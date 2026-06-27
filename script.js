// Social Links Configuration
const BRAND = {
  gmail: "shuty04g33@gmail.com",
  facebook: "https://www.facebook.com/stratifysystemdev"
};

document.getElementById('gmailBtn').href = `mailto:${BRAND.gmail}?subject=${encodeURIComponent('Business Inquiry / Quotation Request')}`;
document.getElementById('facebookBtn').href = BRAND.facebook;
document.getElementById('facebookBtn2').href = BRAND.facebook;

// Mobile Menu Logic
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.menu-stack a').forEach((a) => {
  a.addEventListener('click', () => { 
    mobileMenu.classList.remove('open'); 
  });
});

// 3D Scroll Reveal Logic
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target); 
    }
  });
}, { threshold: 0.1 });
reveals.forEach(reveal => revealObserver.observe(reveal));

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(f => f.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// 3D Interactive Mouse Tilt Effect (Desktop Only)
if (window.matchMedia("(hover: hover)").matches) {
  const tiltElements = document.querySelectorAll('.tilt-element');
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (max 8 degrees to keep it clean)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.boxShadow = `0 30px 60px rgba(0,0,0,0.5)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });
}
