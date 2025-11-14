// controllers/booksDisplay.js
import { dbConnections } from "../../core/config/dbconn.js";

export const getBooks = async (req, res) => {
  try {
    const [books] = await dbConnections.library.query(
      "SELECT  b.*,   CONCAT(a.first_name, ' ', a.last_name) AS author_name FROM books b LEFT JOIN authors a  ON b.author_id = a.author_id "
    );
    res.json(books);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error which is",err });
  }
};

export const getBooksByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const [books] = await dbConnections.library.query(
      "SELECT  b.*,   CONCAT(a.first_name, ' ', a.last_name) AS author_name FROM books b LEFT JOIN authors a  ON b.author_id = a.author_id WHERE b.genre = ?",
      [genre]
    );
    res.json(books);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error", err });
  }
};

export const getBooksByAuthor = async (req, res) => {
  const { authorId } = req.params;
  const { name } = req.query;

  try {
    let query;
    let params;

    if (name) {
      query = `
        SELECT b.*, CONCAT(a.first_name, ' ', a.last_name) AS author_name 
        FROM books b 
        LEFT JOIN authors a ON b.author_id = a.author_id 
        WHERE CONCAT(a.first_name, ' ', a.last_name) LIKE ?
      `;
      params = [`%${name}%`];
    } else {
      query = `
        SELECT b.*, CONCAT(a.first_name, ' ', a.last_name) AS author_name 
        FROM books b 
        LEFT JOIN authors a ON b.author_id = a.author_id 
        WHERE b.author_id = ?
      `;
      params = [authorId];
    }

    const [books] = await dbConnections.library.query(query, params);
    
    if (books.length === 0) {
      return res.status(404).json({ 
        error: "No books found for this author",
        searchCriteria: name ? `name: ${name}` : `id: ${authorId}`
      });
    }
    
    res.json(books);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error", err });
  }
};

export const getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const [books] = await dbConnections.library.query(
      "SELECT  b.*,   CONCAT(a.first_name, ' ', a.last_name) AS author_name FROM books b LEFT JOIN authors a  ON b.author_id = a.author_id WHERE b.book_id = ?",
      [bookId]
    );
    if (books.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(books[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error", err });
  }
};
export const searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const [books] = await dbConnections.library.query(
      `SELECT  b.*,   CONCAT(a.first_name, ' ', a.last_name) AS author_name FROM books b 
       LEFT JOIN authors a ON b.author_id = a.author_id 
       WHERE b.title LIKE ? OR a.first_name LIKE ? OR a.last_name LIKE ?`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    res.json(books);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error", err });
  }
};
