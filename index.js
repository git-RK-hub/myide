const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const app = express();
const upload = require("multer")();
require("dotenv").config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(upload.array());

// routes
const compileRoutes = require("./routes/compile.routes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// hook routes

app.use("/api/compile", compileRoutes);

const port = 4044;

app.listen(port, () => {
  console.log(chalk.bold.redBright("Greetings from port " + port));
});
