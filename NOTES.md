# Yocto Learning App - Design Notes & Issues

## Architecture

- **Frontend**: React 19 + React Router v7 (react-router-dom 7.13.1)
- **Build Tool**: Vite 7.3.1
- **Deployment**: Docker multi-stage build (Node 22 build + nginx serve)
- **Routing**: HashRouter (client-side `#/` routing)

### Project Structure

```
src/
├── main.jsx                  # Entry point (HashRouter + ProgressProvider)
├── App.jsx                   # Routes definition
├── index.css                 # All styles (CSS variables, responsive)
├── data/
│   └── modules.js            # Course content (5 modules, inline markdown)
├── context/
│   └── ProgressContext.jsx   # localStorage-based progress tracking
├── components/
│   ├── Header.jsx            # Nav bar + progress ring
│   ├── ProgressBar.jsx       # Reusable progress bar
│   ├── ModuleCard.jsx        # Module card for grid view
│   └── Quiz.jsx              # Interactive quiz component
└── pages/
    ├── Home.jsx              # Landing page + learning path
    ├── Modules.jsx           # Module grid view
    ├── ModuleDetail.jsx      # Module detail + lesson list
    └── Lesson.jsx            # Lesson content + quiz (includes MarkdownRenderer)
```

### Key Design Decisions

- **No markdown library**: `Lesson.jsx` has a custom `MarkdownRenderer` that converts markdown to HTML via regex (supports headers, code blocks, tables, lists, bold, italic, links)
- **Progress in localStorage**: `ProgressContext` stores lesson completion and quiz scores under key `yocto-learning-progress`
- **Static data**: All course content lives in `src/data/modules.js` as template literal strings — no API calls

---

## Issues Encountered & Fixes

### 1. Blank page — BrowserRouter fails on non-root paths

**Symptom**: Page blank when served behind a reverse proxy or at a non-root URL.

**Cause**: `BrowserRouter` relies on the server returning `index.html` for all paths. When served behind a proxy that rewrites paths, the router can't match routes.

**Fix**: Switched from `BrowserRouter` to `HashRouter` in `main.jsx`. Hash-based routing (`/#/modules`) works regardless of server configuration.

```jsx
// Before
import { BrowserRouter } from 'react-router-dom';
<BrowserRouter><App /></BrowserRouter>

// After
import { HashRouter } from 'react-router-dom';
<HashRouter><App /></HashRouter>
```

---

### 2. Blank page — Vite assets use absolute paths

**Symptom**: HTML loads (200 OK, ~500 bytes) but JS/CSS fail to load. Page blank.

**Cause**: Vite defaults to `base: '/'`, so `dist/index.html` references assets as `/assets/index-xxx.js`. When served at a subpath (e.g., behind a proxy at `/proxy/3000/`), the browser requests `/assets/...` from the domain root, which 404s.

**Fix**: Set `base: './'` in `vite.config.js` so asset paths become relative (`./assets/...`).

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: './',
});
```

---

### 3. Blank page — Unescaped `${TOPDIR}` in template literals

**Symptom**: All assets load (200 OK, correct file sizes), but page is completely blank. No visible error.

**Cause**: `src/data/modules.js` stores Yocto lesson content in JavaScript template literals (backticks). The content includes Yocto/BitBake variables like `${TOPDIR}`, `${WORKDIR}`, `${PN}`, etc. Most were correctly escaped as `\${...}`, but three occurrences of `${TOPDIR}` on lines 351, 354, 357 were **not escaped**. JavaScript tried to evaluate `TOPDIR` as a variable, throwing `ReferenceError: TOPDIR is not defined` during module initialization — before React even mounted.

**Fix**: Escape the three unescaped occurrences:

```js
// Before (crashes)
DL_DIR ?= "${TOPDIR}/downloads"

// After (correct)
DL_DIR ?= "\${TOPDIR}/downloads"
```

**Debugging approach**: Added `window.onerror` handler and `<p>Loading...</p>` fallback text directly in `index.html` to surface the error on screen, since the error occurred before React's error boundary could catch it.

**Lesson learned**: When storing shell/config syntax in JS template literals, **every `${...}` must be escaped as `\${...}`** or the JS engine will treat it as interpolation. This is especially tricky with Yocto content because `${VAR}` is used extensively in BitBake recipes.

---

## Deployment

### Docker

```bash
docker compose build --no-cache && docker compose up -d
```

- Multi-stage: `node:22-alpine` builds, `nginx:alpine` serves
- nginx config: SPA fallback (`try_files $uri $uri/ /index.html`) + static asset caching
- Exposes port 80, mapped to 3000 in docker-compose

### Local Dev

```bash
npm run dev      # Vite dev server
npm run build    # Production build to dist/
npm run preview  # Preview production build
```
