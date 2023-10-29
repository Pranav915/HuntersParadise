const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const auctionControllers = require("../controllers/auction/mainControllers");

router.post("/createAuction",auth, auctionControllers.controllers.createAuction);
router.post("/startAuction", auth, auctionControllers.controllers.startAuction);
router.post("/newBid", auth, auctionControllers.controllers.newBid);
router.post("/bidDone", auth, auctionControllers.controllers.bidDone);
router.get("/getDetails", auth, auctionControllers.controllers.getDetails);

module.exports = router;
