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
  


  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.about-tabs .tab');
    const sections = document.querySelectorAll('.tab-section');
  
    sections.forEach((sec, idx) => {
      sec.classList.toggle('active', idx === 0);
    });
  
    tabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === 0);
  
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
  
        sections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
  
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
  
  