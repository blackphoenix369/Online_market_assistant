import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // ✅ Required for Render
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Database Connected Successfully!"))
  .catch(err => console.error("❌ DB connection failed:", err));

export default pool;
