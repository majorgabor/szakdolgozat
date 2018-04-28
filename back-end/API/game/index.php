<?php

session_start();

require_once "../../private/form-functions.php";
require_once "../../private/db.php";
require_once "../../private/authentication.php";
require_once "../../private/headers.php";

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        if(auth()) {
            
            $json = file_get_contents("php://input");
            $post_data = json_decode($json);
            
            $db_data = get_accountinfo_by_username($_SESSION["logged_in"]);

            if(isset($post_data->isWin)){
                $db_data["battles"] += 1;
                if($post_data->isWin){
                    $db_data["wins"] += 1;
                    $db_data["points"] += 30;
                } else {
                    $db_data["points"] += 10;
                }

                set_points_and_stat($_SESSION["logged_in"], $db_data["battles"], $db_data["wins"], $db_data["points"]);
            } else {
                http_response_code(400);
                break;
            }


            http_response_code(200);

        } else {
            http_response_code(401);
        }
        break;
    default:
        http_response_code(405);
}