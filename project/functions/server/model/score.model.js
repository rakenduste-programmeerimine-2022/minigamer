const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    gameID: { type: Number, required: true },
    score: { type: Number, required: true },
    date: { type: Date, required: true },
});

const Score = mongoose.model("Score", schema);

module.exports = Score;
