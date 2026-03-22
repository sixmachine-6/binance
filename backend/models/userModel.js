const mongoose = require("mongoose");
const Trade = require("./tradeModel");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  balance: {
    type: Number,
    default: 10000,
  },

  // add positions
  positions: {
    type: Map,
    of: Number,
    default: {},
  },

  trades: [Trade],

  watchlist: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
