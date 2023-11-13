var buildings=[];
var BuildInd=-1;
var BuildingNameOffset=0;
var MaxStack=64;
var wInd=-1;
var lx, ly, lz, hx, hy, hz=0;
var analyzedblocks=[];
var pBuildInd=-1;
var pDirection='east';
var carryOverList=[];
var clists=[];
var replaceSponge=true;
var contributions=[];
var lastxoffset,lastyoffset,lastzoffset,lastname='';
var farms=["wheatfarms","leatherfarms","leatherfarms","sugarcanefarms","stonemine","cobblemine","granitemine","dioritemine","andesitemine","oakmill","sprucemill","birchmill","junglemill","darkoakmill","acaciamill","sandfarm","gravelfarm","clayfarm","textile","library"];
function UpdateBuildingName(){
	if(BuildInd > -1 && buildings[BuildInd]){
		buildings[BuildInd].name=get('building').value;
		get('bname'+BuildInd).innerHTML=buildings[BuildInd].name;
	}
}
function ConsoleBuilding(Ind){
	console.log(buildings[Ind]);
}
function HideAddNewBlock(){
	if(get("AddNewBlock")){
		deletetheEl('AddNewBlock');
		clearBackground();
	}
}
function AddContribution(){
	var tp=get("contrbsel").value;
	var amt=get("contbamount").value;
	if(amt == ''){
		get("contbamount").focus();
		return;
	}
	buildings[wInd].contributions=[];
	buildings[wInd].contributions.push({type:tp,amount:amt});
	HideAddNewBlock();
}
function AddBlock(){
	var x=parseInt(get('xid').value);
	var y=parseInt(get('yid').value);
	var z=parseInt(get('zid').value);
	var nm=get('blockname').value;
	var cmd=stringToHex(get('command').value.trim());
	var found=false;
	for(var b=0;b<buildings[wInd].blocks.length;b++){
		if((buildings[wInd].blocks[b].x==x) && (buildings[wInd].blocks[b].y==y) && (buildings[wInd].blocks[b].z==z)){
			buildings[wInd].blocks[b].name=nm;
			buildings[wInd].blocks[b].command=cmd;
			found = true;
			break;
		}
	}
	if(!found){
		buildings[wInd].blocks.push({x:x,y:y,z:z,name:nm,command:cmd});
	}
	HideAddNewBlock();
}
function ReplaceBlocks(lw,hg,sb,db){
	var lowy=0;
	var highy=0;
	var sblock='';
	var dblock='';
	if(!lw){
		lowy=parseInt(get('LowY').value);
		highy=parseInt(get('HighY').value);
		sblock=get('sblock').value;
		dblock=get('dblock').value;
	}else{
		lowy=lw;
		highy=hg;
		sblock=sb;
		dblock=db;
	}
	var rcount=0;
	for(var b=0;b<buildings[wInd].blocks.length;b++){
		if((buildings[wInd].blocks[b].y>=lowy) && (buildings[wInd].blocks[b].y<=highy) && buildings[wInd].blocks[b].name==sblock){
			console.log('Replacing x:'+buildings[wInd].blocks[b].x+' y:'+buildings[wInd].blocks[b].y+' z:'+buildings[wInd].blocks[b].z+' '+buildings[wInd].blocks[b].name+' with '+dblock);
			buildings[wInd].blocks[b].name=dblock;
			buildings[wInd].blocks[b].command=dblock;
			rcount++
		}
	}
	if(!lw){
		SetError(rcount+' blocks replaced');
		HideAddNewBlock();
	}
}
function ShowReplaceBlocksInBuilding(Ind){
	wInd=Ind;
	if(get("AddNewBlock")){
		HideAddNewBlock();
	}
	fadeBackground();
	var page = '<div class="modal-dialog">';
			page +='<div class="modal-content">';
				page +='<div class="modal-header">';
					page+='<div class="modal-title">Replace Blocks</div>';
					page+='<button class="close" onclick="HideAddNewBlock()"><span>x</span></button>';
				page +='</div>';
				page +='<div class="modal-body">';
					page+='<div class="row">';
						page+='<div class=" col-md-6 py-1">';
								page+='<input type="text" class="form-control" id="LowY" name="LowY" placeholder="LowY">';
						page+='</div>';
						page+='<div class=" col-md-6 py-1">';
								page+='<input type="text" class="form-control" id="HighY" name="HighY" placeholder="HighY">';
						page+='</div>';
					page+='</div>';
					page+='<div class="row">';
						page+='<div class=" col-md-12 py-1">';
								page+='<input type="text" class="form-control" id="sblock" name="sblock" placeholder="Target Block">';
						page+='</div>';
					page+='</div>';
					page+='<div class="row">';
						page+='<div class=" col-md-12 py-1">';
								page+='<input type="text" class="form-control" id="dblock" name="dblock" placeholder="Replace With">';
						page+='</div>';
					page+='</div>';
				page +='</div>';
				page+='<div class="modal-footer">';
					page +='<button class="btn btn-secondary" onclick="HideAddNewBlock()">Close</button>';
					page +='<button class="btn btn-primary" onclick="ReplaceBlocks()">Replace</button>';
				page+='</div>';
			page +='</div>';
	   page += '</div>';
	ElToAdd = document.createElement("div");
	ElToAdd.id="AddNewBlock";
	ElToAdd.className="modal fade text-dark show";
	document.body.appendChild(ElToAdd);
	get("AddNewBlock").style.display="inherit";
	ElToAdd.innerHTML=page;
}
function ShowAddContributionToBuilding(Ind){
	wInd=Ind;
	if(get("AddNewBlock")){
		HideAddNewBlock();
	}
	fadeBackground();
	var page = '<div class="modal-dialog">';
			page +='<div class="modal-content">';
				page +='<div class="modal-header">';
					page+='<div class="modal-title">Add New Block</div>';
					page+='<button class="close" onclick="HideAddNewBlock()"><span>x</span></button>';
				page +='</div>';
				page +='<div class="modal-body">';
					page+='<div class="row">';
						page+='<div class=" col-md-12 py-1">';
								page+='<select class="form-control" id="contrbsel" name="contrbsel">';
								for(var i=0;i<farms.length;i++){
									page+='<option name="'+farms[i]+'">'+farms[i];
								}
								page+='</select>';
						page+='</div>';
					page+='</div>';
					page+='<div class="row">';
						page+='<div class=" col-md-12 py-1">';
								page+='<input type="text" class="form-control" id="contbamount" name="contbamount" placeholder="Amoumt">';
						page+='</div>';
					page+='</div>';
				page +='</div>';
				page+='<div class="modal-footer">';
					page +='<button class="btn btn-secondary" onclick="HideAddNewBlock()">Close</button>';
					page +='<button class="btn btn-primary" onclick="AddContribution()">Add</button>';
				page+='</div>';
			page +='</div>';
	   page += '</div>';
	ElToAdd = document.createElement("div");
	ElToAdd.id="AddNewBlock";
	ElToAdd.className="modal fade text-dark show";
	document.body.appendChild(ElToAdd);
	get("AddNewBlock").style.display="inherit";
	ElToAdd.innerHTML=page;
}
function ShowAddBlockToBuilding(Ind){
	wInd=Ind;
	if(get("AddNewBlock")){
		HideAddNewBlock();
	}
	fadeBackground();
	var page = '<div class="modal-dialog">';
			page +='<div class="modal-content">';
				page +='<div class="modal-header">';
					page+='<div class="modal-title">Add New Block</div>';
					page+='<button class="close" onclick="HideAddNewBlock()"><span>x</span></button>';
				page +='</div>';
				page +='<div class="modal-body">';
					page+='<div class="row">';
						page+='<div class=" col-md-4 py-1">';
								page+='<input type="text" class="form-control" id="xid" name="xid" placeholder="X">';
						page+='</div>';
						page+='<div class=" col-md-4 py-1">';
								page+='<input type="text" class="form-control" id="yid" name="yid" placeholder="Y">';
						page+='</div>';
						page+='<div class=" col-md-4 py-1">';
								page+='<input type="text" class="form-control" id="zid" name="zid" placeholder="Z">';
						page+='</div>';
					page+='</div>';
					page+='<div class="row">';
						page+='<div class=" col-md-12 py-1">';
								page+='<input type="text" class="form-control" id="blockname" name="blockname" placeholder="Block Name">';
						page+='</div>';
					page+='</div>';
					page+='<div class="row">';
						page+='<div class=" col-md-12 py-1">';
								page+='<input type="text" class="form-control" id="command" name="command" placeholder="Command">';
						page+='</div>';
					page+='</div>';
				page +='</div>';
				page+='<div class="modal-footer">';
					page +='<button class="btn btn-secondary" onclick="HideAddNewBlock()">Close</button>';
					page +='<button class="btn btn-primary" onclick="AddBlock()">Add</button>';
				page+='</div>';
			page +='</div>';
	   page += '</div>';
	ElToAdd = document.createElement("div");
	ElToAdd.id="AddNewBlock";
	ElToAdd.className="modal fade text-dark show";
	document.body.appendChild(ElToAdd);
	get("AddNewBlock").style.display="inherit";
	ElToAdd.innerHTML=page;
}
function DeleteBuilding(Ind){
	buildings.splice(Ind,1);
	DrawImportBuildings();
}
function SaveBuilding(Ind){
	pleaseWait("Saving data...");
	doRestCall("save.php",{action:"save",result:'true',building:buildings[Ind]},processSaveBuildingJSON);
}
function printCommandFiles(clists){
	doRestCall("save.php",{action:"savebuilding",commandlists:clists},processSaveBuildingCommandsJSON);
}
function processSaveBuildingCommandsJSON(theJSON){
	pleaseWait("");
	var theData = JSON.parse(theJSON);
	if(!theData.result){
		SetError(theData.error);
	}else{
		HandleNextBuilding();
	}
}
function processSaveBuildingJSON(theJSON){
	pleaseWait("");
	var theData = JSON.parse(theJSON);
	if(!theData.result){
		SetError(theData.error);
	}else{
		SetError('Building Saved');
	}
}
function SetBuildingInd(Ind){
	if(BuildInd != Ind){
		BuildInd=Ind;
	}else{
		BuildInd=-1;
	}
	DrawImportBuildings();
}
function analyzeBuildingBlockData(Ind){
	analyzeTheBlocks(buildings[Ind].blocks);
	buildings[Ind].blocks=DeepCopy(analyzedblocks);
	buildings[Ind].blocktypes=DeepCopy(blocktypes);
	buildings[Ind].condensedtypes=DeepCopy(condensedtypes);
	buildings[Ind].lx=lx;
	buildings[Ind].ly=ly;
	buildings[Ind].lz=lz;
	buildings[Ind].hx=hx;
	buildings[Ind].hy=hy;
	buildings[Ind].hz=hz;
}
function analyzeTheBlocks(inblocks){
	get('titletxt').innerHTML="Analyzing blocks...";
	lx=0;ly=0;lz=0;hx=0;hy=0;hz=0;
	blocktypes=[];
	condensedtypes=[];
	analyzedblocks=DeepCopy(inblocks);
	console.log('Sorting blocks');
	analyzedblocks.sort(function(a,b){
		if(a.y<b.y){
			return -1;
		}else if(a.y>b.y){
			return 1;
		}else{
			if(a.x<b.x){
				return -1;
			}else if(a.x>b.x){
				return 1;
			}else{
				if(a.z<b.z){
					return -1;
				}else if(a.z>b.z){
					return 1;
				}
			}
		}
		return 0;
	});
	var lstx=-99;var lsty=-99;var lstz=-99;
	var distblocks=[];
	var sameblock=0;
	console.log('Removing any duplicate positioned blocks');
	for(var i=0;i<analyzedblocks.length;i++){
		if((analyzedblocks[i].x==lstx) && (analyzedblocks[i].y==lsty) && (analyzedblocks[i].z==lstz)){
			sameblock++;
		}else{
			distblocks.push(DeepCopy(analyzedblocks[i]));
			lstx=analyzedblocks[i].x;
			lsty=analyzedblocks[i].y;
			lstz=analyzedblocks[i].z;
		}
	}
	analyzedblocks = DeepCopy(distblocks);
	console.log('adding blocks to types and condensed types');
	for(var i=0;i<analyzedblocks.length;i++){
		if(analyzedblocks[i].x < lx){lx=analyzedblocks[i].x;}
		if(analyzedblocks[i].y < ly){ly=analyzedblocks[i].y;}
		if(analyzedblocks[i].z < lz){lz=analyzedblocks[i].z;}
		if(analyzedblocks[i].x > hx){hx=analyzedblocks[i].x;}
		if(analyzedblocks[i].y > hy){hy=analyzedblocks[i].y;}
		if(analyzedblocks[i].z > hz){hz=analyzedblocks[i].z;}
		
		//Add block type
		addBuildingBlockToTypes(analyzedblocks[i]);
		addCondensedType(analyzedblocks[i]);
		if(analyzedblocks[i].name=='item_frame'||analyzedblocks[i].name=='armor_stand'){
			for(let t=0;t<analyzedblocks[i].items.length;t++){
				let block = {name:analyzedblocks[i].items[t]};
				addCondensedType(block);
			}					
		}
	}
	console.log('Removing any duplicate positioned blocks again');
	for(var i=(analyzedblocks.length-1); i > 0; i--){
		if((analyzedblocks[i].x == analyzedblocks[i-1].x)&&(analyzedblocks[i].y == analyzedblocks[i-1].y)&&(analyzedblocks[i].z == analyzedblocks[i-1].z)){
			analyzedblocks.splice(i,1);
		}
	}
}
function addBuildingBlockToTypes(Block){
	for(var b=0;b<blocktypes.length;b++){
		if(blocktypes[b].name==Block.name && blocktypes[b].command==Block.command){
			blocktypes[b].count++;
			return;
		}
	}
	blocktypes.push({name:Block.name,count:1,command:Block.command});
}
function displayBuildingData(Ind){
	if(buildings[Ind].blocktypes.length == 0){analyzeBuildingBlockData(Ind);}
	wInd=Ind;
	dosmashtypes();
	buildings[Ind].condensedtypes=DeepCopy(condensedtypes);
	drawBuildingData(buildings[wInd]);
}
function drawBuildingData(thebuilding){
	var pg ='<div class="row m-3">';
		pg += '<div class="p-3 bg-light text-dark row border border-primary rounded justify-content-center">';
			pg+='<h3 class="row col-sm-12 justify-content-center">Block data for building:</h3>';
			pg+='<dt class="col-sm-3">Lowest Coordinate</dt><dd class="col-sm-3">X:'+thebuilding.lx+'</dd><dd class="col-sm-3">Y:'+thebuilding.ly+'</dd><dd class="col-sm-3">Z:'+thebuilding.lz+'</dd>';
			pg+='<dt class="col-sm-3">Highest Coordinate</dt><dd class="col-sm-3">X:'+thebuilding.hx+'</dd><dd class="col-sm-3">Y:'+thebuilding.hy+'</dd><dd class="col-sm-3">Z:'+thebuilding.hz+'</dd>';
			for(var t=0;t<thebuilding.blocktypes.length;t++){
				pg+='<dt class="col-sm-1"><select id="SlGrp'+t+'"><option value="0">1<option value="1">2</select></dt><dt class="col-sm-3" title="'+thebuilding.blocktypes[t].command+'">'+thebuilding.blocktypes[t].name+' count:</dt><dd class="col-sm-8">'+thebuilding.blocktypes[t].count+'</dd>';
			}
		pg += '</div>'
	pg += '</div>';
	pg +='<div class="row m-3">';
		pg += '<div class="p-3 bg-light text-dark row border border-primary rounded justify-content-center">';
			pg+='<h3 class="row col-sm-12 justify-content-center">Summary data for building:</h3>';
			for(var t=0;t<thebuilding.condensedtypes.length;t++){
				pg+='<dt class="col-sm-3" title="'+thebuilding.condensedtypes[t].name+'">'+thebuilding.condensedtypes[t].name+' count:</dt><dd class="col-sm-9">'+thebuilding.condensedtypes[t].count+'</dd>';
			}
			pg+='<dt class="col-sm-3">Total number of blocks:</dt><dd class="col-sm-9">'+thebuilding.blocks.length+'</dd>';
			pg+='<input type="button" value="Back" class="btn btn-primary" onclick="DrawImportBuildings();">';
		pg += '</div>'
	pg += '</div>';
	get('importbody').innerHTML=pg;
}
function BuildDiffData(){
	var condensedtypes1=[];
	var condensedtypes2=[];
	analyzeBuildingBlockData(0);
	dosmashtypes();
	buildings[0].condensedtypes = DeepCopy(condensedtypes);
	analyzeBuildingBlockData(1);
	dosmashtypes();
	buildings[1].condensedtypes = DeepCopy(condensedtypes);
	condensedtypes1 = DeepCopy(buildings[0].condensedtypes);
	condensedtypes2 = DeepCopy(buildings[1].condensedtypes);
	for(var c=0;c<condensedtypes2.length;c++){
		for(var a=0;a<condensedtypes1.length;a++){
			if(condensedtypes2[c].name==condensedtypes1[a].name){
				condensedtypes2[c].count -= condensedtypes1[a].count;
				break;
			}
		}
	}
	pg ='<div class="row m-3">';
		pg += '<div class="p-3 bg-light text-dark row border border-primary rounded justify-content-center">';
			pg+='<h3 class="row col-sm-12 justify-content-center">Summary data for building:</h3>';
			for(var t=0;t<condensedtypes2.length;t++){
				pg+='<dt class="col-sm-3" title="'+condensedtypes2[t].name+'">'+condensedtypes2[t].name+' count:</dt><dd class="col-sm-9">'+condensedtypes2[t].count+'</dd>';
			}
			pg+='<input type="button" value="Back" class="btn btn-primary" onclick="DrawImportBuildings();">';
		pg += '</div>'
	pg += '</div>';
	get('importbody').innerHTML=pg;
}
function BuildDiffCommands(){
	if(buildings[0].blocktypes.length == 0){analyzeBuildingBlockData(0);}
	if(buildings[1].blocktypes.length == 0){analyzeBuildingBlockData(1);}
	var newblocks=[];
	if(buildings[0].blocks.length != buildings[1].blocks.length){
		console.log('BuildDiffCommands length does not match '+buildings[0].blocks.length+'!='+buildings[1].blocks.length);
		SetError('Block length does not match');
		return;
	}else{
		for(var i=0;i<buildings[0].blocks.length;i++){
			if((buildings[0].blocks[i].x==buildings[1].blocks[i].x)&&(buildings[0].blocks[i].y==buildings[1].blocks[i].y)&&(buildings[0].blocks[i].z==buildings[1].blocks[i].z)){
				newblocks.push(DeepCopy(buildings[1].blocks[i]));
				if(buildings[0].blocks[i].command == buildings[1].blocks[i].command){
					newblocks[i].name='nodif';
					newblocks[i].command='nodif';
				}
			}else{
				console.log('cord did not match');
			}				
		}
	}
	analyzeTheBlocks(newblocks);
	createBuildingNESWData(newblocks);
}
function DiffBuldsBlcks(blocks1,blocks2){
	var newblocks=[];
	get('titletxt').innerHTML="Diffing blocks...";
	console.log('diffing buildings blocks...');
	for(var d=0;d<blocks2.length;d++){
		newblocks.push(DeepCopy(blocks2[d]));
		if(blocks1[d] && ((blocks1[d].x==blocks2[d].x)&&(blocks1[d].y==blocks2[d].y)&&(blocks1[d].z==blocks2[d].z))){
			if(blocks1[d].command == blocks2[d].command){
				newblocks[newblocks.length-1].name='nodif';
				newblocks[newblocks.length-1].command='nodif';
			}		
		}else{
			for(var i=0;i<blocks1.length;i++){
				if((blocks1[i].x==blocks2[d].x)&&(blocks1[i].y==blocks2[d].y)&&(blocks1[i].z==blocks2[d].z)){
					if(blocks1[i].command == blocks2[d].command){
						newblocks[newblocks.length-1].name='nodif';
						newblocks[newblocks.length-1].command='nodif';
					}
					break;
				}
			}
		}
	}	
	return newblocks;
}
function clearground(Ind){
	wInd=Ind;
	ReplaceBlocks(-1,-1,'dirt','air');
	ReplaceBlocks(-1,-1,'grass_block','air');
	SetError('Complete');
}
function DrawImportBuildings(){
	var pg='';
	pg += '<div class="row m-3">';
		pg += '<div class="col-lg-8" id="BuildingList">';
			if(buildings.length > 0){
				for(var b=0;b<buildings.length;b++){
					var brd='border-primary';
					if(BuildInd==b){brd='border-secondary';}
					pg += '<div class="container">';
						pg += '<div class="row bg-light border '+brd+' rounded text-center p-1">';
							pg += '<div class="text-dark col" id="bname'+b+'">'+buildings[b].name+'</div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Save" onclick=SaveBuilding('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Delete" onclick=DeleteBuilding('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Add Block" onclick=ShowAddBlockToBuilding('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Replace Blocks" onclick=ShowReplaceBlocksInBuilding('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Set Index" onclick=SetBuildingInd('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Analyze" onclick=analyzeBuildingBlockData('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Show" onclick=displayBuildingData('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Contribution" onclick=ShowAddContributionToBuilding('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Console" onclick=ConsoleBuilding('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Commands" onclick=createForBuildingNESWData('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Print" onclick=printCommandsForBuilding('+b+');></div>';
							pg += '<div class="col"><input type="button" class="btn btn-sm btn-primary" value="Clear Ground" onclick=clearground('+b+');></div>';
						pg += '</div>';
					pg += '</div>';
				}
			}else{
				pg += '<h1 class="display-4">Import your buildings!</h1>';
			}
		pg += '</div>';
		pg += '<div class="col-lg-4">';
			pg += '<div class="card bg-primary text-center card-form">';
				pg += '<div class="card-body">';
					pg += '<h5>Upload your building here</h5>';
					pg += '<form id="UploadForm" action="upload.php" method="post" enctype="multipart/form-data" target="upload_target">';
					pg += '<input class="d-none" name="fileupload[]" id="fileupload" onchange="UploadFile();" type="file" multiple>';
					pg += '<input type="text" id="xoffset" value="'+((lastxoffset)?lastxoffset:'')+'" class="form-control my-1" placeholder="X Offset">';
					pg += '<input type="text" id="yoffset" value="'+((lastyoffset)?lastyoffset:'')+'" class="form-control my-1" placeholder="Y Offset">';
					pg += '<input type="text" id="zoffset" value="'+((lastzoffset)?lastzoffset:'')+'" class="form-control my-1" placeholder="Z Offset">';
					pg += '<input type="text" id="building" value="'+((lastname)?lastname:'')+'" class="form-control my-1" placeholder="Building Name" onchange=UpdateBuildingName()>';
					pg += '<input type="text" id="folder" class="form-control my-1" placeholder="Folder Name">';
					pg += '<div class="form-inline"><input type="checkbox" id="giveblocks" class="form-control my-2"><label for="giveblocks" class="btn">Give player blocks</label></div>';
					pg += '<input type="button" value="Select File" onclick=get("fileupload").click(); class="btn btn-outline-light btn-block" />';
					if(buildings.length == 2){
						pg += '<input type="button" value="Difference Commands" onclick=BuildDiffCommands(); class="btn btn-dark btn-block" />';
						pg += '<input type="button" value="Difference Data" onclick=BuildDiffData(); class="btn btn-dark btn-block" />';
					}
					pg += '<input type="button" value="Build All Commands" onclick=StartBuildAllCommands(); class="btn btn-dark btn-block" />';
					pg += '<input type="button" value="Print All" onclick=printAllBuildings(); class="btn btn-dark btn-block" />';
					pg += '</form>';
				pg += '</div>';
			pg += '</div>';
		pg += '</div>';
	pg += '</div>';
	get('importbody').innerHTML=pg;
	if(buildings[BuildInd]){
		get('building').value=buildings[BuildInd].name;
	}
}
function getChests(thecondensedtypes){
	var signblocks=[];
	var namestolong=[];
	for(var t=0;t<thecondensedtypes.length;t++){
		if(thecondensedtypes[t].name=='armor_stand'){
			MaxStack=16;
		}else{
			MaxStack=64;
		}
		if(thecondensedtypes[t].name=='lava_bucket' || 
			thecondensedtypes[t].name=='water_bucket' ||
			(thecondensedtypes[t].name.indexOf('sword') >= 0) ||
			(thecondensedtypes[t].name.indexOf('boots') >= 0) ||
			(thecondensedtypes[t].name.indexOf('chestplate') >= 0) ||
			(thecondensedtypes[t].name.indexOf('helmet') >= 0) ||
			(thecondensedtypes[t].name.indexOf('leggings') >= 0) ||
			thecondensedtypes[t].name=='bow' ||
			thecondensedtypes[t].name=='cake'){
			for(let i=0;i<thecondensedtypes[t].count;i++){
				signblocks.push({stacks:1,count:1,name:thecondensedtypes[t].name});
			}			
			continue;
		}
		if(thecondensedtypes[t].name=='nodif'||thecondensedtypes[t].name=='air'||thecondensedtypes[t].name=='villager'||thecondensedtypes[t].name=='piston_head'){
			console.log('skipping '+thecondensedtypes[t].name);
			continue;
		}
		if(thecondensedtypes[t].name=='dirt'||thecondensedtypes[t].name=='grass_path'){
			console.log('skipping '+thecondensedtypes[t].name);
			continue;
		}
		if(thecondensedtypes[t].name.indexOf('_wall_sign') >= 0){
			thecondensedtypes[t].name = thecondensedtypes[t].name.replace('_wall_sign','_sign');
		}
		var leftover=0;
		var stcks=0;
		var numblocks=parseInt(thecondensedtypes[t].count);
		var cname = thecondensedtypes[t].name;
		var ccount = thecondensedtypes[t].count;
		if(ccount > MaxStack){
			leftover= numblocks % MaxStack;
			numblocks -= leftover;
			stcks = numblocks / MaxStack;
		}else{
			leftover=numblocks;
		}
		while(stcks > 9){
			signblocks.push({stacks:9,count:MaxStack,name:cname});
			stcks-=9;
		}
		if(stcks > 0){
			signblocks.push({stacks:stcks,count:MaxStack,name:cname});
		}
		if(leftover > 0){
			signblocks.push({stacks:1,count:leftover,name:cname});
		}
	}
	var chests=[];
	var signlines=[];
	var slcount=0;
	var totalstcks=0;
	var maxstcks=27;
	for(var s=0;s<signblocks.length;s++){
		if(signblocks[s].name.length+4 > 26){
			if(slcount>=6){
				//name to long to hold on signs start new chest
				chests.push(signlines);
				signlines=[];
				totalstcks = 0;
				slcount=0;
			}
			//give space for long sign name
			slcount++;
			slcount++;
		}else if(signblocks[s].name.length+4 > 15){
			if(slcount>=7){
				//name to long to hold on signs start new chest
				chests.push(signlines);
				signlines=[];
				totalstcks = 0;
				slcount=0;
			}
			//give space for long sign name
			slcount++;
		}
		if(totalstcks + signblocks[s].stacks <= maxstcks){
			totalstcks += signblocks[s].stacks;
			signlines.push(DeepCopy(signblocks[s]));
			slcount++
		}else{
			chests.push(signlines);
			signlines=[];
			totalstcks = signblocks[s].stacks;
			signlines.push(DeepCopy(signblocks[s]));
			slcount=1;
		}
		if(slcount==8){
			chests.push(signlines);
			signlines=[];
			totalstcks = 0;
			slcount=0;
		}
	}
	chests.push(signlines);
	return chests;
}
function processChestCommands(xoffset,yoffset,zoffset,bname,fname,bdirection,buildingcommands,chests){
	var rxoffset=xoffset*-1;
	var ryoffset=yoffset*-1;
	var rzoffset=zoffset*-1;
	var rot='rotation=0';
	var sign1xyz=(rxoffset-1).toString()+' ~'+ryoffset.toString()+' ~'+(rzoffset).toString();
	var sign2xyz=(rxoffset+1).toString()+' ~'+ryoffset.toString()+' ~'+(rzoffset).toString();
	if(bdirection=='west'){
		rot='rotation=4';
		sign1xyz=(rxoffset).toString()+' ~'+ryoffset.toString()+' ~'+(rzoffset-1).toString();
		sign2xyz=(rxoffset).toString()+' ~'+ryoffset.toString()+' ~'+(rzoffset+1).toString();
	}else if(bdirection=='north'){
		rot='rotation=8';
		sign1xyz=(rxoffset+1).toString()+' ~'+ryoffset.toString()+' ~'+(rzoffset).toString();
		sign2xyz=(rxoffset-1).toString()+' ~'+ryoffset.toString()+' ~'+(rzoffset).toString();
	}else if(bdirection=='east'){
		rot='rotation=12';
		sign1xyz=(rxoffset).toString()+' ~'+ryoffset.toString()+' ~'+(rzoffset+1).toString();
		sign2xyz=(rxoffset).toString()+' ~'+ryoffset.toString()+' ~'+(rzoffset-1).toString();
	}
	commandlist=[];
	for(var c=0;c<chests.length;c++){
		var signlines=[];
		for(var s=0;s<chests[c].length;s++){
			var sttext=chests[c][s].stacks+'x'+chests[c][s].count;
			if(replaceSponge && chests[c][s].name=='sponge'){
				chests[c][s].name='water_bucket';
			}
			if(chests[c][s].name.length+4 > 15){
				var stsplit=chests[c][s].name.split('_');
				if(stsplit[0].length+4 > 15){
					signlines.push(sttext+stsplit[0].substr(0, 7)+'-');
					signlines.push(stsplit[0].substr(7));					
				}else{
					var line=sttext;
					for(var p=0;p<stsplit.length;p++){
						if((line+stsplit[p]).length > 15){
							signlines.push(line);
							line='';
						}
						line += stsplit[p];
					}
					signlines.push(line);
				}
			}else{
				signlines.push(sttext+chests[c][s].name);
			}
		}
		var sign1txt = '{Text1:\'{"text":"'+signlines[0]+'"}\'';
		if(signlines.length>1){sign1txt+=',Text2:\'{"text":"'+signlines[1]+'"}\'';}
		if(signlines.length>2){sign1txt+=',Text3:\'{"text":"'+signlines[2]+'"}\'';}
		if(signlines.length>3){sign1txt+=',Text4:\'{"text":"'+signlines[3]+'"}\'';}
		sign1txt+='}';
		var sign2txt = '';
		if(signlines.length>4){
			sign2txt+=' oak_sign['+rot+']{Text1:\'{"text":"'+signlines[4]+'"}\'';
			if(signlines.length>5){sign2txt+=',Text2:\'{"text":"'+signlines[5]+'"}\'';}
			if(signlines.length>6){sign2txt+=',Text3:\'{"text":"'+signlines[6]+'"}\'';}
			if(signlines.length>7){sign2txt+=',Text4:\'{"text":"'+signlines[7]+'"}\'';}
			sign2txt+='}';
		}
		var inchest='';
		var slot=0;
		for(var i=0;i<chests[c].length;i++){
			for(var s=0;s<chests[c][i].stacks;s++){
				if(slot != 0){inchest+=','}
				inchest+='{Slot:'+slot+'b,id:"minecraft:'+chests[c][i].name+'",Count: '+chests[c][i].count+'b}';
				if(giveBlocksToPlayer){
					commandlist.push('give @p[tag=Admin] '+chests[c][i].name+' '+chests[c][i].count);
				}
				slot++;
			}
		}
		if(c==0 && pBuildInd > 0){
			for(var co=0;co<carryOverList.length;co++){
				console.log(carryOverList[co].name+'?='+(bname+(pBuildInd+BuildingNameOffset).toString()+bdirection+c.toString()));
				if(carryOverList[co].name==(bname+(pBuildInd+BuildingNameOffset).toString()+bdirection+c.toString())){
					console.log('Adding carry over commands for: '+(bname+(pBuildInd+BuildingNameOffset).toString()+bdirection+c.toString()));
					for(var j=0;j<carryOverList[co].commands.length;j++){
						commandlist.push(carryOverList[co].commands[j]);
					}
					commandlist.push('kill @e[type=item,distance=..40]');
				}
			}			
		}
		var buildingname=bname+(pBuildInd+BuildingNameOffset).toString()+bdirection+(c+1).toString();
		if(c == chests.length-1){
			if(pBuildInd < buildings.length-1){
				buildingname=bname+(pBuildInd+BuildingNameOffset+1)+bdirection+'0';
			}else{
				buildingname=bname+(pBuildInd+BuildingNameOffset).toString()+bdirection+(c+1).toString();
			}
		}
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+ryoffset.toString()+' ~'+rzoffset.toString()+' air');
		commandlist.push('setblock ~'+sign1xyz+' air');
		commandlist.push('setblock ~'+sign2xyz+' air');
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+(ryoffset-2).toString()+' ~'+rzoffset.toString()+' dirt');
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+(ryoffset-3).toString()+' ~'+rzoffset.toString()+' dirt');
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+ryoffset.toString()+' ~'+rzoffset.toString()+' chest[facing='+bdirection+']');
		commandlist.push('setblock ~'+sign1xyz+' oak_sign['+rot+']'+sign1txt);
		commandlist.push('setblock ~'+sign2xyz+sign2txt);
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+(ryoffset-2).toString()+' ~'+rzoffset.toString()+' repeating_command_block{Command:\'/execute if block ~ ~2 ~ chest{Items:['+inchest+']} positioned ~'+xoffset.toString()+' ~'+(yoffset+2).toString()+' ~'+zoffset.toString()+' run function build:'+fname+'/'+buildingname+'\',auto:1b}');
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+(ryoffset-3).toString()+' ~'+rzoffset.toString()+' repeating_command_block{Command:\'/execute if block ~ ~3 ~ air run function main:clearbox\',auto:1b}');
		clists.push({name:bname+(pBuildInd+BuildingNameOffset).toString()+bdirection+(c).toString(),commands:commandlist});
		commandlist=[];
	}
	if(pBuildInd < buildings.length-1){
		console.log('Carrying over: '+buildingname);
		carryOverList.push({name:buildingname,commands:DeepCopy(buildingcommands)});
		HandleNextBuilding();
	}else{
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+ryoffset.toString()+' ~'+rzoffset.toString()+' air');
		commandlist.push('setblock ~'+sign1xyz+' air');
		commandlist.push('setblock ~'+sign2xyz+' air');
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+(ryoffset-2).toString()+' ~'+rzoffset.toString()+' dirt');
		commandlist.push('setblock ~'+rxoffset.toString()+' ~'+(ryoffset-3).toString()+' ~'+rzoffset.toString()+' dirt');
		for(var b=0;b<buildingcommands.length;b++){
			commandlist.push(buildingcommands[b]);
		}
		commandlist.push('kill @e[type=item,distance=..40]');
		commandlist.push('scoreboard players add @p emerald 1');
		clists.push({name:bname+(pBuildInd+BuildingNameOffset).toString()+bdirection+chests.length.toString(),commands:commandlist});
		commandlist=[];
		printCommandFiles(clists);
	}
}
var currentxoffset=parseInt(get('xoffset').value);
var currentyoffset=parseInt(get('yoffset').value);
var currentzoffset=parseInt(get('zoffset').value);
var currentbname=get('building').value;
var currentfname=get('folder').value;
var giveBlocksToPlayer=false;
function StartBuildAllCommands(){
	pBuildInd=-1;
	pDirection='south';
	giveBlocksToPlayer=get('giveblocks').checked;
	currentxoffset=parseInt(get('xoffset').value);
	currentyoffset=parseInt(get('yoffset').value);
	currentzoffset=parseInt(get('zoffset').value);
	currentbname=get('building').value;
	currentfname=get('folder').value;
	lastxoffset=get('xoffset').value;
	lastyoffset=get('yoffset').value;
	lastzoffset=get('zoffset').value;
	lastname=get('building').value;
	HandleNextBuilding();
}
function HandleNextBuilding(){
	pBuildInd++;
	pleaseWait("Processing ("+pBuildInd+") building...");
	if(pBuildInd==buildings.length){
		pBuildInd=0;
		carryOverList=[];
		clists=[];
		if(pDirection=='south'){
			pDirection='west';
		}else if(pDirection=='west'){
			pDirection='north';
		}else if(pDirection=='north'){
			pDirection='east';
		}else if(pDirection=='east'){
			pDirection='south';
			SetError('All Done');
			return;
		}
	}
	if(buildings[pBuildInd].condensedtypes.length == 0){
		analyzeBuildingBlockData(pBuildInd);
		dosmashtypes();
		buildings[pBuildInd].condensedtypes = DeepCopy(condensedtypes);
	}
	if(pBuildInd>0){
		var newblocks=DiffBuldsBlcks(buildings[pBuildInd-1].blocks,buildings[pBuildInd].blocks);
		analyzeTheBlocks(newblocks);
		var difcondensedtypes=DeepCopy(buildings[pBuildInd].condensedtypes);
		for(var c=0;c<buildings[pBuildInd-1].condensedtypes.length;c++){
			for(var a=0;a<difcondensedtypes.length;a++){
				if(buildings[pBuildInd-1].condensedtypes[c].name==difcondensedtypes[a].name){
					difcondensedtypes[a].count -= buildings[pBuildInd-1].condensedtypes[c].count;
					break;
				}
			}
		}
		processBuildingBuildAllCommands(pBuildInd,currentxoffset,currentyoffset,currentzoffset,currentbname,currentfname,DeepCopy(difcondensedtypes),DeepCopy(analyzedblocks));
	}else{
		if(BuildingNameOffset==0){
			processBuildingBuildAllCommands(pBuildInd,currentxoffset,currentyoffset,currentzoffset,currentbname,currentfname,DeepCopy(buildings[pBuildInd].condensedtypes),DeepCopy(buildings[pBuildInd].blocks));
		}else{
			HandleNextBuilding();
		}
	}		
}
function addContributions(){
	if(buildings[pBuildInd]){
		if(buildings[pBuildInd].contributions){
			for(var i=0;i<buildings[pBuildInd].contributions.length;i++){
				commandlist.push('scoreboard players add @p '+buildings[pBuildInd].contributions[i].type+' '+buildings[pBuildInd].contributions[i].amount);
			}
		}
	}
}
function processBuildingBuildAllCommands(Ind,xoffset,yoffset,zoffset,bname,fname,thecondtypes,theblocks){
	var nxoffset=zoffset;
	var nyoffset=yoffset;
	var nzoffset=xoffset;
	var tmpblocks = [];
	var thechests = getChests(thecondtypes);
	if(pDirection=='south'){
		pleaseWait("Processing("+Ind+") south commands...");
		createCommandsFromBlockData(theblocks);
		buildingcommands=DeepCopy(commandlist);
		processChestCommands(xoffset,yoffset,zoffset,bname,fname,pDirection,buildingcommands,thechests);
	}else if(pDirection=='west'){
		pleaseWait("Processing("+Ind+") west commands...");
		tmpblocks = DeepCopy(theblocks);
		turnwest(tmpblocks);
		tmpblocks = DeepCopy(blockninty);
		createCommandsFromBlockData(tmpblocks);
		buildingcommands=DeepCopy(commandlist);
		nxoffset=(zoffset*-1);
		nyoffset=yoffset;
		nzoffset=xoffset;
		processChestCommands(nxoffset,nyoffset,nzoffset,bname,fname,pDirection,buildingcommands,thechests);
	}else if(pDirection=='north'){
		pleaseWait("Processing("+Ind+") north commands...");
		tmpblocks = DeepCopy(theblocks);
		turnnorth(tmpblocks);
		tmpblocks = DeepCopy(blockninty);
		createCommandsFromBlockData(tmpblocks);
		buildingcommands=DeepCopy(commandlist);
		nxoffset=(xoffset*-1);
		nyoffset=yoffset;
		nzoffset=(zoffset*-1);
		processChestCommands(nxoffset,nyoffset,nzoffset,bname,fname,pDirection,buildingcommands,thechests);	
	}else if(pDirection=='east'){
		pleaseWait("Processing("+Ind+") east commands...");
		tmpblocks = DeepCopy(theblocks);
		turneast(tmpblocks);
		tmpblocks = DeepCopy(blockninty);
		createCommandsFromBlockData(tmpblocks);
		buildingcommands=DeepCopy(commandlist);
		nxoffset=(zoffset);
		nyoffset=yoffset;
		nzoffset=(xoffset*-1);
		processChestCommands(nxoffset,nyoffset,nzoffset,bname,fname,pDirection,buildingcommands,thechests);
	}
}
function printAddBuildingCommands(Ind){
	southcommandlist=[];
	westcommandlist=[];
	northcommandlist=[];
	eastcommandlist=[];
	//create south
	createCommandsFromBlockData(buildings[Ind].blocks);
	southcommandlist=DeepCopy(commandlist);
	var tmpblocks = DeepCopy(buildings[Ind].blocks);
	turnwest(tmpblocks);
	tmpblocks = DeepCopy(blockninty);
	createCommandsFromBlockData(tmpblocks);
	westcommandlist=DeepCopy(commandlist);
	tmpblocks = DeepCopy(buildings[Ind].blocks);
	turnnorth(tmpblocks);
	tmpblocks = DeepCopy(blockninty);
	createCommandsFromBlockData(tmpblocks);
	northcommandlist=DeepCopy(commandlist);
	tmpblocks = DeepCopy(buildings[Ind].blocks);
	turneast(tmpblocks);
	tmpblocks = DeepCopy(blockninty);
	createCommandsFromBlockData(tmpblocks);
	eastcommandlist=DeepCopy(commandlist);
	clists.push({name:buildings[Ind].name+'south',commands:southcommandlist});
	clists.push({name:buildings[Ind].name+'west',commands:westcommandlist});
	clists.push({name:buildings[Ind].name+'east',commands:eastcommandlist});
	clists.push({name:buildings[Ind].name+'north',commands:northcommandlist});
}
function printAllBuildings(){
	clists=[];
	for(var i=0;i<buildings.length;i++){
		printAddBuildingCommands(i);
	}
	printCommandFiles(clists);
}
function printCommandsForBuilding(Ind){
	pBuildInd = Ind;	
	clists=[];
	printAddBuildingCommands(Ind);
	printCommandFiles(clists);	
}
function createForBuildingNESWData(Ind){
	pBuildInd = Ind;
	createBuildingNESWData(buildings[Ind].blocks);
}
function createBuildingNESWData(TheBlocks){
	southcommandlist=[];
	westcommandlist=[];
	northcommandlist=[];
	eastcommandlist=[];
	//create south
	createCommandsFromBlockData(TheBlocks);
	southcommandlist=DeepCopy(commandlist);
	var tmpblocks = DeepCopy(TheBlocks);
	turnwest(tmpblocks);
	tmpblocks = DeepCopy(blockninty);
	createCommandsFromBlockData(tmpblocks);
	westcommandlist=DeepCopy(commandlist);
	tmpblocks = DeepCopy(TheBlocks);
	turnnorth(tmpblocks);
	tmpblocks = DeepCopy(blockninty);
	createCommandsFromBlockData(tmpblocks);
	northcommandlist=DeepCopy(commandlist);
	tmpblocks = DeepCopy(TheBlocks);
	turneast(tmpblocks);
	tmpblocks = DeepCopy(blockninty);
	createCommandsFromBlockData(tmpblocks);
	eastcommandlist=DeepCopy(commandlist);
	showNESWBlockCommandList();
}
function showNESWBlockCommandList(){
	var pg ='<div class="row m-3">';
		pg += '<div class="p-3 bg-light text-dark row border border-primary rounded col-md-12 justify-content-center">'
			pg+='<h3 class="row col-sm-12 justify-content-center">South Commands:</h3>';
			pg +='<div class="col-lg-12"><textarea rows="10" class="form-control mb-3" style="resize:both">';
			for(var c=0;c<southcommandlist.length;c++){
				pg+=southcommandlist[c]+'\n';
			}
			pg +='</textarea></div>';
			pg+='<h3 class="row col-sm-12 justify-content-center">West Commands:</h3>';
			pg +='<div class="col-lg-12"><textarea rows="10" class="form-control mb-3" style="resize:both">';
			for(var c=0;c<westcommandlist.length;c++){
				pg+=westcommandlist[c]+'\n';
			}
			pg +='</textarea></div>';
			pg+='<h3 class="row col-sm-12 justify-content-center">North Commands:</h3>';
			pg +='<div class="col-lg-12"><textarea rows="10" class="form-control mb-3" style="resize:both">';
			for(var c=0;c<northcommandlist.length;c++){
				pg+=northcommandlist[c]+'\n';
			}
			pg +='</textarea></div>';
			pg+='<h3 class="row col-sm-12 justify-content-center">East Commands:</h3>';
			pg +='<div class="col-lg-12"><textarea rows="10" class="form-control mb-3" style="resize:both">';
			for(var c=0;c<eastcommandlist.length;c++){
				pg+=eastcommandlist[c]+'\n';
			}
			pg +='</textarea></div>';
			pg+='<div class="col-sm-12"><input type="button" value="Show Block Data" class="btn btn-primary" onclick="DrawImportBuildings();"><div>';
		pg += '</div>'
	pg += '</div>';
	get('importbody').innerHTML=pg;
}
function createCommandsFromBlockData(TheBlocks){
	analyzeTheBlocks(TheBlocks);
	TheBlocks = DeepCopy(analyzedblocks);
	var mostBlock = 'air';
	var mostCount = 0;
	var diffound=false;
	commandlist = [];
	for(var t=0;t<blocktypes.length;t++){
		if(blocktypes[t].command=='nodif'){diffound=true;continue;}
		if(blocktypes[t].count > mostCount){
			mostBlock=blocktypes[t].command;
			mostCount=blocktypes[t].count;
		}
	}
	if(!diffound){
		if(mostBlock != 'air'){
			commandlist.push("fill "+getXYZTxt({x:lx,y:ly,z:lz})+' '+getXYZTxt({x:hx,y:hy,z:hz})+' '+mostBlock);
		}
	}
	var blockdata=[];
	for(var x=lx;x<=hx;x++){
		blockdata[x]=[];
		for(var y=ly;y<=hy;y++){
			blockdata[x][y]=[];
			for(var z=lz;z<=hz;z++){
				blockdata[x][y][z]={command:mostBlock,nextblock:false};
			}
		}
	}
	for(var i=0;i<TheBlocks.length;i++){
		blockdata[TheBlocks[i].x][TheBlocks[i].y][TheBlocks[i].z]={name:TheBlocks[i].name,command:TheBlocks[i].command,nextblock:false};
	}
	var x=0;var y=0;var z=0;
	var sx=0;var sy=0;var sz=0; var lowx=0;var lowy=0;var lowz=0; var sid=-1; var sdv=0;
	var bcmd=""; var sameblock=false;
	var bnm="";
	for(o=0;o<TheBlocks.length;o++){
		x=TheBlocks[o].x;
		y=TheBlocks[o].y;
		z=TheBlocks[o].z;
		if(blockdata[x][y][z].command=='nodif'){
			continue;
		}
		if(blockdata[x][y][z].command==mostBlock && !diffound){
			continue;
		}
		if(blockdata[x][y][z].nextblock){
			continue;
		}
		sx=x;sy=y;sz=z;lowx=x;lowy=y;lowz=z;px=x;py=y;pz=z;
		bcmd=blockdata[x][y][z].command; 
		bnm=blockdata[x][y][z].name;
		sameblock=true;conx=0;
		while(sameblock){
			px++;
			if(blockdata[px]!=undefined && blockdata[px][py]!=undefined && blockdata[px][py][pz]!=undefined){
				if((blockdata[px][py][pz].command==bcmd) && bnm != 'item_frame' && bnm != 'armor_stand'){
					lowx=px;conx++;
				}else{
					sameblock=false;
				}
			}else{sameblock=false;}
		}
		
		sameblock=true;conz=0;px=sx;
		while(sameblock){
			pz++;
			for(j=0;j<=conx;j++){
				if(blockdata[(px+j)]!=undefined && blockdata[(px+j)][py]!=undefined && blockdata[(px+j)][py][pz]!=undefined){
					if((blockdata[(px+j)][py][pz].command!=bcmd) || bnm == 'item_frame' || bnm == 'armor_stand'){
						sameblock=false;
					}
				}else{sameblock=false;}
			}
			if(sameblock){
				conz++;
				lowz=pz;
			}
		}
		sameblock=true;cony=0;px=sx;pz=sz;
		while(sameblock){
			py++;
			for(j=0;j<=conx;j++){
				for(k=0;k<=conz;k++){
					if(blockdata[(px+j)]!=undefined && blockdata[(px+j)][py]!=undefined && blockdata[(px+j)][py][pz+k]!=undefined){
						if((blockdata[(px+j)][py][pz+k].command!=bcmd) || bnm == 'item_frame' || bnm == 'armor_stand'){
							sameblock=false;
						}
					}else{sameblock=false;}
				}
			}
			if(sameblock){
				cony++;
				lowy=py;
			}
		}		
		
		/*sameblock=true;cony=0;px=sx;
		while(sameblock){
			py++;
			for(j=0;j<=conx;j++){
				if(blockdata[(px+j)]!=undefined && blockdata[(px+j)][py]!=undefined && blockdata[(px+j)][py][pz]!=undefined){
					if((blockdata[(px+j)][py][pz].command!=bcmd)){
						sameblock=false;
					}
				}else{sameblock=false;}
			}
			if(sameblock){
				cony++;
				lowy=py;
			}
		}
		sameblock=true;conz=0;px=sx;py=sy;
		while(sameblock){
			pz++;
			for(j=0;j<=conx;j++){
				for(k=0;k<=cony;k++){
					if(blockdata[(px+j)]!=undefined && blockdata[(px+j)][(py+k)]!=undefined && blockdata[(px+j)][(py+k)][pz]!=undefined){
						if((blockdata[(px+j)][(py+k)][pz].command!=bcmd)){
							sameblock=false;
						}
					}else{sameblock=false;}
				}
			}
			if(sameblock){
				conz++;
				lowz=pz;
			}
		}
		*/
		for(l=sx;l<=lowx;l++){
			for(j=sy;j<=lowy;j++){
				for(k=sz;k<=lowz;k++){
					blockdata[l][j][k].nextblock=true;
				}
			}
		}
		var s='~'+sx+' ~'+sy+' ~'+sz; 
		var e='~'+lowx+' ~'+lowy+' ~'+lowz;
		if(isHex(bcmd)){bcmd=hexToString(bcmd);}
		if(s==e){
			if(bcmd=="villager"){
				commandlist.push('summon villager '+s);
			}else if(bnm=="item_frame" || bnm=="armor_stand" || bnm=="sign"){
				commandlist.push('summon '+bnm+' '+s+' '+bcmd);
			}else if(bcmd=="structure_block[mode=save]"){
				continue;
			}else{
				commandlist.push('setblock '+s+' '+bcmd);
			}
		}else{
			if(bnm=="item_frame" || bnm=="armor_stand"){
				console.log('Error trying to fill with item_frame');
			}else{
				commandlist.push('fill '+s+' '+e+' '+bcmd);
			}
		}
	}
	addContributions();
}