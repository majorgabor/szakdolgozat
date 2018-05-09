<?php

session_start();


require_once "../../../private/form-functions.php";
require_once "../../../private/db.php";
require_once "../../../private/flash.php";
require_once "../../../private/authentication.php";
require_once "../../../private/headers.php";



switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        if(auth()) {
            http_response_code(403);
        } else {
            $flashData = load_from_flash();
            $flash["message"] = $flashData["message"] ? : NULL;
            echo json_encode($flash);
            http_response_code(200);
        }
        break;

    case "POST":
        if(isset($_SESSION["logged_in"])) {
            http_response_code(403);
        } else {
            $inputs = [];
            $errors = [];
            $messages = [];

            $json = file_get_contents("php://input");
            $post_data = json_decode($json);

            $response = [];

            if(isset($post_data->username) && !empty($post_data->username)){
                $inputs["username"] = defender($post_data->username);
            } else {
                $errors["username"] = "Username required.";
            }

            if(isset($post_data->password) && !empty($post_data->password)){
                $inputs["password"] = defender($post_data->password);
            } else {
                $errors["password"] = "Password required.";
            }

            if(!$errors){
                if(is_existing_username($inputs["username"]) && password_verify($inputs["password"], get_password_for_verify($inputs["username"]))){
                    unset($inputs["password"]);
                    if(isset($post_data->remember) && $post_data->remember){
                        $cookie = [
                            "username" => $inputs["username"],
                            "code" => password_hash(get_code_for_remember($inputs["username"]), PASSWORD_DEFAULT)
                        ];
                        setcookie("remember", serialize($cookie), time() + (86400 * 30), "/");
                    }        
                    $_SESSION["logged_in"] = $inputs["username"];
                    $response["success"] = true;
                    $response["message"] = "Sucsessfully LoggedIn.";

                    echo json_encode($response);
                    http_response_code(200);
                } else {
                    $response["success"] = false;
                    $response["message"] = "Wrong username or password.";
                    echo json_encode($response);
                    http_response_code(400);
                }
            } else {
                $response["success"] = false;
                $response["errors"] = $errors;
                $response["message"] = "Failed to LogIn.";
                echo json_encode($response);
                http_response_code(400);
            }
        }
        break;

    default:
        http_response_code(405);
}