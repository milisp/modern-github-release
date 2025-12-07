# Modern GitHub Release — Stats & Smart Download

[![Stars](https://img.shields.io/github/stars/milisp/modern-github-release?style=social)](https://github.com/milisp/modern-github-release/stargazers)

A lightweight web app for viewing GitHub Releases and offering a smart, precise “Download for my OS” experience.

This repository contains the frontend only (Vite + React + Tailwind). The README focuses on public information; it does not include business plans or internal strategies.

## Features
- Smart download: detects user OS/arch and recommends the best asset (e.g. macOS ARM64 vs x64), with a one‑click button.
- Per‑repository release download stats and totals.
- Platform breakdown (Windows / macOS / Linux / Android / iOS / Other) with emojis.
- Per‑release tabs, per‑asset download counts, file size and link.
- Signature/checksum files (e.g. `*.sig`, checksums) are grouped as Other and excluded from OS‑specific recommendations.

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
- Enter an `owner/repo` (e.g. `facebook/react`) or a full GitHub URL (e.g. `https://github.com/owner/repo`).
- The app fetches releases and asset download counts via the GitHub REST API, groups assets by platform, and shows totals.
- If a matching asset for your OS is found, a primary “Download for <OS>” button appears with the recommended file; other variants are listed alongside.

## Limitations
- Uses unauthenticated GitHub API requests, which are subject to strict rate limits (about 60/hour for anonymous calls).
- If you hit rate limits, try again later. For production scenarios, consider adding a tiny backend proxy with caching and authenticated requests (not included).
- Asset selection relies on filename heuristics (e.g. `darwin`, `.dmg`, `arm64`, `x64`, etc.). Naming outside common conventions may not be detected.

## Build & Deploy
- Dev: `bun dev`
- Build: `bun run build`
- Deploy: this will auto deploy to `gh-pages` branch see [.github/workflows/build-docs.yml](.github/workflows/build-docs.yml)

## Tech Stack
- React, Vite, Tailwind CSS
- Utility/components: React Query, Shadcn UI

## Contributing
- Issues and pull requests are welcome.

## License
[BSD 3](LICENSE)

**Built with ❤️ by [milisp](https://github.com/milisp)**