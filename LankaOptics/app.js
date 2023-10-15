const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const auth = require("./routes/auth");
const orders = require("./routes/Orders");
const orderItems = require("./routes/orderItemRoutes");
app.use("/api/v1/", auth);
app.use("/orders", orders);
app.use("/orderitems", orderItems);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

app.use(errorMiddleware);

module.exports = app;
