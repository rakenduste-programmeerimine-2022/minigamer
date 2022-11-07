const serverless = require("serverless-http");
// const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config(); // don't have .env file yet

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "Hello from Express!" });
});

// await axios.get(".netlify/functions/server/{ENDPOINT}");
app.use("/.netlify/functions/server", router);

// module.exports = app;
module.exports.handler = serverless(app);
