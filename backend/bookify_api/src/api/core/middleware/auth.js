import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.authToken; // get cookie

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.user = payload; // { id: user_id, email: user.email }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
