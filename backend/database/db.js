// backend/database/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost" || "54.191.253.12" || "44.226.122.3",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Rohit@2025",
  database: process.env.DB_NAME || "artisan_market",
  port: process.env.DB_PORT || 3306,
});

console.log("✅ MySQL Database Connected Successfully! 1");

export default db;
