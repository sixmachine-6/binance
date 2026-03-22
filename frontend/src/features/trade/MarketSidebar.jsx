<<<<<<< HEAD
=======
// // import { useQuery } from "@tanstack/react-query";
// // import { Link } from "react-router-dom";

// // const fetchMarkets = async () => {
// //   const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
// //   const data = await res.json();

// //   return data.filter((c) => c.symbol.endsWith("USDT")).slice(0, 10);
// // };

// // export default function MarketSidebar() {
// //   const { data = [] } = useQuery({
// //     queryKey: ["markets"],
// //     queryFn: fetchMarkets,
// //     refetchInterval: 1000,
// //   });

// //   return (
// //     <div style={container}>
// //       <div style={header}>
// //         <span>Pair</span>
// //         <span>Last Price</span>
// //         <span>24h Chg</span>
// //       </div>

// //       <div style={list}>
// //         {data.map((c) => {
// //           const coin = c.symbol.replace("USDT", "").toLowerCase();

// //           const change = Number(c.priceChangePercent).toFixed(2);

// //           return (
// //             <Link key={c.symbol} to={`/trade/${c.symbol}`} style={link}>
// //               <div style={row}>
// //                 <div style={pair}>
// //                   {/* <img
// //                     src={`https://cryptoicons.org/api/icon/${coin}/20`}
// //                     alt={coin}
// //                     style={{ marginRight: 6 }}
// //                   /> */}

// //                   {c.symbol}
// //                 </div>

// //                 <span>{Number(c.lastPrice).toFixed(3)}</span>

// //                 <span
// //                   style={{
// //                     color: change > 0 ? "#16c784" : "#ea3943",
// //                   }}
// //                 >
// //                   {change}%
// //                 </span>
// //               </div>
// //             </Link>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // const container = {
// //   padding: "10px",
// //   borderLeft: "1px solid #1e1e1e",
// //   display: "flex",
// //   flexDirection: "column",
// //   height: "100%",
// // };

// // const header = {
// //   display: "grid",
// //   gridTemplateColumns: "1fr 1fr 1fr",
// //   opacity: 0.6,
// //   marginBottom: 6,
// // };

// // const list = {
// //   overflowY: "auto",
// //   flex: 1,
// // };

// // const row = {
// //   display: "grid",
// //   gridTemplateColumns: "1fr 1fr 1fr",
// //   padding: "6px 0",
// //   fontSize: "13px",
// // };

// // const pair = {
// //   display: "flex",
// //   alignItems: "center",
// // };

// // const link = {
// //   textDecoration: "none",
// //   color: "white",
// // };
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";

// const fetchMarkets = async () => {
//   const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
//   const data = await res.json();

//   return data.filter((c) => c.symbol.endsWith("USDT")).slice(0, 10);
// };

// export default function MarketSidebar() {
//   const { data = [] } = useQuery({
//     queryKey: ["markets"],
//     queryFn: fetchMarkets,
//     refetchInterval: 1000,
//   });

//   return (
//     <div style={container}>
//       <div style={header}>
//         <span>Pair</span>
//         <span>Last Price</span>
//         <span>24h Chg</span>
//       </div>
//       <div style={list}>
//         {data.map((c) => {
//           const coin = c.symbol.replace("USDT", "").toLowerCase();
//           const change = Number(c.priceChangePercent).toFixed(2);
//           return (
//             <Link key={c.symbol} to={`/trade/${c.symbol}`} style={link}>
//               <div style={row}>
//                 <div style={pair}>
//                   {/* <img
//                     src={`https://cryptoicons.org/api/icon/${coin}/20`}
//                     alt={coin}
//                     style={{ marginRight: 6 }}
//                   /> */}
//                   {c.symbol}
//                 </div>
//                 <span>{Number(c.lastPrice).toFixed(3)}</span>
//                 <span
//                   style={{
//                     color: change > 0 ? "#16c784" : "#ea3943",
//                   }}
//                 >
//                   {change}%
//                 </span>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// const container = {
//   padding: "10px",
//   borderLeft: "1px solid #1e1e1e",
//   display: "flex",
//   flexDirection: "column",
//   height: "100%",
// };

// const header = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr 1fr",
//   opacity: 0.6,
//   marginBottom: 6,
// };

// const list = {
//   overflowY: "auto",
//   flex: 1,
// };

// const row = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr 1fr",
//   padding: "6px 0",
//   fontSize: "13px",
// };

// const pair = {
//   display: "flex",
//   alignItems: "center",
// };

// const link = {
//   textDecoration: "none",
//   color: "white",
// };
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchMarkets = async () => {
  const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
  const data = await res.json();
<<<<<<< HEAD

=======
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
  return data.filter((c) => c.symbol.endsWith("USDT")).slice(0, 10);
};

export default function MarketSidebar() {
  const { data = [] } = useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
    refetchInterval: 1000,
  });

  return (
<<<<<<< HEAD
    <div style={container}>
      <div style={header}>
=======
    <div className="flex flex-col h-full p-4 border-l border-gray-800 bg-[#0f1116] text-white">
      <div className="grid grid-cols-3 text-gray-400 text-xs mb-2">
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
        <span>Pair</span>
        <span>Last Price</span>
        <span>24h Chg</span>
      </div>

<<<<<<< HEAD
      <div style={list}>
        {data.map((c) => {
          const coin = c.symbol.replace("USDT", "").toLowerCase();

          const change = Number(c.priceChangePercent).toFixed(2);

          return (
            <Link key={c.symbol} to={`/trade/${c.symbol}`} style={link}>
              <div style={row}>
                <div style={pair}>
                  {/* <img
                    src={`https://cryptoicons.org/api/icon/${coin}/20`}
                    alt={coin}
                    style={{ marginRight: 6 }}
                  /> */}

                  {c.symbol}
                </div>

                <span>{Number(c.lastPrice).toFixed(3)}</span>

                <span
                  style={{
                    color: change > 0 ? "#16c784" : "#ea3943",
                  }}
                >
=======
      <div className="flex-1 overflow-y-auto space-y-[2px]">
        {data.map((c) => {
          const coin = c.symbol.replace("USDT", "").toLowerCase();
          const change = Number(c.priceChangePercent).toFixed(2);

          return (
            <Link key={c.symbol} to={`/trade/${c.symbol}`}>
              <div className="grid grid-cols-3 items-center text-xs py-[2px] hover:bg-gray-800 rounded px-1">
                <div className="flex items-center gap-2">
                  {/* Optional coin icon */}
                  {/* <img
                    src={`https://cryptoicons.org/api/icon/${coin}/20`}
                    alt={coin}
                    className="w-4 h-4"
                  /> */}
                  <span>{c.symbol}</span>
                </div>

                <span className="text-gray-300">{Number(c.lastPrice).toFixed(3)}</span>

                <span className={change > 0 ? "text-[#16c784]" : "text-[#ea3943]"}>
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
                  {change}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
<<<<<<< HEAD
}

const container = {
  padding: "10px",
  borderLeft: "1px solid #1e1e1e",
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  opacity: 0.6,
  marginBottom: 6,
};

const list = {
  overflowY: "auto",
  flex: 1,
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "6px 0",
  fontSize: "13px",
};

const pair = {
  display: "flex",
  alignItems: "center",
};

const link = {
  textDecoration: "none",
  color: "white",
};
=======
}
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
