# Merkato Store

Merkato Store is an Ethiopian marketplace application with a React/Vite frontend, an Express/Mongoose backend, and MongoDB persistence. The interface supports English and Amharic content, Ethiopian delivery locations, ETB pricing, local payment method selection, customer accounts, sellers, and administrators.

## Project structure

```text
Merkato-store/
├── Merkato-store-backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── Merkato-store-frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── data/
    │   └── services/
    ├── .env
    └── package.json
```

## Requirements

- Node.js 20 or newer
- MongoDB running locally or a reachable MongoDB instance
- PowerShell, Command Prompt, or another terminal

The default database connection is:

```text
mongodb://127.0.0.1:27017/merkato_store
```

## Environment configuration

Backend environment file:

```text
Merkato-store-backend/.env
```

Example:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/merkato_store
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Frontend environment file:

```text
Merkato-store-frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Never commit `.env` files or real secrets.

## Install dependencies

```powershell
cd "C:\Users\hp\Music\Teamr FCA\Merkato-store\Merkato-store-backend"
npm install

cd "..\Merkato-store-frontend"
npm install
```

## Seed MongoDB

The seed script creates:

- 12 categories
- 14 marketplace products
- 4 sellers
- 3 demo users
- 1 sample order

For an empty development database:

```powershell
cd "C:\Users\hp\Music\Teamr FCA\Merkato-store\Merkato-store-backend"
npm run seed
```

The script refuses to overwrite existing data. To intentionally replace development data:

```powershell
npm run seed -- --reset
```

Use `--reset` carefully because it deletes existing Merkato Store collections.

## Run the application

Start the backend in one terminal:

```powershell
cd "C:\Users\hp\Music\Teamr FCA\Merkato-store\Merkato-store-backend"
npm start
```

The backend runs at:

```text
http://localhost:5000
```

Start the frontend in a second terminal:

```powershell
cd "C:\Users\hp\Music\Teamr FCA\Merkato-store\Merkato-store-frontend"
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## Demo accounts

| Role | Phone | Password |
|---|---|---|
| Customer | `+251 911 458920` | `password123` |
| Seller | `+251 912 884433` | `password123` |
| Admin | `+251 900 000000` | `adminpassword123` |

## Backend API

### Public endpoints

```text
GET  /
GET  /api/categories
GET  /api/categories/:id
GET  /api/products
GET  /api/products/:idOrSlug
GET  /api/products/flash-deals
GET  /api/products/trending
GET  /api/sellers
GET  /api/sellers/:id
GET  /api/sellers/:id/products
POST /api/auth/register
POST /api/auth/login
```

Product listing supports:

```text
search
category
brand
minPrice
maxPrice
isEthiopianMade
inStock
sort
page
limit
```

Example:

```text
GET /api/products?search=Samsung&sort=rating&page=1&limit=20
```

### Authenticated endpoints

Send the JWT using:

```text
Authorization: Bearer <token>
```

```text
GET  /api/auth/me
PUT  /api/auth/profile
GET  /api/orders
POST /api/orders
GET  /api/orders/:id
GET  /api/orders/track/:id
POST /api/products/:id/reviews
POST /api/products
PUT  /api/products/:id
DELETE /api/products/:id
PUT  /api/sellers/:id
```

Administrator-only operations include:

```text
GET /api/auth/users
PUT /api/orders/:id/status
```

## Verification commands

Health check:

```powershell
Invoke-RestMethod http://localhost:5000/
```

Categories:

```powershell
Invoke-RestMethod http://localhost:5000/api/categories
```

Product search:

```powershell
Invoke-RestMethod "http://localhost:5000/api/products?search=Samsung"
```

Frontend build and lint:

```powershell
cd "C:\Users\hp\Music\Teamr FCA\Merkato-store\Merkato-store-frontend"
npm run lint
npm run build
```

Backend syntax validation:

```powershell
cd "C:\Users\hp\Music\Teamr FCA\Merkato-store\Merkato-store-backend"
node --check server.js
```

## Payments and delivery

The application supports `telebirr`, `cbe-birr`, and `cod` as order payment selections. No external payment gateway is connected yet, so the application does not claim that a real Telebirr or CBE Birr transaction has been verified.

Delivery fees are currently calculated server-side using the configured marketplace delivery fee. Delivery locations and the frontend delivery experience remain available through the existing location data and UI.

## Detailed implementation report

### Backend work completed

- Replaced the minimal single-file backend behavior with modular configuration, models, controllers, routes, middleware, and seed modules.
- Added environment loading through `dotenv`.
- Added CORS configuration using `CLIENT_URL`.
- Added JSON request parsing and development request logging with `morgan`.
- Added centralized API error handling for validation errors, duplicate keys, invalid identifiers, and server errors.
- Added startup validation for `JWT_SECRET`.
- Added MongoDB connection configuration through `MONGO_URI`.
- Added Product, User, Category, Seller, and Order schemas.
- Expanded Product to support names in English and Amharic, pricing, discounts, inventory, flags, images, variants, specifications, reviews, seller information, slugs, SKUs, views, sales, timestamps, and indexes.
- Added password hashing and password comparison using `bcryptjs`.
- Added JWT login and registration.
- Added protected authentication middleware and role authorization middleware.
- Prevented passwords from being returned in user JSON responses.
- Added customer, seller, and admin role handling.
- Added category listing and lookup.
- Added product search, filtering, sorting, pagination, flash-deal, trending, lookup, creation, update, deletion, and review endpoints.
- Enforced seller ownership for product changes.
- Prevented sellers from changing ownership, ratings, review data, sales counters, and view counters.
- Added authenticated review creation using the authenticated user's identity instead of a client-supplied author.
- Added authenticated order creation with server-side product lookup, price calculation, delivery fee calculation, coupon calculation, stock validation, atomic stock decrement, and order snapshots.
- Prevented clients from purchasing unknown products or manipulating product prices and totals.
- Added customer-owned order listing and access isolation.
- Added admin-only order status management.
- Made seed execution safe by refusing to overwrite an existing database unless `--reset` is explicitly supplied.

### Frontend work completed

- Added a centralized API client using `VITE_API_BASE_URL`.
- Added JWT authorization headers from `localStorage`.
- Added service modules for authentication, products, categories, sellers, and orders.
- Connected StoreContext to backend-loaded products, categories, sellers, authenticated users, and orders.
- Removed mock catalog and order data as authoritative initial state.
- Preserved local persistence for appropriate client-side state such as cart, wishlist, language, and JWT storage.
- Removed silent fake authentication and fake order creation fallbacks.
- Connected registration and login forms to the backend.
- Added handling for authenticated user restoration with `/api/auth/me`.
- Connected checkout to the real order endpoint and made it await server confirmation.
- Connected order tracking to the real tracking endpoint.
- Connected review submission to the protected review endpoint.
- Connected seller product creation to the protected product endpoint.
- Connected administrator order status changes to the protected order endpoint.
- Added a homepage loading state so the application does not crash while the catalog API is loading.
- Preserved the existing visual design, navigation model, localization, cart behavior, and responsive layout.

### Validation completed

- Frontend ESLint passes.
- Frontend production build passes.
- Backend JavaScript syntax checks pass.
- Backend health endpoint returns successfully.
- MongoDB connection and seed data were verified.
- Category API returned 12 seeded categories.
- Samsung product search returned matching results.
- Flash-deal and trending endpoints were verified.
- JWT login returned a token and safe user data.
- Passwords were confirmed absent from login responses.
- Unauthenticated order access returned HTTP 401.
- Invalid credentials returned HTTP 401.
- Cross-user order access was blocked.
- Seller attempts to update another seller's product were blocked.
- Server-side order pricing ignored manipulated client prices and delivery fees.
- A temporary authorization test product was removed after verification.

### Current limitations

- Real Telebirr and CBE Birr gateway transactions are not integrated.
- SMS, WhatsApp, support tickets, rewards, and some analytics remain frontend simulations.
- The project does not currently include an automated test framework.
- Full browser-based end-to-end testing still needs to be performed manually.
