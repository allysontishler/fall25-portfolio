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
  


// about.js
document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('.about-tabs .tab'));
  const sections = Array.from(document.querySelectorAll('.tab-section'));

  if (!tabs.length || !sections.length) return;

  // Click -> smooth scroll and immediately set active for better UX
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetId = tab.dataset.target;
      const target = document.getElementById(targetId);
      if (!target) return;
      // scroll smoothly
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // optimistic UI: set the clicked tab active right away
      tabs.forEach(t => t.classList.toggle('active', t === tab));
    });
  });

  // IntersectionObserver that picks the most visible section
  // Use a fine-grained threshold so intersectionRatio updates smoothly.
  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: thresholds
  };

  const observer = new IntersectionObserver((entries) => {
    // Filter entries that are intersecting
    const visibleEntries = entries.filter(e => e.isIntersecting);
    if (visibleEntries.length === 0) return;

    // Choose the entry with the largest intersectionRatio
    const mostVisible = visibleEntries.reduce((a, b) =>
      a.intersectionRatio > b.intersectionRatio ? a : b
    );

    const visibleId = mostVisible.target.id;
    // Toggle active class on tabs: only the matching one is active
    tabs.forEach(t => {
      const shouldBeActive = t.dataset.target === visibleId;
      t.classList.toggle('active', shouldBeActive);
    });
  }, observerOptions);

  // Observe each section
  sections.forEach(s => observer.observe(s));

  // Initialize active tab based on current viewport (in case user loads in middle)
  // Trigger a manual check: find the section whose top is closest to viewport top
  const currentScrollPos = window.scrollY + 120; // offset to consider header height
  let initial = sections[0].id;
  for (const sec of sections) {
    if (sec.offsetTop <= currentScrollPos) initial = sec.id;
  }
  tabs.forEach(t => t.classList.toggle('active', t.dataset.target === initial));
});
