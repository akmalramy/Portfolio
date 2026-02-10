# Akmal Ramy - Portfolio Website

A modern, responsive portfolio website for Akmal Ramy, Junior Data Engineer, built with React, Vite, and TailwindCSS.

## Features

- ✨ Modern and clean UI design
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive (mobile-first design)
- 🎨 Smooth animations and transitions
- ⚡ Fast performance with Vite
- 🎯 SEO optimized

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Project Structure

```
akmal-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "d:\Work\Akmal Portfolio"
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Customization

### Update Personal Information

- **Contact details**: Edit [src/components/Contact.jsx](src/components/Contact.jsx)
- **Social links**: Edit [src/components/Footer.jsx](src/components/Footer.jsx)
- **Projects**: Edit [src/components/Projects.jsx](src/components/Projects.jsx)
- **Experience**: Edit [src/components/Experience.jsx](src/components/Experience.jsx)

### Theme Colors

Customize colors in [tailwind.config.js](tailwind.config.js) under the `theme.extend.colors` section.

### Add Your CV

Place your CV file in the `public` folder as `cv.pdf` for the download button to work.

## Sections

1. **Hero** - Introduction and main call-to-actions
2. **About** - Brief description and highlights
3. **Skills** - Technical skills organized by category
4. **Experience** - Work experience timeline
5. **Projects** - Featured projects with tech stack
6. **Education** - Academic background
7. **Contact** - Contact information and form
8. **Footer** - Social links and copyright

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Contact

Akmal Ramy - [akmal.ramy@example.com](mailto:akmal.ramy@example.com)

Portfolio: [https://akmalramy.com](https://akmalramy.com)
