// Academica Template Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Search Bar Filter Interaction
  const searchInput = document.getElementById('course-search');
  const categoryCards = document.querySelectorAll('.category-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      categoryCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(query)) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0.3';
          card.style.transform = 'scale(0.95)';
          // Add timeout to hide completely if needed, or leave at low opacity for visual feedback
        }
      });
    });
  }

  // 2. Interactive Click Action on Categories
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const categoryName = card.querySelector('h3').innerText;
      alert(`Loading courses for "${categoryName}" category...`);
    });
  });
});
