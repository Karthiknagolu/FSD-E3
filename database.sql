-- Database creation
CREATE DATABASE IF NOT EXISTS techfest_booking;
USE techfest_booking;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    date VARCHAR(50) NOT NULL,
    time VARCHAR(50) NOT NULL,
    venue VARCHAR(100) NOT NULL,
    ticket_price DECIMAL(10, 2) NOT NULL,
    total_tickets INT NOT NULL,
    available_tickets INT NOT NULL
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id VARCHAR(50) NOT NULL,
    tickets_booked INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Confirmed',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Seed initial event
INSERT INTO events (id, name, department, date, time, venue, ticket_price, total_tickets, available_tickets) 
VALUES ('event-001', 'TECHNOVATION 2026', 'Department of Computer Science & Engineering', 'May 24, 2026', '10:00 AM - 04:00 PM', 'Main Auditorium, Block C', 250.00, 100, 45)
ON DUPLICATE KEY UPDATE id=id;

-- Seed admin user (password is 'admin123')
INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@test.com', '$2y$10$8W69vQ/6gLp.p6W9L6Y.yOQ6W6Q6W6Q6W6Q6W6Q6W6Q6W6Q6W6Q6W', 'admin')
ON DUPLICATE KEY UPDATE email=email;
