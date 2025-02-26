DROP DATABASE IF EXISTS MovieDB;

CREATE DATABASE MovieDB;

USE MovieDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_lastnames VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol VARCHAR(15) DEFAULT 'usuario'
);

CREATE TABLE watch_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    movie_id VARCHAR(24) NOT NULL,
    title VARCHAR(255) NOT NULL,
    poster VARCHAR(500) NOT NULL,
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
);


/*Para usar el admin */

 INSERT INTO
    users (
        user_name,
        user_lastnames,
        email,
        password,
        rol
    )
VALUES (
        "Javier",
        "Eladmin",
        "eladmin@gmail.com",
        "$2a$10$McwDxzKUuJs4NmDMq17.Zuryfy6tFCCCB9DskM.63T.c7Gc8MCv3W",
        "admin"
    );
    