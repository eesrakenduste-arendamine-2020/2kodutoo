<?php
    if(isset($_POST["addEntry"]) && !empty($_POST["addEntry"])){
        saveToFile($_POST["addEntry"]);
        
    }

    function saveToFile($stringToSave){
        $object = new StdClass();
        $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        file_put_contents("database.txt", $jsonString);

    }
?>