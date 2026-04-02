const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  getUnreadCount,
  createNotification,
} = require("../Controllers/notificationController");

router.post("/create", createNotification);
router.post("/get", getNotifications);

router.get("/unread-count", getUnreadCount);

router.patch("/read/:id", markAsRead);

module.exports = router;
