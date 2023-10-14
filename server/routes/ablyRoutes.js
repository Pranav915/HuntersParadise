const express = require("express");
const router = express.Router();
const ablyControllers = require("../controllers/ably/ablyControllers");

router.get("/auth", ablyControllers.controllers.createAuthToken);

module.exports = router;
