package com.example.numbergame.repository;

import com.example.numbergame.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * GameRepository - Data Access Layer
 *
 * Extends JpaRepository which provides built-in methods:
 *   - save(game)       → INSERT or UPDATE a game record
 *   - findById(id)     → SELECT by primary key
 *   - findAll()        → SELECT all games
 *   - deleteById(id)   → DELETE by primary key
 *
 * Spring Data JPA auto-implements this interface at runtime —
 * no SQL queries needed for basic CRUD operations.
 */
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    // No extra methods needed — JpaRepository covers all we need.
}
