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
  
// set current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const tabs = document.querySelectorAll('.about-tabs .tab');
  const sections = document.querySelectorAll('.tab-section');

  // click tab -> scroll to section & highlight tab
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      // scroll to section smoothly
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // highlight active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // update active tab on scroll
  window.addEventListener('scroll', () => {
    let currentSection = sections[0];
    const scrollPos = window.scrollY + 100; // offset for sticky sidebar

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section;
      }
    });

    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.target === currentSection.id) {
        tab.classList.add('active');
      }
    });
  });
});