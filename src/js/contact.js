/**
 * Union Beach Memorial Library - Contact Form
 * Form validation and submission handling
 */

// Form validation patterns
const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\(\)]+$/,
};

// Error messages
const ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min) => `Please enter at least ${min} characters`,
};

/**
 * Initialize contact form functionality
 */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Add real-time validation on blur
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach((input) => {
    if (input.id !== 'contact-website') { // Skip honeypot
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        // Clear error on input
        if (input.classList.contains('error')) {
          clearFieldError(input);
        }
      });
    }
  });

  // Handle form submission
  form.addEventListener('submit', handleFormSubmit);
}

/**
 * Validate a single form field
 */
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let errorMessage = '';

  // Check if required and empty
  if (field.hasAttribute('required') && !value) {
    errorMessage = ERROR_MESSAGES.required;
  }
  // Validate email
  else if (field.type === 'email' && value && !VALIDATION_PATTERNS.email.test(value)) {
    errorMessage = ERROR_MESSAGES.email;
  }
  // Validate phone (if provided)
  else if (field.type === 'tel' && value && !VALIDATION_PATTERNS.phone.test(value)) {
    errorMessage = ERROR_MESSAGES.phone;
  }
  // Validate minimum length for message
  else if (field.id === 'contact-message' && value && value.length < 10) {
    errorMessage = ERROR_MESSAGES.minLength(10);
  }

  if (errorMessage) {
    showFieldError(field, errorMessage);
    return false;
  } else {
    clearFieldError(field);
    return true;
  }
}

/**
 * Show error message for a field
 */
function showFieldError(field, message) {
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');

  const errorSpan = field.parentElement.querySelector('.error-message');
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.id = `${field.id}-error`;
    field.setAttribute('aria-describedby', errorSpan.id);
  }
}

/**
 * Clear error message for a field
 */
function clearFieldError(field) {
  field.classList.remove('error');
  field.setAttribute('aria-invalid', 'false');

  const errorSpan = field.parentElement.querySelector('.error-message');
  if (errorSpan) {
    errorSpan.textContent = '';
    field.removeAttribute('aria-describedby');
  }
}

/**
 * Validate entire form
 */
function validateForm(form) {
  let isValid = true;
  const errors = [];

  // Clear previous form-level errors
  hideFormErrors(form);

  // Validate each required field
  const fields = form.querySelectorAll('input[required], textarea[required]');
  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
      const label = form.querySelector(`label[for="${field.id}"]`);
      const fieldName = label ? label.textContent.replace('*', '').trim() : field.name;
      errors.push(fieldName);
    }
  });

  // Check honeypot (spam protection)
  const honeypot = form.querySelector('#contact-website');
  if (honeypot && honeypot.value) {
    // Spam detected - silently reject
    return false;
  }

  // Show form-level errors if any
  if (!isValid) {
    showFormErrors(form, errors);
    announceToScreenReader(`Form validation failed. ${errors.length} fields need attention.`);
  }

  return isValid;
}

/**
 * Show form-level errors
 */
function showFormErrors(form, errors) {
  const errorContainer = form.querySelector('.form-errors');
  if (!errorContainer) return;

  errorContainer.innerHTML = `
    <p>Please correct the following errors:</p>
    <ul>
      ${errors.map(error => `<li>${error}</li>`).join('')}
    </ul>
  `;
  errorContainer.classList.add('visible');

  // Scroll to errors
  errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Focus first error field
  const firstErrorField = form.querySelector('.error');
  if (firstErrorField) {
    firstErrorField.focus();
  }
}

/**
 * Hide form-level errors
 */
function hideFormErrors(form) {
  const errorContainer = form.querySelector('.form-errors');
  if (errorContainer) {
    errorContainer.innerHTML = '';
    errorContainer.classList.remove('visible');
  }
}

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');

  // Validate form
  if (!validateForm(form)) {
    return;
  }

  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.classList.add('loading');

  try {
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Remove honeypot from data
    delete data.website;

    // Simulate form submission (replace with actual endpoint)
    await submitFormData(data);

    // Show success message
    showSuccessMessage(form);

    // Reset form
    form.reset();

    // Clear any errors
    hideFormErrors(form);
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => clearFieldError(field));

    // Announce success to screen readers
    announceToScreenReader('Your message has been sent successfully!');

  } catch (error) {
    // Show error message
    showFormErrors(form, ['An error occurred. Please try again or contact us by phone.']);
    announceToScreenReader('An error occurred while sending your message. Please try again.');
    console.error('Form submission error:', error);

  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
  }
}

/**
 * Submit form data to server
 * (Replace this with actual API endpoint)
 */
async function submitFormData(data) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In production, this would be an actual API call:
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
  //
  // if (!response.ok) {
  //   throw new Error('Form submission failed');
  // }
  //
  // return await response.json();

  console.log('Form data:', data);
  return { success: true };
}

/**
 * Show success message
 */
function showSuccessMessage(form) {
  const successContainer = form.querySelector('.form-success');
  if (successContainer) {
    successContainer.style.display = 'block';

    // Hide after 10 seconds
    setTimeout(() => {
      successContainer.style.display = 'none';
    }, 10000);

    // Scroll to success message
    successContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Screen reader announcements
 */
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

/**
 * Initialize on DOM ready
 */
function init() {
  initContactForm();
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for testing
export {
  initContactForm,
  validateField,
  validateForm,
  showFieldError,
  clearFieldError,
  handleFormSubmit,
};
