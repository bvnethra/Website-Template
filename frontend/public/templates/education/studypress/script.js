// StudyPress Interactive Script
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Hero Slider Carousel
     ========================================================================== */
  const slides = document.querySelectorAll('.hero-slider .slide');
  const slideDots = document.querySelectorAll('.slider-dot-indicators .slide-dot');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  let currentSlide = 0;

  const showSlide = (idx) => {
    slides.forEach(s => s.classList.remove('active'));
    slideDots.forEach(d => d.classList.remove('active'));

    currentSlide = idx;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (slideDots[currentSlide]) slideDots[currentSlide].classList.add('active');
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      let prevIdx = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIdx);
    });
    nextBtn.addEventListener('click', () => {
      let nextIdx = (currentSlide + 1) % slides.length;
      showSlide(nextIdx);
    });
  }

  slideDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  // Auto transition slides
  let slideInterval = setInterval(() => {
    let nextIdx = (currentSlide + 1) % slides.length;
    showSlide(nextIdx);
  }, 7500);

  const stopSliderAuto = () => {
    clearInterval(slideInterval);
  };
  slideDots.forEach(dot => dot.addEventListener('click', stopSliderAuto));
  if (prevBtn) prevBtn.addEventListener('click', stopSliderAuto);
  if (nextBtn) nextBtn.addEventListener('click', stopSliderAuto);


  /* ==========================================================================
     2. Interactive Course Catalog & Shopping Cart
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.course-filters-row .filter-tab');
  const courseCards = document.querySelectorAll('.courses-grid .course-card');
  const cartCountEl = document.getElementById('cart-count');
  const cartToast = document.getElementById('cart-toast-alert');
  const toastCourseName = document.getElementById('toast-course-name');
  let cartCountValue = 0;

  // Filter functionality
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');
      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Add to Cart increment and toast alerts
  const addCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.getAttribute('data-course-name');
      cartCountValue += 1;
      if (cartCountEl) cartCountEl.innerText = cartCountValue;

      // Trigger Toast
      if (cartToast && toastCourseName) {
        toastCourseName.innerText = courseName;
        cartToast.style.bottom = '24px';
        setTimeout(() => {
          cartToast.style.bottom = '-100px';
        }, 3200);
      }

      // Update button UI
      btn.innerText = 'Added ✓';
      btn.disabled = true;
      btn.style.backgroundColor = '#10b981';
      btn.style.borderColor = '#10b981';
    });
  });


  /* ==========================================================================
     3. Faculty Department Filter Roster & Profiles
     ========================================================================== */
  const facTabs = document.querySelectorAll('#faculty-tabs .fac-tab');
  const teacherCards = document.querySelectorAll('#faculty-grid .teacher-card');
  const facModal = document.getElementById('faculty-profile-modal');
  const facModalContent = document.getElementById('fac-modal-content');
  const closeFacModalBtn = document.getElementById('close-fac-modal-btn');

  // Filter roster
  facTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      facTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const discipline = tab.getAttribute('data-discipline');
      teacherCards.forEach(card => {
        const cardDiscipline = card.getAttribute('data-discipline');
        if (discipline === 'all' || cardDiscipline === discipline) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Faculty Database metadata details
  const facultyDatabase = {
    "1": {
      name: "Dr. Julian Thorne",
      title: "Professor of AI & Computer Science",
      badge: "Turing Fellow",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=600&h=500&q=80",
      bio: "Dr. Julian Thorne completed his Stanford Ph.D. focusing on neural network architectures and multi-agent systems. He is the Director of our Quantum Computing Initiative, researching automated AI code reasoning compilers.",
      pub: "120+ papers",
      tenure: "12 years",
      lab: "Neural Compilers Lab"
    },
    "2": {
      name: "Dr. Evelyn Reed",
      title: "Director of Biomedical Genetics",
      badge: "Endowed Chair",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=600&h=500&q=80",
      bio: "Dr. Evelyn Reed is a dual Johns Hopkins M.D. and Oxford Ph.D. graduate. She leads research on CRISPR telomeric chromosome extensions and targets gene therapy modifications to reverse aging decay in immune cells.",
      pub: "98 papers",
      tenure: "8 years",
      lab: "CRISPR Therapeutics Group"
    },
    "3": {
      name: "Prof. Arthur Sterling",
      title: "Dean of Global Economics",
      badge: "Dean",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=600&h=500&q=80",
      bio: "Prof. Arthur Sterling is a Cambridge D.Phil. graduate. He acts as advisor to multiple sovereign wealth funds and focuses on transition finance models and international financial markets governance.",
      pub: "140+ publications",
      tenure: "15 years",
      lab: "Sovereign Finance Division"
    },
    "4": {
      name: "Dr. Maya Lin",
      title: "Chair of Architecture & Digital Arts",
      badge: "Chair",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=600&h=500&q=80",
      bio: "Dr. Maya Lin received her M.Arch from MIT and completed research in Tokyo. Her work targets responsive spatial structures that adapt to human kinematics via machine vision pipelines.",
      pub: "75 publications",
      tenure: "9 years",
      lab: "Kinematic Architecture Lab"
    },
    "5": {
      name: "Prof. Tariq Al-Mansoor",
      title: "Chair of Cybersecurity & Cloud Defense",
      badge: "Turing Fellow",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=600&h=500&q=80",
      bio: "Prof. Tariq Al-Mansoor holds a Ph.D. from Carnegie Mellon. He is pioneering defensive system patterns, designing secure zero-trust network nodes for international cloud infrastructure groups.",
      pub: "115 papers",
      tenure: "10 years",
      lab: "Zero-Trust Infrastructures"
    },
    "6": {
      name: "Dr. Camille Laurent",
      title: "Professor of Transnational Jurisprudence",
      badge: "Faculty Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=600&h=500&q=80",
      bio: "Dr. Camille Laurent is a Yale J.D. and Sorbonne Ph.D. graduate. She specializes in cyber litigation, international trade treaty laws, and sovereign boundaries on the digital web space.",
      pub: "88 publications",
      tenure: "6 years",
      lab: "Digital Treaties Center"
    },
    "7": {
      name: "Dr. Marcus Bennett",
      title: "Professor of Clinical Pharmacology",
      badge: "Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=600&h=500&q=80",
      bio: "Dr. Marcus Bennett coordinates target trials at UCSF. His drug laboratory models automated compound combinations targeting immunological pathways to trigger local tumor decay.",
      pub: "105 publications",
      tenure: "11 years",
      lab: "Immunotherapy Research Lab"
    },
    "8": {
      name: "Prof. Rachel Vance",
      title: "Director of HCI",
      badge: "Director",
      image: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&crop=faces&w=400&h=500&q=80",
      bio: "Prof. Rachel Vance completed her Ph.D. at Harvard. She designs tactile cognitive interfaces, building immersive VR environments that match educational neurology learning feedback loops.",
      pub: "80 publications",
      tenure: "7 years",
      lab: "Tactile HCI Laboratory"
    }
  };

  const viewProfileButtons = document.querySelectorAll('.view-fac-profile');
  viewProfileButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const facId = btn.getAttribute('data-fac-id');
      const data = facultyDatabase[facId];

      if (data && facModal && facModalContent) {
        facModalContent.innerHTML = `
          <img src="${data.image}" alt="${data.name}">
          <h2>${data.name}</h2>
          <span class="modal-category-tag">${data.title} (${data.badge})</span>
          <p class="modal-description-paragraph">${data.bio}</p>
          <div class="modal-highlights-grid">
            <div class="m-hl-item">
              <span>Publications</span>
              <strong>${data.pub}</strong>
            </div>
            <div class="m-hl-item">
              <span>Tenure Status</span>
              <strong>${data.tenure}</strong>
            </div>
            <div class="m-hl-item">
              <span>Research Director</span>
              <strong>${data.lab}</strong>
            </div>
          </div>
        `;
        facModal.style.display = 'flex';
      }
    });
  });

  const closeFacModal = () => {
    if (facModal) facModal.style.display = 'none';
  };

  if (closeFacModalBtn) closeFacModalBtn.addEventListener('click', closeFacModal);
  if (facModal) {
    facModal.addEventListener('click', (e) => {
      if (e.target === facModal) closeFacModal();
    });
  }


  /* ==========================================================================
     4. Centralized Media Gallery & Lightbox Viewer
     ========================================================================== */
  const galleryItems = [
    // Campus (6 images)
    { id: 1, category: "Campus", image: "./images/campus-1.jpg", caption: "State-of-the-Art Modern Learning Library Stairs" },
    { id: 2, category: "Campus", image: "./images/campus-2.jpg", caption: "Collaborative Study Desks & Digital Research Commons" },
    { id: 3, category: "Campus", image: "./images/campus-3.jpg", caption: "Students Working and Studying Outdoors on the Quad" },
    { id: 4, category: "Campus", image: "./images/campus-4.jpg", caption: "Students Walking Between Lectures on Main Courtyard" },
    { id: 5, category: "Campus", image: "./images/campus-5.jpg", caption: "Spacious Lecture Hall with Integrated Multimedia Tech" },
    { id: 6, category: "Campus", image: "./images/campus-6.jpg", caption: "Historic Memorial Library Quiet Reading Hall" },

    // Graduation (6 images)
    { id: 7, category: "Graduation", image: "./images/graduation-1.jpg", caption: "Graduates Celebrating and Throwing Caps in the Air" },
    { id: 8, category: "Graduation", image: "./images/graduation-2.jpg", caption: "Commencement Caps Soaring High Above the Campus Quad" },
    { id: 9, category: "Graduation", image: "./images/graduation-3.jpg", caption: "Graduate Proudly Receiving Certificate Diploma on Stage" },
    { id: 10, category: "Graduation", image: "./images/graduation-4.jpg", caption: "Diverse Group Graduation Photo Sharing Joyful Smiles" },
    { id: 11, category: "Graduation", image: "./images/graduation-5.jpg", caption: "Traditional Graduation Ceremony Stage & Procession" },
    { id: 12, category: "Graduation", image: "./images/graduation-6.jpg", caption: "Celebrating Graduates Gathers Outdoor on Sunny Quad" },

    // Laboratories (6 images)
    { id: 13, category: "Laboratories", image: "./images/laboratories-1.jpg", caption: "Advanced Computer Science Programming & Design Lab" },
    { id: 14, category: "Laboratories", image: "./images/laboratories-2.jpg", caption: "Software Engineering & Cloud Infrastructure Lab" },
    { id: 15, category: "Laboratories", image: "./images/laboratories-3.jpg", caption: "Biology & Chemistry Research Pipetting Station" },
    { id: 16, category: "Laboratories", image: "./images/laboratories-4.jpg", caption: "High-Powered Microscopic Analysis Cleanroom Testing" },
    { id: 17, category: "Laboratories", image: "./images/laboratories-5.jpg", caption: "Biomedical Scientific Research Testing Workstation" },
    { id: 18, category: "Laboratories", image: "./images/laboratories-6.jpg", caption: "Robotics & Hardware Engineering Development Lab" },

    // Sports (6 images)
    { id: 19, category: "Sports", image: "./images/sports-1.jpg", caption: "Intramural Varsity Soccer Match Play on Green Field" },
    { id: 20, category: "Sports", image: "./images/sports-2.jpg", caption: "Fast-Paced Soccer Match Action Play and Kick Close Up" },
    { id: 21, category: "Sports", image: "./images/sports-3.jpg", caption: "Campus Basketball Court Net & Active Training Field" },
    { id: 22, category: "Sports", image: "./images/sports-4.jpg", caption: "Competitive Volleyball Court Game on Sunny Field" },
    { id: 23, category: "Sports", image: "./images/sports-5.jpg", caption: "Athletics Runner Training Speed Drills on Track" },
    { id: 24, category: "Sports", image: "./images/sports-6.jpg", caption: "Outdoor Field Sports Activity and Track Exercises" },

    // Events (6 images)
    { id: 25, category: "Events", image: "./images/events-1.jpg", caption: "Interactive Technology Presentation & Developer Seminar" },
    { id: 26, category: "Events", image: "./images/events-2.jpg", caption: "Annual Academic Congress Seminar Forum in Central Hall" },
    { id: 27, category: "Events", image: "./images/events-3.jpg", caption: "Large Student Audience Listening to Guest Keynote Lecture" },
    { id: 28, category: "Events", image: "./images/events-4.jpg", caption: "Collaborative Student Panel Presentation Discussion" },
    { id: 29, category: "Events", image: "./images/events-5.jpg", caption: "Audience Members Listening Closely in Main Auditorium" },
    { id: 30, category: "Events", image: "./images/events-6.jpg", caption: "Global Science & Corporate Tech Innovation Symposium" }
  ];

  const portfolioGrid = document.getElementById('portfolio-grid');
  const portfolioTabs = document.querySelectorAll('.portfolio-tab-btn');
  
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  const prevLightboxBtn = document.getElementById('lightbox-prev-btn');
  const nextLightboxBtn = document.getElementById('lightbox-next-btn');

  let activeFilteredItems = [...galleryItems];
  let currentLightboxIdx = 0;
  let activeFilter = 'all';

  // Function to render gallery dynamically
  const renderGallery = (filter) => {
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = '';

    // Filter items
    const filteredItems = galleryItems.filter(item => {
      return filter === 'all' || item.category.toLowerCase() === filter.toLowerCase();
    });

    filteredItems.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'portfolio-item show-item';
      card.setAttribute('data-category', item.category.toLowerCase());
      
      card.innerHTML = `
        <span class="portfolio-item-badge">${item.category}</span>
        <img src="${item.image}" alt="${item.caption}">
        <div class="hover-overlay"><i class="fa-solid fa-expand"></i></div>
      `;

      card.addEventListener('click', () => {
        openLightbox(filteredItems, index);
      });

      portfolioGrid.appendChild(card);
    });
  };

  // Lightbox functions
  const openLightbox = (itemsList, index) => {
    activeFilteredItems = itemsList;
    currentLightboxIdx = index;
    updateLightboxContent();
    if (lightboxModal) lightboxModal.style.display = 'flex';
  };

  const updateLightboxContent = () => {
    if (activeFilteredItems.length === 0) return;
    const currentItem = activeFilteredItems[currentLightboxIdx];
    
    if (lightboxImg) lightboxImg.src = currentItem.image;
    if (lightboxCaption) lightboxCaption.innerText = currentItem.caption;
    
    // Update counter (e.g., Campus — 3 / 6)
    if (lightboxCounter) {
      const displayCategory = activeFilter === 'all' ? 'All' : currentItem.category;
      lightboxCounter.innerText = `${displayCategory} — ${currentLightboxIdx + 1} / ${activeFilteredItems.length}`;
    }
  };

  const showPrevImage = () => {
    if (activeFilteredItems.length === 0) return;
    currentLightboxIdx = (currentLightboxIdx - 1 + activeFilteredItems.length) % activeFilteredItems.length;
    updateLightboxContent();
  };

  const showNextImage = () => {
    if (activeFilteredItems.length === 0) return;
    currentLightboxIdx = (currentLightboxIdx + 1) % activeFilteredItems.length;
    updateLightboxContent();
  };

  const closeLightbox = () => {
    if (lightboxModal) lightboxModal.style.display = 'none';
  };

  // Event Listeners for tabs
  portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      portfolioTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      activeFilter = tab.getAttribute('data-filter');
      renderGallery(activeFilter);
    });
  });

  // Lightbox navigation listeners
  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (prevLightboxBtn) prevLightboxBtn.addEventListener('click', showPrevImage);
  if (nextLightboxBtn) nextLightboxBtn.addEventListener('click', showNextImage);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation inside lightbox
  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'Escape') closeLightbox();
    }
  });

  // Initial gallery render
  renderGallery('all');


  /* ==========================================================================
     5. Admissions Booking Inquiry wizard
     ========================================================================== */
  const wizardModal = document.getElementById('admissions-wizard-modal');
  const bookBtn = document.getElementById('nav-book-btn');
  const closeWizardBtn = document.getElementById('close-wizard-btn');
  
  const paneNextBtns = document.querySelectorAll('.next-pane-btn');
  const panePrevBtns = document.querySelectorAll('.prev-pane-btn');
  const wizSubmitBtn = document.getElementById('wiz-submit-btn');
  const wizRestartBtn = document.getElementById('wiz-restart-btn');
  
  const panePanes = document.querySelectorAll('.wizard-pane');
  const paneIndicators = [
    document.getElementById('wizard-ind-1'),
    document.getElementById('wizard-ind-2'),
    document.getElementById('wizard-ind-3')
  ];

  const setPaneActive = (paneIdx) => {
    paneIndicators.forEach((ind, i) => {
      if (ind) {
        if (i === paneIdx) ind.classList.add('active');
        else ind.classList.remove('active');
      }
    });

    panePanes.forEach((p, i) => {
      if (p) {
        if (i === paneIdx) p.classList.add('active');
        else p.classList.remove('active');
      }
    });
  };

  // Open & Close
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      if (wizardModal) wizardModal.style.display = 'flex';
    });
  }

  const closeWizard = () => {
    if (wizardModal) wizardModal.style.display = 'none';
  };

  if (closeWizardBtn) closeWizardBtn.addEventListener('click', closeWizard);
  if (wizardModal) {
    wizardModal.addEventListener('click', (e) => {
      if (e.target === wizardModal) closeWizard();
    });
  }

  // Next Buttons
  paneNextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextPane = parseInt(btn.getAttribute('data-next'));

      if (nextPane === 2) {
        const fname = document.getElementById('wiz-fname').value.trim();
        const lname = document.getElementById('wiz-lname').value.trim();
        const email = document.getElementById('wiz-email').value.trim();
        const phone = document.getElementById('wiz-phone').value.trim();

        if (fname === '' || lname === '' || email === '' || phone === '') {
          alert('Please fill in your name and contact details.');
          return;
        }
      }

      if (nextPane === 3) {
        // Populate Step 3 review
        const fname = document.getElementById('wiz-fname').value;
        const lname = document.getElementById('wiz-lname').value;
        const term = document.getElementById('wiz-term').value;
        const res = document.getElementById('wiz-res').value;
        const aid = document.getElementById('wiz-aid').checked ? 'Yes' : 'No';

        const summaryBox = document.getElementById('wiz-review-summary');
        if (summaryBox) {
          summaryBox.innerHTML = `
            <div class="r-row"><span>Student Name</span><strong>${fname} ${lname}</strong></div>
            <div class="r-row"><span>Target Term</span><strong>${term}</strong></div>
            <div class="r-row"><span>Residency Class</span><strong>${res}</strong></div>
            <div class="r-row"><span>Financial Aid Requested</span><strong>${aid}</strong></div>
          `;
        }
      }

      setPaneActive(nextPane - 1);
    });
  });

  // Prev Buttons
  panePrevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prevPane = parseInt(btn.getAttribute('data-prev'));
      setPaneActive(prevPane - 1);
    });
  });

  // Submit wizard
  if (wizSubmitBtn) {
    wizSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const agree = document.getElementById('wiz-agree').checked;
      if (!agree) {
        alert('You must agree to the academic integrity policies.');
        return;
      }

      const trackingId = 'SP-' + Math.floor(100000 + Math.random() * 900000);
      const fname = document.getElementById('wiz-fname').value;
      const lname = document.getElementById('wiz-lname').value;
      const term = document.getElementById('wiz-term').value;
      const res = document.getElementById('wiz-res').value;

      // Populate success invoice
      document.getElementById('r-name').innerText = `${fname} ${lname}`;
      document.getElementById('r-id').innerText = trackingId;
      document.getElementById('r-term').innerText = term;
      document.getElementById('r-res').innerText = res;

      // Transitions UI
      panePanes.forEach(pane => { if(pane) pane.classList.remove('active'); });
      const stepWrapper = document.querySelector('.wizard-step-indicators');
      if (stepWrapper) stepWrapper.style.display = 'none';
      const successBox = document.getElementById('wiz-success-receipt');
      if (successBox) successBox.style.display = 'flex';
    });
  }

  // Restart wizard
  if (wizRestartBtn) {
    wizRestartBtn.addEventListener('click', () => {
      document.getElementById('wiz-fname').value = '';
      document.getElementById('wiz-lname').value = '';
      document.getElementById('wiz-email').value = '';
      document.getElementById('wiz-phone').value = '';
      document.getElementById('wiz-agree').checked = false;

      const stepWrapper = document.querySelector('.wizard-step-indicators');
      if (stepWrapper) stepWrapper.style.display = 'flex';
      
      const successBox = document.getElementById('wiz-success-receipt');
      if (successBox) successBox.style.display = 'none';
      setPaneActive(0);
    });
  }


  /* ==========================================================================
     6. Course Details Modal Popups
     ========================================================================== */
  const detailsModal = document.getElementById('course-details-modal');
  const detailsContent = document.getElementById('course-modal-content');
  const closeDetailsBtn = document.getElementById('close-course-modal-btn');

  const coursesDatabase = {
    "1": {
      title: "B.Sc. Artificial Intelligence & Systems",
      category: "Computing & AI",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      desc: "This program explores the mathematical frameworks backing deep learning and machine reasoning compiling nodes. Students build autonomous reasoning pipelines, neural network setups, and secure algorithmic models under Dr. Julian Thorne.",
      tuition: "$4,500 per term",
      hours: "4 years duration",
      career: "AI Research Lead, Software Director"
    },
    "2": {
      title: "M.Sc. Cybersecurity & Cloud Defense",
      category: "Computing & AI",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      desc: "Our advanced postgraduate track covers cryptographic design, zero-trust cloud configuration nodes, defensive intrusion strategies, and software vulnerability audits directed by Prof. Tariq Al-Mansoor.",
      tuition: "$4,800 per term",
      hours: "2 years duration",
      career: "CISO, Cloud Architect, Vulnerability Auditor"
    },
    "3": {
      title: "CRISPR Gene Therapy & Biology",
      category: "Health Sciences",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80",
      desc: "Explore bio-tech editing targets using CRISPR Cas12 frameworks. Under Dr. Evelyn Reed's direction, students perform laboratory telomeric sequencing, genome reconstructions, and study pharmacology trails.",
      tuition: "$5,000 per term",
      hours: "4 years duration",
      career: "Genomic Researcher, Bio-Tech Consultant"
    },
    "4": {
      title: "Executive MBA & Corporate Governance",
      category: "Business & Law",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      desc: "A globally focused leadership curriculum targeting trade models, venture investment setups, institutional banking economics, and business ethics audits overseen by Dean Arthur Sterling.",
      tuition: "$6,200 per term",
      hours: "2 years duration",
      career: "Chief Executive Officer, Investment Director"
    },
    "5": {
      title: "Comparative Transnational Jurisprudence",
      category: "Business & Law",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      desc: "Specialized study regarding digital borders, cybersecurity laws, sovereign IP rules, and cross-border trade litigation led by Dr. Camille Laurent.",
      tuition: "$4,100 per term",
      hours: "3 years duration",
      career: "International Attorney, Legal Policy Advisor"
    },
    "6": {
      title: "Digital Media & Graphic Computing",
      category: "Design & Humanities",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      desc: "Focuses on human-computer interface design loops, UX heuristics, immersive 3D graphics compilation, and kinetic layout styling supervised by Prof. Rachel Vance.",
      tuition: "$3,800 per term",
      hours: "4 years duration",
      career: "Interaction Designer, Visual Systems Architect"
    }
  };

  const detailsTriggers = document.querySelectorAll('.btn-details-trigger');
  detailsTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const courseId = trigger.getAttribute('data-course-id');
      const data = coursesDatabase[courseId];

      if (data && detailsModal && detailsContent) {
        detailsContent.innerHTML = `
          <img src="${data.image}" alt="${data.title}">
          <h2>${data.title}</h2>
          <span class="modal-category-tag">${data.category}</span>
          <p class="modal-description-paragraph">${data.desc}</p>
          <div class="modal-highlights-grid">
            <div class="m-hl-item">
              <span>Tuition Cost</span>
              <strong>${data.tuition}</strong>
            </div>
            <div class="m-hl-item">
              <span>Program Length</span>
              <strong>${data.hours}</strong>
            </div>
            <div class="m-hl-item">
              <span>Career Outcomes</span>
              <strong>${data.career}</strong>
            </div>
          </div>
        `;
        detailsModal.style.display = 'flex';
      }
    });
  });

  const closeDetails = () => {
    if (detailsModal) detailsModal.style.display = 'none';
  };

  if (closeDetailsBtn) closeDetailsBtn.addEventListener('click', closeDetails);
  if (detailsModal) {
    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) closeDetails();
    });
  }


  /* ==========================================================================
     7. Video Preview Overlay Popups
     ========================================================================== */
  const videoModal = document.getElementById('video-player-modal');
  const playTrigger = document.getElementById('play-video-trigger');
  const closeVideoBtn = document.getElementById('close-video-modal-btn');

  if (playTrigger) {
    playTrigger.addEventListener('click', () => {
      if (videoModal) videoModal.style.display = 'flex';
    });
  }

  const closeVideo = () => {
    if (videoModal) videoModal.style.display = 'none';
  };

  if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideo);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideo();
    });
  }


  /* ==========================================================================
     8. Command Palette Search (Ctrl+K or Header Search Click)
     ========================================================================== */
  const cmdModal = document.getElementById('command-palette-modal');
  const searchBtn = document.getElementById('header-search-btn');
  const cmdInput = document.getElementById('cmd-input-field');
  const cmdLinks = document.querySelectorAll('.cmd-link');

  const openCmd = () => {
    if (cmdModal) {
      cmdModal.style.display = 'flex';
      cmdInput.focus();
    }
  };

  const closeCmd = () => {
    if (cmdModal) {
      cmdModal.style.display = 'none';
      cmdInput.value = '';
      cmdLinks.forEach(link => link.style.display = 'flex');
    }
  };

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      openCmd();
    }
    if (e.key === 'Escape') {
      closeCmd();
    }
  });

  if (searchBtn) searchBtn.addEventListener('click', openCmd);
  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmd();
    });
  }

  // Filter command links
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      cmdLinks.forEach(link => {
        const text = link.innerText.toLowerCase();
        if (text.includes(query)) {
          link.style.display = 'flex';
        } else {
          link.style.display = 'none';
        }
      });
    });
  }

  // Click navigation action closes command palette
  cmdLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeCmd();
    });
  });


  /* ==========================================================================
     9. Newsletter Subscriptions
     ========================================================================== */
  const newsForm = document.getElementById('newsletter-form-studypress');
  const successBox = document.getElementById('news-success-box');

  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsForm.style.display = 'none';
      if (successBox) successBox.style.display = 'block';
    });
  }

});
