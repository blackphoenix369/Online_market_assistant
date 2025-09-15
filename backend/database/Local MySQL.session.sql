-- ===========================================
-- Reset Database (Drop Tables if Exist)
-- ===========================================
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- ===========================================
-- Users Table
-- ===========================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('artisan','customer','admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- Products Table
-- ===========================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artisan_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ===========================================
-- Orders Table
-- ===========================================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending','paid','shipped','delivered') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- ===========================================
-- Seed Data: Users
-- ===========================================
INSERT INTO users (name, email, password_hash, role) VALUES
('Amit Artisan', 'amit@crafts.com', 'hashed_password1', 'artisan'),
('Rohit Customer', 'rohit@customer.com', 'hashed_password2', 'customer'),
('Admin User', 'admin@market.com', 'hashed_password3', 'admin');

-- ===========================================
-- Seed Data: Products
-- ===========================================
INSERT INTO products (artisan_id, title, description, price, image_url, language) VALUES
(1, 'Handmade Clay Pot', 'Beautiful traditional clay pot', 499.99, 'https://example.com/claypot.jpg', 'en'),
(1, 'Wooden Carving', 'Intricate wooden sculpture with traditional design', 1299.50, 'https://example.com/woodcarving.jpg', 'en');

-- ===========================================
-- Seed Data: Orders
-- ===========================================
INSERT INTO orders (customer_id, product_id, quantity, total_price, status) VALUES
(2, 1, 2, 999.98, 'paid'),
(2, 2, 1, 1299.50, 'pending');
