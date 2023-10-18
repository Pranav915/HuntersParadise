const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dealsControllers = require("../controllers/deals/mainControllers");

router.post("/createDeal", dealsControllers.controllers.createDeal);
router.get("/getmydeals", auth, dealsControllers.controllers.getDeals);
router.get("/getdeals/", auth, dealsControllers.controllers.getCategoryDeals);
router.post("/giveOffer", auth, dealsControllers.controllers.giveOffer);
router.post("/getMyOffers", auth, dealsControllers.controllers.getMyOffers);
router.post("/revokeOffer", auth, dealsControllers.controllers.revokeOffer);

module.exports = router;
