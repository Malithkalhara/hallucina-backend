import express from "express";
import User from "../models/user.model.js";
import {
  getUsers,
  register,
  login,
  logout,
  token,
} from "../controllers/userController.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
// import { sendMailOTP } from "./sendmail.route.js";
import bcrypt from "bcrypt";

const router = express.Router();

function generateOTP() {
  const min = 1000; // Minimum 4-digit number
  const max = 9999; // Maximum 4-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get("/getUsers", authenticateToken, isAdmin, async (req, res) => {
  getUsers(req, res);
});

router.post("/register", async (req, res) => {
  console.log("register");
  register(req, res);
});

router.post("/login", async (req, res) => {
  login(req, res);
});

router.get("/logout", authenticateToken, async (req, res) => {
  logout(req, res);
});

router.post("/refresh", async (req, res) => {
  token(req, res);  
});

router.delete("/delete/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const removedUser = await User.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json(removedUser); 
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
});

// router.patch("/verifyotp", async (req, res) => {
//   const email = req.body.email;
//   const otp = req.body.otp;
//   try {
//     const user = await User.findOne({ email: email });
//     if (user.otp === otp) {
//       return res.status(200).json({ message: "OTP verified" });
//     } else {
//       return res.status(401).json({ message: "Invalid OTP" });
//     }
//   } catch (err) {
//     res.status(501).json({ message: err.message });
//   }
// });

// router.patch("/resetpassword", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const filter = { email: email };
//   try {
//     const saltRounds = 10;
//     bcrypt.hash(password, saltRounds, async (err, hash) => {
//       if (err) {
//         res.status(404).json({ message: "Internal Server Error!" });
//       }
//       const update = { password: hash };
//       const user = await User.findOneAndUpdate(filter, update);
//       res.status(200).json({ message: "Password updated successfully" });
//     });
//   } catch (err) {
//     res.status(501).json({ message: err.message });
//   }
// });

// router.patch("/forgotpassword", async (req, res) => {
//   const email = req.body.email;
//   const generatedOTP = generateOTP();
//   const filter = { email: email };
//   const update = { otp: generatedOTP };

//   try {
//     const user = await User.findOneAndUpdate(filter, update);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.otp = generatedOTP;
//     await user.save();
//     //   email sending code

//     // await sendMailOTP({
//     //   subject: "Your OTP for password reset",
//     //   body: generatedOTP,
//     //   name: user.name,
//     //   email: req.body.email,
//     // });

//     return res.status(200).json({ message: "OTP sent to your email" });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ error: "Server error" });
//   }
// });

// router.patch("/update/:id", authenticateToken, isAdmin, async (req, res) => {
//   const userId = req.params.id;
//   const { name } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.name = name;
//     await user.save();

//     return res.json(user);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ error: "Server error" });
//   }
// });

router.post("/verify", async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // const user = await User.findOne({_id:decoded._id});
    // if(!user){
    //     throw new Error();
    // }
    if (decoded) {
      return res.status(200).json({ message: "User is authenticated" });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
});
export default router;
     