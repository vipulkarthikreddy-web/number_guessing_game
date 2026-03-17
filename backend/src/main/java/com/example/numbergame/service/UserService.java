package com.example.numbergame.service;

import com.example.numbergame.dto.AuthRequest;
import com.example.numbergame.dto.UserResponse;
import com.example.numbergame.model.User;
import com.example.numbergame.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * UserService — Register, Login (plain text), Stats.
 *
 * Plain text password: login simply checks
 *   storedPassword.equals(enteredPassword)
 * No hashing — straightforward and simple.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /** Register a new user with plain text password */
    public Map<String, Object> register(AuthRequest request) {
        Map<String, Object> response = new HashMap<>();
        String username = request.getUsername();
        String password = request.getPassword();

        if (username == null || username.trim().length() < 3) {
            response.put("success", false);
            response.put("message", "Username must be at least 3 characters.");
            return response;
        }
        if (password == null || password.length() < 4) {
            response.put("success", false);
            response.put("message", "Password must be at least 4 characters.");
            return response;
        }
        if (userRepository.existsByUsername(username.trim())) {
            response.put("success", false);
            response.put("message", "Username already taken. Choose another.");
            return response;
        }

        // Store password as plain text
        User user = new User(username.trim(), password);
        User saved = userRepository.save(user);

        response.put("success", true);
        response.put("message", "Account created! Welcome, " + saved.getUsername() + "!");
        response.put("user", toResponse(saved));
        return response;
    }

    /** Login — plain text password comparison */
    public Map<String, Object> login(AuthRequest request) {
        Map<String, Object> response = new HashMap<>();

        if (request.getUsername() == null || request.getPassword() == null) {
            response.put("success", false);
            response.put("message", "Username and password are required.");
            return response;
        }

        User user = userRepository.findByUsername(request.getUsername().trim()).orElse(null);

        // Simple plain text comparison
        if (user == null || !user.getPassword().equals(request.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid username or password.");
            return response;
        }

        response.put("success", true);
        response.put("message", "Welcome back, " + user.getUsername() + "!");
        response.put("user", toResponse(user));
        return response;
    }

    /** Get stats for a user by ID */
    public Map<String, Object> getStats(Long userId) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            response.put("success", false);
            response.put("message", "User not found.");
            return response;
        }
        response.put("success", true);
        response.put("user", toResponse(user));
        return response;
    }

    /** Called by GameService when a game ends */
    public void recordGameResult(Long userId, boolean won, int attempts) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setTotalGames(user.getTotalGames() + 1);
            user.setTotalAttempts(user.getTotalAttempts() + attempts);
            if (won) {
                user.setTotalWins(user.getTotalWins() + 1);
                if (user.getBestScore() == 0 || attempts < user.getBestScore()) {
                    user.setBestScore(attempts);
                }
            }
            userRepository.save(user);
        });
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(), user.getUsername(),
                user.getTotalGames(), user.getTotalWins(),
                user.getBestScore(), user.getTotalAttempts()
        );
    }
}
