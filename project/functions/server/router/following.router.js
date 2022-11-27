const express = require("express");

const controller = require("../controller/following.controller");
const verification = require("../middleware/verification");
const database = require("../middleware/database");

const router = express.Router();

router.use(database.connect);

// .netlify/functions/server/follow/{USER}/following
// returns the array of accounts that {USER} is following
router.get(
    "/:username/following",
    controller.validateRead,
    controller.getFollowees
);

// .netlify/functions/server/follow/{USER}/followers
// returns the array of accounts that follow {USER}
router.get(
    "/:username/followers",
    controller.validateRead,
    controller.getFollowers
);

// .netlify/functions/server/follow/follow
// follows an user
// requires user token as auth, request body requires "follower" (user making the request) and "followee" (user being followed)
router.post(
    "/follow",
    controller.validateCreate,
    verification.onFollowRequest,
    controller.create
);

// .netlify/functions/server/follow/follow
// unfollows an user
// requires user token as auth, request body requires "follower" (user making the request) and "followee" (user being followed)
router.delete(
    "/follow",
    controller.validateCreate,
    verification.onFollowRequest,
    controller.delete
);

module.exports = router;
