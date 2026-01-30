/**
 * SPACEDEV - Space Development Consulting Ltd
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  Loader.init();
  Navigation.init();
  ScrollEffects.init();
  Animations.init();
  Counter.init();
  ProjectGallery.init();
  ContactForm.init();
  BackToTop.init();
  AboutCarousel.init();
});

/**
 * Page Loader
 */
const Loader = {
  init() {
    const loader = document.querySelector('.loader');
    if (loader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
        }, 500);
      });
    }
  }
};

/**
 * Navigation Module
 */
const Navigation = {
  init() {
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    if (this.navbar) {
      this.handleScroll();
      window.addEventListener('scroll', () => this.handleScroll());
    }
    
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
      
      // Close menu on link click
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
      
      // Close menu on outside click
      document.addEventListener('click', (e) => {
        if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
          this.closeMenu();
        }
      });
    }
    
    // Set active link based on current page
    this.setActiveLink();
  },
  
  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  },
  
  toggleMenu() {
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
  },
  
  closeMenu() {
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
};

/**
 * Scroll Effects Module
 */
const ScrollEffects = {
  init() {
    this.initScrollProgress();
    this.initRevealOnScroll();
    this.initParallax();
  },
  
  initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / docHeight;
        progressBar.style.transform = `scaleX(${progress})`;
      });
    }
  },
  
  initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    if (reveals.length === 0) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => revealObserver.observe(el));
  },
  
  initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
};

/**
 * Animations Module
 */
const Animations = {
  init() {
    this.initTypingEffect();
    this.initMagneticButtons();
    this.initTiltEffect();
    this.initStaggeredAnimations();
  },
  
  initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(el => {
      const text = el.textContent;
      const speed = parseInt(el.dataset.typingSpeed) || 100;
      el.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        }
      };
      
      // Start typing when element is visible
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          typeWriter();
          observer.disconnect();
        }
      });
      
      observer.observe(el);
    });
  },
  
  initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  },
  
  initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * 10;
        const tiltY = (x - 0.5) * -10;
        
        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  },
  
  initStaggeredAnimations() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    staggerContainers.forEach(container => {
      const children = container.children;
      const delay = parseInt(container.dataset.staggerDelay) || 100;
      
      Array.from(children).forEach((child, index) => {
        child.style.transitionDelay = `${index * delay}ms`;
      });
    });
  }
};

/**
 * Counter Animation Module
 */
const Counter = {
  init() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
  },
  
  animateCounter(el) {
    const target = parseInt(el.dataset.counter);
    const duration = parseInt(el.dataset.duration) || 2000;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);
      
      el.textContent = prefix + current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
};

/**
 * Project Gallery Module
 */
const ProjectGallery = {
  projects: [
    {
      id: 1,
      title: "The Onyx Tower",
      category: "commercial",
      client: "Sterling Developments Ltd",
      location: "Victoria Island, Lagos",
      year: "2023",
      description: "A prestigious 25-story mixed-use development featuring premium office spaces and luxury retail outlets. The project showcases our expertise in high-rise construction and modern architectural design.",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?w=800",
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800"
      ]
    },
    {
      id: 2,
      title: "Green Valley Estate",
      category: "residential",
      client: "Greenwood Housing Co.",
      location: "Lekki, Lagos",
      year: "2023",
      description: "An eco-friendly residential development comprising 150 luxury homes with sustainable features including solar panels, rainwater harvesting, and smart home automation systems.",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
      ]
    },
    {
      id: 3,
      title: "Metro Highway Bridge",
      category: "infrastructure",
      client: "Federal Ministry of Works",
      location: "Abuja, Nigeria",
      year: "2022",
      description: "A critical infrastructure project spanning 2.5km, connecting major economic zones. The cable-stayed bridge features advanced engineering solutions for seismic resistance.",
      images: [
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800"
      ]
    },
    {
      id: 4,
      title: "Sunrise Mall",
      category: "commercial",
      client: "Retail Ventures International",
      location: "Ikeja, Lagos",
      year: "2022",
      description: "A 75,000 sqm shopping destination featuring international retail brands, entertainment zones, and a state-of-the-art cinema complex.",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        "https://images.unsplash.com/photo-1519567241046-7f570f9e6c88?w=800",
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800"
      ]
    },
    {
      id: 5,
      title: "Industrial Complex Alpha",
      category: "industrial",
      client: "ManufactureCo Industries",
      location: "Port Harcourt, Nigeria",
      year: "2021",
      description: "A comprehensive industrial facility with manufacturing plants, warehousing, and administrative buildings spanning 50 hectares.",
      images: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800",
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800"
      ]
    },
    {
      id: 6,
      title: "Royal Palms Residence",
      category: "residential",
      client: "Elite Properties Ltd",
      location: "Ikoyi, Lagos",
      year: "2021",
      description: "An exclusive collection of 24 waterfront luxury apartments with panoramic views, private marina access, and world-class amenities.",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
      ]
    }
  ],
  
  init() {
    this.modal = document.querySelector('.project-modal');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectsGrid = document.querySelector('.projects-grid');
    
    if (this.filterButtons.length > 0) {
      this.initFilters();
    }
    
    if (this.projectsGrid) {
      this.renderProjects();
      this.initProjectClicks();
    }
    
    if (this.modal) {
      this.initModal();
    }
  },
  
  initFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        this.filterProjects(filter);
      });
    });
  },
  
  filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      const cardCategory = card.dataset.category;
      
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  },
  
  renderProjects() {
    if (!this.projectsGrid) return;
    
    this.projectsGrid.innerHTML = this.projects.map(project => `
      <div class="project-card" data-category="${project.category}" data-id="${project.id}">
        <img src="${project.images[0]}" alt="${project.title}" class="project-img">
        <div class="project-overlay">
          <span class="project-category">${project.category}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${project.location}
          </p>
        </div>
        <div class="project-expand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </div>
      </div>
    `).join('');
  },
  
  initProjectClicks() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card) {
        const projectId = parseInt(card.dataset.id);
        this.openModal(projectId);
      }
    });
  },
  
  initModal() {
    const closeBtn = this.modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  },
  
  openModal(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project || !this.modal) return;
    
    const modalContent = this.modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.innerHTML = `
        <button class="modal-close">&times;</button>
        <div class="modal-gallery">
          <img src="${project.images[0]}" alt="${project.title}" class="modal-main-img">
          <div class="modal-thumbnails">
            ${project.images.map((img, i) => `
              <img src="${img}" alt="${project.title} ${i + 1}" 
                   class="modal-thumb ${i === 0 ? 'active' : ''}" 
                   data-index="${i}">
            `).join('')}
          </div>
        </div>
        <div class="modal-info">
          <h2>${project.title}</h2>
          <div class="modal-meta">
            <div class="modal-meta-item">
              <span>Client:</span>
              <span>${project.client}</span>
            </div>
            <div class="modal-meta-item">
              <span>Location:</span>
              <span>${project.location}</span>
            </div>
            <div class="modal-meta-item">
              <span>Year:</span>
              <span>${project.year}</span>
            </div>
            <div class="modal-meta-item">
              <span>Category:</span>
              <span>${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
            </div>
          </div>
          <p>${project.description}</p>
        </div>
      `;
      
      // Reinitialize close button
      const newCloseBtn = this.modal.querySelector('.modal-close');
      newCloseBtn.addEventListener('click', () => this.closeModal());
      
      // Thumbnail clicks
      const thumbnails = this.modal.querySelectorAll('.modal-thumb');
      const mainImg = this.modal.querySelector('.modal-main-img');
      
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
          thumbnails.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          mainImg.src = thumb.src;
        });
      });
    }
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/**
 * Contact Form Module
 */
const ContactForm = {
  init() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  },
  
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let isValid = true;
    
    // Validate all fields
    form.querySelectorAll('.form-control').forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Show success message
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.classList.add('btn-success');
        form.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-success');
        }, 3000);
      }, 1500);
    }
  },
  
  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required check
    if (input.required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    // Phone validation
    else if (name === 'phone' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    if (!isValid) {
      this.showError(input, errorMessage);
    } else {
      this.clearError(input);
    }
    
    return isValid;
  },
  
  showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('has-error');
    
    let errorEl = formGroup.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      errorEl.style.cssText = 'color: #E74C3C; font-size: 0.85rem; margin-top: 0.25rem; display: block;';
      formGroup.appendChild(errorEl);
    }
    errorEl.textContent = message;
    input.style.borderColor = '#E74C3C';
  },
  
  clearError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('has-error');
    
    const errorEl = formGroup.querySelector('.form-error');
    if (errorEl) {
      errorEl.remove();
    }
    input.style.borderColor = '';
  }
};

/**
 * Back to Top Module
 */
const BackToTop = {
  init() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
    
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
};

/**
 * About Carousel Module
 */
const AboutCarousel = {
  carousel: null,
  slides: [],
  dots: [],
  currentIndex: 0,
  autoPlayInterval: null,
  
  init() {
    this.carousel = document.getElementById('aboutCarousel');
    if (!this.carousel) return;
    
    this.slides = Array.from(this.carousel.querySelectorAll('.carousel-slide'));
    this.dots = Array.from(document.querySelectorAll('.carousel-dot'));
    
    if (this.slides.length === 0) return;
    
    // Navigation buttons
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Auto-play
    this.startAutoPlay();
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
  },
  
  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    
    // Remove active class from current slide and dot
    this.slides[this.currentIndex].classList.remove('active');
    this.dots[this.currentIndex]?.classList.remove('active');
    
    // Set new current index
    this.currentIndex = index;
    
    // Add active class to new slide and dot
    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex]?.classList.add('active');
  },
  
  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  },
  
  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  },
  
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  },
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
};

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/**
 * Lazy Loading Images
 */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * Preload Critical Images
 */
const preloadImages = (urls) => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Navigation, ScrollEffects, Animations, Counter, ProjectGallery, ContactForm };
}

