// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = 10;

exports.anyRequest = (req, res, next) => {
    console.log(`${req.method} USER REQUEST AT ${Date.now()}`);
    next();
};

exports.register = async (req, res) => {
    const name = req.body.name;
    const pass = req.body.pass;
    let hashPass;
    // bcrypt.hash(pass, saltRounds, async (err, hash) => {
    //     if (err) {
    //         console.log(err);
    //         res.end();
    //     }
    //     hashPass = hash;
    // });
    res.send({ name, pass, state: "Registered" });
};

exports.login = async (req, res) => {
    const name = req.body.name;
    const pass = req.body.pass;
    res.send({ name, state: "Logged in" });
};
