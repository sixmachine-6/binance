const admin = require("../firebaseAdmin");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

exports.createNotification = async (req, res) => {
  try {
    const { firebaseToken, message, type } = req.body;

    if (!firebaseToken) {
      return res.status(401).json({ message: "No Firebase token provided" });
    }

    // verify firebase token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const phoneNumber = decodedToken.phone_number;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = await Notification.create({
      userId: user._id,
      message,
      type: type || "TRADE_ALERT",
      isRead: false,
    });

    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(401).json({ message: "No Firebase token provided" });
    }

    // verify firebase token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const phoneNumber = decodedToken.phone_number;

    // find user by phone number
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // fetch notifications for that user
    const notifications = await Notification.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  await Notification.findByIdAndUpdate(id, {
    isRead: true,
  });

  res.json({ success: true });
};

exports.getUnreadCount = async (req, res) => {
  const userId = req.user._id;

  const count = await Notification.countDocuments({
    userId,
    isRead: false,
  });

  res.json({ count });
};
