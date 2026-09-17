# Copilot instructions for Merkato Store

## Project overview

Merkato Store is a client-side React 19 e-commerce marketplace prototype for Ethiopian products and local delivery/payment flows. It is built with Vite, JSX, Tailwind CSS v4, and Lucide icons. There is no backend, API layer, router, TypeScript, or automated test framework in the repository.

## Build, lint, and run commands

Use npm from the repository root:

```bash
npm install                 # install dependencies when needed
npm run dev                 # start the Vite development server with HMR
npm run build               # create the production bundle in dist/
npm run preview             # serve the built dist/ bundle locally
npm run lint                # lint all JavaScript/JSX with ESLint
npx eslint src/path/File.jsx # lint one file (the closest available targeted check)
```

There is currently no test script or test runner, so no single-test command exists. Do not add a test command to documentation unless a test framework is introduced.

## Architecture

- `src/main.jsx` mounts `App` inside `StrictMode` and imports the global stylesheet.
- `src/App.jsx` is the application shell. `AppContent` reads `currentView` from `StoreContext` and conditionally renders the home sections, shop/deals, product detail, checkout, tracking, account, seller, and admin views. Global drawers, modals, notifications, support, footer, and navigation are mounted here.
- `src/context/StoreContext.jsx` is the central state and action layer. It owns catalog, cart, wishlist, compare, authentication, orders, notifications, location, language, modal, toast, and navigation state, and exposes derived totals plus actions through `useStore()`.
- Catalog and domain seed data live in `src/data/` (`products.js`, `categories.js`, `sellers.js`, `locations.js`, and `translations.js`). Components consume these through the context rather than fetching data.
- `src/services/` contains browser-only simulations for payment providers, delivery zones/couriers, and SMS/WhatsApp-style notifications. These are not network integrations; preserve their interfaces if replacing them with real APIs.
- `src/components/` is organized by feature (`home`, `shop`, `product`, `checkout`, `orders`, `account`, `seller`, `admin`, `rewards`, `compare`) and shared UI (`common`, `layout`).
- Vite is configured in `vite.config.js` with the Tailwind v4 Vite plugin, the React plugin, and the React Compiler Babel preset. ESLint configuration is flat-config based in `eslint.config.js` and ignores `dist`.

## Repository-specific conventions

- Use functional React components with a default export. Import shared store state/actions with `useStore()`; keep feature-local transient UI state in the component with `useState`/`useMemo`.
- Add cross-feature state or behavior to `StoreContext` and expose it in the provider value rather than duplicating cart, order, toast, modal, or navigation logic in components.
- `currentView` is the existing navigation mechanism. Change views with `setCurrentView(...)` and pass selected entities through context; do not introduce a router without coordinating a broader navigation change.
- Product objects use the established schema in `src/data/products.js` (including `id`, `name`, `nameAm`, `category`, pricing, flags, seller fields, images, specs, and reviews). Preserve those fields when creating or transforming products.
- The UI supports English and Amharic. Use `lang` from the store, `t(key)` for shared translation keys, and the existing `nameAm`/`descriptionAm` fallback pattern for product content. Add new shared strings to `src/data/translations.js` when practical.
- Cart and order monetary values are ETB. Use the context’s `formatPrice()` for display and keep totals derived from the context’s cart calculations.
- Browser persistence uses `localStorage` keys prefixed with `merkato_`; retain the existing initialization/serialization pattern when adding persisted state.
- Styling is primarily Tailwind utility classes in JSX, with global/base rules and a few reusable visual utilities in `src/index.css`. Reuse the existing emerald/amber/rose/slate palette, responsive utility patterns, rounded cards, and spacing conventions.
- Use `lucide-react` for interface icons and the existing `canvas-confetti` dependency for checkout celebration effects rather than introducing another icon or animation library.
- Keep interactive behavior explicit: buttons and clickable images/titles use handlers, product cards call context actions, and checkout progresses through its four local steps before calling `createOrder()`.
- This is currently a simulated frontend. Avoid implying that payment verification, delivery dispatch, notifications, authentication, or persistence are secure/remote operations unless the implementation is actually replaced with a backend integration.
