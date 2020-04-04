<?php
    if(isset($_POST["save"]) && !empty($_POST["save"])){
        saveToFile($_POST["save"]);
    }

    function saveToFile($stringToSave){
        $object = new StdClass();
        $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);

        if(sizeof($stringToSave) == 0){
            file_put_contents("database.txt", "");
        }
        else{
            file_put_contents("database.txt", $jsonString);
        }


    }
?>