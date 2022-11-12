const express = require("express");

const controller = require("../controller/following.controller");
const verification = require("../middleware/verification");

const router = express.Router();

router.use(controller.validate);
router.get("/following", controller.getFollowees);
router.get("/followers", controller.getFollowers);
router.post("/follow", verification.onFollowRequest, controller.create);
router.delete("/follow", verification.onFollowRequest, controller.delete);

module.exports = router;
