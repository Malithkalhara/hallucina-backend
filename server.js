import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config.js";
import user from "./routes/user.route.js";
import { client } from "./config/client.js";
import mongoose from "mongoose";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.use("/api/user", user);

app.get("/", (req, res) => {
  res.send(`Welcome to Hallucina (+_+)`);
});


mongoose.connect(process.env.MONGO_URL)
  .then(()=>console.log("connected!"))
  .catch((err)=>console.log(err));


app.listen(config.PORT, config.HOST, () => {
  console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
});
