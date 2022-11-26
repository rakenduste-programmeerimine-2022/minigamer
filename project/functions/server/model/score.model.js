const mongoose = require("mongoose");

const { getStartOfToday } = require("../utility/date");

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    gameID: { type: Number, required: true },
    time: { type: Number, required: true },
    date: { type: Date, required: true, default: getStartOfToday },
});

const Score = mongoose.model("Score", schema);

module.exports = Score;
