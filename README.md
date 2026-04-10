# Invisible DEX MVP

A privacy-focused decentralized exchange built for the Midnight ecosystem.

## Tech Stack
- **Frontend:** React + Vite (Simulating Next.js structure)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion (motion/react)
- **State Management:** Zustand
- **Web3:** Ethers.js
- **Charts:** Recharts
- **Notifications:** Sonner

## Features
- **Shielded Swaps:** Zero-knowledge proof simulation for private trading.
- **Privacy Modes:** Standard, Shielded, and Phantom modes.
- **Liquidity Pools:** Private liquidity provision with APR tracking.
- **Portfolio:** Shielded balance management and transaction history.
- **Rewards:** INV token incentive system.

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Project Structure
- `/src/components`: Reusable UI and feature-specific components.
- `/src/store.ts`: Global state management with Zustand.
- `/src/hooks`: Custom React hooks for Web3 and UI logic.
- `/src/lib`: External library configurations.
- `/src/utils`: Helper functions.
