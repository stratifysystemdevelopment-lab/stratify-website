// Social Links Configuration
const BRAND = {
  gmail: "stratifysystemdevelopment@gmail.com",
  facebook: "https://www.facebook.com/stratifysystemdev"
};

document.getElementById('gmailBtn').href = `mailto:${BRAND.gmail}?subject=Business Inquiry / Quotation Request`;
document.getElementById('facebookBtn').href = BRAND.facebook;

// ======== LIVE STATS & COUNTERS LOGIC ========
// 1. Total Visitors (Saves in LocalStorage to simulate growth)
let baseVisitors = parseInt(localStorage.getItem('stratify_visitors')) || 14204;
baseVisitors++; // Add 1 per page load
localStorage.setItem('stratify_visitors', baseVisitors);
document.getElementById('visitorCount').innerText = baseVisitors.toLocaleString();

// 2. Quotation Requests Tracker
let baseQuotes = parseInt(localStorage.getItem('stratify_quotes')) || 1832;
document.getElementById('quoteCount').innerText = baseQuotes.toLocaleString();

document.getElementById('quoteForm').addEventListener('submit', () => {
  baseQuotes++;
  localStorage.setItem('stratify_quotes', baseQuotes);
});

// 3. Active Users Randomizer (Fluctuates between 12 and 35)
setInterval(() => {
  let activeUsers = Math.floor(Math.random() * (35 - 12 + 1)) + 12;
  document.getElementById('activeCount').innerText = activeUsers;
}, 5000); // Changes every 5 seconds


// ======== COMMENT SECTION LOGIC ========
const commentForm = document.getElementById('commentForm');
const commentsDisplay = document.getElementById('commentsDisplay');

// Sample default comments to show it's active
let comments = JSON.parse(localStorage.getItem('stratify_comments')) || [
  { name: "John Reyes", text: "The payroll system you built for us is incredibly fast! Thanks, Degs and team." },
  { name: "Sarah M.", text: "Very professional UI design. Highly recommended for custom tools." }
];

function renderComments() {
  commentsDisplay.innerHTML = "";
  comments.slice().reverse().forEach(c => {
    let initial = c.name.charAt(0).toUpperCase();
    let commentHTML = `
      <div class="comment-item">
        <div class="comment-avatar">${initial}</div>
        <div class="comment-content">
          <h5>${c.name}</h5>
          <p>${c.text}</p>
        </div>
      </div>
    `;
    commentsDisplay.innerHTML += commentHTML;
  });
}
renderComments(); // Load initially

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let newName = document.getElementById('commentName').value;
  let newText = document.getElementById('commentText').value;

  comments.push({ name: newName, text: newText });
  localStorage.setItem('stratify_comments', JSON.stringify(comments));
  
  document.getElementById('commentName').value = "";
  document.getElementById('commentText').value = "";
  renderComments();
});


// ======== MOBILE MENU TOGGLE ========
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});


// ======== JS TAB SYSTEM (SPA ROUTING) ========
const tabLinks = document.querySelectorAll('.tab-link');
const tabPages = document.querySelectorAll('.tab-page');

tabLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); 
    const targetId = link.getAttribute('data-target');
    
    tabPages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(`tab-${targetId}`);
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.menu a, .menu-stack a').forEach(a => a.classList.remove('active-link'));
    document.querySelectorAll(`.tab-link[data-target="${targetId}"]`).forEach(activeLink => activeLink.classList.add('active-link'));

    mobileMenu.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    resetScrollAnimations();
  });
});


// ======== SCROLL REVEAL 3D ANIMATION ========
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1 });

function resetScrollAnimations() {
  reveals.forEach(reveal => {
    reveal.classList.remove('active'); 
    revealObserver.observe(reveal);
  });
}
resetScrollAnimations(); 


// ======== FAQ ACCORDION LOGIC ========
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(f => f.classList.remove('open')); 
    if (!isOpen) item.classList.add('open'); 
  });
});


// ======== 3D INTERACTIVE MOUSE TILT (Desktop Only) ========
if (window.matchMedia("(hover: hover)").matches) {
  const tiltElements = document.querySelectorAll('.tilt-element');
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.boxShadow = `0 30px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(121,163,255,0.2)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });
}
