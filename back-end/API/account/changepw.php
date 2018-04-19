<?php

session_start();

require_once "../../private/form-functions.php";
require_once "../../private/db.php";
require_once "../../private/authentication.php";
require_once "../../private/headers.php";

switch($_SERVER["REQUEST_METHOD"]) {
    case "POST":
        if(isset($_SESSION["logged_in"])) {
            $inputs = [];
            $errors = [];
            $messages = [];

            $json = file_get_contents("php://input");
            $post_data = json_decode($json);
            
            if(isset($post_data->newpassword) && !empty($post_data->newpassword) && strlen($post_data->newpassword) > 5){
                if(isset($post_data->newpassword2) && !empty($post_data->newpassword2)){
                    if($post_data->newpassword === $post_data->newpassword2){
                        $inputs["newpassword"] = defender($post_data->newpassword);
                    } else {
                        $errors["newpassword2"] = "Passwords don't match.";
                    }
                } else {
                    $errors["newpassword2"] = "New password again required.";
                }
            } else {
                $errors["newpassword"] = "6 character long password required.";
            }
            
            if(isset($post_data->oldpassword) && !empty($post_data->oldpassword) && strlen($post_data->oldpassword) > 5){
                    $inputs["oldpassword"] =  defender($post_data->oldpassword);
            } else {
                $errors["oldpassword"] = "Password reqired for confirm.";
            }
            
            if(!$errors){
                if(password_verify($inputs["oldpassword"], get_password_for_verify($_SESSION["logged_in"]))){
                    unset($inputs["oldpassword"]);
                    if(change_password($_SESSION["logged_in"], password_hash($inputs["newpassword"], PASSWORD_DEFAULT))){
                        unset($inputs["newpassword"]);            
                        $response["success"] = true;
                        $response["message"] = "Password successfully changed.";
                        echo json_encode($response);
                        http_response_code(200);
                    } else {
                        $response["success"] = false;
                        $response["message"] = "Failed to change password.";
                        echo json_encode($response);
                        http_response_code(400);
                    }
                } else {
                    $response["success"] = false;
                    $response["error"] = ["old" => "Wrong password."];
                    $response["message"] = "Wrong password.";
                    echo json_encode($response);
                    http_response_code(400);
                }
            } else {
                $response["success"] = false;
                $response["errors"] = $errors;
                $response["message"] = "Invalid data, please fix it.";
                echo json_encode($response);
                http_response_code(400);
            }
        } else {
            http_response_code(401);
        }
        break;
    default:
        http_response_code(405);
}