<?php
 include_once "conn_db.php";

 $ranga = $_POST["ranga"];
 $id = $_POST["id"];

$sql = mysqli_query($connect,"UPDATE 501_".$ranga." SET read_it = '1' WHERE id = '".$id."'") or die(mysqli_error($connect));

 if ($sql) {
     echo "potwierdzone";
     # code...
 }
 // var_dump($contentArray);



?>
