package com.example.numbergame.controller;

import com.example.numbergame.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {

    @Autowired
    private GameService gameService;

    /**
     * POST /api/game/start
     * Body: { "userId": 1 }
     */
    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startGame(@RequestBody Map<String, Object> body) {
        Long userId = body.containsKey("userId") ? Long.valueOf(body.get("userId").toString()) : null;
        return ResponseEntity.ok(gameService.startGame(userId));
    }

    /**
     * POST /api/game/guess
     * Body: { "gameId": 1, "guess": 42 }
     */
    @PostMapping("/guess")
    public ResponseEntity<Map<String, Object>> makeGuess(@RequestBody Map<String, Object> body) {
        Long gameId = Long.valueOf(body.get("gameId").toString());
        int guess = Integer.parseInt(body.get("guess").toString());
        return ResponseEntity.ok(gameService.processGuess(gameId, guess));
    }

    /**
     * POST /api/game/abandon
     * Body: { "gameId": 1 }
     * Called when user starts a new game before finishing current one
     */
    @PostMapping("/abandon")
    public ResponseEntity<Void> abandonGame(@RequestBody Map<String, Object> body) {
        Long gameId = Long.valueOf(body.get("gameId").toString());
        gameService.recordAbandonedGame(gameId);
        return ResponseEntity.ok().build();
    }
}
