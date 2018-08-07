<?php
 include_once "conn_db.php";

 $ranga = $_POST["ranga"];
 $task = $_POST["task"];
 $color = $_POST["color"];
 $data_od = $_POST["data_od"];
 $data_do = $_POST["data_do"];
 $color_weight = $_POST["color_weight"];



 $user_select = mysqli_query($connect,"INSERT INTO 501_".$ranga." (content,read_it,color,color_weight,data_od,data_do) VALUES('$task',0, '$color','$color_weight','$data_od','$data_do')") or die(mysqli_error($connect));

 if ($user_select) {
     echo "zapisałem zadanie";
     # code...
 }
 // var_dump($contentArray);



?>
