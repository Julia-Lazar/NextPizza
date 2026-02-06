# NextPizza

NextPizza is a full-stack pizza ordering app built with Next.js, Prisma, and NextAuth. It provides a storefront for browsing pizzas, sauces, and drinks, a checkout flow, and an admin area for managing the menu and orders. The backend exposes REST-style API routes and persists data in MariaDB/MySQL via Prisma.

## Features

- Customer storefront with category browsing for pizzas, sauces, and drinks.
- Cart, checkout, and address collection flows.
- Admin dashboard for menu and order management.
- Auth powered by NextAuth with Google provider and Prisma adapter.
- API routes for products, ingredients, orders, uploads, and API documentation.

## Tech Stack

- **Framework**: Next.js App Router (React 19)
- **Database**: MariaDB/MySQL with Prisma
- **Auth**: NextAuth (Google provider)
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Testing Library
- **Component Dev**: Storybook

## Getting Started

### 1) Install dependencies

```bash
npm install
# or
yarn install
```

### 2) Configure environment variables

Create a `.env` file in the project root. Example:

```bash
# Database (used by Prisma adapter and API routes)
MYSQL_HOST=localhost
MYSQL_USER=nextpizza
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=nextpizza
DATABASE_URL="mysql://nextpizza:your_password@localhost:3306/nextpizza"

# Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=your_auth_secret
```

> `DATABASE_URL` is used for Prisma migrations, while the app runtime uses the MariaDB adapter variables.

### 3) Run database migrations (optional but recommended)

```bash
npx prisma migrate dev
```

### 4) Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev           # Start Next.js dev server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # ESLint
npm run format        # Prettier
npm run test          # Vitest
npm run test:ui       # Vitest UI
npm run test:coverage # Coverage report
npm run storybook     # Storybook dev server
npm run build-storybook
```

## Project Structure

```
src/
  app/                # Next.js App Router routes
    (client)/         # Storefront + checkout pages
    (admin)/          # Admin pages
    (auth)/           # Auth pages
    api/              # API routes (products, orders, ingredients, uploads)
  components/         # Shared UI components
  context/            # React contexts (menu/cart/etc.)
  lib/                # Shared utilities (Prisma client, helpers)
  schemas/            # Zod schemas
prisma/               # Prisma schema + migrations
```

## API Endpoints (high level)

- `/api/products` — product catalog
- `/api/ingredients` — ingredient catalog
- `/api/orders` — order creation and updates
- `/api/uploads` — media upload endpoints
- `/api/rapidoc` — API documentation

## Contributing

1. Create a feature branch.
2. Run tests and linting.
3. Open a PR with a clear summary of changes.

## License

This project is private and unlicensed.
