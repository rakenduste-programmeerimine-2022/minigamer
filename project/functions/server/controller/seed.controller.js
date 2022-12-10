const { startOfDay } = require("date-fns");

const DailyChallenge = require("../model/dailyChallenge.model");
const { randomInt } = require("../utility/random");
const { response, errorResponse } = require("../utility/response");
const { getStartOfToday } = require("../utility/date");
const {
    validateBeforeBool,
    finishValidation,
    validateDate,
} = require("../middleware/validation");

const BASE = 16;
const SEEDLENGTH = 32;

const randomSeed = () => {
    let seed = "";
    for (let i = 0; i < SEEDLENGTH; i++) {
        const int = randomInt(BASE);
        seed += int.toString(BASE);
    }
    return seed;
};

exports.methods = {
    randomSeed: () => {
        return response(200, "Random seed", { seed: randomSeed() });
    },
    dailySeed: async () => {
        const date = getStartOfToday();
        const daily =
            (await DailyChallenge.findOne({ date })) ??
            (await DailyChallenge.create({
                gameID: randomInt(3),
                seed: randomSeed(),
                date,
            }));
        return response(200, "Daily challenge seed", { daily });
    },
    getPrecedingOrSucceeding: async (date, before) => {
        if (!date) {
            errorResponse(400, "No date provided.");
        }
        const dateObj = startOfDay(new Date(date));
        console.log(typeof before);
        const query = await DailyChallenge.find({
            date: before ? { $lt: dateObj } : { $gt: dateObj },
        })
            .sort({
                date: before ? -1 : 1,
            })
            .limit(1);
        const endReached = query.length === 0;
        const daily = !endReached ? query[0] : null;
        return response(
            200,
            endReached
                ? `No more daily challenges ${
                      before ? "before" : "after"
                  } ${date}.`
                : `The daily challenge ${before ? "before" : "after"} ${date}`,
            endReached ? {} : { daily }
        );
    },
};

exports.requests = {
    getRandomSeed: (req, res) => {
        const response = this.methods.randomSeed();
        return res.status(response.status).send(response);
    },
    getDailySeed: async (req, res) => {
        const response = await this.methods.dailySeed();
        return res.status(response.status).send(response);
    },
    getPrecedingOrSucceeding: async (req, res) => {
        const { date } = req.params;
        const { before } = req.query;
        const response = await this.methods.getPrecedingOrSucceeding(
            date,
            before
        );
        return res.status(response.status).send(response);
    },
};

exports.validate = [
    validateDate("param"),
    validateBeforeBool(),
    finishValidation,
];
