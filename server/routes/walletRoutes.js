const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const walletControllers = require("../controllers/wallet/mainControllers");

router.get("/getBalance",auth, walletControllers.controllers.getBalance);
router.post("/addFunds", auth, walletControllers.controllers.addFund);
router.post("/withdrawFunds", auth, walletControllers.controllers.withdrawFund);

module.exports = router;