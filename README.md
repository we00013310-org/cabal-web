# Cabal Web

Cabal Web is a React-based web application that uses Vite for development and build processes. This project integrates with Solana's web3 ecosystem and features Redux for state management, React Query for server-side data fetching, and various other libraries for enhanced user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Linting](#linting)

## Features

- Integration with Solana wallets
- State management using Redux Toolkit
- Data fetching with React Query
- Interactive charts with `chart.js` and `react-chartjs-2`
- Responsive carousels with `react-slick` and `slick-carousel`
- Animations using `lottie-react`
- Notification system using `react-toastify`
- Responsive styling using Tailwind CSS

## Tech Stack

- **React** (v18.2.0) - A JavaScript library for building user interfaces
- **Vite** (v5.2.0) - A fast build tool for modern web development
- **Solana Web3** - Integration with Solana blockchain via wallet adapters
- **Redux Toolkit** (v2.2.3) - For global state management
- **React Query** (v5.56.2) - For data fetching and caching
- **Tailwind CSS** (v3.4.3) - A utility-first CSS framework

## Installation

To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/we00013310-org/cabal-web.git
cd cabal-web
npm install
```

## Scripts

The following scripts are available in the project:

- **`npm run dev`** - Start the development server on `http://localhost:3000`
- **`npm run build`** - Build the app for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Lint the project using ESLint and Prettier

## Folder Structure

```
cabal-web/
├── public/           # Static assets
├── src/              # Application source code
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── redux/        # Redux state management
│   ├── styles/       # Global and Tailwind styles
│   └── utils/        # Utility functions
├── package.json      # Project configuration
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js    # Vite configuration
```

## Linting

The project uses ESLint and Prettier for code quality and formatting:

- **ESLint** for detecting issues with JavaScript/React code.
- **Prettier** for enforcing a consistent code style.

Run linting with:

```bash
npm run lint
```
