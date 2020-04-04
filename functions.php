<?php

date_default_timezone_set('Europe/Tallinn');

function getFileArray() {
    if ( file_exists('database.json') ) {
        $fileLocation = 'database.json';
        $fileBuffer = file_get_contents( $fileLocation);
        $fileData = json_decode($fileBuffer, true);
        return $fileData;
    }
    return false;
}

function createFileArray() {
    $dataArray['data'] = array();
    return $dataArray;
}

function saveToFile($dataArray) {
    $fileLocation = 'database.json';
    $currentDate = date('m/d/Y h:i:s', time());
    $newArray = array();
    $newArray['id'] = generateId();
    $newArray['name'] = $_POST['name'];
    $newArray['date'] = $currentDate;
    $newArray['category'] = $_POST['category'];
    $newArray['colorclass'] =  $_POST['colorclass'];
    $newArray['important'] = $_POST['important'];
    $newArray['done'] = 0;

    array_push( $dataArray['data'], $newArray);
    $fileData_JSON = json_encode( $dataArray, JSON_PRETTY_PRINT );
    file_put_contents( $fileLocation, $fileData_JSON );
    echo $newArray['id'];
}


function createTaskHTML() {
    $array = getFileArray();
    if ($array) :
        for($i=0;$i < sizeof($array['data']);$i++) :
            $importanceClass = '';
            if ($array['data'][$i]['important'] == 1) {
                $importanceClass = 'importantColors';
            }
            if ($array['data'][$i]['done'] == 1) {
                continue;
            }
        ?>
            <div class="i3__list__item todo-item <?php echo $importanceClass;?>">
                <div class="l1 checkmark js-done">&#10003;</div>
                <div class="l2 circle <?php echo $array['data'][$i]['colorclass'];?>"></div>
                <div class="l3 list__text"><?php echo $array['data'][$i]['name'];?></div>
                <div class="l4"></div>
                <div class="l5"><?php echo $array['data'][$i]['category'];?></div>
                <div class="l6 remove">&times;</div>
                <input type="hidden" name="task_id" value="<?php echo $array['data'][$i]['id'];?>">
            </div>


        <?php endfor;

 
            

    endif;



}

function generateId() {
    return substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', mt_rand(1,10))), 1, 10);
}

function removeFromFile() {
    $taskId = $_POST['task_id'];
    $array = getFileArray();
    $newArray = createFileArray();
    for($i=0;$i < sizeof($array['data']);$i++) :
        if ($array['data'][$i]['id'] == $taskId) {
            continue;
        }

        array_push($newArray['data'], $array['data'][$i]);
    endfor;

    writeNewArray($newArray);
}

function writeNewArray($array) {
    $fileLocation = 'database.json';
    $fileData_JSON = json_encode( $array, JSON_PRETTY_PRINT );
    file_put_contents( $fileLocation, $fileData_JSON );
}

function markAsDone() {
    $taskId = $_POST['task_id'];
    $array = getFileArray();

    for($i=0;$i < sizeof($array['data']);$i++) :
        if ($array['data'][$i]['id'] == $taskId) {
            $array['data'][$i]['done'] = 1;
            break;
        }

    endfor;

    writeNewArray($array);
}