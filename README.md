
# Brand Life Co - Professional Next.js Full-Stack Application

A modern, professional Next.js full-stack application for Brand Life Co's performance brand scaling services. Built with TypeScript, Tailwind CSS, and a comprehensive UI component library.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Full-stack capabilities** with API routes
- **Professional project structure**
- **Environment configuration**
- **SEO optimized**

## 🏗️ Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── admin/             # Admin routes
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   └── ...               # Feature components
│   ├── lib/                  # Utility functions
│   ├── types/                # TypeScript types
│   └── hooks/                # Custom React hooks
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── .env.local              # Local environment (git-ignored)
└── ...config files
```

## 🛠️ Development

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd brand-life-co
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## 🌐 API Routes

- `POST /api/contact` - Contact form submission
- `GET /api/admin/*` - Admin panel endpoints (future)

## 📱 Pages

- `/` - Main landing page
- `/admin` - Admin panel

## 🎨 Design

The design is based on the Figma file: [Enhance Frontend Visuals](https://www.figma.com/design/XSqeflj1e3K84KESqbzS0Y/Enhance-Frontend-Visuals)

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting platform**

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NODE_ENV=development
NEXT_PUBLIC_APP_NAME="Brand Life Co"
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add your database, API keys, etc.
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

MIT License
  