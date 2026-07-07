# 🎯 Number Guessing Game

A full-stack Number Guessing Game built using React, Vite, Spring Boot, and MySQL.

---

## 📁 Project Structure

```
number-guessing-game/
├── frontend/                          ← React + Vite app
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx                   ← React entry point
│       ├── App.jsx                    ← Root component
│       ├── index.css                  ← Global styles
│       ├── api/
│       │   └── gameApi.js             ← All backend API calls
│       └── components/
│           └── Game.jsx               ← Main game UI component
│
├── backend/                           ← Spring Boot app
│   ├── pom.xml                        ← Maven dependencies
│   └── src/main/
│       ├── java/com/example/numbergame/
│       │   ├── NumbergameApplication.java   ← Main entry point
│       │   ├── controller/
│       │   │   └── GameController.java      ← REST endpoints
│       │   ├── service/
│       │   │   └── GameService.java         ← Game logic
│       │   ├── repository/
│       │   │   └── GameRepository.java      ← DB access
│       │   └── model/
│       │       └── Game.java                ← Entity / DB table
│       └── resources/
│           └── application.properties       ← DB config
│
└── database-setup.sql                 ← MySQL setup script
```

---

## 🚀 How to Run

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven 3.6+

---

### Step 1 — Set Up MySQL

```bash
# Log into MySQL
mysql -u root -p

# Run the setup script
source /path/to/number-guessing-game/database-setup.sql
```

Or manually:
```sql
CREATE DATABASE numbergame_db;
```

---

### Step 2 — Configure the Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/numbergame_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD   ← change this
```

---

### Step 3 — Run the Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

---

### Step 4 — Run the Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

---

## 🔌 REST API Reference

### POST `/api/game/start`
Starts a new game. Generates a random number and saves it to the database.

**Response:**
```json
{
  "gameId": 1,
  "message": "Game started! Guess a number between 1 and 100."
}
```

---

### POST `/api/game/guess`
Submit a guess for an active game.

**Request Body:**
```json
{
  "gameId": 1,
  "guess": 42
}
```

**Response (Too Low):**
```json
{
  "message": "Too Low! Try a higher number.",
  "attempts": 1,
  "gameOver": false
}
```

**Response (Correct):**
```json
{
  "message": "🎉 Correct! You guessed it in 5 attempts!",
  "attempts": 5,
  "gameOver": true
}
```

---

## 🗄️ Database Schema

**Table: `game`**

| Column        | Type        | Description                        |
|---------------|-------------|------------------------------------|
| id            | BIGINT (PK) | Auto-incremented game ID           |
| random_number | INT         | The secret number (1–100)          |
| attempts      | INT         | Number of guesses made             |
| game_over     | TINYINT(1)  | 1 = game won, 0 = in progress      |

---

## 🧠 File Explanations

| File | Role |
|------|------|
| `Game.java` | JPA Entity — maps Java class to MySQL `game` table |
| `GameRepository.java` | Extends JpaRepository — provides free CRUD methods |
| `GameService.java` | Business logic — random number, guess comparison, attempt tracking |
| `GameController.java` | REST controller — maps HTTP routes to service methods |
| `gameApi.js` | Axios functions — abstracts all backend HTTP calls |
| `Game.jsx` | React component — UI state, input handling, API calls |
| `App.jsx` | Root component — renders Game inside the app shell |
| `application.properties` | Spring Boot config — DB URL, credentials, JPA settings |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| HTTP Client | Axios |
| Backend | Spring Boot 3.2, Java 17 |
| ORM | Spring Data JPA / Hibernate |
| Database | MySQL 8 |
| Build Tool | Maven |
