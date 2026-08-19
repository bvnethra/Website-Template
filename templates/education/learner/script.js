// Learner Template JavaScript Interaction
document.addEventListener('DOMContentLoaded', () => {
  // 1. Alert Message on Category Card Click
  const categoryCards = document.querySelectorAll('.cat-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('h3').innerText;
      alert(`Opening ${name} course tracks catalog...`);
    });
  });

  // 2. Parallax Hover Effect on Hero Student Image & Badges
  const heroWrapper = document.querySelector('.hero-image-wrapper');
  if (heroWrapper) {
    heroWrapper.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;

      // Soft tilt student portrait
      const studentImg = heroWrapper.querySelector('.hero-image');
      if (studentImg) {
        studentImg.style.transform = `rotateY(${x * 0.02}deg) rotateX(${-y * 0.02}deg) scale(1.01)`;
      }
    });

    heroWrapper.addEventListener('mouseleave', () => {
      const studentImg = heroWrapper.querySelector('.hero-image');
      if (studentImg) {
        studentImg.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
      }
    });
  }
});
