const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dealsControllers = require("../controllers/deals/mainControllers");

router.post("/createDeal", dealsControllers.controllers.createDeal);

module.exports = router;
