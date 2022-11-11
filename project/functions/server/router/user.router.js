const express = require("express");

const controller = require("../controller/user.controller");

const router = express.Router();

router.use(controller.anyRequest);
router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
