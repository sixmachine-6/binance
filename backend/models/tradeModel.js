const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  side: {
    type: String,
    enum: ["BUY", "SELL"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = tradeSchema;
