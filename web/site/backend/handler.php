<?php
    session_start();
    // If the page was called with a POST request, execute
    $METHOD = $_SERVER["REQUEST_METHOD"];
    if($METHOD == "POST"){
        // Begin a session cookie to track current user data
        // Get database credentials from config.php
        $config = include("config.php");
        $DB_HOST = $config["host"];
        $DB_USERNAME = $config["username"];
        $DB_PASSWORD = $config["password"];
        $DB = $config["db"];

        // Fetch values sent 
        $input = $_POST["input"];


        // Connect to the database
        $mysqli = new mysqli($DB_HOST, $DB_USERNAME, $DB_PASSWORD, $DB);
        
        // Atempt to create a new user
        try {
            $result = $mysqli->query("INSERT INTO gen_table (entry) VALUES ('{$input}');");
        }
        catch (Exception $e){
            error_log($mysqli->error);
        }

        if($result) {
            $_SESSION["success"] = "Data inserted successfully.";
            header("Location: /index.php", 301);
            exit();
        }
        else {
            $_SESSION["error"] = "Failed to insert data.";
            header("Location: /index.php", 301);
            exit();
        }
        echo $result;
        #Close the database connection
        $mysqli->close();
    }
?>