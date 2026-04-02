# 🪙 Binance Clone — Hackathon Project

A full-stack crypto trading platform built during a hackathon, inspired by Binance. Features real-time trading charts, market overview, portfolio tracking, and more.

---

## 🚀 Features

- 📈 **Live Trading Chart** — Real-time candlestick, bar, and line charts powered by Lightweight Charts + Binance API
- 🌍 **Market Overview** — Live crypto price charts for BTC, ETH, BNB and more
- 💼 **Portfolio** — Track your holdings and performance
- 👁️ **Watchlist** — Save and monitor your favourite crypto pairs
- 🔐 **Login / Signup** — User authentication with protected routes
- ⚡ **Futures Trading** — Place buy/sell orders with leverage up to 125x
- 📧 **Email Notifications** — Trade and account notifications via EmailJS

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Router DOM
- TanStack React Query
- Lightweight Charts
- Lucide React Icons
- EmailJS — Email notifications

### Backend
- Node.js
- Express.js

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone -b ui https://github.com/sixmachine-6/binance.git
cd binance
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend
```bash
cd backend
npm install
npm start
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 📁 Project Structure

```
binance/
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   └── trade/
│   │   │       ├── Chart.jsx
│   │   │       ├── OrderBook.jsx
│   │   │       ├── TradePanel.jsx
│   │   │       ├── MarketTrades.jsx
│   │   │       └── MarketSidebar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Trade.jsx
│   │   │   ├── Markets.jsx
│   │   │   ├── Futures.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Watchlist.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── ui/
│   │   │   ├── Navbar.jsx
│   │   │   ├── AppLayout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── App.jsx
└── backend/
    └── ...
```

---

## 🔑 Environment Variables

Create a `.env` file in the frontend folder:
```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 👥 Team

Built with ❤️ during a hackathon by **Team sixmachine-6**

---

## 📄 License

This project is for educational/hackathon purposes only and is not affiliated with Binance.
