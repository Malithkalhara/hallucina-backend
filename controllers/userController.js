import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtil.js";
// import RefreshToken from "../models/refreshToken.model.js";
import { client } from "../config/client.js";

export const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    console.log("Registering user:", req.body);

    // let userExists = await User.findOne({email})
    const query = `
        SELECT * FROM ${process.env.SCHEMA}.user WHERE email = $1;
        `;
    const values = [email];
    // console.log(query, values)
    const result = await client.query(query, values);
    // console.log(result);
    const userExists = result.rows[0];
    if (userExists) {
      res.status(401).json({ message: "User already exists." });
      return;
    }

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log("Error when hashing the password!");
        res.json({ message: "Internal Server Error!" });
      }

      // console.log(hash);

      const query = `
            INSERT INTO ${process.env.SCHEMA}.user (first_name, last_name, email, password, role)
            VALUES ($1, $2, $3, $4, 'user')
            RETURNING first_name, last_name, email;`;

      const values = [first_name, last_name, email, hash];
      console.log(query, values);

      try {
        const result = await client.query(query, values);
        const user = result.rows[0];
        console.log(user);
        res.status(201).json({ message: "User created successfully", user });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // let user = await User.findOne({email});
    const query = `
        SELECT * FROM ${process.env.SCHEMA}.user WHERE email = $1;
        `;
    const values = [email];
    const result = await client.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        var response = {
          message: null,
          accessToken: null,
          refreshToken: null,

          first_name: user.first_name,
          last_name: user.last_name,
          id: user.id,
          email: user.email,
          role: user.role
        };

        response.refreshToken = generateRefreshToken(user);
        response.accessToken = generateAccessToken(user);
        response.message = user.email + " user logged in!";
        console.log(user.email + " user logged in!");
        return res.status(200).json(response);
      }
      console.log(err);
      return res.status(401).json({ message: "Invalid Credentials" });
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

export const logout = async (req, res) => {
  const userId = req.body.userId;
  console.log("Logging out user:", userId);
};


export const verify = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

   
    if (decoded) {
      return res.status(200).json({ message: "User is authenticated" });
    } else {
      console.log("error");
      return res.status(401).json({ error: "Please authenticate." });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Please authenticate." });
  }
};


export const refresh = (req,res) => {
  const refreshToken = req.body.refreshToken;
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
  console.log("refreshing token...");
  console.log(decoded);
  if (decoded) {
    const accessToken = generateAccessToken(decoded);
    return res.status(200).json({ accessToken });
  } else {
    console.log("error");
    return res.status(401).json({ error: "Please authenticate." });
  }
}

