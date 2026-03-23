import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_TRADE;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
console.log(SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY);
export const sendTradeEmail = async (data) => {
  console.log(data);
  try {
    const isBuy = data.type_currency.toLowerCase() === "buy";

    const fullMessage = `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color:${isBuy ? "green" : "red"};">
          ${isBuy ? "🟢 Trade Executed: BUY" : "🔴 Trade Executed: SELL"}
        </h2>

        <p>Your trade has been successfully executed. Here are the details:</p>

        <table style="border-collapse: collapse;">
          <tr>
            <td><b>Crypto:</b></td>
            <td>${data.crypto_symbol}</td>
          </tr>

          <tr>
            <td><b>Type:</b></td>
            <td>${data.type_currency.toUpperCase()}</td>
          </tr>

          <tr>
            <td><b>Price:</b></td>
            <td>$${data.price}</td>
          </tr>

          <tr>
            <td><b>Quantity:</b></td>
            <td>${data.quantity}</td>
          </tr>

          <tr>
            <td><b>Total Value:</b></td>
            <td>$${(data.price * data.quantity).toFixed(2)}</td>
          </tr>

          <tr>
            <td><b>Time:</b></td>
            <td>${new Date().toLocaleString()}</td>
          </tr>
        </table>

        <br/>

        <p>
          ${
            isBuy
              ? "You have successfully purchased the asset. Keep an eye on the market 📈"
              : "You have successfully sold the asset. Monitor your profits 📉"
          }
        </p>

        <hr/>

        <p style="font-size:12px; color:gray;">
          This is an automated message. Please do not reply.
        </p>
      </div>
    `;

    const templateParameters = {
      message: fullMessage,
      email: data.email,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParameters,
      PUBLIC_KEY,
    );

    console.log("Trade email sent:", response.status);
  } catch (error) {
    console.error("Trade email failed:", error);
  }
};
