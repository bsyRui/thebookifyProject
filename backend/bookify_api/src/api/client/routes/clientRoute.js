import express from "express";
import { GetClientInfo } from "../controllers/clientController.js";
import { authenticateUser } from "../../core/middleware/auth.js";
const router = express.Router();

// Protect this route with your middleware
router.get("/me", authenticateUser, GetClientInfo);
router.get("/", (req, res) => {
  res.send(" CLient API is running!");
});

export default router;
