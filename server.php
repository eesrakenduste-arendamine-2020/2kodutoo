<?php
   if(isset($_POST["save"]) && !empty($_POST["save"])){
     saveData($_POST["save"]);
   }
   function saveData($stringToSave){
     $object = new StdClass();
     $object->last_modified = time();
     $object->content = $stringToSave;
     $jsonString = json_encode($object);
     if(file_put_contents("fail.txt", $jsonString)){
       echo "Edukalt salvestatud";
     }
   }
 ?> 
