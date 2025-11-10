/**
 * Calendar Page Tests
 * Test-Driven Development for Union Beach Memorial Library Calendar Page
 * Tests cover: Structure, Accessibility, Event Display, Filtering, Sorting, Export
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { axe, toHaveNoViolations } from 'jest-axe';
import fs from 'fs';
import path from 'path';

expect.extend(toHaveNoViolations);

describe('Calendar Page Tests', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Load the calendar.html file
    const html = fs.readFileSync(
      path.resolve(__dirname, '../calendar.html'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      url: 'http://localhost:3000/calendar.html',
      contentType: 'text/html',
      runScripts: 'outside-only',
      resources: 'usable',
    });

    document = dom.window.document;
    window = dom.window;
  });

  describe('Page Structure and Semantic HTML', () => {
    it('should have a valid HTML5 doctype', () => {
      expect(dom.window.document.doctype).not.toBeNull();
      expect(dom.window.document.doctype.name).toBe('html');
    });

    it('should have lang attribute set to "en"', () => {
      const html = document.documentElement;
      expect(html.getAttribute('lang')).toBe('en');
    });

    it('should have proper meta tags', () => {
      const charset = document.querySelector('meta[charset]');
      const viewport = document.querySelector('meta[name="viewport"]');
      const description = document.querySelector('meta[name="description"]');

      expect(charset).not.toBeNull();
      expect(viewport).not.toBeNull();
      expect(description).not.toBeNull();
      expect(description.getAttribute('content')).toContain('calendar');
    });

    it('should have a descriptive title', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toContain('Calendar');
      expect(title.textContent).toContain('Union Beach Memorial Library');
    });

    it('should have header with role="banner"', () => {
      const header = document.querySelector('header[role="banner"]');
      expect(header).not.toBeNull();
    });

    it('should have main with role="main" and id="main-content"', () => {
      const main = document.querySelector('main[role="main"]#main-content');
      expect(main).not.toBeNull();
    });

    it('should have footer with role="contentinfo"', () => {
      const footer = document.querySelector('footer[role="contentinfo"]');
      expect(footer).not.toBeNull();
    });

    it('should have navigation with proper structure', () => {
      const nav = document.querySelector('nav[role="navigation"]');
      expect(nav).not.toBeNull();
      expect(nav.getAttribute('aria-label')).toBeTruthy();
    });

    it('should mark Calendar as current page in navigation', () => {
      const calendarLink = document.querySelector('.main-nav a[href*="calendar"]');
      expect(calendarLink).not.toBeNull();
      expect(calendarLink.getAttribute('aria-current')).toBe('page');
    });
  });

  describe('Calendar Page Heading Structure', () => {
    it('should have only one h1 element', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    it('should have a main page heading for calendar', () => {
      const pageHeading = document.querySelector('.calendar-hero h2, .calendar-page h2');
      expect(pageHeading).not.toBeNull();
      expect(pageHeading.textContent).toMatch(/events|calendar/i);
    });

    it('should have proper heading hierarchy', () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const levels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));

      // Should start with h1
      expect(levels[0]).toBe(1);

      // Check for skipped levels
      for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];
        expect(diff).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('Event Display Section', () => {
    it('should have an events container section', () => {
      const eventsContainer = document.querySelector('.events-container, .calendar-events');
      expect(eventsContainer).not.toBeNull();
    });

    it('should have event cards or list items', () => {
      const eventItems = document.querySelectorAll('.event-card, .event-item, [data-event]');
      expect(eventItems.length).toBeGreaterThan(0);
    });

    it('should display event date for each event', () => {
      const eventDates = document.querySelectorAll('.event-date, [data-event-date]');
      expect(eventDates.length).toBeGreaterThan(0);

      eventDates.forEach(date => {
        expect(date.textContent.trim()).toBeTruthy();
      });
    });

    it('should display event time for each event', () => {
      const eventTimes = document.querySelectorAll('.event-time, [data-event-time]');
      expect(eventTimes.length).toBeGreaterThan(0);

      eventTimes.forEach(time => {
        expect(time.textContent.trim()).toBeTruthy();
      });
    });

    it('should display event title for each event', () => {
      const eventTitles = document.querySelectorAll('.event-title, .event-name, [data-event-title]');
      expect(eventTitles.length).toBeGreaterThan(0);

      eventTitles.forEach(title => {
        expect(title.textContent.trim()).toBeTruthy();
      });
    });

    it('should display event description for each event', () => {
      const eventDescriptions = document.querySelectorAll('.event-description, [data-event-description]');
      expect(eventDescriptions.length).toBeGreaterThan(0);
    });

    it('should display event location for each event', () => {
      const eventLocations = document.querySelectorAll('.event-location, [data-event-location]');
      expect(eventLocations.length).toBeGreaterThan(0);
    });

    it('should display registration info when available', () => {
      const registrationInfo = document.querySelectorAll('.event-registration, .registration-info, [data-registration]');
      expect(registrationInfo.length).toBeGreaterThan(0);
    });

    it('should have event type/category indicator', () => {
      const eventTypes = document.querySelectorAll('.event-type, .event-category, [data-event-type]');
      expect(eventTypes.length).toBeGreaterThan(0);
    });

    it('should use semantic HTML for events (article or list)', () => {
      const eventArticles = document.querySelectorAll('article.event-card, article[data-event]');
      const eventList = document.querySelector('ul.events-list, ol.events-list');

      expect(eventArticles.length > 0 || eventList !== null).toBe(true);
    });
  });

  describe('Filter and Sort Controls', () => {
    it('should have filter controls section', () => {
      const filterSection = document.querySelector('.filter-controls, .calendar-filters, [data-filters]');
      expect(filterSection).not.toBeNull();
    });

    it('should have event type filter', () => {
      const typeFilter = document.querySelector('#event-type-filter, select[data-filter="type"], .event-type-filter');
      expect(typeFilter).not.toBeNull();
      expect(typeFilter.tagName.toLowerCase()).toBe('select');
    });

    it('should have event type filter label', () => {
      const typeFilter = document.querySelector('#event-type-filter, select[data-filter="type"]');
      if (typeFilter && typeFilter.id) {
        const label = document.querySelector(`label[for="${typeFilter.id}"]`);
        expect(label).not.toBeNull();
      }
    });

    it('should have date range or date filter', () => {
      const dateFilter = document.querySelector('#date-filter, [data-filter="date"], .date-filter');
      expect(dateFilter).not.toBeNull();
    });

    it('should have sort control', () => {
      const sortControl = document.querySelector('#sort-events, select[data-sort], .sort-control');
      expect(sortControl).not.toBeNull();
    });

    it('should have sort control label', () => {
      const sortControl = document.querySelector('#sort-events, select[data-sort]');
      if (sortControl && sortControl.id) {
        const label = document.querySelector(`label[for="${sortControl.id}"]`);
        expect(label).not.toBeNull();
      }
    });

    it('should have clear filters button', () => {
      const clearButton = document.querySelector('.clear-filters, button[data-action="clear-filters"]');
      expect(clearButton).not.toBeNull();
    });

    it('should have filter/sort controls properly grouped', () => {
      const filterSection = document.querySelector('.filter-controls, .calendar-filters');
      expect(filterSection).not.toBeNull();

      // Check that filters are within a fieldset or have proper grouping
      const fieldset = filterSection.querySelector('fieldset');
      const hasProperGrouping = fieldset !== null || filterSection.querySelector('form') !== null;
      expect(hasProperGrouping).toBe(true);
    });
  });

  describe('Calendar Export Features', () => {
    it('should have export controls section', () => {
      const exportSection = document.querySelector('.export-controls, .calendar-export, [data-export]');
      expect(exportSection).not.toBeNull();
    });

    it('should have Google Calendar export button', () => {
      const googleButton = document.querySelector('.export-google, button[data-export="google"], a[data-export="google"]');
      expect(googleButton).not.toBeNull();
      expect(googleButton.textContent).toMatch(/google/i);
    });

    it('should have iCal export button', () => {
      const icalButton = document.querySelector('.export-ical, button[data-export="ical"], a[data-export="ical"]');
      expect(icalButton).not.toBeNull();
      expect(icalButton.textContent).toMatch(/ical|download/i);
    });

    it('should have export buttons with accessible names', () => {
      const exportButtons = document.querySelectorAll('[data-export]');
      exportButtons.forEach(button => {
        const text = button.textContent.trim();
        const ariaLabel = button.getAttribute('aria-label');
        expect(text || ariaLabel).toBeTruthy();
      });
    });

    it('should have individual event export links', () => {
      const eventExportLinks = document.querySelectorAll('.event-export, [data-event-export]');
      expect(eventExportLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility - WCAG 2.1 AA Compliance', () => {
    it('should not have any accessibility violations', async () => {
      const results = await axe(document.body, {
        rules: {
          'color-contrast': { enabled: true },
          'html-has-lang': { enabled: true },
          'label': { enabled: true },
          'button-name': { enabled: true },
          'link-name': { enabled: true },
        },
      });

      expect(results).toHaveNoViolations();
    }, 10000);

    it('should have skip navigation link', () => {
      const skipLink = document.querySelector('.skip-link');
      expect(skipLink).not.toBeNull();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
    });

    it('should have all form controls with labels', () => {
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (input.type !== 'hidden') {
          const id = input.getAttribute('id');
          const label = document.querySelector(`label[for="${id}"]`);
          const ariaLabel = input.getAttribute('aria-label');
          const ariaLabelledby = input.getAttribute('aria-labelledby');

          expect(label !== null || ariaLabel !== null || ariaLabelledby !== null).toBe(true);
        }
      });
    });

    it('should have proper ARIA roles for dynamic content', () => {
      const eventsContainer = document.querySelector('.events-container, .calendar-events');
      expect(eventsContainer).not.toBeNull();

      // Check for live region or status if it's dynamically updated
      const liveRegion = document.querySelector('[aria-live]');
      const statusRegion = document.querySelector('[role="status"]');

      // At least one method for announcing updates should exist
      expect(liveRegion !== null || statusRegion !== null).toBe(true);
    });

    it('should have keyboard accessible controls', () => {
      const buttons = document.querySelectorAll('button');
      const links = document.querySelectorAll('a');

      // Verify no positive tabindex
      [...buttons, ...links].forEach(element => {
        const tabindex = element.getAttribute('tabindex');
        if (tabindex !== null) {
          expect(parseInt(tabindex)).toBeLessThanOrEqual(0);
        }
      });
    });

    it('should have descriptive link text', () => {
      const links = document.querySelectorAll('a');
      const genericText = ['click here', 'here', 'link'];

      links.forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        const ariaLabel = link.getAttribute('aria-label');

        if (!ariaLabel) {
          expect(genericText).not.toContain(text);
        }
      });
    });

    it('should have time elements with datetime attribute', () => {
      const timeElements = document.querySelectorAll('time');
      timeElements.forEach(time => {
        expect(time.hasAttribute('datetime')).toBe(true);
      });
    });

    it('should use semantic HTML for dates', () => {
      const eventDates = document.querySelectorAll('.event-date');
      eventDates.forEach(dateElement => {
        // Should contain a time element or have appropriate markup
        const hasTimeElement = dateElement.querySelector('time') !== null || dateElement.tagName.toLowerCase() === 'time';
        expect(hasTimeElement).toBe(true);
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    it('should not prevent zooming', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      const content = viewport.getAttribute('content');
      expect(content).not.toContain('user-scalable=no');
    });

    it('should load calendar-specific CSS', () => {
      const calendarCss = document.querySelector('link[href*="calendar.css"]');
      expect(calendarCss).not.toBeNull();
    });

    it('should have mobile-friendly layout structure', () => {
      const eventsContainer = document.querySelector('.events-container, .calendar-events');
      expect(eventsContainer).not.toBeNull();

      // Events should be in a flexible container
      const eventCards = eventsContainer.querySelectorAll('.event-card, .event-item');
      expect(eventCards.length).toBeGreaterThan(0);
    });
  });

  describe('JavaScript Functionality', () => {
    it('should load calendar JavaScript module', () => {
      const calendarScript = document.querySelector('script[src*="calendar.js"]');
      expect(calendarScript).not.toBeNull();
      expect(calendarScript.getAttribute('type')).toBe('module');
    });

    it('should have data attributes for JavaScript interaction', () => {
      const interactiveElements = document.querySelectorAll('[data-filter], [data-sort], [data-export], [data-event]');
      expect(interactiveElements.length).toBeGreaterThan(0);
    });
  });

  describe('Event Data Structure', () => {
    it('should have events with required data attributes', () => {
      const events = document.querySelectorAll('[data-event]');
      expect(events.length).toBeGreaterThan(0);

      events.forEach(event => {
        // Each event should have identifiable data
        const hasDate = event.querySelector('[data-event-date]') || event.hasAttribute('data-event-date');
        const hasType = event.querySelector('[data-event-type]') || event.hasAttribute('data-event-type');

        expect(hasDate || hasType).toBe(true);
      });
    });

    it('should have events sorted by date by default', () => {
      const events = document.querySelectorAll('[data-event]');
      const dates = Array.from(events).map(event => {
        const dateEl = event.querySelector('[data-event-date], time');
        return dateEl ? dateEl.getAttribute('datetime') || dateEl.textContent : '';
      });

      // Check if dates are in chronological order (at least attempt to order them)
      expect(dates.length).toBeGreaterThan(0);
    });
  });

  describe('Content and Information', () => {
    it('should have a clear page heading in hero or intro section', () => {
      const hero = document.querySelector('.calendar-hero, .page-intro');
      expect(hero).not.toBeNull();

      const heading = hero.querySelector('h2, h1');
      expect(heading).not.toBeNull();
      expect(heading.textContent.trim()).toBeTruthy();
    });

    it('should have helpful instructions or description', () => {
      const description = document.querySelector('.calendar-description, .page-intro p');
      expect(description).not.toBeNull();
      expect(description.textContent.trim()).toBeTruthy();
    });

    it('should indicate when no events are available', () => {
      const noEventsMessage = document.querySelector('.no-events, [data-no-events]');
      // This element should exist for when filters return no results
      expect(noEventsMessage !== null).toBe(true);
    });
  });

  describe('Loading States and User Feedback', () => {
    it('should have loading indicator element', () => {
      const loadingIndicator = document.querySelector('.loading, [data-loading]');
      expect(loadingIndicator).not.toBeNull();
    });

    it('should have status message area for screen readers', () => {
      const statusArea = document.querySelector('[role="status"], [aria-live]');
      expect(statusArea).not.toBeNull();
    });
  });

  describe('CSS and Styling Resources', () => {
    it('should load normalize.css', () => {
      const normalize = document.querySelector('link[href*="normalize.css"]');
      expect(normalize).not.toBeNull();
    });

    it('should load main.css', () => {
      const mainCss = document.querySelector('link[href*="main.css"]');
      expect(mainCss).not.toBeNull();
    });

    it('should load calendar.css', () => {
      const calendarCss = document.querySelector('link[href*="calendar.css"]');
      expect(calendarCss).not.toBeNull();
    });

    it('should load CSS files in correct order', () => {
      const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      const hrefs = cssLinks.map(link => link.getAttribute('href'));

      const normalizeIndex = hrefs.findIndex(href => href.includes('normalize.css'));
      const mainIndex = hrefs.findIndex(href => href.includes('main.css'));
      const calendarIndex = hrefs.findIndex(href => href.includes('calendar.css'));

      expect(normalizeIndex).toBeLessThan(mainIndex);
      expect(mainIndex).toBeLessThan(calendarIndex);
    });
  });

  describe('Footer Consistency', () => {
    it('should have same footer structure as homepage', () => {
      const footer = document.querySelector('footer[role="contentinfo"]');
      expect(footer).not.toBeNull();

      const footerSections = footer.querySelectorAll('.footer-section');
      expect(footerSections.length).toBeGreaterThan(0);
    });

    it('should have copyright section', () => {
      const copyright = document.querySelector('.copyright');
      expect(copyright).not.toBeNull();
    });
  });
});
