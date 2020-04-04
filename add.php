<?php
require('functions.php');

if ( file_exists('database.json') ) {
    saveToFile(getFileArray());
 } else {
    saveToFile(createFileArray());
}