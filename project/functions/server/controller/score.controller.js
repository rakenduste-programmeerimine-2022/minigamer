const { startOfDay } = require("date-fns");
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
const { message, errorMessage } = require("../utility/message");
const DailyChallenge = require("../model/dailyChallenge.model");
const Following = require("../model/following.model");
const Score = require("../model/score.model");
const User = require("../model/user.model");
const games = require("../utility/games");

exports.getGameToken = (req, res) => {
    const { game, score } = req.body;
    const token = jwt.sign(
        { env: games.environmentVariable(game), score },
        process.env.JWT_GAME_KEY,
        { expiresIn: 30 }
    );
    return res.status(200).send(message("Game token", { token }));
};

exports.create = async (req, res) => {
    const { username, gameID, score } = req.body;
    if (!(await User.exists({ username }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    await Score.create({
        username,
        gameID,
        score,
    });
    return res.status(200).send(message("Your score has been submitted!"));
};

// filter by game and day
const MAX_RESULTS = 25;

exports.getAllScores = async (req, res) => {
    const { game, page } = req.params;
    const { date } = req.query;
    const gameID = games.gameID({ byName: true, name: game });
    if (!(gameID >= 0 && gameID <= 2)) {
        return res.status(400).send(errorMessage("Invalid game name."));
    }
    const useDate = Boolean(date);
    const dateObject = new Date(date);
    // using .skip is not the best practice as it uses a cursor
    const scores = await Score.find(
        useDate
            ? {
                  gameID,
                  date: startOfDay(dateObject),
              }
            : {
                  gameID,
              },
        useDate ? "-_id -gameID -__v -date" : "-_id -gameID -__v"
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
    return res
        .status(200)
        .send(message(`All ${game} scores, page ${page}`, { scores }));
};

exports.getDailyScores = async (req, res) => {
    const { date, page } = req.params;
    const dateObject = startOfDay(new Date(date));
    // the real gameID of the Daily Challenge is obtained here
    const daily = await DailyChallenge.findOne(
        { date: dateObject },
        "-_id -__v"
    );
    if (!daily) {
        return res
            .status(404)
            .send(
                errorMessage("This daily challenge has not had any players.")
            );
    }
    // gameID == 3 indicates the score is a Daily Challenge score
    const scores = await Score.find(
        { gameID: 3, date: dateObject },
        "-_id -gameID -__v -date"
    )
        .sort({ score: "asc" })
        .skip((page - 1) * MAX_RESULTS)
        .limit(MAX_RESULTS);
    return res
        .status(200)
        .send(
            message(
                `Daily challenge scores, game ${games.name(
                    daily.gameID
                )}, page ${page}`,
                { daily, scores }
            )
        );
};

exports.getFolloweeScores = async (req, res) => {
    const { username, page } = req.params;
    const { game, date } = req.query;
    const useGame = Boolean(game);
    const useDate = Boolean(date);
    if (!(await User.exists({ username }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    const followees = await Following.find({ follower: username });
    const usernames = followees.map((entry) => {
        return entry.followee;
    });
    const scores = await Score.find(
        {
            username: { $in: usernames },
            gameID: useGame
                ? games.getGameIDByName(game)
                : { $gte: 0, $lte: 2 },
            date: useDate
                ? startOfDay(new Date(date))
                : { $gt: new Date("2022-11-20") },
        },
        "-_id -__v"
    )
        .sort({ score: "asc", date: "asc" })
        .skip((page - 1) * MAX_RESULTS)
        .limit(MAX_RESULTS);
    return res.status(200).send(
        message(`Scores of users followed by ${username}, page ${page}`, {
            scores,
        })
    );
};

exports.getUserScores = async (req, res) => {
    const { username, page } = req.params;
    const { game, date } = req.query;
    const useGame = Boolean(game);
    const useDate = Boolean(date);
    if (!(await User.exists({ username }))) {
        return res.status(400).send(errorMessage("User does not exist."));
    }
    const scores = await Score.find(
        {
            username,
            gameID: useGame
                ? games.getGameIDByName(game)
                : { $gte: 0, $lte: 2 },
            date: useDate
                ? startOfDay(new Date(date))
                : { $gt: new Date("2022-11-20") },
        },
        "-_id -__v"
    )
        .sort({ score: "asc", date: "asc" })
        .skip((page - 1) * MAX_RESULTS)
        .limit(MAX_RESULTS);
    return res
        .status(200)
        .send(message(`Scores of user ${username}, page ${page}`, { scores }));
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
