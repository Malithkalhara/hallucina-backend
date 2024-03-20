import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import config from "./config.js";

import file from "./routes/file.route.js";
import item from "./routes/item.route.js";
import offer from "./routes/offer.route.js";
import purchase from "./routes/purchase.route.js";
import user from "./routes/user.route.js";

dotenv.config();

const app = express();

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.use("/api/user", user);
app.use("/api/file", file);
app.use("/api/item", item);
app.use("/api/offer/", offer);
app.use("/api/purchase/", purchase);

app.get("/", (req, res) => {
  res.send(`Welcome to Hallucina (+_+)`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected!"))
  .catch((err) => console.log(err));

app.listen(config.PORT, config.HOST, () => {
  console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
});
