import express from "express";
import { createOffer, deleteOffer, getOffers, updateOffer } from "../controllers/offerController.js";

const router = express.Router();

router.get("/", (req, res) => {
  return getOffers(req, res);
});

router.post("/", (req, res) => {
  console.log(req.body);
  return createOffer(req, res);
});

router.put("/:id", (req, res) => {
  return updateOffer(req, res);
});

router.delete("/:id", (req, res) => {
  return deleteOffer(req, res);
});

export default router;
