<?php

	$login = $_POST['username'];
    $password = $_POST['password'];
    $password_repeat = $_POST['password_verify'];
    $email = $_POST['email'];

    if (strlen($login) <= 2) {
        die('login jest za krótki, minimalna długość to 5 znaków');
    }
    if (!preg_match("/^[a-zA-Z0-9 ]+$/",$login)) {
        die("tylko duże/małe litery oraz spacje");
    }
    if ($password != $password_repeat) {
    	die('hasła nie pasują do siebie');
    }
    if (strlen($password) < 5) {
        die('hasło jest za krótkie, minimalna długość to 8 znaków');
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('źle wpisany email');
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    include_once "conn_db.php";

    $respond_all = mysqli_query($connect,"SELECT * FROM 501_users WHERE login='$login' OR email='$email'") or die('nie mozna pobrac rekordow z tabeli1');
    $rec_all = mysqli_fetch_array($respond_all);
    $database_login = $rec_all['login'];
    $database_email = $rec_all['email'];

    if ($login === $database_login) {
        die("Login jest już zajęty");
    }
    if ($email === $database_email) {
        die("email jest już zarejestrowany");
    }

	$reg = "INSERT INTO 501_users (login, password, email) VALUES ('$login', '$hash', '$email')";
 	mysqli_query($connect,$reg) or die('nie mozna wstawic rekordow');

    echo "Wszystko jest w porządku, poproś adma o akceptacje twojego konta";

?>
