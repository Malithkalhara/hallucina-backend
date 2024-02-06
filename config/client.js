
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

// const connUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  ssl: { rejectUnauthorized: false }
};

const client = new pg.Client(config);
export { client };