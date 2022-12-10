const mongoose = require("mongoose");

const { errorResponse: errorMessage } = require("../utility/response");

const CLUSTER = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@minigamer.acixzgo.mongodb.net/?retryWrites=true&w=majority`;
const DB = process.env.MONGO_TEST_DB;

// this is alright to do with netlify since there isn't a port always running an instance of the backend
exports.connect = (req, res, next) => {
    if (DB === process.env.MONGO_TEST_DB) {
        // the weird escape characters set console text color somehow :)
        console.error("\x1b[31m", "WARNING: Using test database.", "\x1b[0m");
    }

    mongoose.connect(CLUSTER, { dbName: DB }).catch((error) => {
        res.status(500).send(errorMessage(`An error occurred: ${error}`, true));
    });
    next();
};
