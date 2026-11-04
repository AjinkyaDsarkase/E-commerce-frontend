# ShopEasy — React E-Commerce App

A fully functional e-commerce web application built with React 19, Redux Toolkit, and Tailwind CSS v4. It uses the [FakeStore API](https://fakestoreapi.com/) as its backend to serve real product and category data.

---

## Features

- **Product Browsing** — Browse all products with a responsive grid layout
- **Global Search** — Search bar in the header navigates to filtered product results
- **Filtering & Sorting** — Filter by category, min/max price; sort by price or rating
- **Product Details** — Dedicated page for each product with full info
- **Shopping Cart** — Add, remove, and update item quantities; persists in Redux state
- **Wishlist** — Toggle products in/out of a wishlist
- **Checkout** — Checkout flow built with React Hook Form
- **Orders** — Place orders, view order history, and see individual order details
- **Auth** — Login and Register pages with Redux-managed auth state
- **User Profile** — View and update profile information
- **404 Page** — Custom not-found page for unknown routes

---

## Tech Stack

| Category | Technology |
|---|---|
| UI Library | React 19 |
| State Management | Redux Toolkit + React Redux |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios |
| Forms | React Hook Form |
| Icons | React Icons |
| Build Tool | Vite |
| API | FakeStore API |

---

## Project Structure

```
src/
├── api/              # Axios instance and API endpoint constants
├── components/
│   ├── layout/       # Header, Navbar, Footer
│   └── product/      # ProductCard, ProductGrid
├── data/             # Static fallback data
├── features/
│   ├── auth/         # Auth slice + Login/Register pages
│   ├── cart/         # Cart slice
│   ├── orders/       # Orders slice
│   ├── product/      # Product slice (products + categories)
│   └── wishlist/     # Wishlist slice
├── pages/            # All route-level page components
├── routes/           # AppRoutes (React Router config)
├── services/         # API service functions
└── store/            # Redux store setup
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/e-commerce-project.git
cd e-commerce-project
npm install
```

### Environment Variables

Create a `.env` file in the root (see `.env.example`):

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | All Products (search, filter, sort) |
| `/products/:id` | Product Details |
| `/cart` | Shopping Cart |
| `/wishlist` | Wishlist |
| `/checkout` | Checkout |
| `/orders` | Order History |
| `/orders/:id` | Order Details |
| `/order-success` | Order Confirmation |
| `/login` | Login |
| `/register` | Register |
| `/profile` | User Profile |
| `*` | 404 Not Found |
