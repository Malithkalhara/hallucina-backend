import express from "express";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", (req, res) => {
  return getItems(req, res);
});

router.post("/", (req, res) => {
  console.log(req.body);
  return createItem(req, res);
});

router.put("/:id", (req, res) => {
  return updateItem(req, res);
});

router.delete("/:id", (req, res) => {
  return deleteItem(req, res);
});

export default router;
