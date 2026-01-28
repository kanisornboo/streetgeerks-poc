# Street League SkillBuilder Dashboard

A modern skills and employment management platform built with **Next.js 16.1**, **shadcn/ui**, and **Tailwind CSS**.

## Tech Stack

- **Next.js 16.1.2** - Latest version with Turbopack
- **React 19** - Latest React with concurrent features
- **TypeScript 5.7** - Full type safety
- **Tailwind CSS 3.4** - Utility-first styling
- **shadcn/ui** - Beautifully designed components
- **Radix UI** - Accessible primitives
- **Lucide React** - Beautiful icons

## Project Structure

```
skillbuilder-dashboard/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main dashboard page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── switch.tsx
│   │   ├── tooltip.tsx
│   │   └── index.ts
│   ├── layout/              # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── index.ts
│   └── dashboard/           # Dashboard components
│       ├── architecture-diagram.tsx
│       ├── bar-chart.tsx
│       ├── module-card.tsx
│       ├── participants-table.tsx
│       ├── programme-card.tsx
│       ├── stats-card.tsx
│       ├── views/           # Page views
│       │   ├── analytics-view.tsx
│       │   ├── dashboard-view.tsx
│       │   ├── participants-view.tsx
│       │   ├── programmes-view.tsx
│       │   ├── settings-view.tsx
│       │   └── index.ts
│       └── index.ts
├── lib/                     # Utilities & data
│   ├── data.ts             # Sample data
│   └── utils.ts            # Helper functions (cn, etc.)
├── types/                   # TypeScript definitions
│   └── index.ts
├── hooks/                   # Custom React hooks
├── components.json          # shadcn/ui config
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
└── package.json
```

## Features

### Pages
- **Dashboard** - Overview with stats, module cards, architecture diagram
- **Participants** - Data table with progress tracking
- **Programmes** - Card grid of Street League programmes
- **Analytics** - Metrics and bar chart visualisation
- **Settings** - Organisation config and integrations

### Components
All components follow shadcn/ui patterns and are fully customisable:
- Button, Card, Input, Avatar, Badge, Progress
- Switch, Separator, ScrollArea, Tooltip
- Custom dashboard components

## Getting Started

### Requirements
- Node.js 20.9.0+ (required for Next.js 16)

### Installation

```bash
# Clone or copy the project
cd skillbuilder-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

## Brand Colours

| Element | Colour | Hex |
|---------|--------|-----|
| Primary | Yellow | #facc15 |
| Secondary | Amber | #f59e0b |
| Background | Neutral | #171717 |
| Surface | Neutral-800 | #262626 |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

Built for Street League - "Own Your Future"
