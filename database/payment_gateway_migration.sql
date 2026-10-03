USE techzone_db;

ALTER TABLE orders
    ADD COLUMN email VARCHAR(255) NULL AFTER customer_name,
    ADD COLUMN phone VARCHAR(50) NULL AFTER email,
    ADD COLUMN country VARCHAR(100) DEFAULT 'Sri Lanka' AFTER postal_code,
    ADD COLUMN payment_id VARCHAR(100) NULL AFTER total_amount,
    ADD COLUMN payment_status VARCHAR(50) DEFAULT 'Pending' AFTER payment_id;
