// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
require("dotenv").config();

const MONGO_URL =
  "mongodb+srv://shobisri:shobi0802@cluster0.05il9hl.mongodb.net/EyeOpticians?retryWrites=true&w=majority";

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

// Connect to the database and start the server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("🔌 Connected to Database.");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app; // Export the Express app instance
