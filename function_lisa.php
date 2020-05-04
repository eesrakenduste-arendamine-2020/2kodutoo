<?php	
	function storeTODO($tiitel, $sisu, $loodud, $kategooria_in ){
		$notice = 0;
		$conn = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		$stmt = $conn->prepare("INSERT INTO todo (tiitel, sisu, loodud, kategooria, tehtud ) values  (?, ?, ?, ?, 0)");
		echo $conn->error;
		$stmt->bind_param("sssi", $tiitel, $sisu, $loodud, $kategooria_in);
        if($stmt -> execute()){
            $notice = "Todo salvestati!";
   		} else {
            $notice = "Todo salvestamisel tekkis tehniline tõrge: " .$stmt -> error;
    	}
		$stmt->close();
		$conn->close();
		return $notice;
	}
	function kustutaTODO($kirje_id){
		$teade = 0;
		$conn = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		$stmt = $conn->prepare('UPDATE todo set kustutatud="1" where id=?');
		echo $conn->error;
		$stmt->bind_param("s", $kirje_id);
        if($stmt -> execute()){
            $notice = "Todo kustutati!";
   		} else {
            $notice = "Todo kustutamisel tekkis tehniline tõrge: " .$stmt -> error;
    	}
		$stmt->close();
		$conn->close();
		return $teade;
	}
	/*
	function popupTeade() {
		alert("Kas soovid kustutada?");
		return true;
	 }
*/
	function latestTodos($showDeleted){
		$showalltodos="";
		$kategooria = ["homseks", "kõrge", "tavaline", "tähtsusetu"];
		$latesttodoHTML = null;
		$notice=0;
		$conn = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		$stmt = $conn->prepare('SELECT tiitel, sisu, loodud, tehtud, kategooria, id, kustutatud  FROM todo where kustutatud is null ORDER BY loodud DESC LIMIT 10');
		if($showDeleted){
			$stmt = $conn->prepare('SELECT tiitel, sisu, loodud, tehtud, kategooria, id, kustutatud FROM todo ORDER BY loodud DESC LIMIT 20');
			
			}
		echo $conn->error;
		$stmt->bind_result($tiitelFromDb, $sisuFromDb, $loodudFromDb, $tehtudFromDb, $kategooriaFromDb, $idFromDb, $kustutatudFromDb);
		$stmt->execute();
		global $lehe_tabel;
		#lisame tabeli muutuja
		$kustutatudTodos='
		<tr><form method="POST" action="' 
		.$_SERVER["PHP_SELF"] .'"><input name="allTodos" type="submit"  value="Näita kõiki"><span></span></tr></form>'		
		
		;
		$lehe_tabel='
		<table id="tabel_todo">   
			<thead>
			<input type="text" id="kategooria_filter" onkeyup="filtreeriKategooriad()" placeholder="Filtreeri kategooriat">
			<tr id=tabel_rida>
		  		<th class="tabelheader">Tehtud</th>
		  		<th class="tabelheader tooltip" onclick="SordiTabel(1)" >Tähtsus<span class="tooltiptext">Sordi tähtsuse järjekorras</span></th>
		  		<th class="tabelheader tooltip" onclick="SordiTabel(2)" >Pealkiri<span class="tooltiptext">Sordi tähestiku järjekorras</span></th>
		  		<th class="tabelheader tooltip" onclick="SordiTabel(3)" >Sisu<span class="tooltiptext">Sordi tähestiku järjekorras</span></th>
		  		<th class="tabelheader tooltip" onclick="SordiTabel(4)" >Tähtaeg<span class="tooltiptext">Sordi ajalises järjekorras</span></th>
		  		<th class="tabelheader" >Kustuta</th>
			</tr>
			</thead>
		<tbody>
		<form method="POST" action="' 
		.$_SERVER["PHP_SELF"] .'">'			
		;
		#lisame tabelisse veerud
		while ($stmt->fetch()){
		#lisame vajalikud muutujad ridadele  
			$loodudTime = new DateTime($loodudFromDb);			
			$varviline="sinine";
                if($tehtudFromDb=="1"){
				$varviline="kollane";}
			$kat_varv="";
				if($kategooriaFromDb=="0"){
				$kat_varv="punane";}
			$checked_box="value='1'";
				if($tehtudFromDb=="1"){
				$checked_box="checked disabled ";}
			$kategooria_out=$kategooria[$kategooriaFromDb];
			
			$kustutanupp='<td class="kustuta"><input name="kustuta_Todo" type="submit"  value="Kustuta" onclick="return popupTeade()"><span></span></td>';
				if($kustutatudFromDb=="1"){
					$kustutanupp='<td class="kustuta"><span>Kustutatud</span></td>'; 	
			}
			$page = 0;
			$mitulehte="";
			$mitulehte2="";
			$limit="";
			$pageCount="";
			#$pageCount = countPages(2);
  if(!isset($_GET["page"]) or $_GET["page"] < 1){
          $page = 1;
  } elseif (round(($_GET["page"] - 1) * $limit) >= $pageCount){
          $page = ceil($pageCount / $limit);
  } else {
          $page = round($_GET["page"]);
  }
  #$lehekeeramineHTML = showPages(2, $page, $limit);

			if($page > 1){
				$mitulehte .='<a href="?page=' .($page - 1) .'>Eelmine leht</a> | "';
        		} else {
                $mitulehte .="<span>Eelmine leht</span> | ";
        	}
        	if($page * $limit < $pageCount){
                $mitulehte2.='<a href="?page=' .($page + 1) .'">Järgmine leht</a>';
        	} else {
                $mitulehte2.="<span>Järgmine leht</span>";
        	}
	


		#lisame read väärtusetega		
		$latesttodoHTML		
		.='<tr class="' .$varviline ." " .$kat_varv .'" class="rida">'
		.'<td class="tehtud"><input type="checkbox"' .$checked_box .">" 
		.'</td><td class="kategooria">' .$kategooria_out .'</td><td class="tiitel">' 
		.$tiitelFromDb .'</td><td id="sisu">' .$sisuFromDb   .'</td><td class="kuupaev">' 
		.$loodudTime->format("d.m.Y") ."</td> "
		.$kustutanupp .'<td class="kirje_id"><input type=hidden name="kirje_id" value=' .$idFromDb .'></td></tr>';
        }
        if(!empty($latesttodoHTML)){
			$latesttodoHTML = "\n" .$latesttodoHTML ."</tbody></table></form>\n"

		.$mitulehte ." | " .$mitulehte2
		.'<tr><form method="POST" action="' 
		.$_SERVER["PHP_SELF"] .'">'	
		.'<input name="allTodos" type="submit"  value="Näita kõiki"><span></span></tr></form>'	
		
		
			
			;
            }else{
				$lehe_tabel="";
				$latesttodoHTML = "<p> Kahjuks aktiivseid Todosid pole. </p> \n" .$kustutatudTodos;
        }
		$stmt->close();
		$conn->close();
        return $latesttodoHTML;
     }

