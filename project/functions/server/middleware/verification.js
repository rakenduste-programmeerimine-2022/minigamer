const jwt = require("jsonwebtoken");

const { errorMessage } = require("../utility/message");

const checkUserAndUserToken = (req, res, next) => {
    const header = req.headers["authorization"];
    const { _username } = req.body;
    if (!header) {
        return res
            .status(401)
            .send(errorMessage("Log in to perform this action."));
    }
    // token should be "Bearer {TOKEN}"
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_USER_KEY, (error, result) => {
        if (error || !result) {
            return res.status(403).send(errorMessage("Invalid token."));
        }
        if (_username != result.username) {
            return res
                .status(401)
                .send(errorMessage("Cannot perform this action."));
        }
        next();
    });
};

const checkUserToken = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res
            .status(401)
            .send(errorMessage("Log in to perform this action."));
    }
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_USER_KEY, (error, result) => {
        if (error || !result) {
            return res.status(403).send(errorMessage("Invalid token."));
        }
        next();
    });
};

exports.onFollowRequest = [
    (req, res, next) => {
        const { follower } = req.body;
        req.body._username = follower;
        next();
    },
    checkUserAndUserToken,
];

exports.onDailyRequest = [checkUserToken];