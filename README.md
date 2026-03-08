# Ionic React Organizer

An experimental Ionic + React project that explores Progressive Web App capabilities and cross-platform flows via a tabbed dashboard, persistent todos, notes, and a static timetable.

## Features
- **Dashboard**: quick summary panel for today's lectures, completed todos, and notes count.
- **PWA + cross-platform**: built with Ionic/Vite React so the UI can run in browsers, PWAs, or native shells via Capacitor.
- **Todos**: add, toggle, and persist checklist items though device storage.
- **Notes**: jot down snippets that survive reloads via the same local storage helpers.
- **Timetable**: view a curated list of lectures by weekday (see `src/constants/timetable`).
- **Ionic + Vite stack**: built with Ionic components, Vite, and React Router tabs for native-like navigation.

## Getting started
1. Install dependencies (requires Node.js 18+ and npm).
   ```bash
   npm install
   ```
2. Start the dev server and open `http://localhost:5173`.
   ```bash
   npm run dev
   ```
3. Run `npm run build` when you are ready to produce a production bundle.

## Available scripts
- `npm run dev` — launch the Vite development server.
- `npm run build` — run TypeScript type-checking and create the production build.
- `npm run preview` — locally preview the production build.
- `npm run test.e2e` — execute the Cypress end-to-end suite.
- `npm run test.unit` — run unit tests with Vitest.
- `npm run lint` — check the code with ESLint.

## Storage + state
The todos and notes screens rely on helpers in `src/lib/appStorage.*` to read/write JSON blobs. Data is saved to the browser (or device) storage, so entries survive refreshes without a backend.

## Customization hints
- Update `src/constants/timetable.ts` to reflect real schedule data or add a backend sync later.
- The theme is managed via `src/theme/variables.css` and Ionic’s CSS utilities; toggle the dark palette import if you want a different default appearance.
- Capacitor is configured in `ionic.config.json` so you can build native shells once the logic settles.
