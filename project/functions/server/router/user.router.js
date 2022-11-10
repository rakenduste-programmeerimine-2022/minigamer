const express = require("express");
const { body, validationResult } = require("express-validator");

const controller = require("../controller/user.controller");
const { logError } = require("../../utility/log");

const router = express.Router();

router.use(
    body("username")
        .isString()
        .withMessage("Invalid data type.")
        .isLength({ min: 3, max: 16 })
        .withMessage("Username length has to be between 3 and 16 symbols.")
        .isAlphanumeric()
        .withMessage("Username can only contain symbols A-Z, a-z and 0-9."),
    body("password")
        .isString()
        .withMessage("Invalid data type.")
        .isLength({ min: 8 })
        .withMessage("Password needs to be at least 8 symbols long."),
    (req, res, next) => {
        const { errors } = validationResult(req);
        if (errors.length != 0) {
            let message = errors.reduce((total, current) => {
                return `${total}${current.msg}\n`;
            }, "");
            message = message.trim();
            return res.send(logError(message, false));
        }
        next();
    }
);
router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
