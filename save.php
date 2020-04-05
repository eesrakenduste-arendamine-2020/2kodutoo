<?php
$myData = $_GET["data"];
$myFile = "todo.txt";
$fileHandle = fopen($myFile, "w");
fwrite($fileHandle, $myData);
fclose($fileHandle);
?>