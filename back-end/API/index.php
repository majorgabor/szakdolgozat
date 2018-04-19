<?php
ini_set( 'session.cookie_httponly', 1 );
session_start();

require_once "../private/authentication.php";
require_once "../private/db.php";
require_once "../private/headers.php";

switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        if(auth()) {
            $response["user"] = $_SESSION["logged_in"];
        } else {
            $response["user"] = NULL;
        }
        echo json_encode($response);
        http_response_code(200);
        break;

    default:
        http_response_code(405);
}