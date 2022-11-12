const express = require("express");

const controller = require("../controller/following.controller");

const router = express.Router();

router.use(controller.validate);
router.get("/following", controller.getFollowees);
router.get("/followers", controller.getFollowers);
router.post("/follow", controller.create);
router.delete("/follow", controller.delete);

module.exports = router;
