const express = require("express");

const controller = require("../controller/following.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

router.use(controller.validate, verification.onFollowRequest, database.connect);

// .netlify/functions/server/follow

// body requires:
//  "follower" (user making the request)
//  "followee"
// auth requires:
//  user token

// Makes "follower" follow "followee".
router.post("/", controller.requests.create);

// .netlify/functions/server/follow

// body requires:
//  "follower" (user making the request)
//  "followee"
// auth requires:
//  user token

// Makes "follower" unfollow "followee".
router.delete("/", controller.requests.delete);

module.exports = router;
