<?php
	require_once('commonfunctions.php');
	require_once('config.php');
	$tempdir=isset($cfg['db']['tempfilepath'])?$cfg['db']['tempfilepath']:"temp/";
	$str_json = file_get_contents('php://input');
	if(!isset($str_json)){echo '{"result":false,"error":"Server Down"}';exit;}
	$DecJ=json_decode($str_json,true);
	$Action = $DecJ['action'];
	if($Action=='save'){
		$fp = fopen($tempdir.'building.json', 'w');
		fwrite($fp, $str_json);
		fclose($fp);
		echo'{"result":true}';
	}else if ($Action=='savebuilding'){
		for($i=0;$i<count($DecJ['commandlists']);$i++){
			$dir = $tempdir;
			if(isset($DecJ['commandlists'][$i]['folder'])){
				$dir = $tempdir.$DecJ['commandlists'][$i]['folder'].'\\';
			}
			if( is_dir($dir) === false ){
				mkdir($dir);
			}
			$fp = fopen($dir.$DecJ['commandlists'][$i]['name'].'.mcfunction', 'w');
			for($c=0;$c<count($DecJ['commandlists'][$i]['commands']);$c++){
				fwrite($fp, $DecJ['commandlists'][$i]['commands'][$c].PHP_EOL);
			}			
			fclose($fp);
		}
		echo'{"result":true}'; 
	}
?>