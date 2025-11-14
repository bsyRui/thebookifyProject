import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import bookRoutes from "./geral/routes/bookRoutes.js";
import adminBooksRoutes from "./admin/routes/adminBooksRoutes.js";
import outrosRoutes from "./geral/routes/outros.js";
import userRoute from "./geral/routes/userRoute.js";
import clientRoute from "./client/routes/clientRoute.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Test root route
app.get("/", (req, res) => {
  res.send("📚 Bookify API is running!");
});

// Mount your books API
app.use("/api/books", bookRoutes);
app.use("/api/admin/books", adminBooksRoutes);
app.use("/api/others", outrosRoutes);

app.use("/api/user",userRoute );
app.use("/api/client", clientRoute );
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
