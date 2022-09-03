const express = require("express");
const app = express();
const cors = require('cors')
const connectDB = require("./config/db");
const routes = require("./routes/routes.js");
const colors = require("colors");
const errorHandler = require("./middlewares/error");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3030;

connectDB()
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(
    `BanjoFlix Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold
  );
});
