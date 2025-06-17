# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VibeTunnel landing page - a Next.js 15 application for showcasing a macOS terminal proxy app. The project is automatically synced with v0.dev and deployed on Vercel.

## Development Commands

```bash
# Install dependencies (use pnpm)
pnpm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Preserve MP3 assets (important before builds)
npm run preserve-assets
```

## Architecture

### Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **UI**: React 19, TypeScript, Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Components**: shadcn/ui with Radix UI primitives
- **Styling**: CSS variables for theming, cn() utility for classnames

### Key Components

1. **3D Scene** (`components/vibetunnel-scene.tsx`):

   - Interactive Three.js scene with ASCII renderer
   - Responsive text sizing based on viewport
   - Animation state management with useFrame

2. **Audio Player** (`components/audio-player.tsx`):

   - Background music player
   - Currently loads from external URL: https://steipete.me/game-audio.mp3

3. **Main Page** (`app/page.tsx`):
   - SEO metadata configuration
   - Hero section with 3D terminal
   - Feature grid layout
   - Responsive text scaling with `.mobile-text-half` class

### Styling System

- Global styles in `app/globals.css` with CSS variables
- Tailwind config extends shadcn/ui defaults
- Mobile breakpoint: 640px
- Custom mobile text scaling: `.mobile-text-half` applies 50% scale on mobile

## Important Considerations

### v0.dev Sync Issues

The project has special handling for MP3 files that v0.dev tends to delete:

1. **Asset Preservation**: The `scripts/preserve-assets.js` runs before builds to backup MP3 files
2. **External Audio**: Audio is loaded from external URL to avoid sync deletions
3. **Build Hooks**: `prebuild` script automatically preserves assets

### Build Configuration

- TypeScript errors are ignored during builds (`ignoreBuildErrors: true`)
- ESLint errors are ignored during builds (`ignoreDuringBuilds: true`)
- Images are unoptimized for v0.dev compatibility

### File Organization

```
app/           # Next.js pages and layouts
components/    # React components
  ui/         # shadcn/ui components
lib/          # Utilities (cn function)
public/       # Static assets
  fonts/      # GeistMono font files
  textures/   # 3D scene textures
scripts/      # Build and asset scripts
```

## Dependency Management

We always want to use the latest dependencies. Do not downgrade any dependencies on your own.

## Common Tasks

### Modifying 3D Scene

Edit `components/vibetunnel-scene.tsx`. Key parameters:

- Text size: `size`, `height` props on Text3D
- Animation speed: `vx`, `vy` in animationState
- ASCII renderer: `resolution`, `characters` props

### Updating Responsive Text

The `.mobile-text-half` class in `app/globals.css` controls mobile text scaling. Currently set to `scale(0.5)`.

### Changing Audio

Update the `src` prop in `<AudioPlayer>` component in `app/page.tsx`.
