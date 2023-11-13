<?php
	ini_set('memory_limit',"456M");
	require_once('commonfunctions.php');
	$blockdata=array();
	$palette=array();
	$blocksinfo=array();
	$page=array();
	$translatefrom=array('water_cauldron','cave_air','minecraft:');
	$translateto=array('cauldron','air','');
	function byteArrayToVarintArray($byteArray) {
	  $varintArray = array();
	  $i = 0;
	  while ($i < count($byteArray)) {
		$value = 0;
		$varintLength = 0;
		while (true) {
		  $value |= ($byteArray[$i] & 127) << ($varintLength++ * 7);
		  if ($varintLength > 5){
			  logtofile('invalid bit wise data');
			  exit;
		  }
		  if (($byteArray[$i++] & 128) !== 128) break;
		}
		array_push($varintArray,$value);		
	  }
	  return $varintArray;
	}
	function getname($id){
		global $palette;
		return $palette[$id][0];
	}
	function getnamefromid($id){
		global $palette;
		$addtxt = '';
		if(isset($palette[$id][1])&&(count($palette[$id][1])>0)){
			$addtxt = '[';
			for($i=0;$i<count($palette[$id][1]);$i++){
				if($palette[$id][1][$i]['type']==8){
					if($i!=0){$addtxt .= ',';}
					$addtxt .= $palette[$id][1][$i]['name'].'='.$palette[$id][1][$i]['value'];
				}
			}
			$addtxt .= ']';
		}
		return $palette[$id][0].$addtxt;
	}
	function typecmd($s,$e,$bcmd){
		global $page;
		if($s==$e){
			$page[]='setblock '.$s.' '.$bcmd;
		}else{
			$page[]='fill '.$s.' '.$e.' '.$bcmd;
		}
	}
	function getnameandcommand($string){
		$name = explode('[', $string)[0];
		if($name==''){
			logtofile('name was blank: '.$string);
		}
		if($name=='structure_block'||$name=='tripwire'){$name='air';$string='air';}
		return [$name,$string];
	}
	$str_json = file_get_contents('php://input');
	if(!isset($str_json)){echo '{"result":false,"error":"Server Down"}';exit;}
	$DecJ=json_decode($str_json,true);
	$Action = $DecJ['action'];
	if($Action=='loadit'){
		require("nbt.class.php");
		//$nbt->verbose = true;
		$tmpdir=(isset($cfg['db']['tempfilepath'])?$cfg['db']['tempfilepath']:"temp/");
		$file=$tmpdir.$DecJ['filename'];
		if(!file_exists($file)){
			echo '{"result":false,"error":"Unable to find file: '.$file.'"}';
			exit;
		}
		$path_parts = pathinfo($file);
		$buildingname=$path_parts['filename'];
		if($path_parts['extension']=='json'){
			$jsonstr = file_get_contents($file);
			echo $jsonstr;
			exit;
		}
		$nbt = new nbt();
		$nbt->loadFile($file);
		$info = $nbt->root[0]["value"];
		$offsetX=0;
		$offsetY=0;
		$offsetZ=0;
		//logtofile(print_r($info,true));
		if($path_parts['extension']=='schem'){
			for($i=0;$i<count($info);$i++){
				if($info[$i]["name"]=="Length"){
					$tz=($info[$i]["value"]);
				}else if ($info[$i]["name"]=="Width"){
					$tx=($info[$i]["value"]);
				}else if ($info[$i]["name"]=="Height"){
					$ty=($info[$i]["value"]);
				}else if($info[$i]["name"]=="BlockData"){
					$Blocks=byteArrayToVarintArray($info[$i]["value"]);
				}else if($info[$i]["name"]=="Palette"){
					$Data=$info[$i]["value"]; 
				}else if($info[$i]["name"]=="BlockEntities"){
					$BlockEntities=$info[$i]["value"]["value"];
				}else if($info[$i]["name"]=="Entities"){
					$Entities=$info[$i]["value"]["value"];
				}else if($info[$i]["name"]=="Offset"){
					$offsetX=$info[$i]["value"][0];
					$offsetY=$info[$i]["value"][1];
					$offsetZ=$info[$i]["value"][2];
				}
			}
			logtofile('Height: '.$ty.' Width: '.$tx.' Length: '.$tz);
			logtofile('Offset x: '.$offsetX.' y: '.$offsetY.' z: '.$offsetZ);
			logtofile('Number of entities: '.count($Entities));
			//logtofile('Data:');
			//logtofile(print_r($Data,true));
			//logtofile('Blocks:');
			//logtofile(print_r($Blocks,true));
			
			$x=0;$y=0;$z=0;
			for($i=0;$i<count($Data);$i++){
				$palette[$Data[$i]['value']]=str_replace($translatefrom,$translateto,$Data[$i]['name']);
			}				
			//logtofile('palette:');
			//logtofile(print_r($palette,true));
			
			for($i=0;$i<count($Blocks);$i++){
				$blockcommand = getnameandcommand($palette[$Blocks[$i]]);
				$blockdata[$i] = array(
					'x'=>$x,
					'y'=>$y,
					'z'=>$z,
					'name'=>str_replace($translatefrom,$translateto,$blockcommand[0]),
					'command'=>str_replace($translatefrom,$translateto,$blockcommand[1]),
					'items'=>'{}'
				);
				if($blockdata[$i]['name']=='cauldron'){$blockdata[$i]['command']=$blockdata[$i]['name'];}
				if($blockdata[$i]['name']==''){
					//logtofile('blockdata name is blank: ');
					//logtofile(print_r($palette[$Blocks[$i]],true));
					$blockdata[$i]['command']='air';
					$blockdata[$i]['name']='air';
				}
				$x++;
				if($x == $tx){
					$z++;
					$x=0;
				}
				if($z == $tz){
					$z=0;
					$y++;
				}
			}
			
			//logtofile('Block entities');
			//logtofile(print_r($BlockEntities,true));
			for($j=0;$j<count($BlockEntities);$j++){
				//logtofile($j);
				$name='';
				$bepx=0;$bepy=0;$bepz=0;
				$t1=0;$t2=0;$t3=0;$t4=0;
				$gt=0;$color='';$skullid=array();
				$skulltexture='';
				for($d=0;$d<count($BlockEntities[$j]);$d++){
					if($BlockEntities[$j][$d]['name']=='Pos'){
						$bepx=$BlockEntities[$j][$d]['value'][0];
						$bepy=$BlockEntities[$j][$d]['value'][1];
						$bepz=$BlockEntities[$j][$d]['value'][2];
					}else if($BlockEntities[$j][$d]['name']=='Id'){
						$blockname=str_replace($translatefrom,$translateto,$BlockEntities[$j][$d]['value']);
					}else if($BlockEntities[$j][$d]['name']=='SkullOwner'){
						//logtofile('Skull found');
						$skullid[0]=$BlockEntities[$j][$d]['value'][0]['value'][0];
						$skullid[1]=$BlockEntities[$j][$d]['value'][0]['value'][1];
						$skullid[2]=$BlockEntities[$j][$d]['value'][0]['value'][2];
						$skullid[3]=$BlockEntities[$j][$d]['value'][0]['value'][3];
						//logtofile(print_r($skullid,true));
						$skulltexture=$BlockEntities[$j][$d]['value'][1]['value'][0]['value']['value'][0][0]['value'];
						//logtofile($skulltexture);
					}else if($BlockEntities[$j][$d]['name']=='GlowingText'){
						$gt=$BlockEntities[$j][$d]['value'];
					}else if($BlockEntities[$j][$d]['name']=='Color'){
						$color=$BlockEntities[$j][$d]['value'];
					}else if($BlockEntities[$j][$d]['name']=='Text1'){
						$t1=$BlockEntities[$j][$d]['value'];
					}else if($BlockEntities[$j][$d]['name']=='Text2'){
						$t2=$BlockEntities[$j][$d]['value'];
					}else if($BlockEntities[$j][$d]['name']=='Text3'){
						$t3=$BlockEntities[$j][$d]['value'];
					}else if($BlockEntities[$j][$d]['name']=='Text4'){
						$t4=$BlockEntities[$j][$d]['value'];
					}
				}
				if($skulltexture !=''){
					$adsigntxt='{SkullOwner:{Id:[I;'.$skullid[0].','.$skullid[1].','.$skullid[2].','.$skullid[3].'],Properties:{textures:[{Value:"'.$skulltexture.'"}]}}}';				
				}else{
					if($t1=='' && $t2=='' && $t3=='' && $t4==''){
						continue;
					}
					$adsigntxt='{Color:"'.$color.'",GlowingText:'.$gt.',Text1:\''.$t1.'\',Text2:\''.$t2.'\',Text3:\''.$t3.'\',Text4:\''.$t4.'\'}';
				}
				//logtofile('pos: '.$bepx.' '.$bepy.' '.$bepz);
				//logtofile($adsigntxt);				
				for($b=0;$b<count($blockdata);$b++){
					if($blockdata[$b]['x']==$bepx && $blockdata[$b]['y']==$bepy && $blockdata[$b]['z']==$bepz){
						$blockdata[$b]['command'].=str_replace('"','\"',$adsigntxt);
					}
				}
			}
			
			for($i=0;$i<count($Entities);$i++){
				$blockname='';
				$ex=0;$ey=0;$ez=0;
				$r0=0;$r1=0;
				$a1='';$a2='';$a3='';$a4='';
				$i1='';$i2='';$i3='';$i4='';
				$facing=0;
				$items='{}';
				for($d=0;$d<count($Entities[$i]);$d++){
					if($Entities[$i][$d]['name']=='Rotation'){
						$r0=$Entities[$i][$d]['value']['value'][0];
						$r1=$Entities[$i][$d]['value']['value'][1];
					}else if($Entities[$i][$d]['name']=='Facing'){
						$facing=$Entities[$i][$d]['value'];
					}else if($Entities[$i][$d]['name']=='Item'){
						$item=str_replace($translatefrom,$translateto,$Entities[$i][$d]['value'][0]['value']);
					}else if($Entities[$i][$d]['name']=='Pos'){
						$ex=round($Entities[$i][$d]['value']['value'][0]-$offsetX,0,PHP_ROUND_HALF_DOWN);
						$ey=round($Entities[$i][$d]['value']['value'][1]-$offsetY,0,PHP_ROUND_HALF_DOWN);
						$ez=round($Entities[$i][$d]['value']['value'][2]-$offsetZ,0,PHP_ROUND_HALF_DOWN);
					}else if($Entities[$i][$d]['name']=='ArmorItems'){
						if(isset($Entities[$i][$d]['value']['value'][0][0])){
							$i1=str_replace($translatefrom,$translateto,$Entities[$i][$d]['value']['value'][0][0]['value']);
							$a1='id:'.$i1.',Count:1';
						}
						if(isset($Entities[$i][$d]['value']['value'][1][0])){
							$i2=str_replace($translatefrom,$translateto,$Entities[$i][$d]['value']['value'][1][0]['value']);
							$a2='id:'.$i2.',Count:1';
						}
						if(isset($Entities[$i][$d]['value']['value'][2][0])){
							$i3=str_replace($translatefrom,$translateto,$Entities[$i][$d]['value']['value'][2][0]['value']);
							$a3='id:'.$i3.',Count:1';
						}
						if(isset($Entities[$i][$d]['value']['value'][3][0])){
							$i4=str_replace($translatefrom,$translateto,$Entities[$i][$d]['value']['value'][3][0]['value']);
							$a4='id:'.$i4.',Count:1';
						}
					}else if($Entities[$i][$d]['name']=='Id'){
						$blockname=str_replace($translatefrom,$translateto,$Entities[$i][$d]['value']);
					}
				}
				//logtofile('Entity: '.$blockname.' pos x: '.$ex.' y: '.$ey.' z: '.$ez.' item: '.$item.' facing:'.$facing.' rotation: '.$r0.','.$r1);
				for($b=0;$b<count($blockdata);$b++){
					if($blockdata[$b]['x']==$ex && $blockdata[$b]['y']==$ey && $blockdata[$b]['z']==$ez){
						$blockdata[$b]['name']=$blockname;
						if($blockname=='armor_stand'){
							$blockdata[$b]['command'] = '{Rotation:['.$r0.'f,'.$r1.'f],ArmorItems:[{'.$a1.'},{'.$a2.'},{'.$a3.'},{'.$a4.'}]}';
							$itmsdata = '';
							if($a1!=''){$itmsdata = '"'.$i1.'"';}
							if($a2!=''){if($itmsdata != ''){$itmsdata.=',';}$itmsdata .= '"'.$i2.'"';}
							if($a3!=''){if($itmsdata != ''){$itmsdata.=',';}$itmsdata .= '"'.$i3.'"';}
							if($a4!=''){if($itmsdata != ''){$itmsdata.=',';}$itmsdata .= '"'.$i4.'"';}
							$blockdata[$b]['items']="[".$itmsdata."]";
						}
						if($blockname=='item_frame'){
							$blockdata[$b]['command'] = str_replace('"','\"','{Facing:'.$facing.',Item:{id:"'.$item.'",Count:1b}}');
							$blockdata[$b]['items']='["'.$item.'"]';
						}
					}
				}
			}			
			
			//logtofile('blockdata:');
			//logtofile(print_r($blockdata,true));
			
			$bjs='[';
			for($i=0;$i<count($blockdata);$i++){
				if($i!=0){
					$bjs.=',';
				}
				$bjs.='{"x":'.$blockdata[$i]['x'].',"y":'.$blockdata[$i]['y'].',"z":'.$blockdata[$i]['z'].',"items":'.$blockdata[$i]['items'].',"name":"'.$blockdata[$i]['name'].'","command":"'.$blockdata[$i]['command'].'"}';
			}
			$bjs.=']';
			echo '{"result":true,"name":"'.$buildingname.'","blocks":'.$bjs.'}';
			unlink($file);
			exit;
		}
		
		
		for($i=0;$i<count($info);$i++){
			if($info[$i]["name"]=="size"){
				$tx=($info[$i]["value"]["value"][0]);
				$ty=($info[$i]["value"]["value"][1]);
				$tz=($info[$i]["value"]["value"][2]);
			}else if($info[$i]["name"]=="blocks"){
				$Blocks=$info[$i]["value"]["value"];
			}else if($info[$i]["name"]=="palette"){
				$Data=$info[$i]["value"]["value"]; 
			}
		}
		$x=0;$y=0;$z=0;
		for($i=0;$i<count($Data);$i++){
			$pltval = '';
			$pltprop = array();
			for($j=0;$j<count($Data[$i]);$j++){
				if($Data[$i][$j]['name']=='Name'){
					$pltval = substr($Data[$i][$j]['value'],10);
				}else if($Data[$i][$j]['name']=='Properties'){
					$pltprop = $Data[$i][$j]['value'];
				}
			}
			$palette[$i] = array($pltval,$pltprop);
		}
		$bjs='[';
		for($i=0;$i<count($Blocks);$i++){
			if($i!=0){
				$bjs.=',';
			}
			$nbttxt="";
			for($j=0;$j<count($Blocks[$i]);$j++){
				if($Blocks[$i][$j]['name']=='pos'){
					$blockxyz = $Blocks[$i][$j]['value']['value'];
				}else if($Blocks[$i][$j]['name']=='state'){
					$blockcommand = array(getname($Blocks[$i][$j]['value']),getnamefromid($Blocks[$i][$j]['value']));
				}else if($Blocks[$i][$j]['name']=='nbt'){
					$nbt = array($Blocks[$i][$j]['value']);
					$tx1="";$tx2="";$tx3="";$tx4="";$type="";
					for($s=0;$s<count($nbt[0]);$s++){
						if($nbt[0][$s]['name']=='id'){$type=$nbt[0][$s]['value'];}
						if($nbt[0][$s]['name']=='Text1'){$tx1=$nbt[0][$s]['value'];}
						if($nbt[0][$s]['name']=='Text2'){$tx2=$nbt[0][$s]['value'];}
						if($nbt[0][$s]['name']=='Text3'){$tx3=$nbt[0][$s]['value'];}
						if($nbt[0][$s]['name']=='Text4'){$tx4=$nbt[0][$s]['value'];}
					}
					if($type=='minecraft:sign'){
						$nbttxt=str_replace('"','\"','{Text1:\''.$tx1.'\',Text2:\''.$tx2.'\',Text3:\''.$tx3.'\',Text4:\''.$tx4.'\'}');
					}
				}
			}
			$bjs.='{"x":'.$blockxyz[0].',"y":'.$blockxyz[1].',"z":'.$blockxyz[2].',"name":"'.$blockcommand[0].'","command":"'.$blockcommand[1].$nbttxt.'"}';
		}
		$bjs.=']';
		echo '{"result":true,"name":"'.$buildingname.'","blocks":'.$bjs.'}';
		unlink($file);
	}
?>