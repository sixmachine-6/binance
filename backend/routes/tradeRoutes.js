const express = require("express");
const tradeController = require("../Controllers/tradeController");

const router = express.Router();

router.post("/execute", tradeController.executeTrade);

router.post("/portfolio", tradeController.getPortfolio);

module.exports = router;
