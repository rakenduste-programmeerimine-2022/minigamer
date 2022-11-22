const { body, param } = require("express-validator");

const { validationCheck } = require("../middleware/validationCheck");
const { message, errorMessage } = require("../utility/message");
const User = require("../model/user.model");
const Score = require("../model/score.model");

const games = ["nonogram", "minesweeper", "sudoku"];

exports.create = async (req, res) => {
    const { username, gameID, score } = req.body;
    if (!(await User.exists({ username }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    const dateObj = new Date();
    const date = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth()}-${dateObj.getUTCDate()}`;
    await Score.create({
        username,
        gameID,
        score,
        date,
    });
    return res.status(200).send(message("Your score has been submitted!"));
};

exports.getAllScores = async (req, res) => {
    const { game, page } = req.params;
    const scores = await Score.find();
    return res
        .status(200)
        .send(message(`All ${game} scores, page ${page}`, { scores }));
};

exports.validateCreate = [
    body("username")
        .isString()
        .withMessage("Invalid data type.")
        .isLength({ min: 3, max: 16 })
        .withMessage("Username length has to be between 3 and 16 symbols.")
        .isAlphanumeric()
        .withMessage("Username can only contain symbols A-Z, a-z and 0-9."),
    body("gameID").isInt({ min: 0, max: 3 }).withMessage("Invalid game ID."),
    body("score").isInt().withMessage("Invalid data type."),
    validationCheck,
];

exports.validateRead = [
    param("page").isInt({ min: 1 }).withMessage("Invalid page number."),
    param("game")
        .optional()
        .isString()
        .withMessage("Invalid data type.")
        .isIn(games)
        .withMessage("Invalid game name."),
    param("username")
        .optional()
        .isString()
        .withMessage("Invalid data type.")
        .isAlphanumeric()
        .withMessage("Username can only contain symbols A-Z, a-z and 0-9."),
    param("date")
        .optional()
        .isDate({ format: "YYYY-MM-DD", strictMode: true })
        .withMessage("Invalid date."),
    validationCheck,
];
