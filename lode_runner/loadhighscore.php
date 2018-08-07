<?php   
       include_once "conn_db.php";
        //$login = $_POST['data'];
        
 $return_arr_mag = array();

        $fetch_mag = mysqli_query($connect, "SELECT * FROM highscore"); 
        
        while ($rowmag = mysqli_fetch_array($fetch_mag)) {
            $row_array['name'] = $rowmag['name'];
            $row_array['highscore'] = $rowmag['highscore'];
            array_push($return_arr_mag,$row_array);
        }

    
    echo json_encode($return_arr_mag);
    
    
        
?>