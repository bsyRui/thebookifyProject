import express from "express";
import { addBook } from "../controllers/booksManagement.js";
const router = express.Router();

router.post("/add", addBook);
router.get("/test", (req, res) => {
  res.json({ message: "Admin Books Route is working!" });
});
export default router;