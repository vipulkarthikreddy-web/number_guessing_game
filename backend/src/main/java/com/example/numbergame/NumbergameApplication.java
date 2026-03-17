package com.example.numbergame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Number Guessing Game Spring Boot application.
 * @SpringBootApplication combines:
 *   - @Configuration (marks as config source)
 *   - @EnableAutoConfiguration (auto-configures Spring)
 *   - @ComponentScan (scans for components in this package)
 */
@SpringBootApplication
public class NumbergameApplication {

    public static void main(String[] args) {
        SpringApplication.run(NumbergameApplication.class, args);
    }
}
