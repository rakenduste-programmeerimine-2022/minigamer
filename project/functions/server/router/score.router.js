const express = require("express");

const controller = require("../controller/score.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

// .netlify/functions/server/score/{GAME}/{PAGE}?date=YYYY-MM-DD
// {GAME} is either "nonogram", "sudoku" or "minesweeper"
// {PAGE} is integer, minimum 1
// date is optional
// returns scores sorted by time spent on game, date, 1 page should have 25 scores at most
router.get(
    "/:game/:page",
    controller.validateRead,
    database.connect,
    controller.getAllScores
);

// .netlify/functions/server/score/submit
// body requires "username", "gameID", "time" and "seed"
// auth requires both user token and game token
// auth example: "Bearer {USERTOKEN}, Bearer {GAMETOKEN}"
// submits a score to the database
router.post(
    "/submit",
    verification.onScoreCreateRequest,
    controller.validateCreate,
    database.connect,
    controller.create
);

// .netlify/functions/server/score/token
// body requires "seed" and "time"
// seed is hexadecimal string with 32 symbols
// time is integer and greater than 0
// returns game token used for submitting score
router.post("/token", verification.onGameTokenRequest, controller.validateGetToken, controller.getGameToken);

// router.get("/daily/:date/:page", controller.getDailyScores)
// router.get("/:username/:page", controller.getUserScores)
// router.get("/:username/following/:page", controller.getFolloweeScores)

module.exports = router;
