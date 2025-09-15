import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // ✅ required for Render PostgreSQL
  },
});

// ✅ Test connection once on startup
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL Database Connected Successfully!");
    client.release(); // release the connection back to the pool
  })
  .catch(err => console.error("❌ DB connection failed:", err));

export default pool;
