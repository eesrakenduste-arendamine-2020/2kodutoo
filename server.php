<?php
    if (isset($_POST["save"]) && !empty($_POST["save"])) {
        saveData($_POST["save"]);
    }

    function saveData($stringToSave) {
        $object = new StdClass();
        // $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($stringToSave);
        file_put_contents("database.json", $jsonString);
    }
?>