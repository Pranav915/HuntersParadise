const express = require("express");
const router = express.Router();
const auctionControllers = require("../controllers/auction/createAuction");

router.post("/createAuction", auctionControllers.controllers.createAuction);

module.exports = router;
