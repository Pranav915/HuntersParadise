const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const auctionControllers = require("../controllers/auction/mainControllers");

router.post("/createAuction", auth, auctionControllers.controllers.createAuction);
router.post("/startAuction", auth, auctionControllers.controllers.startAuction);

module.exports = router;
