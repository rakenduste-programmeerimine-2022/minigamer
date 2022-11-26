const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    gameID: { type: Number, required: true },
    seed: { type: String, required: true },
    // date: { type: String, required: true },
    date: { type: Date, required: true },
});

const DailyChallenge = mongoose.model("DailyChallenge", schema);

module.exports = DailyChallenge;
