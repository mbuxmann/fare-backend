require("../models/Todo");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoCardRoutes = require("../routes/todoCardRoutes");
const subtaskRoutes = require("../routes/subtaskRoutes");

const app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use(todoCardRoutes);
app.use(subtaskRoutes);

const mongoUri =
  "mongodb+srv://admin:" +
  process.env.DATABASE_PASSWORD +
  "@cluster0.uv9sw.mongodb.net/" +
  process.env.DATABASE_NAME +
  "?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log("Listening");
});
