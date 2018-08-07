<?php
 include_once "conn_db.php";

 $ranga = $_POST["ranga"];

 $user_select = mysqli_query($connect,"SELECT * FROM 501_".$ranga." ORDER BY color_weight DESC"  ) or die('nie mozna pobrac rekordow z tabeli1');
$return_arr = array();

 while ($user_list = mysqli_fetch_array($user_select)) {
 	$row_array['id'] = $user_list['id'];
 	$row_array['content'] = $user_list['content'];
    $row_array['color'] = $user_list['color'];
    $row_array['data_od'] = $user_list['data_od'];
    $row_array['data_do'] = $user_list['data_do'];
    $row_array['read_it'] = $user_list['read_it'];
    array_push($return_arr,$row_array);

 }
 echo json_encode($return_arr);


?>
