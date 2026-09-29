-- TechZone database setup for ICT2142 Week 5-6 practicals.
CREATE DATABASE IF NOT EXISTS techzone_db;
USE techzone_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    phone VARCHAR(50),
    shipping_address TEXT,
    billing_address TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    tag VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 5.0,
    reviews INT DEFAULT 0,
    specs TEXT,
    image VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_session_id VARCHAR(128) NOT NULL,
    user_id INT NULL,
    product_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cart_session (user_session_id),
    INDEX idx_cart_user (user_id),
    INDEX idx_cart_product (product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_session_id VARCHAR(128) NOT NULL,
    user_id INT NULL,
    customer_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    card_number VARCHAR(4),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order_user (user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

INSERT INTO products (id,name,category,tag,price,rating,reviews,specs,image) VALUES
(1,'NVIDIA GeForce RTX 5090 32GB Founders Edition','GPU','FLAGSHIP RTX 50',895000.00,5.0,94,'32GB GDDR7 · 512-bit · DLSS 4.0 · Blackwell Architecture','images/hero_rtx5090.png'),
(2,'MSI GeForce RTX 5080 16GB Gaming X Trio','GPU','NEXT-GEN GPU',540000.00,4.9,62,'16GB GDDR7 · TRI FROZR 3S · ARGB Backplate','images/gpu.png'),
(3,'Intel Core Ultra 9 285K Processor','CPU','ARROW LAKE',235000.00,4.9,38,'24 Cores (8P+16E) · 24 Threads · Up to 5.7GHz','images/cpu.png'),
(4,'AMD Ryzen 9 9950X Processor','CPU','ZEN 5 KING',245000.00,5.0,51,'16 Cores · 32 Threads · 5.7GHz Boost · 80MB Cache','images/cpu.png'),
(5,'MSI MEG Z890 GODLIKE Gaming Motherboard','Motherboard','MSI FLAGSHIP',360000.00,5.0,19,'LGA1851 · M-Vision Dashboard · Thunderbolt 5 · WiFi 7','images/mobo.png')
ON DUPLICATE KEY UPDATE name=VALUES(name), price=VALUES(price), specs=VALUES(specs), image=VALUES(image);
