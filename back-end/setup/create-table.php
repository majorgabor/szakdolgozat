<?php

$database = new mysqli("127.0.0.1", "root", "", "battleships");

if ($database->connect_error) {
    die("Connection failed: " . $database->connect_error);
}

$sql = "CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    code VARCHAR(8) NOT NULL,
    battles INT default 0,
    wins INT default 0,
    points INT default 0
)";

if ($database->query($sql) === TRUE) {
    echo "Table 'users' created successfully";
} else {
    echo "Error creating table: " . $database->error;
}

$database->close();