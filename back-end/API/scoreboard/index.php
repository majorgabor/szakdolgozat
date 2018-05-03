<?php

session_start();

require_once "../../private/form-functions.php";
require_once "../../private/db.php";
require_once "../../private/authentication.php";
require_once "../../private/headers.php";

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        if(auth()) {
            $response["username"] = $_SESSION["logged_in"];
        }
        $response["battles"] = get_score_board_info_order_by_("battles");
        $response["wins"] = get_score_board_info_order_by_("wins");
        $response["points"] = get_score_board_info_order_by_("points");

        echo json_encode($response);
        http_response_code(200);
        break;

    default:
        http_response_code(405);
}