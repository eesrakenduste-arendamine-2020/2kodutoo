<?php
    if (isset($_POST["add"]) && !empty($_POST["add"])) {
        saveToFile($_POST["add"]);
    }

    function saveToFile($stringToSave) {
        $object = new StdClass();
        $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        file_put_contents("database.json", $jsonString);
    }

    function addToFile(){

    }
?>