const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const bodyParser = require('body-parser')
const userRoutes = require("./routes/userRoutes");
const reqRoutes = require("./routes/requestRoutes");
const badgeRoutes = require("./routes/badgeRoutes");
require("./database/associations");

const app = express();

//Settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/api/v1", [userRoutes, reqRoutes, badgeRoutes]);

module.exports = app;
