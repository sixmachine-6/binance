const admin = require("../firebaseAdmin");
const User = require("../models/userModel");

exports.getWatchlist = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const user = await User.findOne({
      phoneNumber: decoded.phone_number,
    });

    res.json({
      watchlist: user.watchlist,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const { firebaseToken, symbol } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const user = await User.findOne({
      phoneNumber: decoded.phone_number,
    });

    if (!user.watchlist.includes(symbol)) {
      user.watchlist.push(symbol);
    }

    await user.save();

    res.json({
      watchlist: user.watchlist,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { firebaseToken, symbol } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const user = await User.findOne({
      phoneNumber: decoded.phone_number,
    });

    user.watchlist = user.watchlist.filter((s) => s !== symbol);

    await user.save();

    res.json({
      watchlist: user.watchlist,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
