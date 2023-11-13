function generateBuildingFunctions(){
	clists = [];
	buildGenBuildingFunctions();
	buildRoofFunctions();
	buildBaseFunctions();
	buildWallFunctions();
	buildRoofGenFunctions();
	printCommandFiles(clists);
}

function buildGenBuildingFunctions(){
	buildTestGenFunctions();
	buildTestEvenGenFunctions();
	buildStartGenFunctions();
	buildEndGenFunctions();
}

function buildTestGenFunctions(){
	var cmdList = [];
	cmdList.push('scoreboard players set @p vara 9'); //set width of building
	cmdList.push('scoreboard players set @p varb 15'); //set height of building
	cmdList.push('scoreboard players set @p varc 23'); //set length of building
	cmdList.push('function strct:gen/startbuilding');
	clists.push({name:'testbuild',commands:cmdList,folder:'gen'});
}

function buildTestEvenGenFunctions(){
	var cmdList = [];
	cmdList.push('scoreboard players set @p vara 12'); //set width of building
	cmdList.push('scoreboard players set @p varb 8'); //set height of building
	cmdList.push('scoreboard players set @p varc 16'); //set length of building
	cmdList.push('function strct:gen/startbuilding');
	clists.push({name:'testevenbuild',commands:cmdList,folder:'gen'});
}

function buildStartGenFunctions(){
	var cmdList = [];
	cmdList.push('summon armor_stand ~ ~ ~ {CustomName:\'"BuildingBase"\',CustomNameVisible:false,NoGravity:1,Invulnerable:1,NoBasePlate:1,ShowArms:0,Small:1,Invisible:1,DisabledSlots:2039552,Equipment:[{},{},{},{},{Damage:0,id:quartz_block}]}');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="BuildingBase"] vara = @s vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="BuildingBase"] varb = @s varb');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="BuildingBase"] varc = @s varc');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="BuildingBase"] vard 0'); //used by base builder to hold next wall count
	//hold the direction we are building
	cmdList.push('execute at @p[y_rotation=-45..45] as @s run scoreboard players set @e[type=armor_stand,name="BuildingBase"] dir 0'); //south
	cmdList.push('execute at @p[y_rotation=46..135] as @s run scoreboard players set @e[type=armor_stand,name="BuildingBase"] dir 1'); //west
	cmdList.push('execute at @p[y_rotation=136..-135] as @s run scoreboard players set @e[type=armor_stand,name="BuildingBase"] dir 2'); //north
	cmdList.push('execute at @p[y_rotation=-136..-44] as @s run scoreboard players set @e[type=armor_stand,name="BuildingBase"] dir 3'); //east
	cmdList.push('execute as @e[type=armor_stand,name="BuildingBase"] at @s run function strct:base/basestart');
	clists.push({name:'startbuilding',commands:cmdList,folder:'gen'});
}

function buildRoofGenFunctions(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="BuildingBase"] at @s run function strct:roof/roofstart');
	cmdList.push('function strct:gen/endbuilding');
	clists.push({name:'buildroof',commands:cmdList,folder:'gen'});
}

function buildEndGenFunctions(){
	var cmdList = [];
	//cmdList.push('scoreboard players reset @p vara');
	cmdList.push('kill @e[type=armor_stand,name="BuildingBase"]');
	clists.push({name:'endbuilding',commands:cmdList,folder:'gen'});
}