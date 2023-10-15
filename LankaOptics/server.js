// server.js
const app = require("./app");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

const MONGO_URL =
  "mongodb+srv://shobisri:shobi0802@cluster0.05il9hl.mongodb.net/EyeOpticians?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", true);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success lanka optics!");
});

module.exports = app; // Export the Express app instance
