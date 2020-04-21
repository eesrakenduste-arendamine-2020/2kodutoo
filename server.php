<?php
$myData = $_GET["data"];
$myFile = "database.txt";
$fileHandle = fopen($myFile, "w");
fwrite($fileHandle, $myData);
fclose($fileHandle);
?>