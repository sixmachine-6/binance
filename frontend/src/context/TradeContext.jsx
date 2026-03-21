import { createContext, useContext, useReducer } from "react";

const TradeContext = createContext();

const initialState = {
  balance: 10000,
  positions: {},
};

function tradeReducer(state, action) {
  switch (action.type) {
    case "BUY": {
      const { symbol, price, amount } = action.payload;
      const cost = price * amount;

      if (cost > state.balance) return state;

      return {
        ...state,
        balance: state.balance - cost,
        positions: {
          ...state.positions,
          [symbol]: (state.positions[symbol] || 0) + amount,
        },
      };
    }

    case "SELL": {
      const { symbol, price, amount } = action.payload;

      if ((state.positions[symbol] || 0) < amount) return state;

      return {
        ...state,
        balance: state.balance + price * amount,
        positions: {
          ...state.positions,
          [symbol]: state.positions[symbol] - amount,
        },
      };
    }

    default:
      return state;
  }
}

export function TradeProvider({ children }) {
  const [state, dispatch] = useReducer(tradeReducer, initialState);

  const buy = (symbol, price, amount) => {
    dispatch({
      type: "BUY",
      payload: { symbol, price, amount },
    });
  };

  const sell = (symbol, price, amount) => {
    dispatch({
      type: "SELL",
      payload: { symbol, price, amount },
    });
  };

  return (
    <TradeContext.Provider value={{ ...state, buy, sell }}>
      {children}
    </TradeContext.Provider>
  );
}

export const useTrade = () => useContext(TradeContext);
