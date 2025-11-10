/**
 * Union Beach Memorial Library - About Page JavaScript
 * Accessible, progressive enhancement for about page features
 */

/**
 * Enhanced Lazy Loading with Intersection Observer
 * Provides smooth image loading with fade-in effect
 */
function initEnhancedLazyLoading() {
  // Check if browser supports IntersectionObserver
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Add fade-in class when image enters viewport
          img.classList.add('fade-in');

          // Handle image load success
          img.addEventListener('load', () => {
            img.classList.add('loaded');
            announceImageLoad(img);
          });

          // Handle image load error
          img.addEventListener('error', () => {
            console.error(`Failed to load image: ${img.src}`);
            img.alt = 'Image unavailable';
            img.classList.add('error');
          });

          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      // Load images slightly before they enter viewport
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all member images
    const memberImages = document.querySelectorAll('.member-image img');
    memberImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Announce image load to screen readers (subtle, non-intrusive)
 */
function announceImageLoad(img) {
  const alt = img.getAttribute('alt');
  if (alt && alt.length > 0) {
    // Only announce if image has meaningful alt text
    const memberCard = img.closest('.member-card');
    if (memberCard) {
      memberCard.setAttribute('data-image-loaded', 'true');
    }
  }
}

/**
 * Progressive Card Animation
 * Adds staggered fade-in animation to member cards
 */
function initCardAnimations() {
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add small delay for staggered effect
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 100);

          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
      card.classList.add('will-animate');
      cardObserver.observe(card);
    });
  } else {
    // Fallback: just show all cards immediately
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
      card.classList.add('animate-in');
    });
  }
}

/**
 * Keyboard Navigation Enhancement for Member Cards
 * Improves accessibility by handling keyboard interactions
 */
function enhanceCardKeyboardNav() {
  const memberCards = document.querySelectorAll('.member-card');

  memberCards.forEach(card => {
    // Make cards focusable
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }

    // Handle Enter/Space to expand or focus first interactive element
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        // If card has links, focus the first one
        const link = card.querySelector('a');
        if (link) {
          event.preventDefault();
          link.focus();
          link.click();
        }
      }
    });

    // Add visual feedback on focus
    card.addEventListener('focus', () => {
      card.classList.add('keyboard-focused');
    });

    card.addEventListener('blur', () => {
      card.classList.remove('keyboard-focused');
    });
  });
}

/**
 * Read More / Read Less functionality for long bios
 * Progressive enhancement - works without JS
 */
function initReadMoreFeature() {
  const bios = document.querySelectorAll('.member-info .bio');

  bios.forEach(bio => {
    const text = bio.textContent.trim();

    // Only add read more if bio is longer than 300 characters
    if (text.length > 300) {
      const shortText = text.substring(0, 300) + '...';
      const fullText = text;

      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'bio-wrapper';

      // Create short version
      const shortVersion = document.createElement('span');
      shortVersion.className = 'bio-short';
      shortVersion.textContent = shortText;

      // Create full version (hidden initially)
      const fullVersion = document.createElement('span');
      fullVersion.className = 'bio-full';
      fullVersion.textContent = fullText;
      fullVersion.style.display = 'none';

      // Create read more button
      const readMoreBtn = document.createElement('button');
      readMoreBtn.className = 'read-more-btn';
      readMoreBtn.textContent = 'Read More';
      readMoreBtn.setAttribute('aria-expanded', 'false');
      readMoreBtn.setAttribute('aria-label', 'Read more about this member');

      // Toggle functionality
      readMoreBtn.addEventListener('click', () => {
        const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          shortVersion.style.display = 'inline';
          fullVersion.style.display = 'none';
          readMoreBtn.textContent = 'Read More';
          readMoreBtn.setAttribute('aria-expanded', 'false');
        } else {
          shortVersion.style.display = 'none';
          fullVersion.style.display = 'inline';
          readMoreBtn.textContent = 'Read Less';
          readMoreBtn.setAttribute('aria-expanded', 'true');
        }
      });

      // Replace bio content
      bio.textContent = '';
      wrapper.appendChild(shortVersion);
      wrapper.appendChild(fullVersion);
      bio.appendChild(wrapper);
      bio.appendChild(readMoreBtn);
    }
  });
}

/**
 * Scroll to Section from Hash
 * Handles smooth scrolling to sections when page loads with hash
 */
function handleHashNavigation() {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        target.focus();
      }, 100);
    }
  }
}

/**
 * Print-friendly member cards
 * Ensures member info prints well
 */
function enhancePrintFriendliness() {
  window.addEventListener('beforeprint', () => {
    // Expand all read more sections for printing
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
      const bioWrapper = btn.previousElementSibling;
      if (bioWrapper) {
        const shortVersion = bioWrapper.querySelector('.bio-short');
        const fullVersion = bioWrapper.querySelector('.bio-full');

        if (shortVersion) shortVersion.style.display = 'none';
        if (fullVersion) fullVersion.style.display = 'inline';
      }
    });
  });

  window.addEventListener('afterprint', () => {
    // Restore collapsed state after printing
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
      if (btn.getAttribute('aria-expanded') === 'false') {
        const bioWrapper = btn.previousElementSibling;
        if (bioWrapper) {
          const shortVersion = bioWrapper.querySelector('.bio-short');
          const fullVersion = bioWrapper.querySelector('.bio-full');

          if (shortVersion) shortVersion.style.display = 'inline';
          if (fullVersion) fullVersion.style.display = 'none';
        }
      }
    });
  });
}

/**
 * Initialize all about page functionality
 */
function initAboutPage() {
  // Check if we're on the about page
  if (!document.querySelector('.members-section')) {
    return; // Not on about page, exit early
  }

  initEnhancedLazyLoading();
  initCardAnimations();
  enhanceCardKeyboardNav();
  // Commenting out read more for now as bios are good length
  // initReadMoreFeature();
  handleHashNavigation();
  enhancePrintFriendliness();

  // Announce page-specific content loaded
  console.log('About page enhancements loaded');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
  initAboutPage();
}

// Export functions for testing
export {
  initEnhancedLazyLoading,
  initCardAnimations,
  enhanceCardKeyboardNav,
  initReadMoreFeature,
  handleHashNavigation,
  enhancePrintFriendliness,
};
