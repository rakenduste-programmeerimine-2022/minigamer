const { startOfDay, endOfDay } = require("date-fns");
const jwt = require("jsonwebtoken");

const {
    finishValidation,
    validateScore,
    validateUsername,
    validateGameID,
    validatePage,
    validateGame,
    validateDate,
} = require("../middleware/validation");
const { response, errorResponse } = require("../utility/response");
const DailyChallenge = require("../model/dailyChallenge.model");
const Following = require("../model/following.model");
const Score = require("../model/score.model");
const User = require("../model/user.model");
const games = require("../utility/games");

// filter by game and day
const MAX_RESULTS = 25;
const BEGINNING = startOfDay(new Date("2022-11-20"));

const betweenDayStartAndEnd = (date) => {
    return {
        $gte: startOfDay(date),
        $lte: endOfDay(date),
    };
};

exports.methods = {
    getGameToken: (game, score) => {
        const token = jwt.sign(
            { env: games.environmentVariable(game), score },
            process.env.JWT_GAME_KEY,
            { expiresIn: 30 }
        );
        return response(200, "Game token", { token });
    },
    submit: async (username, gameID, score) => {
        if (!(await User.exists({ username }))) {
            return errorResponse(400, "User doesn't exist.");
        }
        await Score.create({ username, gameID, score });
        return response(200, `Your score of ${score} has been submitted!`);
    },
    getAllScores: async (game, page, date) => {
        const gameID = games.gameID({ byName: true, name: game });
        if (!(gameID >= 0 && gameID <= 2)) {
            return errorResponse(400, "Invalid game name.");
        }
        const useDate = Boolean(date);
        const dateObj = startOfDay(new Date(date));
        const scores = await Score.find(
            useDate
                ? {
                      gameID,
                      date: betweenDayStartAndEnd(dateObj),
                  }
                : {
                      gameID,
                  },
            `-_id -gameID -__v ${useDate ? "-date" : ""}`
        )
            .sort(
                useDate
                    ? {
                          score: "asc",
                          date: "asc",
                      }
                    : {
                          score: "asc",
                      }
            )
            .skip((page - 1) * MAX_RESULTS)
            .limit(MAX_RESULTS);
        return response(200, `All ${game} scores, page ${page}`, { scores });
    },
    getDailyScores: async (date, page) => {
        const dateObj = startOfDay(new Date(date));
        const daily = DailyChallenge.findOne(
            {
                date: dateObj,
            },
            "-_id -__v"
        );
        if (!daily) {
            return errorResponse(404, "This daily challenge had no players.");
        }
        const scores = await Score.find(
            {
                gameID: 3,
                date: betweenDayStartAndEnd(dateObj),
            },
            "-_id -gameID -__v -date"
        )
            .sort({ score: "asc" })
            .skip((page - 1) * MAX_RESULTS)
            .limit(MAX_RESULTS);
        return response(200, `Daily challenge scores, page ${page}`, {
            game: games.name(daily.gameID),
            scores,
        });
    },
    getFolloweeScores: async (username, page, game, date) => {
        const useGame = Boolean(game);
        const useDate = Boolean(date);
        const dateObj = startOfDay(new Date(date));
        if (!(await User.exists({ username }))) {
            return errorResponse(400, "User doesn't exist.");
        }
        const followees = await Following.find({ follower: username });
        const usernames = followees.map((entry) => {
            return entry.followee;
        });
        const scores = await Score.find(
            {
                username: { $in: usernames },
                gameID: useGame
                    ? games.gameID({ byName: true, name: game })
                    : { $gte: 0, $lte: 2 },
                date: useDate
                    ? betweenDayStartAndEnd(dateObj)
                    : { $gt: BEGINNING },
            },
            "-_id -__v"
        )
            .sort({ score: "asc", date: "asc" })
            .skip((page - 1) * MAX_RESULTS)
            .limit(MAX_RESULTS);
        return response(
            200,
            `Scores of users followed by ${username}, page ${page}`,
            { scores }
        );
    },
    getUserScores: async (username, page, game, date) => {
        const useGame = Boolean(game);
        const useDate = Boolean(date);
        const dateObj = startOfDay(new Date(date));
        if (!(await User.exists({ username }))) {
            return errorResponse(400, "User doesn't exist.");
        }
        const scores = await Score.find(
            {
                username,
                gameID: useGame
                    ? games.gameID({ byName: true, name: game })
                    : { $gte: 0, $lte: 2 },
                date: useDate
                    ? betweenDayStartAndEnd(dateObj)
                    : { $gt: BEGINNING },
            },
            "-_id -__v"
        )
            .sort({ score: "asc", date: "asc" })
            .skip((page - 1) * MAX_RESULTS)
            .limit(MAX_RESULTS);
        return response(200, `Scores of user ${username}, page ${page}`, {
            scores,
        });
    },
};

exports.requests = {
    getGameToken: (req, res) => {
        const { game, score } = req.body;
        const response = this.methods.getGameToken(game, score);
        return res.status(response.status).send(response);
    },
    submit: async (req, res) => {
        const { username, gameID, score } = req.body;
        const response = await this.methods.submit(username, gameID, score);
        return res.status(response.status).send(response);
    },
    getAllScores: async (req, res) => {
        const { game, page } = req.params;
        const { date } = req.query;
        const response = await this.methods.getAllScores(game, page, date);
        return res.status(response.status).send(response);
    },
    getDailyScores: async (req, res) => {
        const { date, page } = req.params;
        const response = await this.methods.getDailyScores(date, page);
        return res.status(response.status).send(response);
    },
    getFolloweeScores: async (req, res) => {
        const { username, page } = req.params;
        const { game, date } = req.query;
        const response = await this.methods.getFolloweeScores(
            username,
            page,
            game,
            date
        );
        return res.status(response.status).send(response);
    },
    getUserScores: async (req, res) => {
        const { username, page } = req.params;
        const { game, date } = req.query;
        const response = await this.methods.getUserScores(
            username,
            page,
            game,
            date
        );
        return res.status(response.status).send(response);
    },
};

exports.validate = {
    get: {
        allScores: [
            validateGame("param"),
            validatePage(),
            validateDate("query").optional(),
            finishValidation,
        ],
        dailyScores: [validateDate("param"), validatePage(), finishValidation],
        scoresByUser: [
            validateUsername("param"),
            validatePage(),
            validateGame("query").optional(),
            validateDate("query").optional(),
            finishValidation,
        ],
    },
    post: {
        token: [validateScore(), finishValidation],
        score: [
            validateUsername("body"),
            validateGameID(),
            validateScore(),
            finishValidation,
        ],
    },
};
