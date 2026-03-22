// import { useMarketTicker } from "../../hooks/useMarketTicker";

// export default function PairHeader({ symbol }) {
//   const { data } = useMarketTicker(symbol);

//   if (!data) return null;

//   const coin = symbol.replace("USDT", "").toLowerCase();

//   return (
//     <div style={container}>
//       <div style={pairSection}>
//         <img
//           src={`https://cryptoicons.org/api/icon/${coin}/32`}
//           alt={coin}
//           style={{ width: 30 }}/>
//         <h2>{symbol}</h2>
//         <span>${Number(data.lastPrice).toFixed(2)}</span>
//         <span
//           style={{
//             color: data.priceChangePercent > 0 ? "#16c784" : "#ea3943",
//           }}
//         >
//           {Number(data.priceChangePercent).toFixed(2)}%
//         </span>
//       </div>
//       <div style={stats}>
//         <Stat label="24h High" value={Number(data.highPrice).toFixed(2)} />
//         <Stat label="24h Low" value={Number(data.lowPrice).toFixed(2)} />
//         <Stat label="Volume" value={Number(data.volume).toFixed(0)} />
//       </div>
//     </div>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <div>
//       <div style={{ opacity: 0.6 }}>{label}</div>
//       <div>{value}</div>
//     </div>
//   );
// }

// const container = {
//   display: "flex",
//   justifyContent: "space-between",
//   padding: "10px 20px",
//   borderBottom: "1px solid #1e1e1e",
// };

// const pairSection = {
//   display: "flex",
//   alignItems: "center",
//   gap: "12px",
// };

// const stats = {
//   display: "flex",
//   gap: "30px",
// };

import { useState } from "react";
import { useMarketTicker } from "../../hooks/useMarketTicker";

function CoinIcon({ symbol }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        background: "#2a2d3a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: "bold",
        color: "#aaa",
        flexShrink: 0,
      }}>
        {symbol.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/${symbol}.svg`}
      alt={symbol}
      style={{ width: 30, height: 30, flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}

export default function PairHeader({ symbol }) {
  const { data } = useMarketTicker(symbol);

  if (!data) return null;

  const coin = symbol
    .replace(/USDT$|BTC$|ETH$|BNB$/i, "")
    .toLowerCase();

  return (
    <div style={container}>
      <div style={pairSection}>
        <CoinIcon symbol={coin} />
        <h2 style={{ margin: 0, fontSize: "16px" }}>{symbol}</h2>
        <span style={{ fontSize: "16px" }}>
          ${Number(data.lastPrice).toFixed(2)}
        </span>
        <span style={{ color: data.priceChangePercent > 0 ? "#16c784" : "#ea3943" }}>
          {Number(data.priceChangePercent).toFixed(2)}%
        </span>
      </div>

      <div style={stats}>
        <Stat label="24h High" value={Number(data.highPrice).toFixed(2)} />
        <Stat label="24h Low"  value={Number(data.lowPrice).toFixed(2)}  />
        <Stat label="Volume"   value={Number(data.volume).toFixed(0)}    />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ opacity: 0.6, fontSize: "12px" }}>{label}</div>
      <div style={{ fontSize: "14px" }}>{value}</div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  borderBottom: "1px solid #1e1e1e",
};

const pairSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const stats = {
  display: "flex",
  gap: "30px",
};