const express = require("express");

const controller = require("../controller/score.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();


// .netlify/functions/server/score/g/{GAME}/{PAGE}?date=YYYY-MM-DD
// {GAME} is either "nonogram", "flood" or "minesweeper"
// {PAGE} is integer, minimum 1
// date is optional
// returns scores sorted by score, date, 1 page should have 25 scores at most
router.get(
    "/g/:game/:page",
    controller.validate.get.allScores,
    database.connect,
    controller.getAllScores
);

// .netlify/functions/server/score/d/{DATE}/{PAGE}
// {DATE} is YYYY-MM-DD
// {PAGE} is integer, minimum 1
// returns daily challenge scores of that day
router.get(
    "/d/:date/:page",
    controller.validate.get.dailyScores,
    database.connect,
    controller.getDailyScores
);

// .netlify/functions/server/score/u/{USER}/following/{PAGE}?game={GAME}&date=YYYY-MM-DD
// {USER} is username
// {PAGE} is integer, minimum 1
// {GAME} is optional and either "nonogram", "flood" or "minesweeper"
// date is optional
// returns scores of users followed by {USER}
router.get(
    "/u/:username/following/:page",
    controller.validate.get.scoresByUser,
    database.connect,
    controller.getFolloweeScores
);

// .netlify/functions/server/score/u/{USER}/{PAGE}?game={GAME}&date=YYYY-MM-DD
// {USER} is username
// {PAGE} is integer, minimum 1
// {GAME} is optional and either "nonogram", "flood" or "minesweeper"
// date is optional
// returns scores made by {USER}
router.get(
    "/u/:username/:page",
    controller.validate.get.scoresByUser,
    database.connect,
    controller.getUserScores
);

// .netlify/functions/server/score/token
// body requires "game", "score"
// game is either "nonogram", "flood" or "minesweeper"
// score is integer and greater than 0
// returns game token used for submitting score
router.post(
    "/token",
    verification.onGameTokenRequest,
    controller.validate.post.token,
    controller.getGameToken
    );

// .netlify/functions/server/score/submit
// body requires "username", "gameID", "score"
// auth requires both user token and game token
// auth example: "Bearer {USERTOKEN}, Bearer {GAMETOKEN}"
// submits a score to the database
router.post(
    "/submit",
    verification.onScoreCreateRequest,
    controller.validate.post.score,
    database.connect,
    controller.create
);

module.exports = router;
