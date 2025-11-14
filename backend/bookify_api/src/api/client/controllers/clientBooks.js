import { dbConnections } from "../../../database/connections.js";

export const clientBooksController = {

    getClientBooks: async (req, res) => {
        const clientId = req.user.id; // Assuming user ID is available in req.user
        try {
            const [books] = await dbConnections.client.query(
                "SELECT book_id, title, author, published_date FROM books WHERE client_id = ?",
                [clientId]
            );
};