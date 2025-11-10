# Union Beach Memorial Library Website

A modern, accessible, and responsive website for the Union Beach Memorial Library, built with test-driven development principles and WCAG 2.1 AA compliance.

## Project Overview

This website honors the Union Beach Memorial Library, named in 1946 in memory of 12 local men who were killed in World War II. The library serves the Union Beach community as part of the Monmouth County library system.

## Features

- **Modern HTML5 Structure**: Semantic HTML with proper ARIA landmarks
- **WCAG 2.1 Level AA Compliant**: Fully accessible to all users
- **Mobile-First Responsive Design**: Optimized for all device sizes
- **Test-Driven Development**: Comprehensive test suite with 89 passing tests
- **Performance Optimized**: Fast load times with Vite build system
- **Blue Color Theme**: Professional design matching local government aesthetics

## Technology Stack

- **Build Tool**: Vite 7.x
- **Testing Framework**: Vitest 4.x
- **Accessibility Testing**: jest-axe with axe-core
- **DOM Testing**: JSDOM, happy-dom, @testing-library/dom
- **HTML5, CSS3, and JavaScript (ES6+)**

## Project Structure

```
Union-Beach-Library/
├── index.html                 # Homepage with semantic HTML5 structure
├── src/
│   ├── css/
│   │   ├── normalize.css      # CSS reset/normalize
│   │   └── main.css           # Main responsive styles (mobile-first)
│   └── js/
│       └── main.js            # JavaScript functionality
├── tests/
│   ├── setup.js               # Test configuration
│   ├── homepage.test.js       # Homepage structure tests (38 tests)
│   ├── accessibility.test.js  # WCAG 2.1 AA compliance tests (38 tests)
│   └── javascript.test.js     # JavaScript functionality tests (14 tests)
├── public/
│   └── images/                # Static assets directory
├── package.json               # Project dependencies and scripts
├── vite.config.js             # Vite build configuration
├── vitest.config.js           # Vitest test configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Union-Beach-Library
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server with hot reload:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Testing

Run all tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Test Coverage

The project includes comprehensive tests covering:

### Homepage Structure Tests (38 tests)
- HTML5 document structure
- Semantic HTML elements
- Navigation menu
- Content sections
- Contact information
- Footer structure
- Resource loading
- Heading hierarchy

### Accessibility Tests (38 tests)
- WCAG 2.1 AA automated testing with axe-core
- Keyboard navigation
- ARIA attributes
- Form accessibility
- Link accessibility
- Heading structure
- Landmark regions
- Text alternatives
- Color and contrast
- Focus management
- Language declaration
- Responsive and mobile accessibility

### JavaScript Tests (14 tests)
- Copyright year update
- Screen reader announcements
- Mobile menu toggle
- Skip link functionality
- Navigation structure
- Form validation
- Accessibility features

**Total: 89 passing tests**

## Accessibility Features

- Skip navigation link for keyboard users
- Proper ARIA labels and roles
- Semantic HTML5 landmarks
- Keyboard-friendly navigation
- Screen reader compatible
- High contrast support
- Reduced motion support
- Responsive and zoom-friendly (up to 200%)
- Minimum 44x44px touch targets
- WCAG AA color contrast ratios

## CSS Features

- Mobile-first responsive design
- CSS custom properties (CSS variables)
- Breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1024px
  - Desktop: 1025px+
- Blue color scheme:
  - Primary: `#1e5a8e`
  - Navy: `#0d3d5c`
  - Light Blue: `#4a89c6`
- Minimum 16px base font size
- 1.6 line height for readability
- Print stylesheet included

## JavaScript Features

- Mobile menu toggle with accessibility
- Copyright year auto-update
- Screen reader announcements
- Skip link focus management
- Form validation helpers
- Keyboard navigation detection
- Smooth scroll behavior

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Performance Targets

- Page load time: < 3 seconds
- Lighthouse scores:
  - Performance: 90+
  - Accessibility: 100
  - Best Practices: 90+
  - SEO: 90+

## Required Pages (To Be Developed)

Based on the requirements document, the following pages need to be created:

1. **Calendar Page** - Events and programs
2. **About Page** - Staff, mission, and services
3. **History Page** - Library and town history
4. **Contact Page** - Contact form and information
5. **Accessibility Statement** - WCAG compliance statement
6. **Privacy Policy** - Privacy and data policies

## Contributing

When contributing to this project:

1. Ensure all tests pass (`npm test`)
2. Follow the existing code style
3. Maintain WCAG 2.1 AA compliance
4. Write tests for new features
5. Update documentation as needed

## License

ISC

## Contact

Union Beach Memorial Library
810 Union Avenue
Union Beach, NJ (Monmouth County)
Phone: 732-264-3792

---

**Built with modern web technologies and accessibility in mind.**
