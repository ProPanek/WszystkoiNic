<?php
 include_once "conn_db.php";

 $ranga = $_POST["ranga"];
 $id = $_POST["id"];

$sql = mysqli_query($connect,"DELETE FROM 501_".$ranga." WHERE id = '".$id."'") or die(mysqli_error($connect));

 if ($sql) {
     echo "usunąłem zadanie";
     # code...
 }
 // var_dump($contentArray);



?>
