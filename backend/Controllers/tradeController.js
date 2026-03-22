const User = require("../models/userModel");
const admin = require("../firebaseAdmin");
exports.executeTrade = async (req, res) => {
  try {
    const { firebaseToken, symbol, price, quantity, side } = req.body;
    console.log(req.body);
    if (!firebaseToken) {
      return res.status(400).json({
        message: "Firebase token required",
      });
    }

    // verify firebase token
    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const phoneNumber = decoded.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({
        message: "Invalid phone number",
      });
    }

    // find user
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const tradeValue = price * quantity;

    // BUY
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

    // SELL
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

    // save trade
    user.trades.push({
      symbol,
      price,
      quantity,
      side,
    });

    await user.save();

    res.status(200).json({
      status: "success",
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

exports.getPortfolio = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const phoneNumber = decoded.phone_number;

    const user = await User.findOne({ phoneNumber });

    res.status(200).json({
      balance: user.balance,
      positions: user.positions,
      trades: user.trades,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
