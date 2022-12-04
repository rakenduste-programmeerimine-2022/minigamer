const {
    finishValidation,
    validateUsername,
} = require("../middleware/validation");
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
    // const { follower } = req.body;
    const { username } = req.params;
    if (!username) {
        return res.status(400).send(errorMessage("No username given."));
    }
    if (!(await User.exists({ username }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    const followees = await Following.find(
        { follower: username },
        "followee -_id"
    );
    const followeeArray = followees.map((element) => {
        return element.followee;
    });
    return res.status(200).send(
        message(`Users ${username} is following`, {
            following: followeeArray,
        })
    );
};

exports.getFollowers = async (req, res) => {
    // const { followee } = req.body;
    const { username } = req.params;
    if (!username) {
        return res.status(400).send(errorMessage("No username given."));
    }
    if (!(await User.exists({ username }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    const followers = await Following.find(
        { followee: username },
        "follower -_id"
    );
    const followerArray = followers.map((element) => {
        return element.follower;
    });
    return res
        .status(200)
        .send(
            message(`Users following ${username}`, { followers: followerArray })
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

exports.validate = {
    read: [validateUsername("param"), finishValidation],
    write: [
        validateUsername("body", ["follower", "followee"]),
        finishValidation,
    ],
};
