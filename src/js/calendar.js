/**
 * Union Beach Memorial Library - Calendar Page JavaScript
 * Accessible filtering, sorting, and export functionality
 */

// Store all events for filtering and sorting
let allEvents = [];

/**
 * Initialize calendar functionality
 */
function initCalendar() {
  // Get all event elements and store their data
  allEvents = Array.from(document.querySelectorAll('[data-event]')).map((element) => {
    return {
      element,
      type: element.getAttribute('data-event-type') || 'all',
      date: element.getAttribute('data-event-date') || '',
      title: element.querySelector('[data-event-title]')?.textContent.trim() || '',
      id: element.querySelector('[data-event-export]')?.getAttribute('data-event-id') || '',
    };
  });

  // Set up event listeners
  setupFilters();
  setupSort();
  setupExport();
  setupEventExport();

  // Hide loading indicator
  hideLoading();

  // Announce calendar loaded to screen readers
  announceToScreenReader('Calendar loaded with ' + allEvents.length + ' events');
}

/**
 * Set up filter controls
 */
function setupFilters() {
  const typeFilter = document.querySelector('[data-filter="type"]');
  const dateFilter = document.querySelector('[data-filter="date"]');
  const clearButton = document.querySelectorAll('[data-action="clear-filters"]');

  if (typeFilter) {
    typeFilter.addEventListener('change', () => {
      applyFilters();
      announceToScreenReader('Filters applied');
    });
  }

  if (dateFilter) {
    dateFilter.addEventListener('change', () => {
      applyFilters();
      announceToScreenReader('Filters applied');
    });
  }

  if (clearButton.length > 0) {
    clearButton.forEach((button) => {
      button.addEventListener('click', () => {
        clearFilters();
        announceToScreenReader('Filters cleared');
      });
    });
  }
}

/**
 * Apply current filter settings
 */
function applyFilters() {
  const typeFilter = document.querySelector('[data-filter="type"]');
  const dateFilter = document.querySelector('[data-filter="date"]');

  const selectedType = typeFilter?.value || 'all';
  const selectedDate = dateFilter?.value || 'upcoming';

  let visibleCount = 0;

  allEvents.forEach((event) => {
    let isVisible = true;

    // Filter by type
    if (selectedType !== 'all' && event.type !== selectedType) {
      isVisible = false;
    }

    // Filter by date
    if (selectedDate !== 'all' && isVisible) {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (selectedDate) {
        case 'upcoming':
          isVisible = eventDate >= today;
          break;
        case 'this-week':
          const weekFromNow = new Date(today);
          weekFromNow.setDate(today.getDate() + 7);
          isVisible = eventDate >= today && eventDate <= weekFromNow;
          break;
        case 'this-month':
          isVisible =
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear() &&
            eventDate >= today;
          break;
        case 'next-month':
          const nextMonth = new Date(today);
          nextMonth.setMonth(today.getMonth() + 1);
          isVisible =
            eventDate.getMonth() === nextMonth.getMonth() &&
            eventDate.getFullYear() === nextMonth.getFullYear();
          break;
      }
    }

    // Show or hide event
    if (isVisible) {
      event.element.style.display = '';
      event.element.setAttribute('data-hidden', 'false');
      visibleCount++;
    } else {
      event.element.style.display = 'none';
      event.element.setAttribute('data-hidden', 'true');
    }
  });

  // Show/hide no events message
  updateNoEventsMessage(visibleCount);

  // Update status message
  updateStatusMessage(`Showing ${visibleCount} event${visibleCount !== 1 ? 's' : ''}`);
}

/**
 * Clear all filters
 */
function clearFilters() {
  const typeFilter = document.querySelector('[data-filter="type"]');
  const dateFilter = document.querySelector('[data-filter="date"]');
  const sortControl = document.querySelector('[data-sort]');

  if (typeFilter) typeFilter.value = 'all';
  if (dateFilter) dateFilter.value = 'upcoming';
  if (sortControl) sortControl.value = 'date-asc';

  // Show all events
  allEvents.forEach((event) => {
    event.element.style.display = '';
    event.element.setAttribute('data-hidden', 'false');
  });

  // Apply default sort
  applySorting('date-asc');

  // Hide no events message
  updateNoEventsMessage(allEvents.length);
  updateStatusMessage(`Showing all ${allEvents.length} events`);
}

/**
 * Set up sort control
 */
function setupSort() {
  const sortControl = document.querySelector('[data-sort]');

  if (sortControl) {
    sortControl.addEventListener('change', () => {
      const sortValue = sortControl.value;
      applySorting(sortValue);
      announceToScreenReader('Events sorted by ' + sortValue);
    });
  }
}

/**
 * Apply sorting to events
 */
function applySorting(sortType) {
  const container = document.querySelector('[data-events-container]');
  if (!container) return;

  // Sort events array
  const sortedEvents = [...allEvents].sort((a, b) => {
    switch (sortType) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  // Reorder DOM elements
  sortedEvents.forEach((event) => {
    container.appendChild(event.element);
  });
}

/**
 * Set up export functionality for all events
 */
function setupExport() {
  const googleButton = document.querySelector('[data-export="google"]');
  const icalButton = document.querySelector('[data-export="ical"]');

  if (googleButton) {
    googleButton.addEventListener('click', () => {
      exportToGoogleCalendar();
      announceToScreenReader('Exporting to Google Calendar');
    });
  }

  if (icalButton) {
    icalButton.addEventListener('click', () => {
      exportToICal();
      announceToScreenReader('Downloading iCal file');
    });
  }
}

/**
 * Export visible events to Google Calendar
 */
function exportToGoogleCalendar() {
  // Get all visible events
  const visibleEvents = allEvents.filter(
    (event) => event.element.getAttribute('data-hidden') !== 'true'
  );

  if (visibleEvents.length === 0) {
    updateStatusMessage('No events to export. Please adjust filters.');
    return;
  }

  // For simplicity, export the first visible event
  // In production, you might want to loop through all or show a selection dialog
  const firstEvent = visibleEvents[0];
  const eventData = extractEventData(firstEvent.element);

  if (eventData) {
    const googleUrl = createGoogleCalendarUrl(eventData);
    window.open(googleUrl, '_blank');
    updateStatusMessage('Opening Google Calendar...');
  }
}

/**
 * Export visible events to iCal format
 */
function exportToICal() {
  const visibleEvents = allEvents.filter(
    (event) => event.element.getAttribute('data-hidden') !== 'true'
  );

  if (visibleEvents.length === 0) {
    updateStatusMessage('No events to export. Please adjust filters.');
    return;
  }

  let icalContent = 'BEGIN:VCALENDAR\n';
  icalContent += 'VERSION:2.0\n';
  icalContent += 'PRODID:-//Union Beach Memorial Library//Calendar//EN\n';
  icalContent += 'CALSCALE:GREGORIAN\n';

  visibleEvents.forEach((event) => {
    const eventData = extractEventData(event.element);
    if (eventData) {
      icalContent += createICalEvent(eventData);
    }
  });

  icalContent += 'END:VCALENDAR\n';

  // Create download link
  const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'union-beach-library-events.ics';
  link.click();
  URL.revokeObjectURL(url);

  updateStatusMessage(`Exported ${visibleEvents.length} event${visibleEvents.length !== 1 ? 's' : ''} to iCal`);
}

/**
 * Set up individual event export buttons
 */
function setupEventExport() {
  const exportButtons = document.querySelectorAll('[data-event-export]');

  exportButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const eventCard = button.closest('[data-event]');
      if (eventCard) {
        exportSingleEvent(eventCard);
      }
    });
  });
}

/**
 * Export a single event
 */
function exportSingleEvent(eventElement) {
  const eventData = extractEventData(eventElement);

  if (!eventData) {
    updateStatusMessage('Unable to export event');
    return;
  }

  // Create iCal file for single event
  let icalContent = 'BEGIN:VCALENDAR\n';
  icalContent += 'VERSION:2.0\n';
  icalContent += 'PRODID:-//Union Beach Memorial Library//Calendar//EN\n';
  icalContent += 'CALSCALE:GREGORIAN\n';
  icalContent += createICalEvent(eventData);
  icalContent += 'END:VCALENDAR\n';

  // Create download
  const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${eventData.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;
  link.click();
  URL.revokeObjectURL(url);

  announceToScreenReader(`Exported ${eventData.title} to calendar`);
}

/**
 * Extract event data from event card element
 */
function extractEventData(eventElement) {
  try {
    const titleEl = eventElement.querySelector('[data-event-title]');
    const descriptionEl = eventElement.querySelector('[data-event-description]');
    const locationEl = eventElement.querySelector('[data-event-location]');
    const dateEl = eventElement.querySelector('time[datetime]');
    const timeEl = eventElement.querySelector('.event-time time[datetime]');

    const title = titleEl?.textContent.trim() || 'Library Event';
    const description = descriptionEl?.textContent.trim() || '';
    const location = locationEl?.textContent.replace('Location:', '').trim() || 'Union Beach Memorial Library';

    const startDateTime = timeEl?.getAttribute('datetime') || dateEl?.getAttribute('datetime') || '';

    // Parse start and end time
    let startDate, endDate;
    if (startDateTime) {
      startDate = new Date(startDateTime);
      endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1 hour duration
    }

    return {
      title,
      description,
      location,
      startDate,
      endDate,
    };
  } catch (error) {
    console.error('Error extracting event data:', error);
    return null;
  }
}

/**
 * Create Google Calendar URL
 */
function createGoogleCalendarUrl(eventData) {
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(eventData.title);
  const dates = `${formatDate(eventData.startDate)}/${formatDate(eventData.endDate)}`;
  const details = encodeURIComponent(eventData.description);
  const location = encodeURIComponent(eventData.location);

  return `${baseUrl}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Create iCal event format
 */
function createICalEvent(eventData) {
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const uid = `${Date.now()}-${Math.random().toString(36).substring(7)}@unionbeachlibrary.org`;
  const timestamp = formatDate(new Date());

  let event = 'BEGIN:VEVENT\n';
  event += `UID:${uid}\n`;
  event += `DTSTAMP:${timestamp}\n`;
  event += `DTSTART:${formatDate(eventData.startDate)}\n`;
  event += `DTEND:${formatDate(eventData.endDate)}\n`;
  event += `SUMMARY:${eventData.title}\n`;
  event += `DESCRIPTION:${eventData.description.replace(/\n/g, '\\n')}\n`;
  event += `LOCATION:${eventData.location}\n`;
  event += 'STATUS:CONFIRMED\n';
  event += 'END:VEVENT\n';

  return event;
}

/**
 * Update status message for screen readers
 */
function updateStatusMessage(message) {
  const statusElement = document.querySelector('.status-message');
  if (statusElement) {
    statusElement.textContent = message;

    // Clear message after 3 seconds
    setTimeout(() => {
      statusElement.textContent = '';
    }, 3000);
  }
}

/**
 * Update no events message visibility
 */
function updateNoEventsMessage(visibleCount) {
  const noEventsMessage = document.querySelector('[data-no-events]');
  if (noEventsMessage) {
    if (visibleCount === 0) {
      noEventsMessage.style.display = 'block';
    } else {
      noEventsMessage.style.display = 'none';
    }
  }
}

/**
 * Hide loading indicator
 */
function hideLoading() {
  const loading = document.querySelector('[data-loading]');
  if (loading) {
    loading.setAttribute('aria-hidden', 'true');
    loading.style.display = 'none';
  }
}

/**
 * Show loading indicator
 */
function showLoading() {
  const loading = document.querySelector('[data-loading]');
  if (loading) {
    loading.setAttribute('aria-hidden', 'false');
    loading.style.display = 'block';
  }
}

/**
 * Announce to screen readers
 */
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'visually-hidden';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    if (announcement.parentNode) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}

/**
 * Keyboard navigation enhancements
 */
function setupKeyboardNavigation() {
  const eventCards = document.querySelectorAll('.event-card');

  eventCards.forEach((card) => {
    // Make event cards keyboard navigable
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }

    // Allow Enter/Space to expand or focus on event details
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const firstLink = card.querySelector('a, button');
        if (firstLink && event.target === card) {
          event.preventDefault();
          firstLink.focus();
        }
      }
    });
  });
}

/**
 * Initialize everything when DOM is ready
 */
function init() {
  initCalendar();
  setupKeyboardNavigation();
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for testing
export {
  initCalendar,
  setupFilters,
  applyFilters,
  clearFilters,
  setupSort,
  applySorting,
  setupExport,
  exportToGoogleCalendar,
  exportToICal,
  extractEventData,
  announceToScreenReader,
};
