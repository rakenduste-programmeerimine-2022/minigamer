const { validationResult, body, param, query } = require("express-validator");
const { errorMessage } = require("../utility/message");

const FUNCTIONS = {
    body,
    param,
    query,
};
const GAMES = ["nonogram", "minesweeper", "flood"];

exports.validateUsername = (fn, param = "username") => {
    return FUNCTIONS[fn](param)
        .isString()
        .withMessage("Invalid data type.")
        .isLength({ min: 3, max: 16 })
        .withMessage("Username length has to be between 3 and 16 symbols.")
        .isAlphanumeric()
        .withMessage("Username can only contain symbols A-Z, a-z and 0-9.");
};

exports.validateGame = (fn) => {
    return FUNCTIONS[fn]("game")
        .isString()
        .withMessage("Invalid data type.")
        .isIn(GAMES)
        .withMessage("Invalid game name.");
};

exports.validateDate = (fn) => {
    return FUNCTIONS[fn]("date")
        .isDate({ format: "YYYY-MM-DD", strictMode: true })
        .withMessage("Invalid date.");
};

exports.validatePassword = () => {
    return body("password")
        .isString()
        .withMessage("Invalid data type.")
        .isLength({ min: 8 })
        .withMessage("Password needs to be at least 8 symbols long.");
};

// exports.validateSeed = () => {
//     return body("seed")
//         .isString()
//         .withMessage("Invalid data type.")
//         .isHexadecimal()
//         .withMessage("Seed is not hexadecimal.")
//         .isLength({ min: 32, max: 32 })
//         .withMessage("Seed is wrong length.");
// };

exports.validateScore = () => {
    return body("score").isInt({ gt: 0 }).withMessage("Invalid game score.");
};

exports.validateGameID = () => {
    return body("gameID")
        .isInt({ min: 0, max: 3 })
        .withMessage("Invalid game ID.");
};

exports.validatePage = () => {
    return param("page").isInt({ min: 1 }).withMessage("Invalid page number.");
};

exports.finishValidation = (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length != 0) {
        let message = errors.reduce((total, current) => {
            return `${total}${current.msg}\n`;
        }, "");
        message = message.trim();
        return res.status(400).send(errorMessage(message));
    }
    next();
};
