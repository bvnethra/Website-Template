// MySchool Template JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // 1. Admission Inquiry Form Submission Validation
  const form = document.getElementById('inquiry-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple Validation Check
      const parentName = document.getElementById('parent-name').value;
      const childName = document.getElementById('child-name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;

      if (parentName && childName && email && phone) {
        // Hide Form, Show Success Alert
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.style.opacity = '0';
        setTimeout(() => {
          successMsg.style.transition = 'opacity 0.4s ease';
          successMsg.style.opacity = '1';
        }, 50);
      }
    });
  }

  // 2. Interactive Feature Card Alert
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const featureTitle = card.querySelector('h3').innerText;
      alert(`Read details about our "${featureTitle}" programs!`);
    });
  });
});
