<?php   
      include_once "conn_db.php";
        //$login = $_POST['data'];
       

        $name=$_POST['name'];
        $highscore=$_POST['highscore'];

        $make_table_hs= "CREATE TABLE IF NOT EXISTS highscore( ".
        "name VARCHAR(50) , ".
        "highscore VARCHAR(100) , ".
        "primary key ( name ))";
        mysqli_query($connect,$make_table_hs) or die("nie mozna stworzyc tabeli");
        
        
        echo var_dump( $highscore);

        $reg = "REPLACE INTO highscore (name, highscore) VALUES ('$name', '$highscore')";
             mysqli_query($connect,$reg) or die(mysqli_error($connect));
     //echo "udało się?";  
        
?>