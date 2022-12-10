const games = ["nonogram", "minesweeper", "flood", "daily"];

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

exports.gameID = ({ byName = true, name = "", env = "" }) => {
    return byName ? games.indexOf(name) : env.indexOf(env);
};

exports.name = (id) => {
    return games[id];
};
