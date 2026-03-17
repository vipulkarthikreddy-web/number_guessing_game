package com.example.numbergame.service;

import com.example.numbergame.model.Game;
import com.example.numbergame.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    @Lazy
    private UserService userService;

    public Map<String, Object> startGame(Long userId) {
        int randomNumber = new Random().nextInt(100) + 1;
        Game game = new Game(randomNumber);
        game.setUserId(userId);
        Game savedGame = gameRepository.save(game);

        Map<String, Object> response = new HashMap<>();
        response.put("gameId", savedGame.getId());
        response.put("message", "Game started! Guess a number between 1 and 100.");
        return response;
    }

    public Map<String, Object> processGuess(Long gameId, int guess) {
        Map<String, Object> response = new HashMap<>();

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found: " + gameId));

        if (game.isGameOver()) {
            response.put("message", "Game is already over! Start a new game.");
            response.put("attempts", game.getAttempts());
            response.put("gameOver", true);
            return response;
        }

        game.setAttempts(game.getAttempts() + 1);

        if (guess < game.getRandomNumber()) {
            response.put("message", "Too Low! Try a higher number.");
            response.put("gameOver", false);
        } else if (guess > game.getRandomNumber()) {
            response.put("message", "Too High! Try a lower number.");
            response.put("gameOver", false);
        } else {
            game.setGameOver(true);
            response.put("message", "Correct! You guessed it in " + game.getAttempts() + " attempts!");
            response.put("gameOver", true);
            if (game.getUserId() != null) {
                userService.recordGameResult(game.getUserId(), true, game.getAttempts());
            }
        }

        gameRepository.save(game);
        response.put("attempts", game.getAttempts());
        return response;
    }

    public void recordAbandonedGame(Long gameId) {
        gameRepository.findById(gameId).ifPresent(game -> {
            if (!game.isGameOver() && game.getAttempts() > 0 && game.getUserId() != null) {
                game.setGameOver(true);
                gameRepository.save(game);
                userService.recordGameResult(game.getUserId(), false, game.getAttempts());
            }
        });
    }
}
