import { dbConnections } from "../../core/config/dbconn.js";
import jwt from "jsonwebtoken";

export const PostUserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const [rows] = await dbConnections.user.query(
            "SELECT * FROM users WHERE email = ? AND password_hash = ?",
            [email, password]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = rows[0];

        const token = jwt.sign(
            { id: user.user_id, email: user.email },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "7d" }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ 
            message: "Login successful", 
            user: { id: user.user_id, email: user.email }
        });
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
