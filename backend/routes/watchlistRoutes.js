const express = require("express");
const watchlistController = require("../Controllers/watchlistController");

const router = express.Router();

router.post("/get", watchlistController.getWatchlist);
router.post("/add", watchlistController.addToWatchlist);
router.post("/remove", watchlistController.removeFromWatchlist);

module.exports = router;
