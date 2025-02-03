CREATE DATABASE MovieDB;

USE MovieDB;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_name VARCHAR(100) NOT NULL,
    user_lastnames VARCHAR(100) NOT NULL,
	email VARCHAR(150) UNIQUE NOT NULL,
	password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE watch_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id VARCHAR(24) NOT NULL,
    title VARCHAR(255) NOT NULL,
    poster VARCHAR(500) NOT NULL,
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

    INSERT INTO users (user_name, user_lastnames, email, password)
VALUES ("Javier", "ELmismo", "elmismo@gmail.com", "miPass1");
    