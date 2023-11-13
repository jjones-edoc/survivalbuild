<?php
require_once('config.php');
$XVARS=(count($_POST)>0)?$_POST:$_GET;
function JS_Array($PHPArray){
	return '["'.implode('","', $PHPArray).'"]';	
}
function cleanblanks($string,$char=' '){
	$string = str_replace ($char, '%20', $string);
	$string = str_replace ("\r", '%0D', $string);
	$string = str_replace ("\n", '%0A', $string);
	return $string;
}
function removeFromArray($array, $key){
	$temparray=array();
	while(list($ind,$val)=each($array)){
		if($key!=$ind){$temparray[$ind]=$val;}
	}
	return $temparray;
}
function ValidFileType($type){
	$validtype=array('application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/png','image/jpeg','image/gif','image/bmp','image/tiff','application/pdf','application/msword');
	return in_array($type,$validtype);
}
function logToFile($msg)
{ 
	global $cfg;
	if($cfg['Diagnostics']){
		$filename = $cfg['LogFile'];
		$ext = strrchr($filename, '.'); 
		$newfile=$filename;
		if($ext !== false) 
		{ 
		  $newfile = substr($filename, 0, -strlen($ext)).date("m-d-y").$ext; 
		} 
		//if((strpos($msg,'password') !== false)||(strpos($msg,'pin') !== false)){
		//	$msg = 'Log entry contains password or pin, not logging';
		//}
		error_log(date("m-d-y h:i:s").' '.$msg. "\r\n", 3, $newfile);
		
		//see if there are old log files and delete
		$deletelogfilespast=7;
		if(isset($cfg['DeleteLogAfter'])){
			$deletelogfilespast = $cfg['DeleteLogAfter'];
		}
		if($deletelogfilespast>0){
			$deletefile = substr($filename, 0, -strlen($ext)).date("m-d-y",mktime(0, 0, 0, date("m"),(date("d")-$deletelogfilespast),date("Y"))).$ext;
			if(file_exists($deletefile)){
				if(!unlink($deletefile)){
					//not sure what to do here
					error_log(date("m-d-y h:i:s").' '."Unable to delete old log file ".$deletefile."\r\n", 3, $newfile);
				}
			}
		}
	}
}
?>
