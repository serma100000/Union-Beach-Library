/**
 * Homepage Structure Tests
 * Test-Driven Development for Union Beach Memorial Library homepage
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Homepage Structure Tests', () => {
  let dom;
  let document;

  beforeEach(() => {
    // Load the actual index.html file
    const html = fs.readFileSync(
      path.resolve(__dirname, '../index.html'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      url: 'http://localhost:3000',
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

    it('should have a charset meta tag', () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset).not.toBeNull();
      expect(charset.getAttribute('charset')).toBe('UTF-8');
    });

    it('should have a viewport meta tag for responsive design', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
      expect(viewport.getAttribute('content')).toContain('initial-scale=1.0');
    });

    it('should have a descriptive title', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toContain('Union Beach Memorial Library');
    });

    it('should have a meta description', () => {
      const description = document.querySelector('meta[name="description"]');
      expect(description).not.toBeNull();
      expect(description.getAttribute('content')).toBeTruthy();
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

    it('should have navigation with aria-label', () => {
      const nav = document.querySelector('nav[role="navigation"]');
      expect(nav.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Accessibility Features', () => {
    it('should have a skip navigation link', () => {
      const skipLink = document.querySelector('.skip-link');
      expect(skipLink).not.toBeNull();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
    });

    it('should have main content with id="main-content" for skip link target', () => {
      const mainContent = document.getElementById('main-content');
      expect(mainContent).not.toBeNull();
    });

    it('should have mobile menu toggle with aria-expanded', () => {
      const toggle = document.querySelector('.mobile-menu-toggle');
      expect(toggle).not.toBeNull();
      expect(toggle.hasAttribute('aria-expanded')).toBe(true);
    });

    it('should have mobile menu toggle with aria-controls', () => {
      const toggle = document.querySelector('.mobile-menu-toggle');
      expect(toggle.getAttribute('aria-controls')).toBe('main-menu');
    });

    it('should have visually hidden text for screen readers in menu toggle', () => {
      const toggle = document.querySelector('.mobile-menu-toggle');
      const visuallyHidden = toggle.querySelector('.visually-hidden');
      expect(visuallyHidden).not.toBeNull();
      expect(visuallyHidden.textContent).toContain('Toggle');
    });

    it('should have search input with proper label', () => {
      const searchInput = document.getElementById('search-input');
      const searchLabel = document.querySelector('label[for="search-input"]');
      expect(searchInput).not.toBeNull();
      expect(searchLabel).not.toBeNull();
      expect(searchInput.getAttribute('aria-label')).toBeTruthy();
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

    it('should have search container with role="search"', () => {
      const search = document.querySelector('[role="search"]');
      expect(search).not.toBeNull();
    });
  });

  describe('Navigation Menu', () => {
    it('should have navigation menu with proper structure', () => {
      const nav = document.querySelector('.main-nav');
      expect(nav).not.toBeNull();
      expect(nav.tagName.toLowerCase()).toBe('ul');
    });

    it('should have navigation links for all required pages', () => {
      const links = document.querySelectorAll('.main-nav a');
      const hrefs = Array.from(links).map(link => link.textContent.trim());

      expect(hrefs).toContain('Home');
      expect(hrefs).toContain('Calendar');
      expect(hrefs).toContain('About');
      expect(hrefs).toContain('History');
      expect(hrefs).toContain('Contact');
    });

    it('should mark current page with aria-current', () => {
      const currentPage = document.querySelector('[aria-current="page"]');
      expect(currentPage).not.toBeNull();
    });
  });

  describe('Content Structure', () => {
    it('should have a hero section', () => {
      const hero = document.querySelector('.hero');
      expect(hero).not.toBeNull();
    });

    it('should have hero heading', () => {
      const heroHeading = document.getElementById('hero-heading');
      expect(heroHeading).not.toBeNull();
      expect(heroHeading.textContent).toContain('Union Beach Memorial Library');
    });

    it('should have quick links section', () => {
      const quickLinks = document.querySelector('.quick-links');
      expect(quickLinks).not.toBeNull();
    });

    it('should have 4 quick link cards', () => {
      const linkCards = document.querySelectorAll('.link-card');
      expect(linkCards.length).toBe(4);
    });

    it('should have library info section', () => {
      const libraryInfo = document.querySelector('.library-info');
      expect(libraryInfo).not.toBeNull();
    });

    it('should have featured events section', () => {
      const events = document.querySelector('.featured-events');
      expect(events).not.toBeNull();
    });
  });

  describe('Contact Information', () => {
    it('should display library address', () => {
      const address = document.querySelector('address');
      expect(address).not.toBeNull();
      expect(address.textContent).toContain('810 Union Avenue');
      expect(address.textContent).toContain('Union Beach');
    });

    it('should have phone number as clickable link', () => {
      const phoneLink = document.querySelector('a[href^="tel:"]');
      expect(phoneLink).not.toBeNull();
      expect(phoneLink.getAttribute('href')).toContain('732-264-3792');
    });

    it('should have email as clickable link', () => {
      const emailLink = document.querySelector('a[href^="mailto:"]');
      expect(emailLink).not.toBeNull();
    });
  });

  describe('Footer', () => {
    it('should have footer with multiple sections', () => {
      const footerSections = document.querySelectorAll('.footer-section');
      expect(footerSections.length).toBeGreaterThan(0);
    });

    it('should have social media links section', () => {
      const socialLinks = document.querySelector('.social-links');
      expect(socialLinks).not.toBeNull();
    });

    it('should have social media links with aria-labels', () => {
      const socialLinks = document.querySelectorAll('.social-links a[aria-label]');
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    it('should have copyright section', () => {
      const copyright = document.querySelector('.copyright');
      expect(copyright).not.toBeNull();
    });

    it('should have accessibility statement link', () => {
      const accessibilityLink = document.querySelector('a[href="/accessibility.html"]');
      expect(accessibilityLink).not.toBeNull();
    });
  });

  describe('Resource Loading', () => {
    it('should load CSS files', () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      expect(cssLinks.length).toBeGreaterThan(0);

      const hrefs = Array.from(cssLinks).map(link => link.getAttribute('href'));
      expect(hrefs.some(href => href.includes('normalize.css'))).toBe(true);
      expect(hrefs.some(href => href.includes('main.css'))).toBe(true);
    });

    it('should load JavaScript as module', () => {
      const script = document.querySelector('script[type="module"]');
      expect(script).not.toBeNull();
      expect(script.getAttribute('src')).toContain('main.js');
    });
  });

  describe('Heading Hierarchy', () => {
    it('should have only one h1 element', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    it('should have h1 as the main site title', () => {
      const h1 = document.querySelector('h1');
      expect(h1.textContent).toContain('Union Beach Memorial Library');
    });

    it('should have proper heading hierarchy', () => {
      const h1 = document.querySelector('h1');
      const h2Elements = document.querySelectorAll('h2');
      const h3Elements = document.querySelectorAll('h3');

      expect(h1).not.toBeNull();
      expect(h2Elements.length).toBeGreaterThan(0);
      expect(h3Elements.length).toBeGreaterThan(0);
    });
  });

  describe('Images and Icons', () => {
    it('should have icon decorations marked with aria-hidden', () => {
      const icons = document.querySelectorAll('.icon[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });
});
