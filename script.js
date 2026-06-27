// ======== 1. SOCIAL LINKS CONFIGURATION ========
const BRAND = {
  gmail: "stratifysystemdevelopment@gmail.com",
  facebook: "https://www.facebook.com/stratifysystemdev"
};

// May dalawang facebook buttons, isa sa Hero (desktop-only) at isa sa Contact
document.getElementById('gmailBtn').href = `mailto:${BRAND.gmail}?subject=Business Inquiry / Quotation Request`;
document.getElementById('facebookBtnHero').href = BRAND.facebook;
document.getElementById('facebookBtnContact').href = BRAND.facebook;

// ======== 2. LIVE API COUNTERS (Real Global Data) ========
// Gumagamit tayo ng libreng public API provider (CounterAPI) para sa totoong web hits
const NAMESPACE = 'stratify_system_dev';

// A. Visitor Count
fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/visitors/up`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('visitorCount').innerText = data.count.toLocaleString();
  })
  .catch(err => {
    // Fallback kapag bumagal ang API
    document.getElementById('visitorCount').innerText = "14,205";
  });

// B. Quotation Count (Read initial)
fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/quotes`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('quoteCount').innerText = data.count.toLocaleString();
  })
  .catch(err => {
    // Fallback
    document.getElementById('quoteCount').innerText = "1,832";
  });

// Trigger +1 to Quote Count when form submits
document.getElementById('quoteForm').addEventListener('submit', () => {
  fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/quotes/up`);
});

// C. Simulated Active Users Algorithm (Since true real-time needs WebSockets)
setInterval(() => {
  let activeUsers = Math.floor(Math.random() * (45 - 18 + 1)) + 18;
  document.getElementById('activeCount').innerText = activeUsers;
}, 6000); 

// ======== 3. 4D SPA TAB TRANSITIONS ========
const tabLinks = document.querySelectorAll('.tab-link');
const tabPages = document.querySelectorAll('.tab-page');
let isAnimating = false;

tabLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    // Prevent spam clicking habang nag-a-animate pa ang pahina
    if (isAnimating) return; 

    const targetId = link.getAttribute('data-target');
    const targetPage = document.getElementById(`tab-${targetId}`);
    const currentActive = document.querySelector('.tab-page.active');
    
    // Huwag pansinin kung kinlik ang tab na bukas na
    if (!targetPage || currentActive === targetPage) return;
    
    isAnimating = true;

    // A. Start Exit Animation on Current Page
    if (currentActive) {
      currentActive.classList.remove('active');
      currentActive.classList.add('exit'); // Nag-ti-trigger ng 4D Exit CSS
    }

    // I-update ang Active state sa UI (Menu at Bottom Bar)
    document.querySelectorAll('.tab-link').forEach(a => a.classList.remove('active-link'));
    document.querySelectorAll(`.tab-link[data-target="${targetId}"]`).forEach(activeLink => {
      activeLink.classList.add('active-link');
    });

    // B. Maghintay matapos ang exit animation (600ms), tapos ipasok ang bagong page
    setTimeout(() => {
      if (currentActive) currentActive.classList.remove('exit');
      
      targetPage.classList.add('active'); // Nag-ti-trigger ng 4D Enter CSS
      window.scrollTo({ top: 0, behavior: 'instant' });
      resetScrollAnimations();

      isAnimating = false;
    }, 550); // Timing matches exit4D CSS duration
  });
});

// ======== 4. COMMUNITY COMMENTS ENGINE (Local Storage) ========
const commentForm = document.getElementById('commentForm');
const commentsDisplay = document.getElementById('commentsDisplay');

// Naglagay tayo ng dummy comments para magmukhang professional agad ang site
let comments = JSON.parse(localStorage.getItem('stratify_comments')) || [
  { name: "John Reyes", text: "The payroll system you built for us is incredibly fast! Thanks, Degs and team." },
  { name: "Sarah M.", text: "Very professional UI design. Highly recommended for custom tools." }
];

function renderComments() {
  if (!commentsDisplay) return;
  commentsDisplay.innerHTML = "";
  
  // Baligtarin para mauna ang pinakabago
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

if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newName = document.getElementById('commentName').value;
    let newText = document.getElementById('commentText').value;

    // I-push sa array at i-save sa local storage ng user
    comments.push({ name: newName, text: newText });
    localStorage.setItem('stratify_comments', JSON.stringify(comments));
    
    // I-clear ang form at i-reload ang listahan
    document.getElementById('commentName').value = "";
    document.getElementById('commentText').value = "";
    renderComments();
  });
}

// ======== 5. 3D INTERACTIVE MOUSE TILT (Desktop Only) ========
if (window.matchMedia("(hover: hover)").matches) {
  const tiltElements = document.querySelectorAll('.tilt-element');
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Compute 3D rotation
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ======== 6. SCROLL REVEAL (Intersection Observer) ========
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

// ======== 7. FAQ ACCORDION LOGIC ========
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Isara muna ang ibang nakabukas
    faqItems.forEach(f => f.classList.remove('open')); 
    // Buksan kung ano ang pinindot
    if (!isOpen) item.classList.add('open'); 
  });
});
