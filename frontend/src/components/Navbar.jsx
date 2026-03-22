import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, ChevronDown, User, BarChart2, TrendingUp } from "lucide-react";

const allCoins = [
  { symbol: "BTCUSDT", name: "Bitcoin", base: "BTC", price: "$55,230", change: "+3.2%", up: true },
  { symbol: "ETHUSDT", name: "Ethereum", base: "ETH", price: "$3,412", change: "+1.8%", up: true },
  { symbol: "BNBUSDT", name: "BNB", base: "BNB", price: "$412", change: "-0.9%", up: false },
  { symbol: "SOLUSDT", name: "Solana", base: "SOL", price: "$142", change: "+5.1%", up: true },
  { symbol: "XRPUSDT", name: "XRP", base: "XRP", price: "$0.61", change: "-2.3%", up: false },
  { symbol: "ADAUSDT", name: "Cardano", base: "ADA", price: "$0.45", change: "+1.2%", up: true },
  { symbol: "DOGEUSDT", name: "Dogecoin", base: "DOGE", price: "$0.12", change: "+8.4%", up: true },
  { symbol: "MATICUSDT", name: "Polygon", base: "MATIC", price: "$0.88", change: "-1.5%", up: false },
  { symbol: "DOTUSDT", name: "Polkadot", base: "DOT", price: "$7.20", change: "+2.1%", up: true },
  { symbol: "LTCUSDT", name: "Litecoin", base: "LTC", price: "$92", change: "-0.4%", up: false },
  { symbol: "AVAXUSDT", name: "Avalanche", base: "AVAX", price: "$35", change: "+4.3%", up: true },
  { symbol: "LINKUSDT", name: "Chainlink", base: "LINK", price: "$14.50", change: "+3.7%", up: true },
];

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("_grecaptcha");

  const [marketsOpen, setMarketsOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const marketsRef = useRef(null);
  const tradeRef = useRef(null);
  const searchRef = useRef(null);

  const filteredCoins =
    searchQuery.trim() === ""
      ? allCoins.slice(0, 6)
      : allCoins.filter(
          (c) =>
            c.base.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );

  useEffect(() => {
    const handleClick = (e) => {
      if (marketsRef.current && !marketsRef.current.contains(e.target)) setMarketsOpen(false);
      if (tradeRef.current && !tradeRef.current.contains(e.target)) setTradeOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("_grecaptcha");
    navigate("/login");
  };

  const handleCoinClick = (symbol) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/trade/${symbol}`);
  };

  return (
    <div className="bg-[#1c242f] flex justify-between items-center h-28 px-6 relative z-50">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <span className="w-36">
          <img
            src="https://www.logo.wine/a/logo/Binance/Binance-Horizontal2-Dark-Background-Logo.wine.svg"
            alt="logo"
            className="w-full object-contain"
          />
        </span>

        <ul className="flex items-center gap-6 text-white text-lg font-semibold cursor-pointer relative">

          {/* Markets Dropdown */}
          <li ref={marketsRef} className="relative">
            <span
              className="flex items-center gap-1 hover:text-yellow-400"
              onClick={() => { setMarketsOpen(!marketsOpen); setTradeOpen(false); }}
            >
              Markets <ChevronDown size={18} className={`transition-transform ${marketsOpen ? "rotate-180" : ""}`} />
            </span>

            {marketsOpen && (
              <div className="absolute top-10 left-0 bg-[#1e2a38] border border-gray-700 rounded-xl shadow-2xl w-52 py-2 z-50">
                <Link
                  to="/markets"
                  onClick={() => setMarketsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#2a3a4d] text-white text-sm transition"
                >
                  <BarChart2 size={18} className="text-yellow-400" />
                  <div>
                    <p className="font-semibold">Market Overview</p>
                    <p className="text-gray-400 text-xs">Charts & trends</p>
                  </div>
                </Link>
              </div>
            )}
          </li>

          {/* Trade Dropdown */}
          <li ref={tradeRef} className="relative">
            <span
              className="flex items-center gap-1 hover:text-yellow-400"
              onClick={() => { setTradeOpen(!tradeOpen); setMarketsOpen(false); }}
            >
              Trade <ChevronDown size={18} className={`transition-transform ${tradeOpen ? "rotate-180" : ""}`} />
            </span>

            {tradeOpen && (
              <div className="absolute top-10 left-0 bg-[#1e2a38] border border-gray-700 rounded-xl shadow-2xl w-52 py-2 z-50">
                <Link
                  to="/futures"
                  onClick={() => setTradeOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#2a3a4d] text-white text-sm transition"
                >
                  <TrendingUp size={18} className="text-yellow-400" />
                  <div>
                    <p className="font-semibold">Futures</p>
                    <p className="text-gray-400 text-xs">USDⓈ-M Futures</p>
                  </div>
                </Link>
              </div>
            )}
          </li>

        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div ref={searchRef} className="relative">
          <Search
            className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          {searchOpen && (
            <div className="absolute top-10 right-0 bg-[#1e2a38] border border-gray-700 rounded-xl shadow-2xl w-80 z-50">

              {/* Search Input */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
                <Search size={16} className="text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search coins e.g. BTC, Ethereum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-500"
                />
                {searchQuery && (
                  <X
                    size={14}
                    className="text-gray-400 cursor-pointer hover:text-white"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>

              {/* Label */}
              <div className="px-4 pt-2 pb-1">
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  {searchQuery ? "Search Results" : "Popular Coins"}
                </p>
              </div>

              {/* Coins List */}
              <div className="max-h-72 overflow-y-auto pb-2">
                {filteredCoins.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">No coins found</p>
                ) : (
                  filteredCoins.map((coin) => (
                    <div
                      key={coin.symbol}
                      onClick={() => handleCoinClick(coin.symbol)}
                      className="flex items-center justify-between px-4 py-3 hover:bg-[#2a3a4d] transition cursor-pointer"
                    >
                      {/* Left: coin info */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black text-xs font-bold flex-shrink-0">
                          {coin.base.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">
                            {coin.base}
                            <span className="text-gray-500 font-normal">/USDT</span>
                          </p>
                          <p className="text-gray-400 text-xs">{coin.name}</p>
                        </div>
                      </div>

                      {/* Right: price & change */}
                      <div className="text-right">
                        <p className="text-white text-sm font-semibold">{coin.price}</p>
                        <p className={`text-xs font-semibold ${coin.up ? "text-green-400" : "text-red-400"}`}>
                          {coin.change}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {!user ? (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <User
              className="w-7 h-7 text-white cursor-pointer hover:text-yellow-400"
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
