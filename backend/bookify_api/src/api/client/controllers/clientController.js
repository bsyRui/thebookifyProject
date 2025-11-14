import { dbConnections } from "../../core/config/dbconn.js";
import jwt from "jsonwebtoken";
export const GetClientInfo = async (req, res) => {
    const userId = req.user.id;
    try {
        const [rows] = await dbConnections.user.query(
            "SELECT user_id, email, first_name, last_name FROM users WHERE user_id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = rows[0];
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching client info:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};