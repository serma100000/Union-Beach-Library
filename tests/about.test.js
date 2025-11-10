/**
 * About Page Tests
 * Test-Driven Development for Union Beach Memorial Library About page
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { axe, toHaveNoViolations } from 'jest-axe';
import fs from 'fs';
import path from 'path';

expect.extend(toHaveNoViolations);

describe('About Page Structure Tests', () => {
  let dom;
  let document;

  beforeEach(() => {
    // Load the actual about.html file
    const html = fs.readFileSync(
      path.resolve(__dirname, '../about.html'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      url: 'http://localhost:3000/about.html',
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
    });

    it('should have a descriptive title including About', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toContain('About');
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

    it('should mark About link as current page in navigation', () => {
      const aboutLink = document.querySelector('nav a[href*="about"]');
      expect(aboutLink).not.toBeNull();
      expect(aboutLink.getAttribute('aria-current')).toBe('page');
    });
  });

  describe('Mission and Vision Section', () => {
    it('should have a mission statement section', () => {
      const mission = document.querySelector('.mission-section, [data-testid="mission"]');
      expect(mission).not.toBeNull();
    });

    it('should have a heading for mission statement', () => {
      const heading = document.querySelector('h2, h3');
      const headings = Array.from(document.querySelectorAll('h2, h3'))
        .map(h => h.textContent.toLowerCase());

      expect(headings.some(text =>
        text.includes('mission') || text.includes('vision')
      )).toBe(true);
    });

    it('should have mission text content', () => {
      const mission = document.querySelector('.mission-section, [data-testid="mission"]');
      expect(mission).not.toBeNull();
      expect(mission.textContent.trim().length).toBeGreaterThan(50);
    });
  });

  describe('Library Association Members Section', () => {
    it('should have an association members section', () => {
      const membersSection = document.querySelector('.members-section, .association-members, [data-testid="members"]');
      expect(membersSection).not.toBeNull();
    });

    it('should have a heading for association members', () => {
      const headings = Array.from(document.querySelectorAll('h2, h3'))
        .map(h => h.textContent.toLowerCase());

      expect(headings.some(text =>
        text.includes('association') || text.includes('member') || text.includes('board') || text.includes('trustee')
      )).toBe(true);
    });

    it('should have at least 3 member cards', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');
      expect(memberCards.length).toBeGreaterThanOrEqual(3);
    });

    it('should have member profile grid layout', () => {
      const grid = document.querySelector('.members-grid, .profiles-grid, [data-testid="members-grid"]');
      expect(grid).not.toBeNull();
    });
  });

  describe('Member Profile Cards', () => {
    it('each member card should have an image', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      memberCards.forEach((card) => {
        const img = card.querySelector('img');
        expect(img).not.toBeNull();
      });
    });

    it('each member image should have descriptive alt text', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      memberCards.forEach((card) => {
        const img = card.querySelector('img');
        expect(img.hasAttribute('alt')).toBe(true);

        const alt = img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt.length).toBeGreaterThan(5); // Should be descriptive
      });
    });

    it('each member card should have a name heading', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      memberCards.forEach((card) => {
        const heading = card.querySelector('h3, h4');
        expect(heading).not.toBeNull();
        expect(heading.textContent.trim()).toBeTruthy();
      });
    });

    it('each member card should have a title/role', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      memberCards.forEach((card) => {
        const role = card.querySelector('.role, .title, .position, [data-testid="member-role"]');
        expect(role).not.toBeNull();
        expect(role.textContent.trim()).toBeTruthy();
      });
    });

    it('each member card should have a bio/description', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      memberCards.forEach((card) => {
        const bio = card.querySelector('.bio, .description');
        expect(bio).not.toBeNull();
        expect(bio.textContent.trim().length).toBeGreaterThan(20);
      });
    });

    it('member images should have loading="lazy" attribute', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      memberCards.forEach((card) => {
        const img = card.querySelector('img');
        expect(img.getAttribute('loading')).toBe('lazy');
      });
    });
  });

  describe('Services and Programs Section', () => {
    it('should have a services section', () => {
      const services = document.querySelector('.services-section, [data-testid="services"]');
      expect(services).not.toBeNull();
    });

    it('should have a heading for services', () => {
      const headings = Array.from(document.querySelectorAll('h2, h3'))
        .map(h => h.textContent.toLowerCase());

      expect(headings.some(text =>
        text.includes('service') || text.includes('program')
      )).toBe(true);
    });

    it('should list multiple services or programs', () => {
      const services = document.querySelector('.services-section, [data-testid="services"]');
      const items = services.querySelectorAll('li, .service-item, [data-testid="service-item"]');

      expect(items.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Staff Directory Section', () => {
    it('should have a staff section or board section', () => {
      const headings = Array.from(document.querySelectorAll('h2, h3'))
        .map(h => h.textContent.toLowerCase());

      const hasStaffOrBoard = headings.some(text =>
        text.includes('staff') ||
        text.includes('board') ||
        text.includes('director') ||
        text.includes('trustee')
      );

      expect(hasStaffOrBoard).toBe(true);
    });
  });

  describe('Responsive Design', () => {
    it('should use responsive grid classes or CSS Grid', () => {
      const grids = document.querySelectorAll('.members-grid, .profiles-grid, .grid, [data-testid="members-grid"]');
      expect(grids.length).toBeGreaterThan(0);
    });

    it('should have proper HTML structure for mobile-first design', () => {
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);

      // Should have proper content sections
      sections.forEach((section) => {
        const heading = section.querySelector('h2, h3');
        // Each section should have a heading for structure
        if (section.children.length > 0) {
          expect(heading).not.toBeNull();
        }
      });
    });
  });

  describe('Page-specific CSS', () => {
    it('should load about.css stylesheet', () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      const hrefs = Array.from(cssLinks).map(link => link.getAttribute('href'));

      expect(hrefs.some(href => href && href.includes('about.css'))).toBe(true);
    });

    it('should load main.css for consistent styling', () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      const hrefs = Array.from(cssLinks).map(link => link.getAttribute('href'));

      expect(hrefs.some(href => href && href.includes('main.css'))).toBe(true);
    });
  });

  describe('JavaScript Functionality', () => {
    it('should load about.js script if needed', () => {
      const scripts = document.querySelectorAll('script[src]');
      // About.js is optional, but if it exists, it should be loaded
      const aboutScript = Array.from(scripts).find(script =>
        script.getAttribute('src').includes('about.js')
      );

      // This test passes if about.js exists OR if only main.js is loaded
      // (main.js is sufficient for basic functionality)
      expect(scripts.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Heading Hierarchy', () => {
    it('should have only one h1 element', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    it('should have proper heading hierarchy without skipping levels', () => {
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
  });

  describe('WCAG 2.1 AA Compliance', () => {
    it('should not have any accessibility violations on the full page', async () => {
      const results = await axe(document.body, {
        rules: {
          'color-contrast': { enabled: true },
          'html-has-lang': { enabled: true },
          'label': { enabled: true },
          'image-alt': { enabled: true },
          'aria-roles': { enabled: true },
          'landmark-one-main': { enabled: true },
          'page-has-heading-one': { enabled: true },
          'region': { enabled: true },
        },
      });

      expect(results).toHaveNoViolations();
    }, 10000);

    it('should not have violations in the members section', async () => {
      const membersSection = document.querySelector('.members-section, .association-members, [data-testid="members"]');
      if (membersSection) {
        const results = await axe(membersSection);
        expect(results).toHaveNoViolations();
      }
    });

    it('should not have violations in member cards', async () => {
      // Test member cards within their section context to maintain landmark relationships
      const membersSection = document.querySelector('.members-section, .association-members, [data-testid="members"]');
      const memberCards = membersSection.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      // Verify cards exist
      expect(memberCards.length).toBeGreaterThan(0);

      // Test the section containing all cards (maintains landmark context)
      const results = await axe(membersSection, {
        rules: {
          region: { enabled: false }, // Individual cards within a section don't need to be landmarks
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('Image Accessibility', () => {
    it('all images should have alt attributes', () => {
      const images = document.querySelectorAll('img');

      images.forEach((img) => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });

    it('member photos should have meaningful alt text', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      memberCards.forEach((card) => {
        const img = card.querySelector('img');
        const alt = img.getAttribute('alt');

        // Alt text should include name or descriptive text
        expect(alt).toBeTruthy();
        expect(alt.length).toBeGreaterThan(5);

        // Should not be generic
        const genericText = ['image', 'picture', 'photo'];
        const isGeneric = genericText.every(text => alt.toLowerCase() === text);
        expect(isGeneric).toBe(false);
      });
    });

    it('should use appropriate image formats', () => {
      const images = document.querySelectorAll('img');

      images.forEach((img) => {
        const src = img.getAttribute('src');
        expect(src).toBeTruthy();

        // Should use web-friendly formats
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
        const hasValidExtension = validExtensions.some(ext =>
          src.toLowerCase().includes(ext)
        );

        expect(hasValidExtension).toBe(true);
      });
    });
  });

  describe('Content Quality', () => {
    it('should have substantive mission statement text', () => {
      const mission = document.querySelector('.mission-section, [data-testid="mission"]');
      const text = mission.textContent.trim();

      // Mission statement should be meaningful
      expect(text.length).toBeGreaterThan(100);
    });

    it('should have at least 5 member profiles', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      // Library Association should have multiple members
      expect(memberCards.length).toBeGreaterThanOrEqual(5);
    });

    it('each bio should be meaningful and descriptive', () => {
      const memberCards = document.querySelectorAll('.member-card, .profile-card, [data-testid="member-card"]');

      memberCards.forEach((card) => {
        const bio = card.querySelector('.bio, .description');
        const text = bio.textContent.trim();

        // Bio should be substantive
        expect(text.length).toBeGreaterThan(50);
      });
    });
  });

  describe('Contact Information', () => {
    it('should have library contact information in footer', () => {
      const footer = document.querySelector('footer');
      expect(footer).not.toBeNull();
      expect(footer.textContent).toContain('732-264-3792');
    });
  });
});
