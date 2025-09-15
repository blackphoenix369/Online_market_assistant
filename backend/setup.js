// backend/setupFullDB.js
import db from "./database/db.js"; // adjust path if needed

const schema = `
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
`;

const seedData = async () => {
  try {
    // Enable multiple statements temporarily
    await db.query("SET SESSION sql_mode='STRICT_ALL_TABLES'");

    // Split schema into separate statements
    const statements = schema.split(";").filter(s => s.trim());

    for (const stmt of statements) {
      await db.query(stmt);
    }

    // Insert sample data
    await db.query(`
      INSERT INTO users (name, email, password) VALUES
      ('Alice Johnson', 'alice@example.com', 'alice123'),
      ('Bob Smith', 'bob@example.com', 'bob123'),
      ('Charlie Brown', 'charlie@example.com', 'charlie123');
    `);

    await db.query(`
      INSERT INTO products (name, description, price) VALUES
      ('Handmade Necklace', 'Beautiful artisan necklace made with natural stones.', 25.50),
      ('Wooden Sculpture', 'Carved wooden sculpture representing tribal art.', 120.00),
      ('Ceramic Vase', 'Colorful ceramic vase, hand-painted.', 45.75);
    `);

    await db.query(`
      INSERT INTO orders (user_id, product_id, quantity) VALUES
      (1, 1, 2),
      (2, 2, 1),
      (3, 3, 3);
    `);

    console.log("✅ Database setup and sample data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Setup failed:", err.message);
    process.exit(1);
  }
};

seedData();
