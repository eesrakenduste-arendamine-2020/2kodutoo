/*function saveToFile($stringToSave){
        $object = new StdClass();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        file_put_contents('database1.txt', $jsonString);
        
    }*/

    /*function saveToFile($stringToSave){
        $text = new Stdclass();
        $text->content = $stringToSave;
        $jsonString = json_encode($text);
        $myFile = fopen("database1.txt", "w");
        fwrite($myFile, $jsonString);
        fclose($myFile);
    }*/
    /*if (function_exists('get_magic_quotes_gpc') && get_magic_quotes_gpc()) {
        function strip_slashes($input) {
            if (!is_array($input)) {
                return stripslashes($input);
            }
            else {
                return array_map('strip_slashes', $input);
            }
        }
        $_GET = strip_slashes($_GET);
        $_POST = strip_slashes($_POST);
        $_COOKIE = strip_slashes($_COOKIE);
        $_REQUEST = strip_slashes($_REQUEST);
    }*/
    /*$data = $_GET["data"];
    $file = "database.txt";

    $openFile = fopen($file, "w");

    fwrite($openFile, $data);
    fclose($openfile);*/