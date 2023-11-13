function buildRoofFunctions(){
	buildroofarcnorthstartFunction();
	buildroofarceaststartFunction();
	buildroofarcsouthstartFunction();
	buildroofarcweststartFunction();
	buildroofarcnorthFunction();
	buildroofarceastFunction();
	buildroofarcsouthFunction();
	buildroofarcwestFunction();
	buildroofnorthwallFunction();
	buildroofeastwallFunction();
	buildroofsouthwallFunction();
	buildroofwestwallFunction();
	buildroofnorthlogsFunction();
	buildroofeastlogsFunction();
	buildroofsouthlogsFunction();
	buildroofwestlogsFunction();
	buildroofarcnorthendFunction();
	buildroofarceastendFunction();
	buildroofarcsouthendFunction();
	buildroofarcwestendFunction();
	buildevendownFunction();
	buildRoofArcEvenStartFunction();
	buildroofevennortharcFunction();
	buildRoofEvenWallFunction();
	buildRoofEvenLogsFunction();
	buildRoofArcEvenEndFunction();
	buildMoveRoofBuilderUp();
	buildRoofStart();
	buildRoofEnd();
}
function buildRoofStart(){
	var cmdList = [];
	cmdList.push('summon armor_stand ~ ~ ~ {CustomName:\'"RoofBuilder"\',CustomNameVisible:false,NoGravity:1,Invulnerable:1,NoBasePlate:1,ShowArms:0,Small:1,Invisible:1,DisabledSlots:2039552,Equipment:[{},{},{},{},{Damage:0,id:quartz_block}]}');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vara = @e[type=armor_stand,name="BuildingBase"] vara');//width
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] varb = @e[type=armor_stand,name="BuildingBase"] varb');//height
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] dir = @e[type=armor_stand,name="BuildingBase"] dir'); //direction	
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] varb 2'); //go down 2 so it covers the base
	cmdList.push('scoreboard players add @e[type=armor_stand,name="RoofBuilder"] vara 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare = @e[type=armor_stand,name="RoofBuilder"] vara');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="RoofBuilder"] vard 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare /= @e[type=armor_stand,name="RoofBuilder"] vard');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vard = @e[type=armor_stand,name="BuildingBase"] varc');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] vard 3');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] varb += @e[type=armor_stand,name="RoofBuilder"] vare');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] varc = @e[type=armor_stand,name="BuildingBase"] varc');//length
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare = @e[type=armor_stand,name="RoofBuilder"] varb');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vare=1..}] run function strct:roof/roofbuilderup');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=0}] at @s run teleport ~ ~ ~-2');  //we are south so move north
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=1}] at @s run teleport ~2 ~ ~');  //we are west so move east
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=2}] at @s run teleport ~ ~ ~2');  //we are north so move south
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=3}] at @s run teleport ~-2 ~ ~');  //we are east so move west
	//see if we need an odd or even roof
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] varb = @e[type=armor_stand,name="BuildingBase"] vara');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="RoofBuilder"] vare 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] varb %= @e[type=armor_stand,name="RoofBuilder"] vare');
	//build odd if left over
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=0}] run function strct:roof/roofarcsouthstart');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=0}] run function strct:roof/roofarcsouth');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=0}] run function strct:roof/roofarcsouthend');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=1}] run function strct:roof/roofarcweststart');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=1}] run function strct:roof/roofarcwest');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=1}] run function strct:roof/roofarcwestend');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=2}] run function strct:roof/roofarcnorthstart');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=2}] run function strct:roof/roofarcnorth');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=2}] run function strct:roof/roofarcnorthend');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=3}] run function strct:roof/roofarceaststart');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=3}] run function strct:roof/roofarceast');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=1,dir=3}] run function strct:roof/roofarceastend');	
	//build even if not - teleport one more since we are a little wider
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=0}] at @s run teleport ~ ~-1 ~');
	//go a little furth if building west
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=0,dir=1}] at @s run teleport ~ ~ ~1');
	//go a little less if building east
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=0,dir=3}] at @s run teleport ~ ~ ~-1');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=0}] run function strct:roof/roofarcevenstart');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=0}] run function strct:roof/roofevennortharc');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={varb=0}] run function strct:roof/roofevennortharcend');
	cmdList.push('function strct:roof/roofend');
	clists.push({name:'roofstart',commands:cmdList,folder:'roof'});
}
function buildMoveRoofBuilderUp(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport ~ ~1 ~');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] vare 1');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vare=1..}] run function strct:roof/roofbuilderup');
	clists.push({name:'roofbuilderup',commands:cmdList,folder:'roof'});
}

function buildroofarcnorthstartFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~0 ~1 ~-1 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~0 ~0 ~-1 spruce_stairs[facing=north,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=east]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west,half=top]');
	}
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~ ~ ~-1');
	clists.push({name:'roofarcnorthstart',commands:cmdList,folder:'roof'});
}

function buildroofarceaststartFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~1 ~1 ~0 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~0 spruce_stairs[facing=east,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=south]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' spruce_stairs[facing=south,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' spruce_stairs[facing=north,half=top]');
	}
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~1 ~ ~');
	clists.push({name:'roofarceaststart',commands:cmdList,folder:'roof'});
}

function buildroofarcsouthstartFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~0 ~1 ~1 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~0 ~0 ~1 spruce_stairs[facing=south,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=west]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east,half=top]');
	}
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~ ~ ~1');
	clists.push({name:'roofarcsouthstart',commands:cmdList,folder:'roof'});
}

function buildroofarcweststartFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~-1 ~1 ~0 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~0 spruce_stairs[facing=west,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=north]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' spruce_stairs[facing=north,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' spruce_stairs[facing=south,half=top]');
	}
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~-1 ~ ~');
	clists.push({name:'roofarcweststart',commands:cmdList,folder:'roof'});
}

function buildroofnorthwallFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run fill ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_planks');
	}
	clists.push({name:'roofnorthwall',commands:cmdList,folder:'roof'});
}

function buildroofeastwallFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run fill ~1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' oak_planks');
	}
	clists.push({name:'roofeastwall',commands:cmdList,folder:'roof'});
}

function buildroofsouthwallFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run fill ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 oak_planks');
	}
	clists.push({name:'roofsouthwall',commands:cmdList,folder:'roof'});
}

function buildroofwestwallFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run fill ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' oak_planks');
	}
	clists.push({name:'roofwestwall',commands:cmdList,folder:'roof'});
}

function buildroofnorthlogsFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~ ~-'+((i)+1).toString()+' ~-1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run fill ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_log[axis=x]');
	}
	clists.push({name:'roofnorthlogs',commands:cmdList,folder:'roof'});
}

function buildroofeastlogsFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~ oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run fill ~1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' oak_log[axis=z]');
	}
	clists.push({name:'roofeastlogs',commands:cmdList,folder:'roof'});
}

function buildroofsouthlogsFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~ ~-'+((i)+1).toString()+' ~1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run fill ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 oak_log[axis=x]');
	}
	clists.push({name:'roofsouthlogs',commands:cmdList,folder:'roof'});
}

function buildroofwestlogsFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~ oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run fill ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' oak_log[axis=z]');
	}
	clists.push({name:'roofwestlogs',commands:cmdList,folder:'roof'});
}

function buildroofarcnorthFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~0 ~1 ~-1 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~0 ~0 ~-1 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~-1 oak_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~-1 oak_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~0 ~0 ~-1 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=east]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_stairs[facing=east,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_stairs[facing=west,half=top]');		
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west,half=top]');
	}	
	//check if we need to build wall here
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare = @e[type=armor_stand,name="RoofBuilder"] varc');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] vare 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare -= @e[type=armor_stand,name="RoofBuilder"] vard');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=0}] run function strct:roof/roofnorthwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=2}] run function strct:roof/roofnorthwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1}] run function strct:roof/roofnorthlogs');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=1}] run function strct:roof/roofnorthlogs');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] varc 1');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~ ~ ~-1');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1..}] positioned ~ ~ ~ run function strct:roof/roofarcnorth');
	clists.push({name:'roofarcnorth',commands:cmdList,folder:'roof'});
}

function buildroofarceastFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~1 ~1 ~0 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~0 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~1 oak_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~-1 oak_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~1 ~0 ~ spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=south]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' oak_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' oak_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' oak_stairs[facing=south,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' oak_stairs[facing=north,half=top]');		
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' spruce_stairs[facing=south,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' spruce_stairs[facing=north,half=top]');
	}	
	//check if we need to build wall here
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare = @e[type=armor_stand,name="RoofBuilder"] varc');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] vare 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare -= @e[type=armor_stand,name="RoofBuilder"] vard');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=0}] run function strct:roof/roofeastwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=2}] run function strct:roof/roofeastwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1}] run function strct:roof/roofeastlogs');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=1}] run function strct:roof/roofeastlogs');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] varc 1');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~1 ~ ~');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1..}] positioned ~ ~ ~ run function strct:roof/roofarceast');
	clists.push({name:'roofarceast',commands:cmdList,folder:'roof'});
}

function buildroofarcsouthFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~0 ~1 ~1 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~0 ~0 ~1 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~1 oak_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~1 oak_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~0 ~0 ~1 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=west]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 oak_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 oak_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 oak_stairs[facing=west,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 oak_stairs[facing=east,half=top]');		
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east,half=top]');
	}	
	//check if we need to build wall here
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare = @e[type=armor_stand,name="RoofBuilder"] varc');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] vare 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare -= @e[type=armor_stand,name="RoofBuilder"] vard');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=0}] run function strct:roof/roofsouthwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=2}] run function strct:roof/roofsouthwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1}] run function strct:roof/roofsouthlogs');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=1}] run function strct:roof/roofsouthlogs');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] varc 1');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~ ~ ~1');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1..}] positioned ~ ~ ~ run function strct:roof/roofarcsouth');
	clists.push({name:'roofarcsouth',commands:cmdList,folder:'roof'});
}

function buildroofarcwestFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~-1 ~1 ~0 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~0 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~-1 oak_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~1 oak_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~-1 ~0 ~ spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=north]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' oak_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' oak_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' oak_stairs[facing=north,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' oak_stairs[facing=south,half=top]');		
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' spruce_stairs[facing=north,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' spruce_stairs[facing=south,half=top]');
	}	
	//check if we need to build wall here
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare = @e[type=armor_stand,name="RoofBuilder"] varc');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] vare 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare -= @e[type=armor_stand,name="RoofBuilder"] vard');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=0}] run function strct:roof/roofwestwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=2}] run function strct:roof/roofwestwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1}] run function strct:roof/roofwestlogs');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=1}] run function strct:roof/roofwestlogs');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] varc 1');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~-1 ~ ~');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1..}] positioned ~ ~ ~ run function strct:roof/roofarcwest');
	clists.push({name:'roofarcwest',commands:cmdList,folder:'roof'});
}

function buildroofarcnorthendFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~0 ~1 ~-1 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~0 ~0 ~-1 spruce_stairs[facing=south,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=east]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west,half=top]');
	}
	clists.push({name:'roofarcnorthend',commands:cmdList,folder:'roof'});
}

function buildroofarcwestendFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~-1 ~1 ~0 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~0 spruce_stairs[facing=east,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=south]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' spruce_stairs[facing=south,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' spruce_stairs[facing=north,half=top]');		
	}
	clists.push({name:'roofarcwestend',commands:cmdList,folder:'roof'});
}

function buildroofarceastendFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~1 ~1 ~0 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~0 spruce_stairs[facing=west,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=south]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' spruce_stairs[facing=south,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' spruce_stairs[facing=north,half=top]');
	}
	clists.push({name:'roofarceastend',commands:cmdList,folder:'roof'});
}

function buildroofarcsouthendFunction(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=1..}] at @s run setblock ~0 ~1 ~1 spruce_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~0 ~0 ~1 spruce_stairs[facing=south,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=3..}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=west]');
	for(var i=0;i<100;i++){
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+5).toString()+'..}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east,half=top]');
	}
	clists.push({name:'roofarcsouthend',commands:cmdList,folder:'roof'});
}

//for even buildings
function buildevendownFunction(){
	var cmdList = [];
	//north
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=2}] at @s run setblock ~0 ~1 ~-1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=2}] at @s run setblock ~-1 ~1 ~-1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~-2 ~0 ~-1 spruce_stairs[facing=east]');
	//west
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=1}] at @s run setblock ~-1 ~1 ~0 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=1}] at @s run setblock ~-1 ~1 ~-1 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~-2 spruce_stairs[facing=south]');
	//south
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=0}] at @s run setblock ~0 ~1 ~1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=0}] at @s run setblock ~1 ~1 ~1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~2 ~0 ~1 spruce_stairs[facing=west]');
	//east
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=3}] at @s run setblock ~1 ~1 ~0 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=3}] at @s run setblock ~1 ~1 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~2 spruce_stairs[facing=north]');
	for(var i=0;i<100;i++){
		//north
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run setblock ~-'+((i)+3).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west,half=top]');
		//west
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' spruce_stairs[facing=south,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+3).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=north,half=top]');
		//south
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run setblock ~'+((i)+3).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east,half=top]');
		//south
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' spruce_stairs[facing=north,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+3).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=south,half=top]');
	}
	clists.push({name:'roofbuildevendown',commands:cmdList,folder:'roof'});
}

function buildroofevennortharcFunction(){
	var cmdList = [];
	//north
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=2}] at @s run setblock ~0 ~1 ~-1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=2}] at @s run setblock ~-1 ~1 ~-1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~1 ~0 ~-1 oak_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~-2 ~0 ~-1 oak_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~0 ~0 ~-1 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~-1 ~0 ~-1 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=2}] at @s run setblock ~0 ~0 ~-1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=2}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=2}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=2}] at @s run setblock ~-2 ~0 ~-1 spruce_stairs[facing=east]');
	//west
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=1}] at @s run setblock ~-1 ~1 ~0 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=1}] at @s run setblock ~-1 ~1 ~-1 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~1 oak_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~-2 oak_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~ oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~-1 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=1}] at @s run setblock ~-1 ~0 ~0 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=1}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=1}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=1}] at @s run setblock ~-1 ~0 ~-2 spruce_stairs[facing=south]');
	//south
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=0}] at @s run setblock ~0 ~1 ~1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=0}] at @s run setblock ~1 ~1 ~1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~-1 ~0 ~1 oak_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~2 ~0 ~1 oak_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~0 ~0 ~1 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~1 ~0 ~1 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=0}] at @s run setblock ~0 ~0 ~1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=0}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=0}] at @s run setblock ~-1 ~0 ~1 spruce_stairs[facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=0}] at @s run setblock ~2 ~0 ~1 spruce_stairs[facing=west]');
	//east
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=3}] at @s run setblock ~1 ~1 ~0 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=2..,dir=3}] at @s run setblock ~1 ~1 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~-1 oak_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~2 oak_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~0 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~1 oak_slab');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=3}] at @s run setblock ~1 ~0 ~0 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=3}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=north]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=3}] at @s run setblock ~1 ~0 ~-1 spruce_stairs[facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4,dir=3}] at @s run setblock ~1 ~0 ~2 spruce_stairs[facing=north]');
	
	for(var i=0;i<100;i++){
		//north
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_stairs[facing=east,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run setblock ~-'+((i)+3).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_stairs[facing=west,half=top]');
		//west
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' oak_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' oak_stairs[facing=south,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+3).toString()+' oak_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' oak_stairs[facing=north,half=top]');
		//south
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 oak_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 oak_stairs[facing=west,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run setblock ~'+((i)+3).toString()+' ~-'+((i)+1).toString()+' ~1 oak_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 oak_stairs[facing=east,half=top]');
		//south
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' oak_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' oak_stairs[facing=north,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+3).toString()+' oak_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' oak_stairs[facing=south,half=top]');
		//north
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=2}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=2}] at @s run setblock ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=2}] at @s run setblock ~-'+((i)+3).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=2}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 spruce_stairs[facing=west,half=top]');
		//west
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' spruce_stairs[facing=south,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+3).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=1}] at @s run setblock ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=north,half=top]');
		//south
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=0}] at @s run setblock ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=0}] at @s run setblock ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=0}] at @s run setblock ~'+((i)+3).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=0}] at @s run setblock ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 spruce_stairs[facing=east,half=top]');
		//east
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' spruce_stairs[facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' spruce_stairs[facing=north,half=top]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+3).toString()+' spruce_stairs[facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=3}] at @s run setblock ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' spruce_stairs[facing=south,half=top]');
	}
	//check if we need to build wall here
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare = @e[type=armor_stand,name="RoofBuilder"] varc');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] vare 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="RoofBuilder"] vare -= @e[type=armor_stand,name="RoofBuilder"] vard');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=0}] run function strct:roof/roofevenwall');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=2}] run function strct:roof/roofevenwall');	
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1}] run function strct:roof/roofevenlogs');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={vare=1}] run function strct:roof/roofevenlogs');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="RoofBuilder"] varc 1');
	//north
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=2}] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~ ~ ~-1');
	//west
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=1}] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~-1 ~ ~');
	//south
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=0}] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~ ~ ~1');
	//east
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=3}] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~1 ~ ~');
	cmdList.push('execute at @e[type=armor_stand,name="RoofBuilder",scores={varc=1..}] positioned ~ ~ ~ run function strct:roof/roofevennortharc');
	clists.push({name:'roofevennortharc',commands:cmdList,folder:'roof'});
}

function buildRoofArcEvenStartFunction(){
	var cmdList = [];
	//north
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~0 ~0 ~-1 spruce_stairs[facing=north,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=north,half=top]');
	//west
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~0 spruce_stairs[facing=west,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=west,half=top]');
	//south
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~0 ~0 ~1 spruce_stairs[facing=south,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=south,half=top]');
	//east
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~0 spruce_stairs[facing=east,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=east,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run function strct:roof/roofbuildevendown');
	//north
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=2}] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~ ~ ~-1');
	//west
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=1}] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~-1 ~ ~');
	//south
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=0}] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~ ~ ~1');
	//east
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={dir=3}] at @s run teleport @e[type=armor_stand,name="RoofBuilder"] ~1 ~ ~');
	clists.push({name:'roofarcevenstart',commands:cmdList,folder:'roof'});
}

function buildRoofArcEvenEndFunction(){
	var cmdList = [];
	//north
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~0 ~0 ~-1 spruce_stairs[facing=south,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=2}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=south,half=top]');
	//west
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~0 spruce_stairs[facing=east,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=1}] at @s run setblock ~-1 ~0 ~-1 spruce_stairs[facing=east,half=top]');
	//south
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~0 ~0 ~1 spruce_stairs[facing=north,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=0}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=north,half=top]');
	//east
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~0 spruce_stairs[facing=west,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara=4..,dir=3}] at @s run setblock ~1 ~0 ~1 spruce_stairs[facing=west,half=top]');
	cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder"] at @s run function strct:roof/roofbuildevendown');
	clists.push({name:'roofevennortharcend',commands:cmdList,folder:'roof'});
}

function buildRoofEvenWallFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		//north
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=2}] at @s run fill ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_planks');
		//west
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=1}] at @s run fill ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' oak_planks');
		//south
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=0}] at @s run fill ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 oak_planks');
		//east
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+'..,dir=3}] at @s run fill ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' oak_planks');
	}
	clists.push({name:'roofevenwall',commands:cmdList,folder:'roof'});
}

function buildRoofEvenLogsFunction(){
	var cmdList = [];
	for(var i=0;i<100;i++){
		//north
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=2}] at @s run fill ~'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~-1 ~-'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~-1 oak_log[axis=x]');
		//west
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=1}] at @s run fill ~-1 ~-'+((i)+1).toString()+' ~'+((i)+1).toString()+' ~-1 ~-'+((i)+1).toString()+' ~-'+((i)+2).toString()+' oak_log[axis=z]');
		//south
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=0}] at @s run fill ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 ~'+((i)+2).toString()+' ~-'+((i)+1).toString()+' ~1 oak_log[axis=x]');
		//east
		cmdList.push('execute as @e[type=armor_stand,name="RoofBuilder",scores={vara='+((i*2)+6).toString()+',dir=3}] at @s run fill ~1 ~-'+((i)+1).toString()+' ~-'+((i)+1).toString()+' ~1 ~-'+((i)+1).toString()+' ~'+((i)+2).toString()+' oak_log[axis=z]');
	}
	clists.push({name:'roofevenlogs',commands:cmdList,folder:'roof'});
}

function buildRoofEnd(){
	var cmdList = [];
	cmdList.push('kill @e[type=armor_stand,name="RoofBuilder"]');
	clists.push({name:'roofend',commands:cmdList,folder:'roof'});
}
