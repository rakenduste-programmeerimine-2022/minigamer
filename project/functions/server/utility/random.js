const seedrandom = require("seedrandom");

const rng = seedrandom(process.env.RNG_SEED, { entropy: true });

exports.randomInt = (maxExcluded) => {
    return Math.round(rng.quick() * (maxExcluded - 1));
};
