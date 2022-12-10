const express = require("express");

const controller = require("../controller/user.controller");
const database = require("../middleware/database");

const router = express.Router();

// .netlify/functions/server/user/register

// body requires:
//  username - 3-16 symbols, alphanumeric
//  password - at least 8 symbols

// Inserts username and hashed password to database.
router.post(
    "/register",
    controller.validate.post,
    database.connect,
    controller.requests.register
);

// .netlify/functions/server/user/login

// body requires:
//  username - 3-16 symbols, alphanumeric
//  password - at least 8 symbols

// Returns user token if successful.
router.post(
    "/login",
    controller.validate.post,
    database.connect,
    controller.requests.login
);

// .netlify/functions/server/user/profile/{USER}

// params require:
//  {USER} - username

// Returns the users who follow and are followed by {USER}.
router.get(
    "/profile/:username",
    controller.validate.get,
    database.connect,
    controller.requests.profile
)

module.exports = router;
