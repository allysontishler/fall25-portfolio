// small JS for year and sticky nav active state + subtle tilt on hover for interactive cards
document.addEventListener('DOMContentLoaded', () => {
    // set year in footer
    const y = new Date().getFullYear();
    const year = document.getElementById('year');
    if(year) year.textContent = y;
  
    // add tilt effect on hover for peek project images (subtle)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${ -y * 4 }deg) rotateY(${ x * 6 }deg) scale(1.02)`;
        card.style.transition = 'transform 80ms linear';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 220ms ease';
      });
    });
  });
  
/* about.js */
document.addEventListener('DOMContentLoaded', () => {
  // tabs behavior: click -> activate and scroll into view
  const tabs = Array.from(document.querySelectorAll('.about-tabs .tab'));
  const sections = Array.from(document.querySelectorAll('.tab-section'));

  function activateTabById(id) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
    sections.forEach(s => s.classList.toggle('active', s.id === id));
  }

  // click handlers
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = tab.dataset.target;
      activateTabById(target);
      // smoothly scroll the content area to the section top
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // IntersectionObserver to update active tab as user scrolls manually
  const observerOptions = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateTabById(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(s => observer.observe(s));

  // init first section active if none
  if (!document.querySelector('.tab-section.active')) {
    activateTabById(sections[0].id);
  }

  // footer year (if you want)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
