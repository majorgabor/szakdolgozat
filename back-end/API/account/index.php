<?php

session_start();

require_once "../../private/form-functions.php";
require_once "../../private/db.php";
require_once "../../private/authentication.php";
require_once "../../private/headers.php";


switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        if(auth()) {
            echo json_encode(get_accountinfo_by_username($_SESSION["logged_in"]));
            http_response_code(200);

        } else {
            http_response_code(401);
        }
        break;
    default:
        http_response_code(405);
}