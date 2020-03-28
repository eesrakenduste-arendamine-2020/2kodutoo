<?php
    if (isset($_POST["add"]) && !empty($_POST["add"])) {
        saveData($_POST["add"]);
    }

    function saveData($stringToSave) {
        $object = new StdClass();
        $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        file_put_contents("database.json", $jsonString);
    }
?>