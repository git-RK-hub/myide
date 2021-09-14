const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = 4044;

app.listen(port, () => {
  console.log(chalk.bold.redBright("Greetings from port " + port));
});
