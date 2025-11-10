/**
 * History Page Tests
 * Test-Driven Development for Union Beach Memorial Library history page
 * Testing historical content, timeline functionality, image galleries, and accessibility
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { axe, toHaveNoViolations } from 'jest-axe';
import fs from 'fs';
import path from 'path';

expect.extend(toHaveNoViolations);

describe('History Page Tests', () => {
  let dom;
  let document;

  beforeEach(() => {
    // Load the history.html file
    const html = fs.readFileSync(
      path.resolve(__dirname, '../history.html'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      url: 'http://localhost:3000/history.html',
      contentType: 'text/html',
      runScripts: 'outside-only',
      resources: 'usable',
    });

    document = dom.window.document;
  });

  describe('HTML Document Structure', () => {
    it('should have a valid HTML5 doctype', () => {
      expect(dom.window.document.doctype).not.toBeNull();
      expect(dom.window.document.doctype.name).toBe('html');
    });

    it('should have lang attribute set to "en"', () => {
      const html = document.documentElement;
      expect(html.getAttribute('lang')).toBe('en');
    });

    it('should have a descriptive title', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toContain('History');
      expect(title.textContent).toContain('Union Beach Memorial Library');
    });

    it('should have a meta description', () => {
      const description = document.querySelector('meta[name="description"]');
      expect(description).not.toBeNull();
      expect(description.getAttribute('content')).toBeTruthy();
    });

    it('should have viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });
  });

  describe('Semantic HTML Structure', () => {
    it('should have a header element with role="banner"', () => {
      const header = document.querySelector('header[role="banner"]');
      expect(header).not.toBeNull();
    });

    it('should have a main element with role="main"', () => {
      const main = document.querySelector('main[role="main"]');
      expect(main).not.toBeNull();
    });

    it('should have a footer element with role="contentinfo"', () => {
      const footer = document.querySelector('footer[role="contentinfo"]');
      expect(footer).not.toBeNull();
    });

    it('should have a navigation element with role="navigation"', () => {
      const nav = document.querySelector('nav[role="navigation"]');
      expect(nav).not.toBeNull();
    });
  });

  describe('Accessibility Features', () => {
    it('should have a skip navigation link', () => {
      const skipLink = document.querySelector('.skip-link');
      expect(skipLink).not.toBeNull();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
    });

    it('should have main content with id="main-content"', () => {
      const mainContent = document.getElementById('main-content');
      expect(mainContent).not.toBeNull();
    });

    it('should have all sections with aria-labelledby', () => {
      const sections = document.querySelectorAll('section[aria-labelledby]');
      expect(sections.length).toBeGreaterThan(0);

      sections.forEach((section) => {
        const labelId = section.getAttribute('aria-labelledby');
        const label = document.getElementById(labelId);
        expect(label).not.toBeNull();
      });
    });

    it('should not have any accessibility violations', async () => {
      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    }, 10000);
  });

  describe('Navigation Menu', () => {
    it('should have navigation links for all pages', () => {
      const links = document.querySelectorAll('.main-nav a');
      const hrefs = Array.from(links).map(link => link.textContent.trim());

      expect(hrefs).toContain('Home');
      expect(hrefs).toContain('Calendar');
      expect(hrefs).toContain('About');
      expect(hrefs).toContain('History');
      expect(hrefs).toContain('Contact');
    });

    it('should mark History page as current with aria-current', () => {
      const currentPage = document.querySelector('[aria-current="page"]');
      expect(currentPage).not.toBeNull();
      expect(currentPage.textContent).toContain('History');
    });
  });

  describe('Historical Content Sections', () => {
    it('should have a town history section', () => {
      const townHistory = document.querySelector('.town-history');
      expect(townHistory).not.toBeNull();
    });

    it('should mention Union Beach was formed in 1925', () => {
      const content = document.body.textContent;
      expect(content).toContain('1925');
      expect(content.toLowerCase()).toContain('raritan township');
    });

    it('should have a library history section', () => {
      const libraryHistory = document.querySelector('.library-history');
      expect(libraryHistory).not.toBeNull();
    });

    it('should mention the 1946 memorial dedication', () => {
      const content = document.body.textContent;
      expect(content).toContain('1946');
      expect(content).toContain('12');
      expect(content.toLowerCase()).toContain('world war');
    });

    it('should mention connection to Monmouth County library system', () => {
      const content = document.body.textContent.toLowerCase();
      expect(content).toContain('monmouth county');
    });
  });

  describe('Timeline Component', () => {
    it('should have a timeline section', () => {
      const timeline = document.querySelector('.timeline');
      expect(timeline).not.toBeNull();
    });

    it('should have timeline items', () => {
      const timelineItems = document.querySelectorAll('.timeline-item');
      expect(timelineItems.length).toBeGreaterThan(0);
    });

    it('should have timeline items with dates', () => {
      const timelineItems = document.querySelectorAll('.timeline-item');

      timelineItems.forEach((item) => {
        const date = item.querySelector('.timeline-date');
        expect(date).not.toBeNull();
        expect(date.textContent.trim()).toBeTruthy();
      });
    });

    it('should have timeline items with content', () => {
      const timelineItems = document.querySelectorAll('.timeline-item');

      timelineItems.forEach((item) => {
        const content = item.querySelector('.timeline-content');
        expect(content).not.toBeNull();
        expect(content.textContent.trim()).toBeTruthy();
      });
    });

    it('should have at least 1925 and 1946 in timeline', () => {
      const timelineDates = document.querySelectorAll('.timeline-date');
      const dates = Array.from(timelineDates).map(el => el.textContent);
      const allDates = dates.join(' ');

      expect(allDates).toContain('1925');
      expect(allDates).toContain('1946');
    });
  });

  describe('Image Gallery', () => {
    it('should have an image gallery section', () => {
      const gallery = document.querySelector('.photo-gallery');
      expect(gallery).not.toBeNull();
    });

    it('should have gallery images with alt text', () => {
      const galleryImages = document.querySelectorAll('.photo-gallery img');

      galleryImages.forEach((img) => {
        expect(img.hasAttribute('alt')).toBe(true);
        expect(img.getAttribute('alt').trim()).toBeTruthy();
      });
    });

    it('should have gallery images with captions or descriptions', () => {
      const galleryItems = document.querySelectorAll('.gallery-item');

      if (galleryItems.length > 0) {
        galleryItems.forEach((item) => {
          // Should have either a caption element or aria-label
          const caption = item.querySelector('.gallery-caption, figcaption');
          const ariaLabel = item.getAttribute('aria-label');

          expect(caption !== null || ariaLabel !== null).toBe(true);
        });
      }
    });
  });

  describe('Heading Hierarchy', () => {
    it('should have only one h1 element', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    it('should have h1 with library name', () => {
      const h1 = document.querySelector('h1');
      expect(h1.textContent).toContain('Union Beach Memorial Library');
    });

    it('should have proper heading hierarchy', () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const levels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));

      // Should start with h1
      expect(levels[0]).toBe(1);

      // Check for skipped levels
      for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];
        // Should not skip more than one level
        expect(diff).toBeLessThanOrEqual(1);
      }
    });

    it('should have section headings for major content areas', () => {
      const h2Elements = document.querySelectorAll('h2');
      expect(h2Elements.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Layout', () => {
    it('should load history-specific CSS file', () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      const hrefs = Array.from(cssLinks).map(link => link.getAttribute('href'));

      expect(hrefs.some(href => href.includes('history.css'))).toBe(true);
    });

    it('should load main CSS files', () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      const hrefs = Array.from(cssLinks).map(link => link.getAttribute('href'));

      expect(hrefs.some(href => href.includes('normalize.css'))).toBe(true);
      expect(hrefs.some(href => href.includes('main.css'))).toBe(true);
    });
  });

  describe('JavaScript Functionality', () => {
    it('should load history JavaScript module', () => {
      const scripts = document.querySelectorAll('script[type="module"]');
      const srcs = Array.from(scripts).map(script => script.getAttribute('src'));

      expect(srcs.some(src => src && src.includes('history.js'))).toBe(true);
    });

    it('should load main JavaScript module', () => {
      const scripts = document.querySelectorAll('script[type="module"]');
      const srcs = Array.from(scripts).map(script => script.getAttribute('src'));

      expect(srcs.some(src => src && src.includes('main.js'))).toBe(true);
    });
  });

  describe('Footer', () => {
    it('should have footer with multiple sections', () => {
      const footerSections = document.querySelectorAll('.footer-section');
      expect(footerSections.length).toBeGreaterThan(0);
    });

    it('should have social media links with aria-labels', () => {
      const socialLinks = document.querySelectorAll('.social-links a[aria-label]');
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    it('should have copyright section', () => {
      const copyright = document.querySelector('.copyright');
      expect(copyright).not.toBeNull();
    });
  });

  describe('Interactive Elements Accessibility', () => {
    it('should have keyboard accessible interactive elements', () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [tabindex]'
      );

      interactiveElements.forEach((element) => {
        const tabindex = element.getAttribute('tabindex');
        if (tabindex !== null) {
          expect(parseInt(tabindex)).toBeGreaterThanOrEqual(-1);
        }
      });
    });

    it('should not have any positive tabindex values', () => {
      const elementsWithTabindex = document.querySelectorAll('[tabindex]');

      elementsWithTabindex.forEach((element) => {
        const tabindex = parseInt(element.getAttribute('tabindex'));
        expect(tabindex).toBeLessThanOrEqual(0);
      });
    });
  });

  describe('ARIA Landmarks', () => {
    it('should have all required landmarks', () => {
      const main = document.querySelector('main, [role="main"]');
      const banner = document.querySelector('header[role="banner"]');
      const contentinfo = document.querySelector('footer[role="contentinfo"]');
      const navigation = document.querySelector('nav[role="navigation"]');

      expect(main).not.toBeNull();
      expect(banner).not.toBeNull();
      expect(contentinfo).not.toBeNull();
      expect(navigation).not.toBeNull();
    });
  });

  describe('Link Accessibility', () => {
    it('should have descriptive link text', () => {
      const links = document.querySelectorAll('a');

      links.forEach((link) => {
        const text = link.textContent.trim();
        const ariaLabel = link.getAttribute('aria-label');
        const title = link.getAttribute('title');

        // Links should have text content, aria-label, or title
        expect(text || ariaLabel || title).toBeTruthy();
      });
    });
  });

  describe('Content Quality', () => {
    it('should have substantive town history content', () => {
      const townHistory = document.querySelector('.town-history');
      expect(townHistory).not.toBeNull();

      const textContent = townHistory.textContent.trim();
      expect(textContent.length).toBeGreaterThan(100);
    });

    it('should have substantive library history content', () => {
      const libraryHistory = document.querySelector('.library-history');
      expect(libraryHistory).not.toBeNull();

      const textContent = libraryHistory.textContent.trim();
      expect(textContent.length).toBeGreaterThan(100);
    });
  });
});
