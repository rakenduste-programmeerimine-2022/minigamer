const jwt = require("jsonwebtoken");

const { errorResponse } = require("../utility/response");
const games = require("../utility/games");

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
            .send(errorResponse(401, "Log in to perform this action."));
    }
    const token = hasBearerToken(auth);
    if (!token) {
        return res.status(400).send(400, errorResponse("Invalid token."));
    }
    jwt.verify(token, process.env.JWT_USER_KEY, (error, result) => {
        if (error || !result) {
            return res.status(403).send(403, errorResponse("Invalid token."));
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
            .send(errorResponse(401, "Log in to perform this action."));
    }
    const token = hasBearerToken(auth);
    if (!token) {
        return res.status(400).send(400, errorResponse("Invalid token."));
    }
    jwt.verify(token, process.env.JWT_USER_KEY, (error, result) => {
        if (error || !result) {
            return res.status(403).send(403, errorResponse("Invalid token."));
        }
        if (_username != result.username) {
            return res
                .status(401)
                .send(errorResponse(401, "Cannot perform this action."));
        }
        next();
    });
};

const checkUserAndGame = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res
            .status(401)
            .send(errorResponse(401, "Log in to perform this action."));
    }
    const auth = authHeader.split(",");
    if (auth.length != 2) {
        return res.status(403).send(403, errorResponse("Missing token."));
    }
    const { _username, _gameID, _seed, _score } = req.body;
    const userToken = hasBearerToken(auth[0].trim());
    const gameToken = hasBearerToken(auth[1].trim());
    if (!userToken || !gameToken) {
        return res.status(400).send(400, errorResponse("Missing token."));
    }
    jwt.verify(userToken, process.env.JWT_USER_KEY, (error, result) => {
        if (error || !result) {
            return res
                .status(403)
                .send(403, errorResponse("Invalid user token."));
        }
        if (_username != result.username) {
            return res
                .status(401)
                .send(errorResponse(401, "Cannot perform this action."));
        }
    });
    jwt.verify(gameToken, process.env.JWT_GAME_KEY, (error, result) => {
        if (error || !result) {
            const expired = "expiredAt" in error;
            return res
                .status(403)
                .send(
                    errorResponse(
                        403,
                        expired
                            ? "Game token has expired."
                            : "Invalid game token."
                    )
                );
        }
        if (
            result.score != _score ||
            games.gameID({ byName: false, envVar: result.env }) != _gameID
        ) {
            return res
                .status(400)
                .send(
                    errorResponse(
                        400,
                        `Token data does not match: ${games.gameID({
                            byName: false,
                            envVar: result.env,
                        })}, ${_gameID}, ${_score}`
                    )
                );
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

exports.onGameTokenRequest = [checkLogin];

exports.onScoreCreateRequest = [
    (req, res, next) => {
        const { username, gameID, score } = req.body;
        req.body._username = username;
        req.body._gameID = gameID;
        req.body._score = score;
        next();
    },
    checkUserAndGame,
];