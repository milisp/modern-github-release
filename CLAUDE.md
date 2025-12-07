# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern GitHub Release is a Vite + React + Tailwind CSS web application that analyzes GitHub repository releases and provides intelligent download recommendations. The app detects a user's OS/architecture and recommends the best matching release asset with download statistics per platform.

## Development Commands

- **Dev server**: `npm run dev` or `bun dev`
- **Build**: `npm run build` or `bun build`
- **Publish to GitHub Pages**: `npm run publish` - builds and moves artifacts to `docs/` directory for Pages hosting
- **Preview production build**: `npm run preview`

## Architecture

### Routing & Pages
- **Hash-based routing** via React Router v6 (see src/App.jsx:1)
- **Home page** (`src/pages/Home.jsx`): Landing page with repo search input and recent search history (stored in localStorage)
- **Repository stats page** (`src/components/GitHubStats.jsx`): Main analytics view, routed via `/repo/:owner/:repo`

### Core Data Flow
1. **GitHub API Integration** (`src/utils/github.js`):
   - `fetchReleases()`: Fetches releases via unauthenticated GitHub REST API
   - `fetchRepoInfo()`: Fetches repository metadata
   - **Rate limits**: ~60 requests/hour for anonymous calls

2. **Platform Detection** (`src/utils/platform.js`):
   - `detectPlatform(assetName)`: Parses asset filenames to identify OS and architecture using heuristics (e.g., "darwin", ".dmg", "arm64")
   - `getOS(userAgent)`: Detects user's OS from browser user agent
   - `getPlatformStats(releases)`: Aggregates download counts by OS across all releases
   - **Signature files** (*.sig): Always categorized as "Other" platform to exclude from OS-specific recommendations

3. **State Management**:
   - React Query (`@tanstack/react-query`) handles API data fetching and caching via `useQuery` hook
   - React Context (`ThemeContext`) manages light/dark theme with system preference fallback
   - Local component state for UI interactions

### UI Components

**Page Components**:
- `GitHubStats.jsx`: Orchestrates data fetching and renders repository analytics layout
- `Home.jsx`: Search interface with localStorage-backed recent search history

**Sub-components** (organized in `src/components/repo/`):
- `DownloadButton.jsx`: Smart "Download for <OS>" button with OS/architecture detection and sorting (ARM64 preferred for macOS, x64 for others)
- `DownloadStats.jsx`: Platform breakdown with download counts and emojis
- `ReleasesSection.jsx`: Tabbed view of releases with per-asset download counts
- `RepoHeader.jsx`, `SearchBar.jsx`, `RepoInfo.jsx`: Metadata and navigation

**UI Kit** (Shadcn components in `src/components/ui/`):
- `tabs.tsx`, `collapsible.tsx`, `skeleton.tsx`: Radix UI primitives with Tailwind styling

**Theme**:
- `ThemeToggle.jsx`: Dark/light mode switcher
- `ThemeContext.jsx`: Manages theme state with localStorage persistence and system preference detection

### Styling

- **Tailwind CSS** (`src/index.css`): Base styles with CSS variables for theming
- **Config** (`tailwind.config.js`): Custom color palette using CSS variables (background, foreground, card, primary, etc.) with support for dark mode via `dark` class
- **Plugins**: `tailwindcss-animate` for animations
- **Build alias**: Path alias `@` maps to `src/` for clean imports

### Key Design Patterns

1. **Asset Filtering**: Signature files and checksums are treated as "Other" platform to avoid polluting OS-specific recommendations
2. **Architecture Preference**: Smart sorting in `DownloadButton` prioritizes ARM64 for macOS (Apple Silicon) and x64 for other platforms
3. **No Backend Required**: Fully client-side app using public GitHub API (unauthenticated)
4. **Search Input Parsing**: Accepts both full GitHub URLs and "owner/repo" shorthand format

## Important Implementation Details

- **Vite base path**: Set to `/modern-github-release/` for GitHub Pages deployment (see `vite.config.js`)
- **Platform detection** relies on filename heuristics—repos with non-standard naming may not be detected
- **Rate limiting**: When API limits are hit, consider using a backend proxy with caching and authenticated requests (not included in this repo)
- **Recent searches**: Stored in `localStorage` under key `homeSearchHistory`; wrapped in try/catch for privacy modes
