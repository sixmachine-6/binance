import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { executeTrade } from "../services/apiTrade";
import { sendTradeEmail } from "../utils/sendTradeEmail";

export function useExecuteTrade() {
  return useMutation({
    mutationFn: executeTrade,

    onSuccess: (data, variables) => {
      const email = data.email;

      // send email only if backend returned email
      if (email) {
        sendTradeEmail({
          crypto_symbol: variables.symbol,
          price: variables.price,
          quantity: variables.quantity,
          type_currency: variables.side === "BUY" ? "buy" : "sell",
          email: email,
        });
      }

      toast.success("Trade executed successfully and email sent");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });
}
