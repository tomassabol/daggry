# daggry

Marketing site for **daggry** — bageri & kaffebar i Lyngby. Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com) v4.

## Requirements

- [Node.js](https://nodejs.org/) ≥ 22.12.0

## Setup

```sh
npm install
```

## Commands

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Dev server (default: [localhost:4321](http://localhost:4321)) |
| `npm run build`   | Production build to `dist/`                      |
| `npm run preview` | Serve the production build locally               |
| `npm run astro`   | Astro CLI (`astro add`, `astro check`, etc.)     |

## Project structure

```text
/
├── public/           # Static assets (favicon, images, …)
├── src/
│   ├── components/   # Astro components (Logo, menu, …)
│   ├── layouts/      # Page layouts
│   ├── pages/        # Routes (`index.astro` → `/`)
│   └── styles/       # Global CSS (Tailwind + custom)
├── astro.config.mjs
└── package.json
```

## Stack

- **Astro** — static pages and islands as needed
- **Tailwind CSS v4** — via `@tailwindcss/vite` in `astro.config.mjs`
