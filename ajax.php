<?php
require "config.php";

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if(isset($_GET['addtodo'])) {
    $title = test_input($_GET['title']);
    $importance = $_GET['radio'];
    $date = $_GET['date'];
    $completed = 0;

    $pdo = new PDO(Config::$dsn, Config::$user, Config::$password);
    $sql = "INSERT into todos (title, importance, completed, date) VALUES (:title, :importance, :completed, :date)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['title' => $title, 'importance' => $importance, 'completed' => $completed, 'date' => $date]);
}

if(isset($_GET['id'])) {
    $id = $_GET['id'];

    $pdo = new PDO(Config::$dsn, Config::$user, Config::$password);
    $stmt = $pdo->query('SELECT * FROM todos WHERE id = '. $id);
    $result = $stmt->fetch();

    if(empty($result['completed'])) {
        $sql = "UPDATE todos SET completed = 1 WHERE id = :id";
    } else {
        $sql = "UPDATE todos SET completed = 0 WHERE id = :id";
    }
    $pdo = new PDO(Config::$dsn, Config::$user, Config::$password);
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id'=> $id]);
}

if(isset($_GET['deleted'])) {
    $id = $_GET['deleted'];

    $pdo = new PDO(Config::$dsn, Config::$user, Config::$password);
    $sql = "DELETE FROM todos WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id'=> $id]);
}

echo '<div class="heading">Important todos:</div>';
echo '<div class="list">';
#fetch results
if(isset($_GET['sortasc'])) {
    $order = ' ORDER BY title';
    $asc = ' data-sort=sortasc';
} else if(isset($_GET['sortdesc'])) {
    $order = ' ORDER BY title DESC';
    $asc = ' data-sort=sortdesc';
} else if(isset($_GET['sortdateasc'])) {
    $order = ' ORDER BY date';
    $asc = ' data-sort=sortdateasc';
} else if(isset($_GET['sortdatedesc'])) {
    $order = ' ORDER BY date DESC';
    $asc = ' data-sort=sortdatedesc';
} else {
    $order = null;
    $asc = null;
}
for ($i = 1; $i >= 0; $i--) { 
    $pdo = new PDO(Config::$dsn, Config::$user, Config::$password);
    $stmt = $pdo->query('SELECT * FROM todos WHERE importance ='.$i. $order);
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo '<p class="todo '; 
        if($row['date'] == date("Y-m-d")){echo 'due ';}
        if($row['date'] < date("Y-m-d")){echo 'past ';}
        if($row['completed'] == 1) { echo 'completed"';} else {echo '"';}
        echo 'data-id='. $row['id']. $asc. '>'. $row['title']. ' | ('. $row['date']. ')</p>' ;
        echo '<span class="deleter" data-delete='. $row['id']. $asc. '>✖</span>';
    }
    echo '</div>';
    if($i == 1){ echo '<div class="heading">Regular todos:</div><div class="list">';}
}
?>

<script>
var element = document.getElementsByClassName('todo');
for (let i = 0; i < element.length; i++) {
  element[i].addEventListener("click", markCompleted);
}
var deleter = document.getElementsByClassName('deleter');
for (let i = 0; i < deleter.length; i++) {
  deleter[i].addEventListener("click", deleteTodo);
}
</script>