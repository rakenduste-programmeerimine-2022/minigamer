const { body } = require("express-validator");

const { validationCheck } = require("../utility/validationCheck");
const { message, errorMessage } = require("../utility/message");
const Following = require("../model/following.model");
const User = require("../model/user.model");

const FOLLOW_LIMIT = 25;

exports.create = async (req, res) => {
    const { follower, followee } = req.body;
    if (follower == followee) {
        return res
            .status(400)
            .send(errorMessage("User can't follow themself."));
    }
    if (
        // $in can match an array of values
        (await User.countDocuments({
            username: { $in: [follower, followee] },
        })) != 2
    ) {
        return res
            .status(400)
            .send(errorMessage("One or both of the users don't exist."));
    }
    if (await Following.exists({ follower, followee })) {
        return res
            .status(400)
            .send(errorMessage("User is already being followed."));
    }
    if ((await Following.countDocuments({ follower })) >= FOLLOW_LIMIT) {
        return res
            .status(400)
            .send(errorMessage("User has reached maximum following limit."));
    }
    await Following.create({ follower, followee });
    return res.status(200).send(message("User is now being followed!"));
};

exports.getFollowees = async (req, res) => {
    const { follower } = req.body;
    if (!(await User.exists({ username: follower }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    const followees = await Following.find({ follower }, "followee -_id");
    const followeeArray = followees.map((element) => {
        return element.followee;
    });
    return res.status(200).send(
        message(`Users ${follower} is following`, {
            following: followeeArray,
        })
    );
};

exports.getFollowers = async (req, res) => {
    const { followee } = req.body;
    if (!(await User.exists({ username: followee }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    const followers = await Following.find({ followee }, "follower -_id");
    const followerArray = followers.map((element) => {
        return element.follower;
    });
    return res
        .status(200)
        .send(
            message(`Users following ${followee}`, { followers: followerArray })
        );
};

exports.delete = async (req, res) => {
    const { follower, followee } = req.body;
    if (!(await Following.exists({ follower, followee }))) {
        return res
            .status(400)
            .send(
                errorMessage("User does not exist or is not being followed.")
            );
    }
    await Following.findOneAndDelete({ follower, followee });
    return res.status(200).send(message("User has been unfollowed!"));
};

exports.validate = [
    body(["follower", "followee"])
        .optional()
        .isString()
        .withMessage("Invalid data type.")
        .isLength({ min: 3, max: 16 })
        .withMessage("Username length has to be between 3 and 16 symbols.")
        .isAlphanumeric()
        .withMessage("Username can only contain symbols A-Z, a-z and 0-9."),
    validationCheck,
];
