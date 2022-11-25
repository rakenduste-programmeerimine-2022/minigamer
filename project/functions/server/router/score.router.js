const express = require("express");

const controller = require("../controller/score.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

router.get(
    "/:game/:page",
    controller.validateRead,
    database.connect,
    controller.getAllScores
);
router.post(
    "/submit",
    verification.onScoreCreateRequest,
    controller.validateCreate,
    database.connect,
    controller.create
);
router.post("/token", controller.validateGetToken, controller.getGameToken);

// router.get("/daily/:date/:page", controller.getDailyScores)
// router.get("/followed/:username/:page", controller.getFolloweeScores)
// router.get("/user/:username/:page", controller.getUserScores)

module.exports = router;
