const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Ably = require("ably");
dotenv.config();
const passport = require("passport");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");
const ablyRoutes = require("./routes/ablyRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const dealRoutes = require("./routes/dealRoutes");
const dataRoutes = require("./routes/dataRoutes");

require("./controllers/auth/passport");

const PORT = process.env.PORT || parseInt(process.env.API_PORT);
const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("", authRoutes);
app.use("/main", mainRoutes);
app.use("/ably", ablyRoutes);
app.use("/auction", auctionRoutes);
app.use("/deal/", dealRoutes);
app.use("/data", dataRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY);
    await ably.connection.once("connected");
    console.log("Connected to Ably!");
  })
  .catch((err) => {
    console.log("Database connection failed. Server not started");
    console.log(err);
  });
