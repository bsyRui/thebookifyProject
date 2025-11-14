import { dbConnections } from "../../core/config/dbconn.js";

export const postNewsletterSubscription = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        // Check if email already exists
        const [existing] = await dbConnections.library.query(
            "SELECT * FROM newsletter_subscribers WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({ 
                error: "Email is already subscribed",
                subscriptionDate: existing[0].signup_date
            });
        }

        // Insert new subscription (signup_date will be set automatically by CURRENT_TIMESTAMP)
        const [result] = await dbConnections.library.query(
            "INSERT INTO newsletter_subscribers (email) VALUES (?)",
            [email]
        );

        // Get the subscription details including the timestamp
        const [newSubscription] = await dbConnections.library.query(
            "SELECT * FROM newsletter_subscribers WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json({ 
            message: "Subscribed successfully",
            subscription: {
                id: newSubscription[0].id,
                email: newSubscription[0].email,
                signup_date: newSubscription[0].signup_date
            }
        });
    } catch (err) {
        console.error("Database error:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: "Email is already subscribed" });
        }
        res.status(500).json({ 
            error: "Failed to process subscription",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};