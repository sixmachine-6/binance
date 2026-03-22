const mongoose = require("mongoose");
<<<<<<< HEAD
const bcrypt = require("bcryptjs");
=======
const Trade = require("./tradeModel");
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
<<<<<<< HEAD
=======

>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
  createdAt: {
    type: Date,
    default: Date.now,
  },
<<<<<<< HEAD
});

// Ensure either email OR phoneNumber is provide
=======

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

>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
const User = mongoose.model("User", userSchema);

module.exports = User;
