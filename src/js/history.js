/**
 * Union Beach Memorial Library - History Page JavaScript
 * Interactive timeline and image gallery functionality
 */

// Image Gallery Modal/Lightbox functionality
function initImageGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length === 0) return;

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');

    if (!img) return;

    // Make gallery items keyboard accessible
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View enlarged image: ${img.alt}`);

    // Click handler for gallery items
    const clickHandler = (event) => {
      // Don't open modal if clicking on a link within the item
      if (event.target.tagName === 'A') return;

      openImageModal(img, index, galleryItems);
    };

    // Keyboard handler
    const keyHandler = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImageModal(img, index, galleryItems);
      }
    };

    item.addEventListener('click', clickHandler);
    item.addEventListener('keydown', keyHandler);
  });
}

// Open image in modal/lightbox
function openImageModal(img, currentIndex, allItems) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Image viewer');

  // Create modal content
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Close image viewer">
        <span aria-hidden="true">&times;</span>
      </button>
      <button class="modal-prev" aria-label="Previous image">
        <span aria-hidden="true">‹</span>
      </button>
      <button class="modal-next" aria-label="Next image">
        <span aria-hidden="true">›</span>
      </button>
      <div class="modal-image-container">
        <img src="${img.src}" alt="${img.alt}" class="modal-image">
        <div class="modal-caption">
          <p>${img.alt}</p>
        </div>
      </div>
      <div class="modal-counter" aria-live="polite">
        Image ${currentIndex + 1} of ${allItems.length}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Focus the close button for accessibility
  const closeButton = modal.querySelector('.modal-close');
  setTimeout(() => closeButton.focus(), 100);

  // Modal navigation
  let currentImageIndex = currentIndex;

  const updateModalImage = (index) => {
    const newItem = allItems[index];
    const newImg = newItem.querySelector('img');

    if (!newImg) return;

    const modalImg = modal.querySelector('.modal-image');
    const modalCaption = modal.querySelector('.modal-caption p');
    const modalCounter = modal.querySelector('.modal-counter');

    modalImg.src = newImg.src;
    modalImg.alt = newImg.alt;
    modalCaption.textContent = newImg.alt;
    modalCounter.textContent = `Image ${index + 1} of ${allItems.length}`;

    currentImageIndex = index;
  };

  // Close modal
  const closeModal = () => {
    document.body.removeChild(modal);
    document.body.style.overflow = '';

    // Return focus to the gallery item that opened the modal
    allItems[currentImageIndex].focus();
  };

  // Event listeners
  closeButton.addEventListener('click', closeModal);

  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

  modal.querySelector('.modal-prev').addEventListener('click', () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : allItems.length - 1;
    updateModalImage(newIndex);
  });

  modal.querySelector('.modal-next').addEventListener('click', () => {
    const newIndex = currentImageIndex < allItems.length - 1 ? currentImageIndex + 1 : 0;
    updateModalImage(newIndex);
  });

  // Keyboard navigation
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'ArrowLeft') {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : allItems.length - 1;
      updateModalImage(newIndex);
    } else if (event.key === 'ArrowRight') {
      const newIndex = currentImageIndex < allItems.length - 1 ? currentImageIndex + 1 : 0;
      updateModalImage(newIndex);
    }
  });
}

// Timeline scroll animations
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineItems.length === 0) return;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip animations if user prefers reduced motion
    timelineItems.forEach(item => item.classList.add('visible'));
    return;
  }

  // Intersection Observer for scroll-based animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    item.classList.add('timeline-animate');
    observer.observe(item);
  });
}

// Smooth scroll to timeline sections
function initTimelineNavigation() {
  // If there are any links that navigate to timeline items
  const timelineLinks = document.querySelectorAll('a[href^="#timeline-"]');

  timelineLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Set focus for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
      }
    });
  });
}

// Add loading states for images
function initImageLoading() {
  const images = document.querySelectorAll('.gallery-image-placeholder img');

  images.forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        img.parentElement.classList.add('loaded');
      });

      img.addEventListener('error', () => {
        img.parentElement.classList.add('error');
        // Keep placeholder visible on error
      });
    } else {
      img.parentElement.classList.add('loaded');
    }
  });
}

// Screen reader announcements for history page
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'visually-hidden';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Add CSS for modal dynamically
function injectModalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .image-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      cursor: pointer;
    }

    .modal-content {
      position: relative;
      z-index: 10000;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .modal-close,
    .modal-prev,
    .modal-next {
      position: absolute;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      color: #1e5a8e;
      font-size: 2rem;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      transition: background-color 0.3s, transform 0.3s;
      z-index: 10001;
    }

    .modal-close {
      top: 20px;
      right: 20px;
    }

    .modal-prev {
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .modal-next {
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .modal-close:hover,
    .modal-close:focus,
    .modal-prev:hover,
    .modal-prev:focus,
    .modal-next:hover,
    .modal-next:focus {
      background: white;
      transform: scale(1.1);
    }

    .modal-prev:hover,
    .modal-prev:focus {
      transform: translateY(-50%) scale(1.1);
    }

    .modal-next:hover,
    .modal-next:focus {
      transform: translateY(-50%) scale(1.1);
    }

    .modal-image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 100%;
    }

    .modal-image {
      max-width: 90vw;
      max-height: 70vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }

    .modal-caption {
      background: rgba(255, 255, 255, 0.95);
      padding: 1rem 2rem;
      margin-top: 1rem;
      border-radius: 4px;
      max-width: 600px;
      text-align: center;
    }

    .modal-caption p {
      margin: 0;
      color: #212529;
      font-size: 1rem;
      line-height: 1.5;
    }

    .modal-counter {
      background: rgba(255, 255, 255, 0.9);
      padding: 0.5rem 1rem;
      margin-top: 0.5rem;
      border-radius: 4px;
      color: #212529;
      font-size: 0.9rem;
      font-weight: bold;
    }

    .timeline-animate {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .timeline-animate.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .gallery-image-placeholder.loaded::before {
      display: none;
    }

    .gallery-image-placeholder.error::before {
      content: '⚠️';
      font-size: 3rem;
      opacity: 0.5;
    }

    @media (prefers-reduced-motion: reduce) {
      .timeline-animate {
        opacity: 1;
        transform: none;
        transition: none;
      }

      .modal-close:hover,
      .modal-prev:hover,
      .modal-next:hover {
        transform: none;
      }

      .modal-prev:hover,
      .modal-next:hover {
        transform: translateY(-50%);
      }
    }

    @media screen and (max-width: 767px) {
      .modal-prev,
      .modal-next {
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
      }

      .modal-prev {
        left: 10px;
      }

      .modal-next {
        right: 10px;
      }

      .modal-close {
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize all history page functionality
function init() {
  injectModalStyles();
  initImageGallery();
  initTimelineAnimations();
  initTimelineNavigation();
  initImageLoading();

  // Announce page loaded for screen readers
  announceToScreenReader('History page loaded. Timeline and photo gallery available.');
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for testing
export {
  initImageGallery,
  initTimelineAnimations,
  initTimelineNavigation,
  initImageLoading,
  announceToScreenReader,
};
