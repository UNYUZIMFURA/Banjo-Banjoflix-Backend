const express = require("express");
const app = express();
const routes = require('./routes/routes.js')
const colors = require('colors')
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.BANJOFLIX_PORT;

// app.use('/rw', routes)
app.listen(PORT, () => {
  console.log(`BanjoFlix Server running on port ${PORT}`.yellow.bold);
});

