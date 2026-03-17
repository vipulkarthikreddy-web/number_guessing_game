-- ================================================
-- MySQL Setup Script for Number Guessing Game
-- Run this in your MySQL client before starting the app
-- ================================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS numbergame_db;

-- 2. Select the database
USE numbergame_db;

-- 3. Create the game table
-- (Spring Boot will also auto-create this via JPA if it doesn't exist,
--  but running this manually ensures the correct structure)
CREATE TABLE IF NOT EXISTS game (
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    random_number INT          NOT NULL,
    attempts      INT          NOT NULL DEFAULT 0,
    game_over     TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

-- 4. Verify
DESCRIBE game;
SELECT 'Database setup complete!' AS status;
