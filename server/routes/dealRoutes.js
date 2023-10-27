const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dealsControllers = require("../controllers/deals/mainControllers");

router.post("/createDeal", dealsControllers.controllers.createDeal);
router.get("/getmydeals", auth, dealsControllers.controllers.getDeals);
router.get("/getdeals/", auth, dealsControllers.controllers.getCategoryDeals);
router.post("/giveOffer", auth, dealsControllers.controllers.giveOffer);
router.get("/getMyOffers", auth, dealsControllers.controllers.getMyOffers);
router.post("/revokeOffer", auth, dealsControllers.controllers.revokeOffer);
router.post("/editOffer", auth, dealsControllers.controllers.editOffer);
router.post("/negotiate", auth, dealsControllers.controllers.negotiateDeal);
router.post("/completeDeal", auth, dealsControllers.controllers.completeDeal);
router.get("/getDealDetails", auth, dealsControllers.controllers.getDealDetails);

module.exports = router;
