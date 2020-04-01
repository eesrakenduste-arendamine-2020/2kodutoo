<?php
    //echo htmlspecialchars($_GET["data"]);
    if(isset($_GET["data"]) && !empty($_GET["data"])){
        saveToFile($_GET["data"]);
        //echo $_GET["data"];
    }

    
    function saveToFile($stringToSave){
        $text = new Stdclass();
        $text->content = $stringToSave;
        $jsonString = json_encode($text);
        $file = "database.txt";
        $openFile = fopen($file, "w");
    
        fwrite($openFile, stripslashes($jsonString));
        fclose($openFile);
    }

?>