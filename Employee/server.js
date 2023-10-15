// server1.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

const URL =
  "mongodb+srv://shobisri:shobi0802@cluster0.05il9hl.mongodb.net/EyeOpticians?retryWrites=true&w=majority";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", true);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success! akas");
});

// Define your routes here
const salesexecutiveRouter = require("./routes/SalesExecutives.js");
app.use("/salesexecutive", salesexecutiveRouter);

const deliverydriverRouter = require("./routes/DeliveryDrivers.js");
app.use("/deliverydriver", deliverydriverRouter);

const adminRouter = require("./routes/Admin.js");
app.use("/admin", adminRouter);

const loginRouter = require("./routes/Logins.js");
app.use("/login", loginRouter);

const leaveRouter = require("./routes/LeaveApplications.js");
app.use("/leave", leaveRouter);

const supplierRouter = require("./routes/supplier.js");
app.use("/supplier", supplierRouter);

const paymentRouter = require("./routes/Payment.js");
app.use("/payment", paymentRouter);

const promotionRouter = require("./routes/Promotion.js");
app.use("/promotion", promotionRouter);

// Export the Express app instance
module.exports = app;
