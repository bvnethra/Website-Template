// Modern University Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Background Slider
  const heroWrapper = document.querySelector('.hero-wrapper');
  const dots = document.querySelectorAll('.dot');
  
  const backgrounds = [
    'https://images.unsplash.com/photo-1562774053-4ab044ef1b85?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80'
  ];

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Remove active class from all dots
      dots.forEach(d => d.classList.remove('active'));
      
      // Add active class to clicked dot
      dot.classList.add('active');

      // Change background image of hero wrapper with transition
      if (heroWrapper) {
        heroWrapper.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.45)), url('${backgrounds[index]}')`;
      }
    });
  });

  // Auto slide background every 6 seconds
  let currentSlide = 0;
  setInterval(() => {
    currentSlide = (currentSlide + 1) % backgrounds.length;
    if (dots[currentSlide]) {
      dots[currentSlide].click();
    }
  }, 6000);

  // 2. Interactive Highlights Cards
  const highlightCards = document.querySelectorAll('.highlight-card');
  highlightCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').innerText;
      alert(`Learn more about our "${title}" features and programs.`);
    });
  });
});
