import { Router } from "express";
import { login, register, verify, refresh } from "../controllers/userController.js";

const router = Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("Get Users");
});
// define the about route
router.post("/login", (req, res) => {
  login(req, res);
  // res.send("Login Users");
});

router.post("/register", (req, res) => {
  register(req, res);
  // res.send("Register Users");
});

router.post("/verify", (req, res) => {
  // res.send("Verify Users");
  verify(req, res);
});

router.post("/refresh", (req, res) => {
  refresh(req, res);
}
);

export default router;
