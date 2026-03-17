package com.example.numbergame.model;

import jakarta.persistence.*;

/**
 * Game Entity - Maps to the "game" table in MySQL.
 *
 * Fields:
 *   - id:            Auto-incremented primary key
 *   - randomNumber:  The secret number to guess (1-100)
 *   - attempts:      How many guesses the user has made
 *   - gameOver:      Whether the game has been won/completed
 */
@Entity
@Table(name = "game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "random_number", nullable = false)
    private int randomNumber;

    @Column(name = "attempts", nullable = false)
    private int attempts = 0;

    @Column(name = "game_over", nullable = false)
    private boolean gameOver = false;

    @Column(name = "user_id")
    private Long userId; // which user is playing this game

    // ─── Constructors ────────────────────────────────────────────

    public Game() {}

    public Game(int randomNumber) {
        this.randomNumber = randomNumber;
        this.attempts = 0;
        this.gameOver = false;
    }

    // ─── Getters & Setters ───────────────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getRandomNumber() {
        return randomNumber;
    }

    public void setRandomNumber(int randomNumber) {
        this.randomNumber = randomNumber;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public boolean isGameOver() { return gameOver; }
    public void setGameOver(boolean gameOver) { this.gameOver = gameOver; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
