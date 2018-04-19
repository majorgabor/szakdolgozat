<?php

session_start();

require_once "../../private/form-functions.php";
require_once "../../private/db.php";
require_once "../../private/flash.php";
require_once "../../private/authentication.php";
require_once "../../private/headers.php";


switch($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        if(auth()) {
            http_response_code(403);
        } else {
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

            if(isset($post_data->firstname) && !empty($post_data->firstname)){
                $inputs["firstname"] = defender($post_data->firstname);
            } else {
                $errors["firstname"] = "Firstname required.";
            }

            if(isset($post_data->lastname) && !empty($post_data->lastname)){
                $inputs["lastname"] = defender($post_data->lastname);
            } else {
                $errors["lastname"] = "Lastname required.";
            }

            if(isset($post_data->username) && !empty($post_data->username)){
                if(!is_existing_username(defender($post_data->username))){
                    $inputs["username"] = defender($post_data->username);
                } else {
                    $errors["username"] = "Username already exist.";
                }
            } else {
                $errors["username"] = "Unique username required.";
            }

            if(isset($post_data->email) && !empty($post_data->email)){
                $inputs["email"] = defender($post_data->email);
                
            } else {
                $errors["email"] = "Email required.";
            }

            if(isset($post_data->password) && !empty($post_data->password) && strlen($post_data->password) > 5){
                if(isset($post_data->password2) && !empty($post_data->password2)){
                    if($post_data->password === $post_data->password2){
                        $inputs["password"] = defender($post_data->password);
                    } else {
                        $errors["password2"] = "Passwords don't match.";
                    }
                } else {
                    $errors["password2"] = "Password again required.";
                }
            } else {
                $errors["password"] = "6 character long password required.";
            }

            if(!isset($post_data->agree) || !$post_data->agree){
                $errors["agree"] = "You must accept terms & conditions.";
            }

            if(!$errors){
                $newUser = array(
                    "firstname" => $inputs["firstname"],
                    "lastname" => $inputs["lastname"],
                    "username" => $inputs["username"],
                    "email" => $inputs["email"],
                    "password" => password_hash($inputs['password'], PASSWORD_DEFAULT),
                    "code" => generate_code(8)
                );
                
                if(insert_new_user($newUser)){
                    $respond["success"] = true;
                    $respond["message"] = "Sucsessfuly Signed Up.";
                    save_to_flash([
                        "message" => "LogIn into your new account.",
                    ]);
                    echo json_encode($respond);
                    http_response_code(200);
                } else {
                    $respond["success"] = false;
                    $respond["message"] = "Faild to Sign Up.";
                    echo json_encode($respond);
                    http_response_code(400);
                }
            } else {
                $respond["success"] = false;
                $respond["errors"] = $errors;
                $respond["message"] = "Invalid data, please fix it.";
                echo json_encode($respond);
                http_response_code(400);
            }
        }
        break;
    
    default:
        http_response_code(405);
}