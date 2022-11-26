const express = require("express");

const controller = require("../controller/seed.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

// .netlify/functions/server/seed/random
// returns random seed
router.get("/random", controller.getRandom);

// .netlify/functions/server/seed/daily
// returns daily seed
// requires user token as auth
router.get(
    "/daily",
    database.connect,
    verification.onDailyRequest,
    controller.getDaily
);

module.exports = router;
