<?php
	require_once('commonfunctions.php');
	require_once('config.php');
	$tempdir=isset($cfg['db']['tempdir'])?$cfg['db']['tempdir']:"temp/";
	if(count($_FILES)>0){
		$msg='';$target_path='';$filename='';$uniqnm='';
		$mxsz = 1000000;
		$thetype="";
		if(isset($cfg['db']['MaxUploadSize'])){$mxsz = $cfg['db']['MaxUploadSize'];}
		if(isset($_FILES['fileupload'])){
			$upFiles = $_FILES['fileupload'];
		}else{
			$upFiles = $_FILES['CameraUpload'];
		}
		$filecount = count($upFiles['name']);
		logToFile(print_r($_FILES, true));
		logtofile('File Count: '. $filecount);
		for($i=0; $i<$filecount; $i++){
			if($upFiles['error'][$i]!=0){
				if($upFiles['error'][$i]==4){continue;}//the file was optional
				if(($upFiles['error'][$i]==2)||($upFiles['error'][$i]==1)){
					$msg='The file you selected to upload is to large.  Please scan the image at a lower resolution.';
				}else{
					$msg='There was an error uploading the image. ERROR CODE: '.$upFiles['error'][$i];
				}
			}else if($upFiles["size"][$i] < $mxsz) { 
				$path_parts = pathinfo($upFiles['name'][$i]);
				$movefileto=(isset($cfg['db']['tempfilepath'])?$cfg['db']['tempfilepath']:"temp/");
				$filename=basename($upFiles['name'][$i]);
				$filename = preg_replace('/[^A-Za-z0-9\. -]/', '', $filename);
				$file_extn = substr($filename, strrpos($filename, '.')+1);
				$uniqnm=uniqid().'.'.strtolower($file_extn);
				$target_path = $movefileto.$uniqnm; 
				logtofile("Moving file to ".$target_path);
				if(file_exists($movefileto)){
					try {
						if(!move_uploaded_file($upFiles['tmp_name'][$i], $target_path)) {
							$msg = 'Error moving uploaded file to destination';    
						}else if(file_exists($target_path)){
							$msg='';
						}else{
							$msg="An error occured during the file upload.";
						}
					} catch (Exception $e) {
						$msg="Error uploading the file (".$e->getMessage().")";
					}
				}else{
					$msg="There was an error uploading the file, please try again.";
				}
			}else{
				$msg="Error uploading file, file size to large";
			}
			$newFileArray[] = array('filename' => $filename, 'file_extn' => $file_extn, 'uniqnm' => $uniqnm, 'target_path' => $target_path, 'msg' => $msg);
		}
		echo '<html><head><script src="common/jfunctions.js"></script><script>var newFileArray = ' . json_encode($newFileArray) . ';';
		echo 'function startup(){window.top.window.uploadmsg(newFileArray);}</script></head><body onload="startup();"></body></html>';
		exit;
	}
?>