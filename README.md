# PokoPay

## 🚀 One-Issue Mission

**Enable global e-commerce and physical stores to enjoy "0.3% fees or less with instant settlement" using their preferred cryptocurrencies as a standard experience!**

## 📋 Table of Contents

- [Service Concept](#service-concept)
- [Core Features by Persona](#core-features-by-persona)
- [Technical Architecture](#technical-architecture)
- [Revenue Model](#revenue-model)
- [Getting Started](#getting-started)

---

## 🏗️ Service Concept

### Layer Architecture

| Layer | Role | Key Features |
|-------|------|--------------|
| **Customer Wallet** → **PokoPayWallet** | Multi-chain charging | USDC/USDT/PYUSD support<br/>Single charge enables multiple payments |
| **PokoPayWallet (XRPL)** | Internal balance management | Ultra-low gas fees<br/>Instant balance updates<br/>Multi-currency management via TrustLine |
| **Merchant Deposit Wallet (XRPL)** | Payment reception | Net amount settlement after 0.3% fee deduction |
| **Withdrawal** | Bank or self-hosted wallet | Monthly free withdrawals + fixed fees for excess |

---

## 👥 Core Features by Persona (MVP)

### 2.1 Merchant Features
- **Store registration, KYC, and bank account setup**
- **Receiving currency**: USDC only (MVP)
- **QR code generation**: Fixed QR and amount-specified QR
- **Payment notifications, sales dashboard, and balance management**
- **Withdrawal functionality**

### 2.2 Customer Features
- **Existing wallet integration** (MetaMask, Xaman, etc.)
- **Multi-chain charging** → PokoPayWallet balance reflection
- **QR scan payments**
- **Transaction history and transaction link display**

### 2.3 Developer Features
- **QR payment API and webhooks** (payment completion)
- **API key management and documentation**
- **RevenueCat integration webhooks** (Growth plan and above)

---

## 🛠️ Technical Architecture

```
┌────────────┐         ┌────────────────┐
│ Customer   │─Charge→ │ Bridge/CCTP    │
│ Wallet     │         │                │
└────────────┘         └────────────────┘
         ↓ (XRPL USDC)
┌────────────────────────────────────────┐
│         PokoPayWallet (XRPL)           │
└────────────────────────────────────────┘
         ↓ Payment (0.3% fee deduction)
┌────────────────────────────────────────┐
│    Merchant Deposit Wallet (XRPL)      │
└────────────────────────────────────────┘
         ↓ Withdrawal
    Bank / Merchant Wallet
```

### Tech Stack

#### Frontend
- **Mobile**: Expo + Gluestack UI
- **Admin Web**: Next.js (App Router)

#### Backend
- **API**: Hono + Supabase (PostgreSQL)
- **State Management**: React Query + Zustand

#### Security & Compliance
- **Proof of Reserves**: XRPL multi-signature + regular public disclosure
- **Separate custody**: XRPL multi-signature implementation

---

## 💰 Revenue Model

| Revenue Stream | Fee Structure | Notes |
|----------------|---------------|-------|
| **Payment Processing Fee** | 0.3% net | Deducted immediately from gross amount |
| **Feature Subscription** | ¥0 / ¥5,500 / ¥22,000 / ¥55,000 / Enterprise | 5-tier plan: Free to Pro |
| **Withdrawal Fee** | Monthly free + fixed fee for excess | Includes gas + off-ramp actual costs |
| **Spread Revenue** | 0.05-0.1% | Internal swap transactions |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm
- Expo CLI
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/pokopay.git
cd pokopay

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# XRPL
XRPL_NETWORK=testnet
XRPL_WALLET_SEED=your_wallet_seed

# RevenueCat
REVENUECAT_API_KEY=your_revenuecat_api_key
```

### Mobile App Development

```bash
# Navigate to merchant app
cd merchant-app

# Start Expo development server
npx expo start
```

---

## 📱 Mobile App Structure

The merchant app is built with Expo and includes:

- **Screens**: Payment, QR Display, History, Settings
- **UI Components**: Gluestack UI components
- **Navigation**: Tab-based navigation
- **State Management**: React Query + Zustand

### Key Features
- QR code generation and scanning
- Payment processing
- Transaction history
- Settings and configuration

---

## 🔧 Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

### Testing
- Unit tests with Vitest
- Component tests with Testing Library
- E2E tests with Playwright

### Deployment
- Mobile: Expo Application Services (EAS)
- Web: Vercel
- Backend: Supabase

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For support and questions:
- 📧 Email: support@pokopay.com
- 💬 Discord: [Join our community](https://discord.gg/pokopay)
- 📖 Documentation: [docs.pokopay.com](https://docs.pokopay.com)

---

**Made with ❤️ by the PokoPay Team**

