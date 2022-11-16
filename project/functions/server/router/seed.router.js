const express = require("express");

const controller = require("../controller/seed.controller");
const verification = require("../middleware/verification");

const router = express.Router();

router.get("/random", controller.getRandom);
router.get("/daily", verification.onDailyRequest, controller.getDaily);

module.exports = router;
