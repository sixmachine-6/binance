const User = require("../models/userModel");
const admin = require("../firebaseAdmin");

exports.executeTrade = async (req, res) => {
  try {
    const { firebaseToken, symbol, price, quantity, side } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({
        message: "Firebase token required",
      });
    }

    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const phoneNumber = decoded.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({
        message: "Invalid phone number",
      });
    }

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const tradeValue = price * quantity;

    if (side === "BUY") {
      if (user.balance < tradeValue) {
        return res.status(400).json({
          message: "Insufficient balance",
        });
      }

      user.balance -= tradeValue;

      const current = user.positions.get(symbol) || 0;
      user.positions.set(symbol, current + quantity);
    }

    if (side === "SELL") {
      const current = user.positions.get(symbol) || 0;

      if (current < quantity) {
        return res.status(400).json({
          message: "Not enough holdings",
        });
      }

      user.balance += tradeValue;

      user.positions.set(symbol, current - quantity);
    }

    user.trades.push({
      symbol,
      price,
      quantity,
      side,
      email: user.email,
    });

    await user.save();

    res.status(200).json({
      status: "success",
      email: user.email,
      balance: user.balance,
      positions: user.positions,
      trades: user.trades,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const axios = require("axios");

exports.getPortfolio = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const phoneNumber = decoded.phone_number;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Convert Map → Object
    const positions = Object.fromEntries(user.positions || new Map());
    const symbols = Object.keys(positions);

    let prices = {};

    if (symbols.length > 0) {
      const responses = await Promise.all(
        symbols.map((symbol) =>
          axios.get(
            `https://data-api.binance.vision/api/v3/ticker/price?symbol=${symbol}`,
          ),
        ),
      );

      responses.forEach((r, i) => {
        prices[symbols[i]] = Number(r.data.price);
      });
    }

    res.status(200).json({
      balance: user.balance || 0,
      positions,
      trades: user.trades || [],
      prices,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
