-- =====================================================================
-- Business Listings Dashboard — Database Schema
-- =====================================================================
-- This SQL file creates the `listing_master` table and associated
-- indexes for the Business Listings Dashboard application.
--
-- Compatible with: MySQL 8.0+ / MariaDB 10.5+
-- =====================================================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS business_listings
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE business_listings;

-- ── Drop existing table (for fresh setup) ───────────────────────
DROP TABLE IF EXISTS listing_master;

-- ── Create listing_master table ─────────────────────────────────
CREATE TABLE listing_master (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    business_name   VARCHAR(255)    NOT NULL,
    category        VARCHAR(100)    NOT NULL,
    city            VARCHAR(100)    NOT NULL,
    address         VARCHAR(500)    NOT NULL,
    phone           VARCHAR(20)     DEFAULT NULL,
    source          VARCHAR(50)     NOT NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Single-column indexes for filtering
    INDEX idx_business_name (business_name),
    INDEX idx_category (category),
    INDEX idx_city (city),
    INDEX idx_source (source),

    -- Composite indexes for analytics queries
    INDEX idx_city_category (city, category),
    INDEX idx_source_city (source, city),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Stores scraped business listings from multiple sources';

-- ── Sample Data (first 10 entries) ──────────────────────────────
INSERT INTO listing_master (business_name, category, city, address, phone, source) VALUES
('Sharma Kitchen', 'Restaurant', 'Mumbai', 'Plot 42, Andheri Road, Mumbai - 400058', '+91-9876543210', 'Justdial'),
('Patel Plumbing Works', 'Plumber', 'Ahmedabad', 'Plot 15, SG Highway, Ahmedabad - 380015', '+91-9123456789', 'Sulekha'),
('Dr. Reddy Health Center', 'Doctor', 'Hyderabad', 'Plot 88, Banjara Hills, Hyderabad - 500034', '+91-9988776655', 'Google Maps'),
('Singh Electrical Works', 'Electrician', 'Delhi', 'Plot 201, Karol Bagh, Delhi - 110005', '+91-9876501234', 'Justdial'),
('Priya Beauty Salon', 'Salon', 'Bangalore', 'Plot 67, Koramangala, Bangalore - 560034', '+91-9012345678', 'Sulekha'),
('Kumar Fitness Center', 'Gym', 'Chennai', 'Plot 33, T Nagar, Chennai - 600017', '+91-8899776655', 'Google Maps'),
('Gupta & Associates', 'CA/Accountant', 'Kolkata', 'Plot 12, Park Street, Kolkata - 700016', '+91-9876123456', 'IndiaMART'),
('Raj Photography', 'Photographer', 'Jaipur', 'Plot 55, C Scheme, Jaipur - 302001', '+91-9988001122', 'Justdial'),
('Nair Academy', 'Tutor', 'Kochi', 'Plot 78, MG Road, Kochi - 682011', '+91-9345678901', 'Sulekha'),
('Desai Interiors', 'Interior Designer', 'Pune', 'Plot 145, Koregaon Park, Pune - 411001', '+91-9012398765', 'TradeIndia');

-- =====================================================================
-- End of Schema
-- =====================================================================
