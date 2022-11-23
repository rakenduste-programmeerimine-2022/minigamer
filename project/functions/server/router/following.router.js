const express = require("express");

const controller = require("../controller/following.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

router.use(controller.validate, database.connect);
router.get("/following/:username?", controller.getFollowees);
router.get("/followers/:username?", controller.getFollowers);
router.post("/follow", verification.onFollowRequest, controller.create);
router.delete("/follow", verification.onFollowRequest, controller.delete);

module.exports = router;
