const { body, param, query } = require("express-validator");
const { startOfDay } = require("date-fns");
const jwt = require("jsonwebtoken");

const { validationCheck } = require("../middleware/validationCheck");
const { message, errorMessage } = require("../utility/message");
const Score = require("../model/score.model");
const User = require("../model/user.model");

exports.getGameToken = (req, res) => {
    const { seed, time } = req.body;
    const token = jwt.sign({ seed, time }, process.env.JWT_GAME_KEY);
    return res.status(200).send(message("Game token", { token }));
};

exports.create = async (req, res) => {
    const { username, gameID, time } = req.body;
    if (!(await User.exists({ username }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    await Score.create({
        username,
        gameID,
        time,
    });
    return res.status(200).send(message("Your score has been submitted!"));
};

// filter by game and day
const GAMES = ["nonogram", "minesweeper", "sudoku"];
const MAX_RESULTS = 25;

exports.getAllScores = async (req, res) => {
    const { game, page } = req.params;
    const { date } = req.query;
    const gameID = GAMES.indexOf(game);
    if (!(gameID >= 0 && gameID <= 2)) {
        return res.status(400).send(errorMessage("Invalid game name."));
    }
    const useDate = Boolean(date);
    const dateObject = new Date(date);
    // using .skip is not the best practice as it uses a cursor
    const scores = await Score.find(
        useDate
            ? {
                  gameID,
                  date: startOfDay(dateObject),
              }
            : {
                  gameID,
              },
        "-_id -gameID -__v"
    )
        .sort(
            useDate
                ? {
                      time: "asc",
                      date: "asc",
                  }
                : {
                      time: "asc",
                  }
        )
        .skip((page - 1) * MAX_RESULTS)
        .limit(MAX_RESULTS);
    return res
        .status(200)
        .send(message(`All ${game} scores, page ${page}`, { scores }));
};

exports.validateGetToken = [
    body("seed")
        .isString()
        .withMessage("Invalid data type.")
        .isHexadecimal()
        .withMessage("Seed is not hexadecimal.")
        .isLength({ min: 32, max: 32 })
        .withMessage("Seed is wrong length."),
    body("time").isInt({ gt: 0 }).withMessage("Invalid game time."),
    validationCheck,
];

exports.validateCreate = [
    body("username")
        .isString()
        .withMessage("Invalid data type.")
        .isLength({ min: 3, max: 16 })
        .withMessage("Username length has to be between 3 and 16 symbols.")
        .isAlphanumeric()
        .withMessage("Username can only contain symbols A-Z, a-z and 0-9."),
    body("gameID").isInt({ min: 0, max: 3 }).withMessage("Invalid game ID."),
    body("time").isInt().withMessage("Invalid data type."),
    validationCheck,
];

exports.validateRead = [
    param("page").isInt({ min: 1 }).withMessage("Invalid page number."),
    param("game")
        .isString()
        .withMessage("Invalid data type.")
        .isIn(GAMES)
        .withMessage("Invalid game name."),
    param("username")
        .optional()
        .isString()
        .withMessage("Invalid data type.")
        .isAlphanumeric()
        .withMessage("Username can only contain symbols A-Z, a-z and 0-9."),
    query("date")
        .optional()
        .isDate({ format: "YYYY-MM-DD", strictMode: true })
        .withMessage("Invalid date."),
    validationCheck,
];
