const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../model/user.model");
const { messageJSON, errorJSON } = require("../../utility/log");

const ROUNDS = 10;

exports.anyRequest = (req, res, next) => {
    let { username, password } = req.body;
    if (username == null || password == null) {
        return res.send(messageJSON("Missing username and/or password."));
    }
    req.body.username = username.toString();
    req.body.password = password.toString();
    next();
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    // unique field in schema should already prevent duplicates?
    if (await User.exists({ username })) {
        return res.send(messageJSON("User already exists."));
    }
    let user;
    bcrypt.hash(password, ROUNDS, async (error, hash) => {
        if (error) {
            return res.send(errorJSON(error));
        }
        user = await User.create({ username, password: hash });
    });
    return res.send(messageJSON("Account registration successful!"));
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.send(messageJSON("User does not exist."));
    }
    bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
            return res.send(errorJSON(error));
        }
        if (!result) {
            return res.send(messageJSON("Wrong password."));
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
        return res.send({ token });
    });
};
