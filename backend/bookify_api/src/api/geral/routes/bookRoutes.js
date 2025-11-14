// routes/booksRoutes.js
import express from "express";
import { 
    getBooks,
    getBooksByGenre,
    getBooksByAuthor,
    getBookById,
    searchBooks 
} from "../controllers/booksDisplay.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Route is working!" });
});


router.get("/genre/:genre", getBooksByGenre);
router.get("/author/:authorId", getBooksByAuthor);
router.get("/bookid/:bookId", getBookById);
router.get("/search", searchBooks); //?query=searchTerm
router.get("/", getBooks);

export default router;
