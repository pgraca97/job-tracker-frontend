# React Vite Starter

React template with TypeScript, React Router, TanStack Query, Axios, Tailwind CSS, and Biome.

## Project Structure
```
src/
├── api/          # Axios setup and API endpoints
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── pages/        # Route components
├── types/        # TypeScript type definitions
├── utils/        # Helper functions
├── App.tsx       # Router setup
└── main.tsx      # App entry point
```

## Setup

1. Use this template or clone:
```bash
   git clone https://github.com/YOUR_USERNAME/react-vite-starter.git
   cd react-vite-starter
```

2. Install dependencies:
```bash
   pnpm install
```

3. Copy environment file:
```bash
   cp .env.example .env
```

4. Start development server:
```bash
   pnpm dev
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm check` - Run Biome checks
- `pnpm check:write` - Fix issues automatically
- `pnpm format` - Format code
- `pnpm lint` - Lint code

## VS Code

Recommended extensions are listed in `.vscode/extensions.json`. Install them when prompted.

## License

MIT