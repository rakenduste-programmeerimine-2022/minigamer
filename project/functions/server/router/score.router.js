const express = require("express");

const controller = require("../controller/score.controller");
const verification = require("../middleware/verification");

const router = express.Router();

router.post(
    "/submit",
    verification.onScoreRequest,
    controller.validateCreate,
    controller.create
);
router.get("/:game/:page", controller.validateRead, controller.getAllScores);
// router.get("/daily/:date/:page", controller.getDailyScores)
// router.get("/followed/:username/:page", controller.getFolloweeScores)
// router.get("/user/:username/:page", controller.getUserScores)

module.exports = router;
