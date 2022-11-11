const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { validationCheck } = require("../middleware/validationCheck");
const { message, errorMessage } = require("../utility/message");
const { body } = require("express-validator");
const User = require("../model/user.model");

const ROUNDS = 10;

exports.register = async (req, res) => {
    const { username, password } = req.body;
    // unique field in schema should already prevent duplicates?
    if (await User.exists({ username })) {
        return res.status(400).send(errorMessage("User already exists."));
    }
    bcrypt.hash(password, ROUNDS, async (error, hash) => {
        if (error) {
            return res.status(500).send(errorMessage(error, true));
        }
        await User.create({ username, password: hash });
    });
    return res.status(201).send(message("Account registration successful!"));
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
            return res.status(500).send(errorMessage(error, true));
        }
        if (!result) {
            return res.status(400).send(errorMessage("Wrong password."));
        }
        const token = jwt.sign(
            { username, id: user._id },
            process.env.JWT_SECRET_KEY
        );
        return res
            .status(200)
            .send(message("Account login successful!", { token }));
    });
};

exports.validate = [
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
    validationCheck,
];
