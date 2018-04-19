<?php

function auth() {
    if(isset($_SESSION["logged_in"])) {
        return true;
    }

    if(isset($_COOKIE["remember"])) {
        $cookie = unserialize($_COOKIE["remember"]);
        if(password_verify(get_code_for_remember($cookie["username"]), $cookie["code"])){
            $_SESSION["logged_in"] = $cookie["username"];
            return true;
        }
    }

    return false;
}