const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
    finishValidation,
    validateUsername,
    validatePassword,
} = require("../middleware/validation");
const { message, errorMessage } = require("../utility/message");
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
            process.env.JWT_USER_KEY
        );
        return res
            .status(200)
            .send(message("Account login successful!", { token }));
    });
};

exports.validate = [
    validateUsername("body"),
    validatePassword(),
    finishValidation,
];
