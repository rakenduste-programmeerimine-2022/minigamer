const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    follower: { type: String, required: true },
    followee: { type: String, required: true },
});

const Following = mongoose.model("Following", schema);

module.exports = Following;
