# ☕ Perfect Brew

**AI-Powered Coffee Brewing Recommendations**

Perfect Brew is a modern web application that uses artificial intelligence to provide personalized coffee brewing recommendations. Simply select your coffee beans and brewing equipment, and get precise parameters for the perfect cup every time.

![Perfect Brew Screenshot](https://via.placeholder.com/800x400/B8824A/FFFFFF?text=Perfect+Brew+Screenshot)

## ✨ Features

- 🤖 **AI-Powered Recommendations** - Advanced algorithms analyze bean characteristics and brewing methods
- 🎯 **Precise Parameters** - Get exact temperature, grind size, timing, and ratio recommendations
- ⚡ **Instant Results** - Receive personalized brewing recommendations in seconds
- 📱 **Mobile-First Design** - Fully responsive and optimized for all devices
- 🎨 **Modern UI** - Clean, minimalist design with smooth animations
- 🔄 **Fallback System** - Cached recommendations when AI service is unavailable

## 🚀 Tech Stack

- **Framework**: [Astro.js](https://astro.build/) with React islands
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom theme
- **Language**: TypeScript for type safety
- **AI Integration**: Claude API via Anthropic SDK
- **Testing**: Vitest with property-based testing (fast-check)
- **Package Manager**: pnpm

## 🏗️ Architecture

Perfect Brew uses Astro's islands architecture for optimal performance:

- **Static Components**: Navigation, content pages, and layout components render as static HTML
- **Interactive Islands**: Bean/machine selectors and recommendation forms use React with client-side hydration
- **API Routes**: Backend logic handled through Astro API routes
- **Data Storage**: JSON-based local storage with TypeScript schemas

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ImranK1506/perfect-brew.git
   cd perfect-brew
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Claude API key to the `.env` file:
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:4321`

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm test:ui` - Run tests with UI

### Project Structure

```
perfect-brew/
├── src/
│   ├── components/          # React components and Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   └── RecommendationForm.tsx
│   ├── layouts/             # Page layouts
│   │   └── Layout.astro
│   ├── pages/               # Route pages
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── how-it-works.astro
│   ├── services/            # API services
│   │   └── claude.ts
│   ├── data/                # JSON data files
│   │   ├── beans.json
│   │   └── machines.json
│   ├── styles/              # Global styles
│   │   └── global.css
│   └── types/               # TypeScript type definitions
│       └── index.ts
├── public/                  # Static assets
├── .kiro/                   # Kiro specs and configuration
└── package.json
```

## 🎨 Design System

Perfect Brew uses a minimalist 3-color palette:

- **Primary**: Coffee brown (`#B8824A`) - Main brand color
- **Neutral**: Gray (`#737373`) - Text and backgrounds  
- **Accent**: Blue (`#0EA5E9`) - Interactive elements

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🧪 Testing

The project includes comprehensive testing with both unit tests and property-based tests:

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run specific test file
pnpm test src/components/RecommendationForm.test.tsx
```

### Property-Based Testing

We use [fast-check](https://github.com/dubzzz/fast-check) for property-based testing to ensure correctness across all possible inputs:

- Data validation properties
- UI state management properties  
- API integration properties
- Error handling properties

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel

```bash
npx vercel
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Astro.js](https://astro.build/) for the amazing framework
- [Anthropic](https://www.anthropic.com/) for Claude AI
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- Coffee enthusiasts worldwide for inspiration ☕

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@perfectbrew.app
- 🐛 Issues: [GitHub Issues](https://github.com/ImranK1506/perfect-brew/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ImranK1506/perfect-brew/discussions)

---

**Made with ❤️ and lots of ☕ by the Perfect Brew team**