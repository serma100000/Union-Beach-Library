/**
 * JavaScript Functionality Tests
 * Testing interactive features and utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  updateCopyrightYear,
  announceToScreenReader,
} from '../src/js/main.js';

describe('JavaScript Functionality Tests', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Test</title>
      </head>
      <body>
        <header>
          <nav>
            <button class="mobile-menu-toggle" aria-expanded="false" aria-controls="main-menu">
              <span class="visually-hidden">Toggle navigation menu</span>
            </button>
            <ul id="main-menu" class="main-nav">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>
        </header>
        <main id="main-content">
          <a href="#main-content" class="skip-link">Skip to content</a>
          <p>Main content</p>
        </main>
        <footer>
          <p>&copy; <span id="current-year">2020</span> Union Beach Memorial Library</p>
        </footer>
      </body>
      </html>
    `, {
      url: 'http://localhost:3000',
      runScripts: 'dangerously',
      resources: 'usable',
    });

    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
  });

  describe('Copyright Year Update', () => {
    it('should update copyright year to current year', () => {
      const yearElement = document.getElementById('current-year');
      expect(yearElement).not.toBeNull();

      // Initial value
      expect(yearElement.textContent).toBe('2020');

      // Update year
      updateCopyrightYear();

      // Should be current year
      const currentYear = new Date().getFullYear();
      expect(yearElement.textContent).toBe(currentYear.toString());
    });

    it('should handle missing year element gracefully', () => {
      // Remove the element
      const yearElement = document.getElementById('current-year');
      yearElement?.remove();

      // Should not throw error
      expect(() => updateCopyrightYear()).not.toThrow();
    });
  });

  describe('Screen Reader Announcements', () => {
    it('should create announcement element', () => {
      announceToScreenReader('Test announcement');

      const announcement = document.querySelector('[role="status"]');
      expect(announcement).not.toBeNull();
      expect(announcement.textContent).toBe('Test announcement');
    });

    it('should have correct ARIA attributes', () => {
      announceToScreenReader('Test message');

      const announcement = document.querySelector('[role="status"]');
      expect(announcement.getAttribute('role')).toBe('status');
      expect(announcement.getAttribute('aria-live')).toBe('polite');
    });

    it('should be visually hidden', () => {
      announceToScreenReader('Test');

      const announcement = document.querySelector('[role="status"]');
      expect(announcement.classList.contains('visually-hidden')).toBe(true);
    });
  });

  describe('Mobile Menu Toggle', () => {
    it('should exist and be properly configured', () => {
      const toggle = document.querySelector('.mobile-menu-toggle');
      expect(toggle).not.toBeNull();
      expect(toggle.hasAttribute('aria-expanded')).toBe(true);
      expect(toggle.getAttribute('aria-controls')).toBe('main-menu');
    });

    it('should have corresponding menu', () => {
      const menu = document.getElementById('main-menu');
      expect(menu).not.toBeNull();
    });
  });

  describe('Skip Link Functionality', () => {
    it('should have skip link pointing to main content', () => {
      const skipLink = document.querySelector('.skip-link');
      const mainContent = document.getElementById('main-content');

      expect(skipLink).not.toBeNull();
      expect(mainContent).not.toBeNull();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
    });
  });

  describe('Navigation Structure', () => {
    it('should have navigation menu with links', () => {
      const nav = document.querySelector('.main-nav');
      const links = nav.querySelectorAll('a');

      expect(nav).not.toBeNull();
      expect(links.length).toBeGreaterThan(0);
    });

    it('should have valid href attributes', () => {
      const links = document.querySelectorAll('.main-nav a');

      links.forEach((link) => {
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).not.toBe('#');
      });
    });
  });

  describe('Form Validation Structure', () => {
    it('should be able to identify forms', () => {
      // Add a form to test
      const form = document.createElement('form');
      form.setAttribute('data-validate', 'true');
      form.innerHTML = `
        <input type="text" id="test-input" required>
        <button type="submit">Submit</button>
      `;
      document.body.appendChild(form);

      const forms = document.querySelectorAll('form[data-validate]');
      expect(forms.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility Features', () => {
    it('should have visually hidden class available', () => {
      const visuallyHidden = document.querySelector('.visually-hidden');
      expect(visuallyHidden).not.toBeNull();
    });

    it('should maintain focus management elements', () => {
      const mainContent = document.getElementById('main-content');
      expect(mainContent).not.toBeNull();
    });
  });

  describe('Link Structure', () => {
    it('should have internal links with proper format', () => {
      const internalLinks = document.querySelectorAll('a[href^="/"]');
      expect(internalLinks.length).toBeGreaterThan(0);
    });
  });
});
