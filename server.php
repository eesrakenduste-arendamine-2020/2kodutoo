<?php
<<<<<<< HEAD
    if (isset($_POST["add"]) && !empty($_POST["add"])) {
        saveToFile($_POST["add"]);
=======
    if (isset($_POST["save"]) && !empty($_POST["save"])) {
        saveToFile($_POST["save"]);
>>>>>>> 6690c6059289af5fa9dd2da27b4807f6f697e1cc
    }

    function saveToFile($stringToSave) {
        $object = new StdClass();
        $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        file_put_contents("database.json", $jsonString);
    }
<<<<<<< HEAD

    function addToFile(){

    }
=======
>>>>>>> 6690c6059289af5fa9dd2da27b4807f6f697e1cc
?>