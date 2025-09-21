import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Rohit@2025",
  database: process.env.DB_NAME || "online_market_assistant",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
