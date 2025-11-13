# Fundbox — AI Lost & Found Platform

A modern Next.js website for Fundbox, an AI-powered lost & found management platform that automates item matching, communication, and scheduling for venues, campuses, and transport hubs.

## 🚀 Features

- **AI-Powered Matching**: Instant item matching using advanced AI algorithms
- **Automated Scheduling**: Seamless pickup scheduling with automated reminders
- **Real-time Communication**: Centralized communication without endless email chains
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Dark/Light Theme**: Theme toggle support for user preference

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **UI Components**: Radix UI, shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

## 🏃 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fundbox-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (if needed)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
fundbox-site/
├── public/              # Static assets
│   └── images/          # Image files
├── src/
│   ├── app/             # Next.js app router pages
│   │   ├── about/       # About page
│   │   ├── demo/        # Demo request page
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Custom components
│   └── lib/             # Utility functions
└── ...                  # Configuration files
```

## 🎨 Key Components

- **Stepper**: Interactive step-by-step guide component
- **SpotlightCard**: Glassmorphic card with spotlight effect
- **TrueFocus**: Animated text focus component
- **StarBorder**: Animated border component
- **ThemeToggle**: Dark/light theme switcher
- **ScrollProgressBar**: Page scroll progress indicator

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fundbox-site)

Or deploy to any platform that supports Next.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [AWS](https://aws.amazon.com/)
- [Docker](https://www.docker.com/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
