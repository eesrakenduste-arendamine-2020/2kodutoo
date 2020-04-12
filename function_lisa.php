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
	function latestTodos(){
		$kategooria = ["homseks", "kõrge", "tavaline", "tähtsusetu"];
		$latesttodoHTML = null;
		$notice=0;
		$kustutatud=0;
		$kustutatudon="1";
		$conn = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		#if($kustutatud=="1"){
		#$stmt = $conn->prepare('SELECT tiitel, sisu, loodud, tehtud, kategooria, id, kustutatud FROM todo ORDER BY loodud DESC LIMIT 50');
		#	}else{
		$stmt = $conn->prepare('SELECT tiitel, sisu, loodud, tehtud, kategooria, id, kustutatud  FROM todo where kustutatud is null ORDER BY loodud DESC LIMIT 10');
		#	}
		
		echo $conn->error;
		$stmt->bind_result($tiitelFromDb, $sisuFromDb, $loodudFromDb, $tehtudFromDb, $kategooriaFromDb, $idFromDb, $kustutatudFromDb);
		$stmt->execute();
		global $lehe_tabel;
		#lisame tabeli muutuja
		$lehe_tabel='
		<table id=tabel_todo>   
			<thead>
			<tr id=tabel_rida>
		  		<th>Tehtud</th>
		  		<th class="tooltip" onclick="SordiTabel(1)" >Tähtsus<span class="tooltiptext">Sordi tähtsuse järjekorras</span></th>
		  		<th class="tooltip" onclick="SordiTabel(2)" >Pealkiri<span class="tooltiptext">Sordi tähestiku järjekorras</span></th>
		  		<th class="tooltip" onclick="SordiTabel(3)" >Sisu<span class="tooltiptext">Sordi tähestiku järjekorras</span></th>
		  		<th class="tooltip" onclick="SordiTabel(4)" >Tähtaeg<span class="tooltiptext">Sordi ajalises järjekorras</span></th>
		  		<th>Kustuta</th>
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
		#lisame read väärtusetega		
		$latesttodoHTML		
		.='<tr class="' .$varviline ." " .$kat_varv .'" class="rida">'
		.'<td class="tehtud"><input type="checkbox"' .$checked_box .">" 
		.'</td><td class="kategooria">' .$kategooria_out .'</td><td class="tiitel">' 
		.$tiitelFromDb .'</td><td id="sisu">' .$sisuFromDb   .'</td><td class="kuupaev">' 
		.$loodudTime->format("d.m.Y") ."</td> "
		.'<td class="kustuta"><input name="kustuta_Todo" type="submit"  value="Kustuta"><span></span></td>'		
		.'<td class="kirje_id"><input type=hidden name="kirje_id" value=' .$idFromDb .'></td></tr>';
        }
        if(!empty($latesttodoHTML)){
			$latesttodoHTML = "<ul> \n" .$latesttodoHTML ."</ul> </form>\n"
			.'<td><form method="POST" action="' 
		.$_SERVER["PHP_SELF"] .'">'	
		.'<input type=hidden name="kustutatud" value=' .$kustutatudon .'></td>'
		.'<input name="allTodos" type="submit"  value="Näita kõiki"><span></span></form>'	
			
			;
            }else{
				$lehe_tabel="";
				$latesttodoHTML = "<p> Kahjuks Todosid pole. </p> \n";
        }
		$stmt->close();
		$conn->close();
        return $latesttodoHTML;
     }


	 function allTodos(){
		$kategooria = ["homseks", "kõrge", "tavaline", "tähtsusetu"];
		$latesttodoHTML = null;
		$notice=0;
		$kustutatudon="1";
		#$kustutatud=0;
		$conn = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		#if($kustutatud=="1"){
			$stmt = $conn->prepare('SELECT tiitel, sisu, loodud, tehtud, kategooria, id, kustutatud FROM todo ORDER BY loodud DESC LIMIT 50');
		#	}else{
		#		$stmt = $conn->prepare('SELECT tiitel, sisu, loodud, tehtud, kategooria, id  FROM todo where kustutatud is null ORDER BY loodud DESC LIMIT 10');
		#	}
		
		echo $conn->error;
		$stmt->bind_result($tiitelFromDb, $sisuFromDb, $loodudFromDb, $tehtudFromDb, $kategooriaFromDb, $idFromDb, $kustutatudFromDb);
		$stmt->execute();
		global $lehe_tabel;
		#lisame tabeli muutuja
		$lehe_tabel='
		<table id=tabel_todo>   
			<thead>
			<tr id=tabel_rida>
		  		<th>Tehtud</th>
		  		<th class="tooltip" onclick="SordiTabel(1)" >Tähtsus<span class="tooltiptext">Sordi tähtsuse järjekorras</span></th>
		  		<th class="tooltip" onclick="SordiTabel(2)" >Pealkiri<span class="tooltiptext">Sordi tähestiku järjekorras</span></th>
		  		<th class="tooltip" onclick="SordiTabel(3)" >Sisu<span class="tooltiptext">Sordi tähestiku järjekorras</span></th>
		  		<th class="tooltip" onclick="SordiTabel(4)" >Tähtaeg<span class="tooltiptext">Sordi ajalises järjekorras</span></th>
		  		<th>Kustuta</th>
			</tr>
			</thead>
		<tbody>
		<form method="POST" action="' 
		.$_SERVER["PHP_SELF"] .'">'			
		;
		#lisame tabelisse veerud
		$kat_varv="";
		while ($stmt->fetch()){
		#lisame vajalikud muutujad ridadele  
		
			$loodudTime = new DateTime($loodudFromDb);			
			$varviline="sinine";
                if($tehtudFromDb=="1"){
				$varviline="kollane";
				}elseif($kategooriaFromDb=="0"){
					$kat_varv="punane";}
			$checked_box="value='1'";
				if($tehtudFromDb=="1"){
				$checked_box="checked disabled ";}
			$kategooria_out=$kategooria[$kategooriaFromDb];			
		#lisame read väärtusetega		
		$latesttodoHTML		
		.='<tr class="' .$varviline ." " .$kat_varv .'" class="rida">'
		.'<td class="tehtud"><input type="checkbox"' .$checked_box .">" 
		.'</td><td class="kategooria">' .$kategooria_out .'</td><td class="tiitel">' 
		.$tiitelFromDb .'</td><td id="sisu">' .$sisuFromDb   .'</td><td class="kuupaev">' 
		.$loodudTime->format("d.m.Y") ."</td> "
		.'<td class="kustuta"><input name="kustuta_Todo" type="submit"  value="Kustuta"><span></span></td>'		
		.'<td class="kirje_id"><input type=hidden name="kirje_id" value=' .$idFromDb .'></td></tr>';
        }
        if(!empty($latesttodoHTML)){
			$latesttodoHTML = "<ul> \n" .$latesttodoHTML ."</ul> </form>\n"
		.'<td><form method="POST" action="' 
		.$_SERVER["PHP_SELF"] .'">'	

		.'<input type=hidden name="kustutatud" value=' .$kustutatudon .'></td>'
		.'<input name="allTodos" type="submit"  value="Näita kõiki"><span></span></form>'	
		
			
			;
            }else{
				$lehe_tabel="";
				$latesttodoHTML = "<p> Kahjuks Todosid pole. </p> \n";
        }
		$stmt->close();
		$conn->close();
        return $latesttodoHTML;
     }
