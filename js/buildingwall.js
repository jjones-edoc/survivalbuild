function buildWallFunctions(){
	StartSouthAWallCmds();
	StartNorthAWallCmds();
	BuildAWallCmds();
	BuildBWallCmds();
	BuildAWallGrndCmds();
	BuildAWallPreSupCmds();
	BuildAWallBeamCmds();
	BuildAWallMainCmds();
	StartWestAWallCmds();
	StartEastAWallCmds();
	MoveBuilderUpCmds();
	BuildMultiWallCmds();
}
function MoveBuilderUpCmds(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] at @s run teleport ~ ~1 ~');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] vard 1');
	clists.push({name:'movewallbuilderup',commands:cmdList,folder:'wall'});
}
function BuildMultiWallCmds(){
	var cmdList = [];
	//see if we are building a base	
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] vare 3');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varf = @e[type=armor_stand,name="WallBuilder"] varb');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varf /= @e[type=armor_stand,name="WallBuilder"] vare');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder",scores={varf=7..}] varf 5');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varb = @e[type=armor_stand,name="WallBuilder"] varf');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varf 1'); //set count for height
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varb=3..}] run function strct:wall/buildbwall');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varf 0');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder",scores={varb=3..}] varf = @e[type=armor_stand,name="WallBuilder"] varb');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varb = @e[type=armor_stand,name="BuildingBase"] varb');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varb -= @e[type=armor_stand,name="WallBuilder"] varf');
	//finish building
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varf 1'); //set count for height
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varb=3..}] run function strct:wall/buildawall');
	clists.push({name:'buildmultiwall',commands:cmdList,folder:'wall'});
}
function StartSouthAWallCmds(){
	var cmdList = [];
	//globals: a width, b height, c direction, d current xz pos, e f g used for counting,  
	cmdList.push('summon armor_stand ~ ~ ~ {CustomName:\'"WallBuilder"\',CustomNameVisible:false,NoGravity:1,Invulnerable:1,NoBasePlate:1,ShowArms:0,Small:1,Invisible:1,DisabledSlots:2039552,Equipment:[{},{},{},{},{Damage:0,id:quartz_block}]}');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vara = @e[type=armor_stand,name="BuildingBase"] vara'); //set width
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varb = @e[type=armor_stand,name="BuildingBase"] varb'); //set height 
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varc 0'); //set direction 
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] run function strct:wall/buildmultiwall');
	cmdList.push('kill @e[name="WallBuilder"]');
	clists.push({name:'startsouthawall',commands:cmdList,folder:'wall'});
}
function StartWestAWallCmds(){
	var cmdList = [];
	cmdList.push('summon armor_stand ~ ~ ~ {CustomName:\'"WallBuilder"\',CustomNameVisible:false,NoGravity:1,Invulnerable:1,NoBasePlate:1,ShowArms:0,Small:1,Invisible:1,DisabledSlots:2039552,Equipment:[{},{},{},{},{Damage:0,id:quartz_block}]}');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vara = @e[type=armor_stand,name="BuildingBase"] varc'); //set width
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varb = @e[type=armor_stand,name="BuildingBase"] varb'); //set height 
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varc 1'); //set direction 
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] run function strct:wall/buildmultiwall');
	cmdList.push('kill @e[name="WallBuilder"]');
	clists.push({name:'startwestawall',commands:cmdList,folder:'wall'});
}
function StartNorthAWallCmds(){
	var cmdList = [];
	cmdList.push('summon armor_stand ~ ~ ~ {CustomName:\'"WallBuilder"\',CustomNameVisible:false,NoGravity:1,Invulnerable:1,NoBasePlate:1,ShowArms:0,Small:1,Invisible:1,DisabledSlots:2039552,Equipment:[{},{},{},{},{Damage:0,id:quartz_block}]}');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vara = @e[type=armor_stand,name="BuildingBase"] vara'); //set width
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varb = @e[type=armor_stand,name="BuildingBase"] varb'); //set height 
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varc 2'); //set direction 
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] run function strct:wall/buildmultiwall');
	cmdList.push('kill @e[name="WallBuilder"]');
	clists.push({name:'startnorthawall',commands:cmdList,folder:'wall'});
}
function StartEastAWallCmds(){
	var cmdList = [];
	cmdList.push('summon armor_stand ~ ~ ~ {CustomName:\'"WallBuilder"\',CustomNameVisible:false,NoGravity:1,Invulnerable:1,NoBasePlate:1,ShowArms:0,Small:1,Invisible:1,DisabledSlots:2039552,Equipment:[{},{},{},{},{Damage:0,id:quartz_block}]}');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vara = @e[type=armor_stand,name="BuildingBase"] varc'); //set width
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varb = @e[type=armor_stand,name="BuildingBase"] varb'); //set height 
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varc 3'); //set direction 
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] run function strct:wall/buildmultiwall');
	cmdList.push('kill @e[name="WallBuilder"]');
	clists.push({name:'starteastawall',commands:cmdList,folder:'wall'});
}
function BuildBWallCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] vard 1');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varg = @e[type=armor_stand,name="WallBuilder"] varb');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varg -= @e[type=armor_stand,name="WallBuilder"] varf');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varg=2..}] run function strct:wall/buildawallgrnd');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varg=1}] run function strct:wall/buildawallprspt');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varg=0}] run function strct:wall/buildawallbeam');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varg=0..}] run function strct:wall/movewallbuilderup');
	cmdList.push('scoreboard players add @e[type=armor_stand,name="WallBuilder"] varf 1');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varg=1..}] run function strct:wall/buildbwall');
	clists.push({name:'buildbwall',commands:cmdList,folder:'wall'});
}
function BuildAWallCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] vard 1');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varg = @e[type=armor_stand,name="WallBuilder"] varb');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varg -= @e[type=armor_stand,name="WallBuilder"] varf');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varg=0..}] run function strct:wall/buildamainwall');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varg=0..}] run function strct:wall/movewallbuilderup');
	cmdList.push('scoreboard players add @e[type=armor_stand,name="WallBuilder"] varf 1');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={varg=1..}] run function strct:wall/buildawall');
	clists.push({name:'buildawall',commands:cmdList,folder:'wall'});
}
function BuildAWallMainCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vare = @e[type=armor_stand,name="WallBuilder"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vare -= @e[type=armor_stand,name="WallBuilder"] vard');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=0}] at @s run setblock ~0 ~0 ~-1 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=1}] at @s run setblock ~1 ~0 ~0 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=2}] at @s run setblock ~0 ~0 ~1 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=3}] at @s run setblock ~-1 ~0 ~0 oak_log[axis=y]');
	for(var i=2;i<=15;i++){	
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-2 oak_planks');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vara='+i+',vare=0,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=1}] at @s run setblock ~2 ~0 ~-'+(i-1)+' oak_planks');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vara='+i+',vare=0,varc=1}] at @s run setblock ~1 ~0 ~-'+(i-1)+' oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~2 oak_planks');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vara='+i+',vare=0,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=3}] at @s run setblock ~-2 ~0 ~'+(i-1)+' oak_planks');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vara='+i+',vare=0,varc=3}] at @s run setblock ~-1 ~0 ~'+(i-1)+' oak_log[axis=y]');		
	}
	cmdList.push('scoreboard players add @e[type=armor_stand,name="WallBuilder"] vard 1');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vare=1..}] run function strct:wall/buildamainwall');
	clists.push({name:'buildamainwall',commands:cmdList,folder:'wall'});
}
function BuildAWallGrndCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vare = @e[type=armor_stand,name="WallBuilder"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vare -= @e[type=armor_stand,name="WallBuilder"] vard');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=0}] at @s run setblock ~0 ~0 ~-1 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=1}] at @s run setblock ~1 ~0 ~0 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=2}] at @s run setblock ~0 ~0 ~1 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=3}] at @s run setblock ~-1 ~0 ~0 oak_log[axis=y]');
	for(var i=2;i<=15;i++){	
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-2 cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vara='+i+',vare=0,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=1}] at @s run setblock ~2 ~0 ~-'+(i-1)+' cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vara='+i+',vare=0,varc=1}] at @s run setblock ~1 ~0 ~-'+(i-1)+' oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~2 cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vara='+i+',vare=0,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=3}] at @s run setblock ~-2 ~0 ~'+(i-1)+' cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vara='+i+',vare=0,varc=3}] at @s run setblock ~-1 ~0 ~'+(i-1)+' oak_log[axis=y]');
	}
	cmdList.push('scoreboard players add @e[type=armor_stand,name="WallBuilder"] vard 1');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vare=1..}] run function strct:wall/buildawallgrnd');
	clists.push({name:'buildawallgrnd',commands:cmdList,folder:'wall'});
}
function BuildAWallPreSupCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vare = @e[type=armor_stand,name="WallBuilder"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vare -= @e[type=armor_stand,name="WallBuilder"] vard');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=0}] at @s run setblock ~0 ~0 ~-1 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=2,varc=0}] at @s run setblock ~-1 ~0 ~-1 oak_stairs[half=top,waterlogged=false,shape=straight,facing=east]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=1}] at @s run setblock ~1 ~0 ~0 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=2,varc=1}] at @s run setblock ~1 ~0 ~-1 oak_stairs[half=top,waterlogged=false,shape=straight,facing=south]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=2}] at @s run setblock ~0 ~0 ~1 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=2,varc=2}] at @s run setblock ~1 ~0 ~1 oak_stairs[half=top,waterlogged=false,shape=straight,facing=west]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=3}] at @s run setblock ~-1 ~0 ~0 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=2,varc=3}] at @s run setblock ~-1 ~0 ~1 oak_stairs[half=top,waterlogged=false,shape=straight,facing=north]');
	for(var i=2;i<=15;i++){	
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-2 cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-1 oak_stairs[half=top,waterlogged=false,shape=straight,facing=west]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=0,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=1}] at @s run setblock ~2 ~0 ~-'+(i-1)+' cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1,varc=1}] at @s run setblock ~1 ~0 ~-'+(i-1)+' oak_stairs[half=top,waterlogged=false,shape=straight,facing=north]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=0,varc=1}] at @s run setblock ~1 ~0 ~-'+(i-1)+' oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~2 cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~1 oak_stairs[half=top,waterlogged=false,shape=straight,facing=east]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=0,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=3}] at @s run setblock ~-2 ~0 ~'+(i-1)+' cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1,varc=3}] at @s run setblock ~-1 ~0 ~'+(i-1)+' oak_stairs[half=top,waterlogged=false,shape=straight,facing=south]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=0,varc=3}] at @s run setblock ~-1 ~0 ~'+(i-1)+' oak_log[axis=y]');
	}
	cmdList.push('scoreboard players add @e[type=armor_stand,name="WallBuilder"] vard 1');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vare=1..}] run function strct:wall/buildawallprspt');
	clists.push({name:'buildawallprspt',commands:cmdList,folder:'wall'});
}
function BuildAWallBeamCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vare = @e[type=armor_stand,name="WallBuilder"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vare -= @e[type=armor_stand,name="WallBuilder"] vard');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=0}] at @s run setblock ~0 ~0 ~-1 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=1}] at @s run setblock ~1 ~0 ~0 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=2}] at @s run setblock ~0 ~0 ~1 oak_log[axis=y]');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard=1,varc=3}] at @s run setblock ~-1 ~0 ~0 oak_log[axis=y]');
	for(var i=2;i<=15;i++){	
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-2 cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-1 oak_log[axis=x]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=0,varc=0}] at @s run setblock ~-'+(i-1)+' ~0 ~-1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=1}] at @s run setblock ~2 ~0 ~-'+(i-1)+' cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=1}] at @s run setblock ~1 ~0 ~-'+(i-1)+' oak_log[axis=z]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=0,varc=1}] at @s run setblock ~1 ~0 ~-'+(i-1)+' oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~2 cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~1 oak_log[axis=x]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=0,varc=2}] at @s run setblock ~'+(i-1)+' ~0 ~1 oak_log[axis=y]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=3}] at @s run setblock ~-2 ~0 ~'+(i-1)+' cobblestone');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=1..,varc=3}] at @s run setblock ~-1 ~0 ~'+(i-1)+' oak_log[axis=z]');
		cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vard='+i+',vare=0,varc=3}] at @s run setblock ~-1 ~0 ~'+(i-1)+' oak_log[axis=y]');
	}
	cmdList.push('scoreboard players add @e[type=armor_stand,name="WallBuilder"] vard 1');
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder",scores={vare=1..}] run function strct:wall/buildawallbeam');
	clists.push({name:'buildawallbeam',commands:cmdList,folder:'wall'});
}