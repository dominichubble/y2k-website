# Dominic Hubble - Y2K Portfolio Website

A Y2K-themed portfolio website built with React, TypeScript, and Tailwind CSS, featuring a retro aesthetic inspired by late 90s/early 2000s internet design with modern functionality.

## 🚀 Features

### Y2K Design Elements
- **Windowed Interface**: Dooby3d.tv-inspired centered window layout
- **Retro Aesthetics**: Chrome text effects, neon borders, holographic elements
- **Custom Animations**: Glitch effects, scanlines, animated grids
- **Section Navigation**: Non-scrolling click-to-navigate interface
- **Y2K Color Palette**: Magenta (#ff00ff), Cyan (#00ffff), Lime (#ccff00)

### Technical Features
- **Modern React**: Built with React 18+ and TypeScript for type safety
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Smooth Animations**: Framer Motion for page transitions
- **Optimized Performance**: Vite 7.0.5 for fast development and building
- **Clean Architecture**: Scalable structure with separation of concerns
- **JSON Data**: All content stored in portable JSON format

## 🏗️ Project Structure

```
src/
├── components/
│   └── layout/            # Reusable layout components
│       ├── WindowLayout.tsx
│       ├── WindowHeader.tsx
│       ├── WindowNav.tsx
│       ├── WindowFooter.tsx
│       └── index.ts
├── constants/             # Configuration & constants
│   ├── navigation.ts
│   ├── theme.ts
│   └── index.ts
├── data/                  # JSON data files
│   ├── profile.json
│   ├── experience.json
│   ├── projects.json
│   └── skills.json
├── hooks/                 # Custom React hooks
│   ├── useNavigation.ts
│   └── index.ts
├── pages/                 # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ExperiencePage.tsx
│   ├── SkillsPage.tsx
│   └── index.ts
├── types/                 # TypeScript type definitions
│   └── index.ts
├── utils/                 # Utility functions
│   └── colors.ts
├── App.tsx                # Main application (~35 lines)
└── index.css              # Global Y2K styles & animations
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4
- **Animations**: Framer Motion
- **Build Tool**: Vite 7.0.5
- **Styling**: Custom Y2K CSS animations & utilities
- **State Management**: React Hooks (useState, useCallback)
- **Code Quality**: ESLint, TypeScript strict mode

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dominichubble/y2k-website.git
   cd y2k-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 📝 Customization

### Adding New Projects
1. Edit `src/data/projects.ts`
2. Add project object with required fields
3. Projects automatically appear in the portfolio section

### Updating Skills
1. Edit `src/data/skills.ts`
2. Add skills to `technicalSkills` or `softSkills` arrays
3. Skills display with interactive animations

### Modifying Content
- **Personal Info**: Update `src/components/ui/ProfileSimple.tsx`
- **Experience**: Update `src/components/sections/Timeline.tsx`
- **Contact Links**: Update profile component and footer

## 🎨 Design System

### Color Scheme
- **Primary**: Slate tones for professional appearance
- **Accents**: Blue for links and highlights
- **Status Colors**: Green (completed), Blue (in progress), Yellow (planning)
- **Type Colors**: Purple (professional), Orange (academic), Indigo (personal)

### Animations
- **Page Load**: Staggered entrance animations
- **Scroll**: Reveal animations on scroll into view
- **Interactions**: Hover effects and micro-interactions
- **Performance**: Optimized with `once: true` for scroll animations

## 📱 Responsive Design

- **Mobile First**: Designed for mobile with progressive enhancement
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Typography**: Responsive text scaling
- **Layout**: Flexible grid systems

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Adding New Components

1. Create component in appropriate folder (`sections/` or `ui/`)
2. Add TypeScript interfaces in `types/index.ts` if needed
3. Import and use in `App.tsx`
4. Update this README if significant

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Dominic Hubble**
- 🌐 [Portfolio](https://dominichubble.github.io/Personal-Website/)
- 💼 [LinkedIn](https://www.linkedin.com/in/dominichubble/)
- 🐙 [GitHub](https://github.com/dominichubble)
- 📧 [Email](mailto:dominichubble@gmail.com)

---

*Built with ❤️ using React, TypeScript, and modern web technologies*
