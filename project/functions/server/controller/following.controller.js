const {
    finishValidation,
    validateUsername,
} = require("../middleware/validation");
const { response, errorResponse } = require("../utility/response");
const Following = require("../model/following.model");
const User = require("../model/user.model");

const FOLLOW_LIMIT = 25;

exports.methods = {
    follow: async (follower, followee) => {
        if (follower == followee) {
            return errorResponse(400, "User can't follow themself.");
        }
        if (
            (await User.countDocuments({
                username: { $in: [follower, followee] },
            })) != 2
        ) {
            return errorResponse(400, "One or both of the users don't exist.");
        }
        if (await Following.exists({ follower, followee })) {
            return errorResponse(400, "User is already being followed.");
        }
        if ((await Following.countDocuments({ follower })) >= FOLLOW_LIMIT) {
            return errorResponse(
                400,
                "User has reached maximum following limit."
            );
        }
        await Following.create({ follower, followee });
        return response(200, `User ${followee} is now being followed!`);
    },

    unfollow: async (follower, followee) => {
        if (!(await Following.exists({ follower, followee }))) {
            return errorResponse(
                400,
                "User does not exist or is not being followed."
            );
        }
        await Following.findOneAndDelete({ follower, followee });
        return response(200, "User has been unfollowed!");
    },
};

exports.requests = {
    create: async (req, res) => {
        const { follower, followee } = req.body;
        const response = await this.methods.follow(follower, followee);
        return res.status(response.status).send(response);
    },
    delete: async (req, res) => {
        const { follower, followee } = req.body;
        const response = await this.methods.unfollow(follower, followee);
        return res.status(response.status).send(response);
    },
};

exports.validate = [
    validateUsername("body", ["follower", "followee"]),
    finishValidation,
];
