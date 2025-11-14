import express from "express";
import { postNewsletterSubscription } from "../controllers/outros.js";

const router = express.Router();

router.post("/subscribe", postNewsletterSubscription);

export default router;