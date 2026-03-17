package com.example.numbergame.dto;

/**
 * UserResponse - Safe user data to send to frontend.
 * NEVER includes password. Used for login success + stats.
 */
public class UserResponse {
    private Long id;
    private String username;
    private int totalGames;
    private int totalWins;
    private int bestScore;
    private int totalAttempts;
    private double winRate;

    public UserResponse() {}

    public UserResponse(Long id, String username, int totalGames,
                        int totalWins, int bestScore, int totalAttempts) {
        this.id = id;
        this.username = username;
        this.totalGames = totalGames;
        this.totalWins = totalWins;
        this.bestScore = bestScore;
        this.totalAttempts = totalAttempts;
        this.winRate = totalGames > 0 ? Math.round((totalWins * 100.0 / totalGames) * 10.0) / 10.0 : 0;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public int getTotalGames() { return totalGames; }
    public int getTotalWins() { return totalWins; }
    public int getBestScore() { return bestScore; }
    public int getTotalAttempts() { return totalAttempts; }
    public double getWinRate() { return winRate; }
}
