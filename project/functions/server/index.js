const serverless = require("serverless-http");
// const mongoose = require("mongoose");
const express = require("express");
// require("dotenv").config(); // don't have .env file yet

const userRouter = require("./router/user.router");

const SERVER = "/.netlify/functions/server";
const app = express();

app.use(express.json());
// await axios.get(".netlify/functions/server/{ENDPOINT}");
app.use(`${SERVER}/user`, userRouter);

// module.exports = app;
module.exports.handler = serverless(app);
