const jwt = require("jsonwebtoken");

const { errorMessage } = require("../utility/message");

const hasBearerToken = (token) => {
    if (!token) {
        return false;
    }
    tokenData = token.split(" ");
    if (tokenData.length != 2) {
        return false;
    }
    if (tokenData[0] != "Bearer") {
        return false;
    }
    return tokenData[1];
};

const checkLogin = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        return res
            .status(401)
            .send(errorMessage("Log in to perform this action."));
    }
    const token = hasBearerToken(auth);
    if (!token) {
        return res.status(400).send(errorMessage("Invalid token."));
    }
    jwt.verify(token, process.env.JWT_USER_KEY, (error, result) => {
        if (error || !result) {
            return res.status(403).send(errorMessage("Invalid token."));
        }
        next();
    });
};

const checkUser = (req, res, next) => {
    const auth = req.headers["authorization"];
    const { _username } = req.body;
    if (!auth) {
        return res
            .status(401)
            .send(errorMessage("Log in to perform this action."));
    }
    const token = hasBearerToken(auth);
    if (!token) {
        return res.status(400).send(errorMessage("Invalid token."));
    }
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

const checkUserAndGame = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res
            .status(401)
            .send(errorMessage("Log in to perform this action."));
    }
    const auth = authHeader.split(",");
    if (auth.length != 2) {
        return res.status(403).send(errorMessage("Missing token."));
    }
    const { _username, _seed, _time } = req.body;
    const userToken = hasBearerToken(auth[0].trim());
    const gameToken = hasBearerToken(auth[1].trim());
    if (!userToken || !gameToken) {
        return res.status(400).send(errorMessage("Missing token."));
    }
    jwt.verify(userToken, process.env.JWT_USER_KEY, (error, result) => {
        if (error || !result) {
            return res.status(403).send(errorMessage("Invalid user token."));
        }
        if (_username != result.username) {
            return res
                .status(401)
                .send(errorMessage("Cannot perform this action."));
        }
    });
    jwt.verify(gameToken, process.env.JWT_GAME_KEY, (error, result) => {
        if (error || !result) {
            return res.status(403).send(errorMessage("Invalid game token."));
        }
        if (result.seed != _seed || result.time != _time) {
            return res
                .status(400)
                .send(errorMessage("Token data does not match."));
        }
        next();
    });
};

exports.onDailyRequest = [checkLogin];

exports.onFollowRequest = [
    (req, res, next) => {
        const { follower } = req.body;
        req.body._username = follower;
        next();
    },
    checkUser,
];

exports.onScoreCreateRequest = [
    (req, res, next) => {
        const { username, seed, time } = req.body;
        req.body._username = username;
        req.body._seed = seed;
        req.body._time = time;
        next();
    },
    checkUserAndGame,
];