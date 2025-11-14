import { dbConnections } from "../../core/config/dbconn.js";


export const addBook = async (req, res) => {
    try {
        // Get table fields
        const [fields] = await dbConnections.library.query("SHOW COLUMNS FROM books");
        const validFields = fields.map(field => field.Field);
        
        // Validate required fields
        const requiredFields = ['title', 'author_id', 'publisher_id'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ 
                    error: `Missing required field: ${field}` 
                });
            }
        }

        // Build book data object
        const addBookData = {};
        for (const key in req.body) {
            if (validFields.includes(key)) {
                addBookData[key] = req.body[key];
            }
        }

        // Validate data types
        if (addBookData.published_date && !isValidDate(addBookData.published_date)) {
            return res.status(400).json({ 
                error: "Invalid date format. Use YYYY-MM-DD" 
            });
        }

        if (addBookData.price && isNaN(addBookData.price)) {
            return res.status(400).json({ 
                error: "Price must be a number" 
            });
        }

        // Insert book
        const [result] = await dbConnections.library.query(
            "INSERT INTO books SET ?",
            [addBookData]
        );

        // Return success response
        res.status(201).json({ 
            message: "Book added successfully", 
            bookId: result.insertId,
            book: addBookData
        });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ 
            error: "Failed to add book", 
            details: err.message 
        });
    }
};

// Helper function to validate date format
function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}