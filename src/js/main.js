/**
 * Union Beach Memorial Library - Main JavaScript
 * Accessible, mobile-first functionality
 */

// Mobile menu toggle functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Toggle ARIA state
    menuToggle.setAttribute('aria-expanded', !isExpanded);

    // Toggle active class
    mainNav.classList.toggle('active');

    // Update screen reader announcement
    const announcement = !isExpanded ? 'Menu opened' : 'Menu closed';
    announceToScreenReader(announcement);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInside = menuToggle.contains(event.target) || mainNav.contains(event.target);

    if (!isClickInside && mainNav.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      menuToggle.focus();
    }
  });
}

// Screen reader announcements
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

// Update copyright year
function updateCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Form validation helper
function setupFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      const isValid = validateForm(form);

      if (!isValid) {
        event.preventDefault();
        announceToScreenReader('Form has errors. Please correct them and try again.');
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

  inputs.forEach((input) => {
    const errorMessage = input.nextElementSibling;

    if (!input.value.trim()) {
      isValid = false;

      // Add error class
      input.classList.add('error');
      input.setAttribute('aria-invalid', 'true');

      // Show or create error message
      if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.textContent = 'This field is required';
      } else {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = 'This field is required';
        error.id = `${input.id}-error`;
        input.setAttribute('aria-describedby', error.id);
        input.parentNode.insertBefore(error, input.nextSibling);
      }
    } else {
      // Remove error state
      input.classList.remove('error');
      input.setAttribute('aria-invalid', 'false');

      if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
      }
    }
  });

  return isValid;
}

// Focus management for skip link
function setupSkipLink() {
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.getElementById('main-content');

  if (skipLink && mainContent) {
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();

      // Remove tabindex after focus to avoid unintended side effects
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex');
      }, { once: true });
    });
  }
}

// Smooth scroll polyfill for older browsers
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const href = this.getAttribute('href');

      // Skip if it's the skip link (handled separately)
      if (href === '#main-content') return;

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }

        // Set focus to target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
}

// Accessibility: Detect keyboard navigation
function detectKeyboardNavigation() {
  let usingKeyboard = false;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      usingKeyboard = true;
      document.body.classList.add('using-keyboard');
    }
  });

  document.addEventListener('mousedown', () => {
    usingKeyboard = false;
    document.body.classList.remove('using-keyboard');
  });
}

// Initialize all functionality when DOM is ready
function init() {
  updateCopyrightYear();
  initMobileMenu();
  setupFormValidation();
  setupSkipLink();
  setupSmoothScroll();
  detectKeyboardNavigation();

  // Announce page load to screen readers
  announceToScreenReader('Page loaded');
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for testing
export {
  initMobileMenu,
  announceToScreenReader,
  updateCopyrightYear,
  validateForm,
  setupSkipLink,
  setupSmoothScroll,
  detectKeyboardNavigation,
};
