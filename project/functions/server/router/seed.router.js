const express = require("express");

const controller = require("../controller/seed.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

router.get("/random", controller.getRandom);
router.get(
    "/daily",
    database.connect,
    verification.onDailyRequest,
    controller.getDaily
);

module.exports = router;
