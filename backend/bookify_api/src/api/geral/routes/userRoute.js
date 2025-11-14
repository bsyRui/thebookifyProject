import express from 'express';
import { PostUserLogin } from '../controllers/Userconn.js';
const router = express.Router();

router.post('/login', PostUserLogin);

router.get("/", (req, res) => {
  res.json({ message: "Login is working!" });
});

export default router;