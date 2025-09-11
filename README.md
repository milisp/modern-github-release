# Modern GitHub Release

A lightweight web app for viewing GitHub repository release download statistics.

This repository contains the frontend only (Vite + React + Tailwind). The README focuses on public information; it does not include business plans or internal strategies.

## Features
- Per‑repository release download stats
- Platform breakdown (Windows / macOS / Linux)
- Historical versions with per‑asset counts
- Clean list and basic visualization

## Quick Start
- Requirements: Node.js 16+ (18+ recommended)

Using Bun:
```sh
git clone https://github.com/milisp/modern-github-release
cd modern-github-release
bun install
bun dev
```

Then open the printed local URL in your browser.

## Usage
- Enter an `owner/repo` (for example, `facebook/react`) or a full GitHub URL (for example, `https://github.com/owner/repo`).
- The app calls the GitHub REST API to fetch releases and asset download counts, then displays the aggregated results.

## Limitations
- Uses unauthenticated GitHub API requests, which are subject to strict rate limits (about 60/hour for anonymous calls).
- If you hit rate limits, try again later. For production scenarios, consider adding a small backend proxy with caching and authenticated requests (not included in this repository).

## Tech Stack
- React, Vite, Tailwind CSS
- Utility/components: React Query, Shadcn UI

## Contributing
- Issues and pull requests are welcome.

## License
[BSD 3](LICENSE)
