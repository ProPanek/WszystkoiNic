<?php
 include_once "conn_db.php";

 $username = $_POST["username"];
 $password = $_POST["password"];

 $user_select = mysqli_query($connect,"SELECT * FROM 501_users WHERE login='$username'") or die('nie mozna pobrac rekordow z tabeli1');
 $user_list = mysqli_fetch_array($user_select);

 $database_login = $user_list['login'];
 $database_password = $user_list['password'];
 $ranga = $user_list['ranga'];


 $accept = password_verify($password,$database_password);
 if($username == null || $password == null){
        $array = array(
           0    => "brak hasła albo loginu",
           1    => ""
       );
       echo json_encode($array);

     }
 else if($username == $database_login && $accept){
             $array = array(
                0    => "zalogowano",
                1    => "$username",
                2    => "$password",
                3    => "$ranga"
            );
             echo json_encode($array);
    }
 else{
     $array = array(
        0    => "nie zalogowałeś się, błędny login lub hasło",
        1    => ""
    );
    echo json_encode($array);
 }
?>
