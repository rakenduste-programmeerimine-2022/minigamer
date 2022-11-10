const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../model/user.model");
const { log, logError } = require("../../utility/log");

const ROUNDS = 10;

exports.register = async (req, res) => {
    const { username, password } = req.body;
    // unique field in schema should already prevent duplicates?
    if (await User.exists({ username })) {
        return res.send(logError("User already exists."));
    }
    let user;
    bcrypt.hash(password, ROUNDS, async (error, hash) => {
        if (error) {
            return res.send(logError(error, true));
        }
        user = await User.create({ username, password: hash });
    });
    return res.send(log("Account registration successful!"));
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.send(logError("User does not exist."));
    }
    bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
            return res.send(logError(error, true));
        }
        if (!result) {
            return res.send(logError("Wrong password."));
        }
        const token = jwt.sign(
            { username, id: user._id },
            process.env.JWT_SECRET_KEY
        );
        return res.send(log("Account login successful!", { token }));
    });
};
