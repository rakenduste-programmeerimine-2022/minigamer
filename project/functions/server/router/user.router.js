const express = require("express");

const controller = require("../controller/user.controller");
const database = require("../middleware/database");

const router = express.Router();

router.use(controller.validate, database.connect);

// .netlify/functions/server/user/register
// requires username (3-16 symbols alphanumeric) and password (at least 8 symbols) in body
// inserts username and hashed password to database
router.post("/register", controller.register);

// .netlify/functions/server/user/login
// requires username (3-16 symbols alphanumeric) and password (at least 8 symbols) in body
// returns user token if successful
router.post("/login", controller.login);

module.exports = router;
