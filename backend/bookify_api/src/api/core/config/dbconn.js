import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' }); // Adjust the path if necessary
const createPool = (database) =>
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
export const dbConnections = {
  bookify: createPool(process.env.DB_BOOKIFY),
  library: createPool(process.env.DB_LIBRARY),
  epub: createPool(process.env.DB_EPUB),
  stats: createPool(process.env.DB_STATS),
  community: createPool(process.env.DB_COMMUNITY),
  communitySuggestions: createPool(process.env.DB_COMMUNITY_SUGGESTIONS),
  gamification: createPool(process.env.DB_GAMIFICATION),
  gamificationExtra: createPool(process.env.DB_GAMIFICATION_EXTRA),
  newsletter: createPool(process.env.DB_NEWSLETTER),
  mlProfiles: createPool(process.env.DB_ML_PROFILES),
  user: createPool(process.env.DB_USER_DB),
};
