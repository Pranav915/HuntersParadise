const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const auctionControllers = require("../controllers/auction/mainControllers");

router.post(
  "/createAuction",
  auth,
  auctionControllers.controllers.createAuction
);
router.post("/startAuction", auth, auctionControllers.controllers.startAuction);
router.post("/newBid", auth, auctionControllers.controllers.newBid);
router.post("/bidDone", auth, auctionControllers.controllers.bidDone);
router.post("/startProduct", auth, auctionControllers.controllers.startProduct);
router.get(
  "/getLiveAuctions",
  auth,
  auctionControllers.controllers.getLiveAuctions
);
router.get(
  "/getMyAuctions",
  auth,
  auctionControllers.controllers.getMyAuctions
);
router.get(
  "/getUpcomingAuctions",
  auth,
  auctionControllers.controllers.getUpcomingAuctions
);
router.get(
  "/getUpcomingAuctionDetails",
  auth,
  auctionControllers.controllers.getUpcomingAuctionDetails
);
router.get(
  "/getLiveAuctionDetails",
  auth,
  auctionControllers.controllers.getLiveAuctionDetails
);

module.exports = router;
