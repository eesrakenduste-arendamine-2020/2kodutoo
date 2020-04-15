<?php
  require("../../config_eesrakendused.php");
  require("functions_main.php");
  
  require("function_lisa.php");
  $toScript = "\t" .'<link rel="stylesheet" type="text/css" href="todo.css">' ."\n";
  $toScript .= "\t" .'<script type="text/javascript" src="todo.js" defer></script>' ."\n";
  require("header.php");
  $loodud= date("Y-m-d");
  $kategooria = ["homseks", "kõrge", "tavaline", "tähtsusetu"];
  $error="";
  $notice = "";
  $tehtud="";
  $kustutatudon="1";
  global $showalltodos;
  $showalltodos="";
    if(isset($_POST["lisaTodo"])){
    if(strlen($_POST["tiitel"]) == 0){
      $error .= "Pealkiri on puudu!";
    }
    if(strlen($_POST["sisu"]) == 0){
      $error .= "Sisu on puudu! ";
    }
    if($_POST["loodud"] >= $loodud){
        $loodud = $_POST["loodud"];
    }            
    $tiitel = test_input($_POST["tiitel"]);
    $kategooria_in = test_input($_POST["kategooria"]);
    $sisu = test_input($_POST["sisu"]);

      if($error == ""){             
        $result = storeTODO($tiitel, $sisu, $loodud, $kategooria_in);
          if($result == 1){
            $notice = "Todo salvestatud";
            $error = "";
            $tiitel = "";
            $sisu = "";
            $loodud = date("Y-m-d");
        }
      }
  }

  if(isset($_POST["kustuta_Todo"])){           
    $kirje_id = test_input($_POST["kirje_id"]);
      if($error == ""){             
        $result = kustutaTODO($kirje_id);
          if($result == 1){
            $notice = "Todo märgitud kustutatuks";
            $error = "";
            $tiitel = "";
            $sisu = "";
            $kirje_id="";
            $loodud = date("Y-m-d");
        }
      }
  }
  $latestTodosHTML  = latestTodos(isset($_POST["allTodos"]));

  ?>  
<div id="ulemine">
<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
<div>
	<label>Minu ülesanded</label><br>
	  <textarea rows="2" cols="51" name="tiitel" id="tiitel" placeholder="Lisa ülesaned nimetus ..."></textarea>
  <br>
  </div>
  <div>
  <label>Ülesande sisu</label><br>
    <textarea rows="5" cols="51" name="sisu" id="sisu" placeholder="Lisa ülesande sisu ..."></textarea>
  <br>
</div>
  <div>
  <label>Ülesande täitmise kuupäev</label><br>
    <input type="date" id="loodud" name="loodud" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value="<?php echo $loodud; ?>">
    <br>
</div>
<div>
<br>
  <label>Kategooria: </label>
  <?php
  echo '<select name="kategooria">' ."\n";
  for ($i = 0; $i < 4; $i ++){
    
    echo '<option value="' .$i .'"';
    if ($i == "2"){
      echo " selected ";
    }
    echo ">" .$kategooria[$i] ."</option> \n";
  }
  echo "</select> \n";
?>
<br>
</div>
<div>
<br>
<input name="lisaTodo" type="submit" value="Lisa ülesanne"><span><?php echo $notice; ?></span>
</div>
</form>
</div>
<hr>
<h2>Senised ülesanded</h2>
<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
<?php
  echo $lehe_tabel;
  echo $latestTodosHTML;  
?>
</body>
</html>

