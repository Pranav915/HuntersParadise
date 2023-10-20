const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dataControllers = require("../controllers/data/mainControllers");

router.get("/categoryData", auth, dataControllers.controllers.categoryData);

module.exports = router;
