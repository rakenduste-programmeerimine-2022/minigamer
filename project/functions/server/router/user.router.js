const express = require("express");

const controller = require("../controller/user.controller");
const database = require("../middleware/database");

const router = express.Router();

router.use(controller.validate, database.connect);
router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
