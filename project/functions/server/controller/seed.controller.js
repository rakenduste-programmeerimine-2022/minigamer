const seedrandom = require("seedrandom");

const { message } = require("../utility/message");
const DailyChallenge = require("../model/dailyChallenge.model");

const BASE = 16;
const SEEDLENGTH = 32;
const rng = seedrandom(process.env.RNG_SEED, { entropy: true });

const randomSeed = () => {
    let seed = "";
    for (let i = 0; i < SEEDLENGTH; i++) {
        const int = randomInt(BASE);
        seed += int.toString(BASE);
    }
    return seed;
};

const randomInt = (maxExcluded) => {
    return Math.round(rng.quick() * (maxExcluded - 1));
};

exports.getRandom = (req, res) => {
    res.status(200).send(message("Random seed", { seed: randomSeed() }));
};

exports.getDaily = async (req, res) => {
    const dateObj = new Date();
    const date = `${dateObj.getUTCDate()}-${dateObj.getUTCMonth()}-${dateObj.getUTCFullYear()}`;
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
