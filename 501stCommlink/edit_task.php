<?php
 include_once "conn_db.php";

 $ranga = $_POST["ranga"];
 $content = $_POST["content"];
 $id = $_POST["id"];
 $color = $_POST["color"];
 $color_weight = $_POST["color_weight"];
 $data_od = $_POST["data_od"];
 $data_do = $_POST["data_do"];



$sql = mysqli_query($connect,"UPDATE 501_".$ranga." SET content = '$content', color='$color', data_od='$data_od', data_do='$data_do', color_weight='$color_weight'  WHERE id = '".$id."'") or die(mysqli_error($connect));

 if ($sql) {
     echo "edytowałem zadanie";
     # code...
 }
 // var_dump($contentArray);



?>
