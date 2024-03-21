import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import file from "./routes/file.route.js";
import item from "./routes/item.route.js";
import offer from "./routes/offer.route.js";
import purchase from "./routes/purchase.route.js";
import user from "./routes/user.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

dotenv.config();
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Replace with your frontend's URL
//     methods: "GET,POST,OPTIONS",
//     allowedHeaders: "Content-Type, Authorization",
//     credentials: true,
//   })
// );
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/file", file);
app.use("/api/item", item);
app.use("/api/offer/", offer);
app.use("/api/purchase/", purchase);

app.get("/", (req, res) => {
  res.send(`Welcome to Hallucina (+_+)`);
});

console.log(process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`APP LISTENING ON ${PORT}`);
});
