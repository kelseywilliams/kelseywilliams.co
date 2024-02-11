<?php
    // Start php session to acess cookies and then determine possible success or failure messages
    // Depending on the success/fail status, the class of the message div will be set to 
    // empty - set to invisible
    // success - display success message and set box to success style
    // failure - display failure message and set box to failure style
    session_start();
    $status_class = "empty";
    $status = "";
    // Display the session variable
    //echo '<pre>'; var_dump($_SESSION); echo '</pre>';
    if (isset($_SESSION["success"])){
        $status_class = "success";
        $status = $_SESSION["success"];
        unset($_SESSION["success"]);
    }
    if (isset($_SESSION["error"])){
        $status_class = "error";
        $status = $_SESSION["error"];
        unset($_SESSION["error"]);
    }
?>

</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="stylesheets/container.css">
    <link rel="stylesheet" href="stylesheets/styles.css">
</head>
<body>
    <div class="banner">
        <div id="status" class="<?php echo $status_class ?>"><p class="status"><?php echo $status?></p></div>
    </div>
    <script>
        // Function to change the class of the element with the id "status" to "empty"
        function changeStatusClass() {
            var statusElement = document.getElementById('status');
            if (statusElement) {
                statusElement.className = 'empty';
            }
        }

        // Set a timeout to execute the function after 5 seconds (5 milliseconds)
        setTimeout(changeStatusClass, 5000);
    </script>
    <div class="container">
    <h2>Database Input</h2>
        <form action="backend/handler.php" method="post">
            <input type="text" id="username" name="input" required placeholder="Type something...">
            <button type="submit">Send</button>
            <a href="query.php">query.php</a>
        </form>
    </div>
</body>
</html>
