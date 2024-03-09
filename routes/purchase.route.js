import express from "express";
import { createPurchase, deletePurchase, getPurchases, updatePurchase } from "../controllers/purchaseController.js";

const router = express.Router();

router.get("/", (req, res) => {
  return getPurchases(req, res);
});

router.post("/", (req, res) => {
  console.log(req.body);
  return createPurchase(req, res);
});

router.put("/:id", (req, res) => {
  return updatePurchase(req, res);
});

router.delete("/:id", (req, res) => {
  return deletePurchase(req, res);
});

export default router;
