// backend/database/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST || "localhost"; // Only one fallback
const dbUser = process.env.DB_USER || "root";
const dbPass = process.env.DB_PASS || "Rohit@2025";
const dbName = process.env.DB_NAME || "artisan_market";
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const db = await mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName,
  port: dbPort,
});

console.log("✅ MySQL Database Connected Successfully!");

export default db;
