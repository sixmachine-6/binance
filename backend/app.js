const express = require("express");
const userRouter = require("./routes/userRoutes");
<<<<<<< HEAD
=======
const tradeRoutes = require("./routes/tradeRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true,
  }),
);
<<<<<<< HEAD
=======

app.use("/api/v1/watchlist", watchlistRoutes);
app.use("/api/v1/trades", tradeRoutes);
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
app.use("/api/v1/users", userRouter);
module.exports = app;
