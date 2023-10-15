// mainServer.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server1App = require("./Employee/server"); // Import the Express app instance from server1.js
const server2App = require("./ForHeadStack/server"); // Import the Express app instance from server1.js
const server3App = require("./FractureMain/server"); // Import the Express app instance from server1.js
const server4App = require("./LankaOptics/server"); // Import the Express app instance from server1.js
// Import the Express app instance from server1.js
const PORT = 9999;

const app = express();

app.use(express.json());
app.use(cors());
// Use the app from server1.js
app.use(server1App);
app.use(server2App);
app.use(server3App);
app.use(server4App);
// app.use(server5App);

app.listen(PORT, () => {
  console.log(`Main server is running on PORT number: ${PORT}`);
});
