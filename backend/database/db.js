// backend/database/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,     // Render DB hostname
  port: process.env.DB_PORT,     // Render DB port
  user: process.env.DB_USER,     // Render DB user
  password: process.env.DB_PASS, // Render DB password
  database: process.env.DB_NAME, // Render DB name
  ssl: {
    rejectUnauthorized: false,   // Required on Render
  },
});

// ✅ Export as default so `import db from ...` works
export default pool;
