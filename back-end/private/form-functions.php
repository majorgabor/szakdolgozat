<?php

function not_empty($data) {
    return isset($data) && !empty($data);
}

function defender($str){
    $str = trim($str);
    $str = stripslashes($str);
    $str = htmlspecialchars($str);
    return $str;
}

function generate_code($length){
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+;:,.?";
    $code = "";
    for($i = 0; $i < $length; $i++){
        $code .= substr(str_shuffle($chars), random_int(0, strlen($chars)), 1);
    }
    return $code;
}