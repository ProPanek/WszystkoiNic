<?php
 include_once "conn_db.php";

 $id = $_POST["id"];
 $ranga = $_POST["ranga"];


 $user_select = mysqli_query($connect,"SELECT * FROM 501_".$ranga." WHERE id='$id' "  ) or die('nie mozna pobrac rekordow z tabeli1');
 // $contentArrayTasks = [];
 // $contentArrayColor = [];

 // $container = [];
$return_arr = array();

 while ($user_list = mysqli_fetch_array($user_select)) {
     # code...
 	$row_array['content'] = $user_list['content'];
    $row_array['color'] = $user_list['color'];
    $row_array['data_od'] = $user_list['data_od'];
    $row_array['data_do'] = $user_list['data_do'];

    array_push($return_arr,$row_array);

    // array_push($contentArrayTasks,$user_list['content']);
    // array_push($contentArrayColor,$user_list['color']);

 }
 // array_push($container,$contentArrayTasks,$contentArrayColor);
 echo json_encode($return_arr);
 // var_dump($contentArray);

// $return_arr = array();
//     $fetch = mysqli_query($connect, "SELECT * FROM ${login}_${name}_stat WHERE groups='umiejetnosci'");
//     while ($rowum = mysqli_fetch_array($fetch)) {
//         $row_array['name'] = $rowum['name'];
//         $row_array['value'] = $rowum['value'];
//         array_push($return_arr,$row_array);
//     }
//     echo json_encode($return_arr);

?>
