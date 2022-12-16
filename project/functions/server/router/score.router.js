const express = require("express");

const controller = require("../controller/score.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

// .netlify/functions/server/score/g/{GAME}/{PAGE}?date=YYYY-MM-DD

// params require:
//  {GAME} - either "nonogram", "flood" or "minesweeper"
//  {PAGE} - integer, minimum 1
// query requires:
//  "date" - optional, format YYYY-MM-DD

// Returns scores sorted by game, score, date.
router.get(
    "/g/:game/:page",
    controller.validate.get.allScores,
    database.connect,
    controller.requests.getAllScores
);

// .netlify/functions/server/score/d/{DATE}/{PAGE}

// params require:
//  {DATE} - format YYYY-MM-DD
//  {PAGE} - integer, minimum 1

// Returns daily challenge scores of that day.
router.get(
    "/d/:date/:page",
    controller.validate.get.dailyScores,
    database.connect,
    controller.requests.getDailyScores
);

// .netlify/functions/server/score/u/{USER}/following/{PAGE}?game={GAME}&date=YYYY-MM-DD

// params require:
//  {USER} - username
//  {PAGE} - integer, minimum 1
// query requires:
//  {GAME} - optional, either "nonogram", "flood" or "minesweeper"
//  "date" - optional, format YYYY-MM-DD

// Returns scores of users followed by {USER}.
router.get(
    "/u/:username/following/:page",
    controller.validate.get.scoresByUser,
    database.connect,
    controller.requests.getFolloweeScores
);

// .netlify/functions/server/score/u/{USER}/{PAGE}?game={GAME}&date=YYYY-MM-DD

// params require:
//  {USER} - username
//  {PAGE} - integer, minimum 1
// query requires:
//  {GAME} - optional, either "nonogram", "flood" or "minesweeper"
//  "date" - optional

// Returns scores made by {USER}.
router.get(
    "/u/:username/:page",
    controller.validate.get.scoresByUser,
    database.connect,
    controller.requests.getUserScores
);

// .netlify/functions/server/score/token

// body requires:
//  "game" - either "nonogram", "flood" or "minesweeper"
//  "score" - integer and greater than 0
// auth requires:
//  user token

// Returns game token used for submitting score.
router.post(
    "/token",
    verification.onGameTokenRequest,
    controller.validate.post.token,
    controller.requests.getGameToken
);

// .netlify/functions/server/score/submit

// body requires:
//  "username"
//  "gameID" - integer and between 0 and 3
//  "score" - integer and greater than 0
// auth requires:
//  user token
//  game token
// auth example: "Bearer {USERTOKEN}, Bearer {GAMETOKEN}"

// Submits a score to the database.
router.post(
    "/submit",
    verification.onScoreCreateRequest,
    controller.validate.post.score,
    database.connect,
    controller.requests.submit
);

module.exports = router;
