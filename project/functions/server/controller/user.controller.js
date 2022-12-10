const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
    finishValidation,
    validateUsername,
    validatePassword,
} = require("../middleware/validation");
const { response, errorResponse } = require("../utility/response");
const User = require("../model/user.model");
const Following = require("../model/following.model");

const ROUNDS = 10;

exports.methods = {
    register: async (username, password) => {
        if (await User.exists({ username })) {
            return errorResponse(400, "User already exists.");
        }
        bcrypt.hash(password, ROUNDS, async (error, hash) => {
            if (error) {
                return errorResponse(500, error, true);
            }
            await User.create({ username, password: hash });
        });
        return response(201, "Account registered!");
    },
    login: async (username, password) => {
        const user = await User.findOne({ username });
        if (!user) {
            return errorResponse(400, "User doesn't exist.");
        }
        const hash = user.password;
        try {
            const match = await bcrypt.compare(password, hash);
            if (!match) {
                return errorResponse(400, "Wrong password");
            }
            const token = jwt.sign(
                { username, id: user._id },
                process.env.JWT_USER_KEY
            );
            return response(200, "Logged in!", { token });
        } catch (error) {
            return errorResponse(500, error, true);
        }
    },
    profile: async (username) => {
        if (!(await User.exists({ username }))) {
            return errorResponse(400, "User doesn't exist.");
        }

        const followees = await Following.find(
            { follower: username },
            "followee -_id"
        );
        const followeesArray = followees.map((entry) => {
            return entry.followee;
        });

        const followers = await Following.find(
            { followee: username },
            "follower -_id"
        );
        const followersArray = followers.map((entry) => {
            return entry.follower;
        });

        return response(200, `User ${username} profile data`, {
            following: followeesArray,
            followers: followersArray,
        });
    },
};

exports.requests = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const response = await this.methods.register(username, password);
        return res.status(response.status).send(response);
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const response = await this.methods.login(username, password);
        return res.status(response.status).send(response);
    },
    profile: async (req, res) => {
        const { username } = req.params;
        const response = await this.methods.profile(username);
        return res.status(response.status).send(response);
    },
};

exports.validate = {
    get: [validateUsername("param"), finishValidation],
    post: [validateUsername("body"), validatePassword(), finishValidation],
};