const games = ["nonogram", "minesweeper", "flood", "daily"];

// it appears these were not on netlify
const env = [
    process.env.NONOGRAM_KEY,
    process.env.MINESWEEPER_KEY,
    process.env.FLOOD_KEY,
    process.env.DAILY_KEY,
];

exports.environmentVariable = (name) => {
    if (!games.includes(name)) {
        return "";
    }
    const id = games.indexOf(name);
    return env[id];
};

exports.gameID = ({ byName = true, name = "", envVar = "" }) => {
    return byName ? games.indexOf(name) : env.indexOf(envVar);
};

exports.name = (id) => {
    return games[id];
};
