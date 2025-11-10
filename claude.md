# Town Library Website Project

## Project Overview
This is a modern, professional website for a town's public library. It serves as the primary digital landing page for library information and provides links to related city and town resources.

## Project Goals
- Create a clean, accessible, and user-friendly library website
- Provide essential library information (hours, location, services, contact)
- Link to relevant city/town resources and partner websites
- Ensure mobile responsiveness and fast loading times
- Make the site easy to maintain and update

## Technology Stack

### Recommended Stack (Modern Best Practices)
- **Framework**: Astro (static site generator - fast, SEO-friendly, minimal JavaScript)
- **Styling**: Tailwind CSS (utility-first, responsive design)
- **Deployment**: Netlify or Vercel (free tier, automatic deployments from git)
- **Version Control**: Git + GitHub
- **Additional Libraries**:
  - Accessibility: Built-in HTML5 semantic elements
  - Icons: Lucide Icons or Hero Icons
  - Forms: Native HTML5 with Netlify Forms or Formspree

### Why This Stack?
- **Astro**: Perfect for content-heavy sites, excellent performance, SEO-friendly out of the box
- **Tailwind**: Rapid development, consistent design, highly customizable
- **Netlify/Vercel**: Zero-cost hosting, automatic SSL, easy deployments, built-in forms
- **Static Site**: No backend needed, maximum security, blazing fast, low maintenance

## Project Structure
```
library-website/
├── src/
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── about.astro           # About the library
│   │   ├── services.astro        # Services offered
│   │   ├── events.astro          # Events calendar
│   │   ├── contact.astro         # Contact information
│   │   └── resources.astro       # Links to city/town resources
│   ├── components/
│   │   ├── Header.astro          # Site header with navigation
│   │   ├── Footer.astro          # Site footer
│   │   ├── Card.astro            # Reusable card component
│   │   └── HoursDisplay.astro    # Library hours component
│   ├── layouts/
│   │   └── Layout.astro          # Base layout template
│   └── styles/
│       └── global.css            # Global styles
├── public/
│   ├── images/                   # Library photos, logos
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

## Key Features to Implement

### Homepage
- Hero section with library image and welcome message
- Quick access to hours, location, and contact info
- Featured events or announcements
- Popular services/resources cards
- Search bar (can link to catalog system)

### About Page
- Library history and mission
- Staff information
- Board of trustees
- Building information and accessibility features

### Services Page
- Card-based layout showing all services:
  - Book borrowing and digital materials
  - Computer and internet access
  - Study rooms and meeting spaces
  - Children's programs
  - Research assistance
  - Printing, copying, faxing
  - Any special collections

### Events Page
- Upcoming events calendar
- Event categories (children, adults, teens, community)
- Registration links if applicable

### Contact Page
- Address with embedded Google Maps
- Phone and email
- Contact form
- Hours of operation (detailed)
- Directions and parking information

### Resources Page
- Links to city/town websites
- Links to regional library system
- Community resources
- Educational resources
- Government services links

## Design Principles

### Accessibility (Critical)
- WCAG 2.1 AA compliance minimum
- Semantic HTML5 elements
- Proper heading hierarchy (h1 → h6)
- Alt text for all images
- Sufficient color contrast (4.5:1 for normal text)
- Keyboard navigation support
- Screen reader friendly
- Skip to main content link

### Visual Design
- Clean, professional aesthetic
- Easy-to-read typography (18px minimum for body text)
- Consistent color scheme (professional library colors)
- Plenty of white space
- High-quality images
- Clear call-to-action buttons

### Performance
- Target Lighthouse score: 90+ in all categories
- Optimized images (WebP format when possible)
- Lazy loading for images
- Minimal JavaScript
- Fast initial page load (< 2 seconds)

### Mobile-First
- Fully responsive design
- Touch-friendly navigation
- Readable on all screen sizes
- Hamburger menu for mobile navigation

## Development Workflow

### Initial Setup
1. Initialize Astro project with Tailwind
2. Set up git repository
3. Create basic project structure
4. Implement base layout and components
5. Build individual pages
6. Test responsiveness and accessibility
7. Optimize performance

### Deployment
1. Push code to GitHub
2. Connect repository to Netlify or Vercel
3. Configure build settings (Astro build command)
4. Set up custom domain if available
5. Enable automatic deployments on push

### Iteration Process
1. Gather feedback from library staff
2. Identify improvements or new features
3. Implement changes locally
4. Test thoroughly
5. Deploy via git push

## Content Guidelines

### Writing Style
- Clear, friendly, and welcoming tone
- Short paragraphs (2-3 sentences)
- Bullet points for lists
- Active voice
- Avoid library jargon when possible

### Required Content
- Library hours (regular and holiday hours)
- Physical address and mailing address
- Phone number and email
- Social media links (if available)
- Card registration information
- Policies (condensed, link to full policies)

## Testing Checklist

Before deployment, verify:
- [ ] All links work (internal and external)
- [ ] Forms submit successfully
- [ ] Images load and have alt text
- [ ] Mobile responsive on multiple devices
- [ ] Fast load times (test with Lighthouse)
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility with screen reader
- [ ] SEO metadata present on all pages
- [ ] Contact information is accurate

## Maintenance

### Regular Updates
- Event calendar (weekly/monthly)
- Hours for holidays
- News and announcements
- Staff changes
- New services or programs

### Periodic Reviews
- Content accuracy (quarterly)
- Broken link checks (monthly)
- Performance optimization (semi-annually)
- Design refresh (annually)
- Accessibility audit (annually)

## SEO Requirements

Each page should have:
- Unique, descriptive title tag (50-60 characters)
- Meta description (150-160 characters)
- Open Graph tags for social sharing
- Proper heading structure
- Descriptive URLs
- Local business schema markup (homepage)

## Forms and Interactions

### Contact Form Fields
- Name (required)
- Email (required)
- Phone (optional)
- Subject (dropdown)
- Message (required)
- Submit button

### Form Handling Options
- Netlify Forms (built-in, easy)
- Formspree (simple integration)
- EmailJS (free tier available)

## Future Enhancements (Phase 2)
- Events calendar with filtering
- Newsletter signup
- Online catalog integration
- Room booking system
- Digital library card registration
- Blog for library news

## Claude Code Instructions

When working on this project:

1. **Always prioritize accessibility** - use semantic HTML, proper ARIA labels, and maintain high contrast

2. **Write clean, well-commented code** - future maintainers may not be developers

3. **Optimize images** - compress before adding, use appropriate formats

4. **Test responsiveness** - check layouts at mobile, tablet, and desktop sizes

5. **Keep it simple** - avoid over-engineering; the site should be easy to maintain

6. **Document everything** - add comments explaining why decisions were made

7. **Follow best practices** - use Astro and Tailwind conventions

8. **Think about the end users** - library patrons of all ages and technical abilities

## Questions to Ask the Library

Before building, gather:
- Official library name and logo
- Brand colors (if any)
- High-quality photos of the library
- Current hours of operation
- List of all services offered
- Important links to include
- Contact information
- Any existing content to migrate
- Domain name availability
- Who will maintain the site after launch

## Success Metrics

The website is successful if:
- Loads in under 2 seconds
- Lighthouse scores 90+ in all categories
- Passes WCAG 2.1 AA accessibility standards
- Looks professional and modern
- Easy for library staff to update
- Reduces phone calls about basic information (hours, location)
- Positive feedback from community members

---

## Getting Started Commands

```bash
# Create new Astro project with Tailwind
npm create astro@latest -- --template basics
npx astro add tailwind

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Useful Resources

- Astro Documentation: https://docs.astro.build
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Netlify Documentation: https://docs.netlify.com
- WebAIM (Accessibility): https://webaim.org

---

**Remember**: This is a public service website. Accessibility, clarity, and ease of use are paramount. Keep the community's needs at the center of every decision.
