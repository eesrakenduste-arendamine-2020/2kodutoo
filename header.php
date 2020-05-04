<?php
  $pageHeaderHTML = "<!DOCTYPE html> \n";
  $pageHeaderHTML .= '<html lang="et">'. "\n";
  $pageHeaderHTML .= "<head> \n";
  $pageHeaderHTML .= "\t" .'<meta charset="utf-8">' ."\n \t<title> Urmas Kirsipuu - KUIKB-2 Kodutöö 2 TODO</title> \n";
  $pageHeaderHTML .= "\t" ."<style> \n";
  #$pageHeaderHTML .= "\t \t body{background-color: " .$taustavarv ."; \n";
  #$pageHeaderHTML .= "\t \t color: " .$tekstivarv ."\n";
  $pageHeaderHTML .= "\t }";
  $pageHeaderHTML .= "</style> \n";
  if(isset($toScript)){$pageHeaderHTML .=$toScript;
  } 
  $pageHeaderHTML .= "</head> \n";
  //$pageHeaderHTML .= '<body onload="startTime()">';
  echo $pageHeaderHTML;
