<?php

session_start();

require_once "../../../private/flash.php";
require_once "../../../private/db.php";
require_once "../../../private/authentication.php";
require_once "../../../private/headers.php";


switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        if(auth()) {
            unset($_SESSION["logged_in"]);
            setcookie("remember", "", time() - 3600, "/");
            save_to_flash([
                "message" => "Sucsesfully logged out."
            ]);
            http_response_code(200);            
        } else {
            http_response_code(403);
        }
        break;

    default:
        http_response_code(405);
}