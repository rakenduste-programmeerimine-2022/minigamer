const express = require("express");

const controller = require("../controller/seed.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

// .netlify/functions/server/seed/random

// Returns random seed.
router.get("/random", controller.requests.getRandomSeed);

// .netlify/functions/server/seed/daily

// auth requires:
//  user token

// Returns daily seed.
router.get(
    "/daily",
    database.connect,
    verification.onDailyRequest,
    controller.requests.getDailySeed
);

// .netlify/functions/server/seed/next/{DATE}?before=true

// params require:
//  {DATE} - format YYYY-MM-DD
// query requires:
//  "before" - boolean, either "true" or "false"

// Returns next daily challenge document before or after given date (for leaderboard).
router.get(
    "/next/:date",
    controller.validate,
    database.connect,
    controller.requests.getPrecedingOrSucceeding
);

module.exports = router;
