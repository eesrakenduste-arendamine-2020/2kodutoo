<?php
    if (isset($_POST["save"]) && !empty($_POST["save"])) {
        file_put_contents("database.json", $_POST["save"]);
    }
?>