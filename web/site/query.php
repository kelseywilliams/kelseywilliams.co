<?php
    session_start();

    $config = include("backend/config.php");
    $mysqli = new mysqli($config["host"], $config["username"], $config["password"], $config["db"]);
    $mysqli->set_charset("utf8mb4");
    $stmt = $mysqli->prepare("SELECT * FROM gen_table");
    $stmt->execute();
    $result = $stmt->get_result();
    $myArray = array();
    while($row = $result->fetch_assoc()) {
        $myArray[] = $row;
    }
    echo json_encode($myArray);
    $stmt->close();
?>