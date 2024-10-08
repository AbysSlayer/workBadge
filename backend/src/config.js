const config = require("dotenv");

config.config();

module.exports = {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || "",
  port: process.env.PORT || "",
};
