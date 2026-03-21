import { TextAlignCenter } from "lucide-react";
import { Link } from "react-router-dom";
import "./MarketCard.css";
export default function MarketCard({ title, coins }) {
  return (
    <div style={card}>
      <h3 className="text-center text-white text-lg mb-2">{title}</h3>

      <div style={header}>
        <span>Name</span>
        <span>Price</span>
        <span>24h Change</span>
      </div>

      <div className="coin-list" style={list}>
        {coins.map((coin) => {
          const change = Number(coin.priceChangePercent).toFixed(2);

          const coinSymbol = coin.symbol
            .replace(/USDT$|BTC$|ETH$|BNB$/i, "")
            .toLowerCase();

          const iconSources = [
            `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/${coinSymbol}.svg`,
            `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/white/${coinSymbol}.svg`,
            `https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coinSymbol}.png`,
          ];
          return (
            <Link key={coin.symbol} to={`/trade/${coin.symbol}`} style={link}>
              <div style={row}>
                <div style={nameSection}>
                  <img
                    src={iconSources[0]}
                    alt={coinSymbol}
                    style={icon}
                    onError={(e) => {
                      const sources = iconSources;
                      const currentIndex = sources.indexOf(e.target.src);
                      if (currentIndex < sources.length - 1) {
                        e.target.src = sources[currentIndex + 1]; // try next source
                      } else {
                        e.target.src = `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/generic.svg`;
                      }
                    }}
                  />
                  <span>
                    {coin.symbol}
                  </span>
                </div>

                <span>${Number(coin.lastPrice).toFixed(4)}</span>

                <span
                  style={{
                    color: change > 0 ? "#16c784" : "#ea3943",
                  }}
                >
                  {change}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const card = {
  background: "#0f1116",
  padding: "20px",
  borderRadius: "4px",
  width: "350px",
  color: "white",
  height: "100%",
  minHeight: "560px",
  overflow: "hidden",
};

const list = {
  maxHeight: "520px",
  overflowY: "auto",
  overflowX: "hidden",
};

const header = {
  color: "#FFF",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  opacity: 0.6,
  marginBottom: "10px",
  padding: "0 10px",
};

const row = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #1e1e1e",
  alignItems: "center",
};

const nameSection = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const icon = {
  width: "20px",
  height: "20px",
};

const link = {
  textDecoration: "none",
  color: "inherit",
};


