const serverless = require("serverless-http");
const express = require("express");
require("dotenv").config();

const followingRouter = require("./router/following.router");
const scoreRouter = require("./router/score.router");
const userRouter = require("./router/user.router");
const seedRouter = require("./router/seed.router");

const { errorMessage } = require("./utility/message");

const app = express();
app.use(express.json());

// await axios.get(".netlify/functions/server/{ENDPOINT}");
const SERVER = "/.netlify/functions/server";

app.use(`${SERVER}/user`, userRouter);
app.use(`${SERVER}/follow`, followingRouter);
app.use(`${SERVER}/seed`, seedRouter);
app.use(`${SERVER}/score`, scoreRouter);
app.use(`${SERVER}/*`, (req, res) => {
    res.status(404).send(errorMessage("Nothing here."));
});

// module.exports = app;
module.exports.handler = serverless(app);
