const DailyChallenge = require("../model/dailyChallenge.model");
const { randomInt } = require("../utility/random");
const { message } = require("../utility/message");
const { getStartOfToday } = require("../utility/date");

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

exports.getRandom = (req, res) => {
    res.status(200).send(message("Random seed", { seed: randomSeed() }));
};

exports.getDaily = async (req, res) => {
    const date = getStartOfToday();
    const gameID = randomInt(3);
    let daily = await DailyChallenge.findOne({ date });
    if (!daily) {
        daily = await DailyChallenge.create({
            gameID,
            seed: randomSeed(),
            date,
        });
    }
    return res.status(200).send(message("Daily seed", { daily }));
};
