<?php
 include_once "conn_db.php";

 $ranga = $_POST["ranga"];

 $user_select = mysqli_query($connect,"SELECT * FROM 501_".$ranga) or die('nie mozna pobrac rekordow z tabeli1');
 $contentArray = [];
 array_push($contentArray,"colors");

 while ($user_list = mysqli_fetch_array($user_select)) {
     # code...
    array_push($contentArray,$user_list['color']);

 }
 echo json_encode($contentArray);
 // var_dump($contentArray);



?>
