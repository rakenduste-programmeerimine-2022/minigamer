const serverless = require("serverless-http");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const followingRouter = require("./router/following.router");
const userRouter = require("./router/user.router");

const SERVER = "/.netlify/functions/server";
const DB = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@minigamer.acixzgo.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB, { dbName: process.env.MONGO_DATABASE }).catch((error) => {
    console.error(error);
});

const app = express();
app.use(express.json());

// await axios.get(".netlify/functions/server/{ENDPOINT}");
app.use(`${SERVER}/user`, userRouter);
// No session user verification yet
app.use(`${SERVER}/follow`, followingRouter);

// module.exports = app;
module.exports.handler = serverless(app);
