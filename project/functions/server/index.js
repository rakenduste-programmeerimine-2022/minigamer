const serverless = require("serverless-http");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const followingRouter = require("./router/following.router");
const userRouter = require("./router/user.router");
const seedRouter = require("./router/seed.router");

const SERVER = "/.netlify/functions/server";
const CLUSTER = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@minigamer.acixzgo.mongodb.net/?retryWrites=true&w=majority`;
const DB = process.env.MONGO_TEST_DB;

if (DB === process.env.MONGO_TEST_DB) {
    // the weird escape characters set console text color somehow :)
    console.error("\x1b[31m", "WARNING: Using test database.", "\x1b[0m");
}

mongoose.connect(CLUSTER, { dbName: DB }).catch((error) => {
    console.error(error);
});

const app = express();
app.use(express.json());

// await axios.get(".netlify/functions/server/{ENDPOINT}");
app.use(`${SERVER}/user`, userRouter);
app.use(`${SERVER}/follow`, followingRouter);
app.use(`${SERVER}/seed`, seedRouter);

// module.exports = app;
module.exports.handler = serverless(app);
