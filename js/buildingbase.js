function buildBaseFunctions(){
	buildBaseStartCmds();
	buildMoveCornerCmds();
	buildBaseEndCmds();
	initlengthvarsCmds();
	initbysixCmds();
	initbyfourCmds();
	buildFirstBaseWallsCmds();
	buildSecondBaseWallsCmds();
	buildThirdBaseWallsCmds();
	buildForthBaseWallsCmds();
	buildNextBaseWallsCmds();
	buildbasenorthCmds();
	buildbasesouthCmds();
	buildbaseeastCmds();
	buildbasewestCmds();
	InitWallBuilder();
	ClearWallBuilder();
}

function buildBaseStartCmds(){
	var cmdList = [];
	cmdList.push('summon armor_stand ~ ~ ~ {CustomName:\'"Corner"\',CustomNameVisible:false,NoGravity:1,Invulnerable:1,NoBasePlate:1,ShowArms:0,Small:1,Invisible:1,DisabledSlots:2039552,Equipment:[{},{},{},{},{Damage:0,id:quartz_block}]}');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vara = @e[type=armor_stand,name="BuildingBase"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] varb = @e[type=armor_stand,name="BuildingBase"] varb');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] varc = @e[type=armor_stand,name="BuildingBase"] varc');	
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vare = @e[type=armor_stand,name="BuildingBase"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] dir = @e[type=armor_stand,name="BuildingBase"] dir'); //direction	
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] vard 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vare /= @e[type=armor_stand,name="Corner"] vard');
	cmdList.push('scoreboard players add @e[type=armor_stand,name="Corner"] vare 1');
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/movecorner');
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/buildnextbasewalls');
	clists.push({name:'basestart',commands:cmdList,folder:'base'});
}

function buildMoveCornerCmds(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=0}] at @s run teleport ~1 ~ ~');//for building south we move east
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=1}] at @s run teleport ~ ~ ~1');//for building west we move south
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=2}] at @s run teleport ~-1 ~ ~');//for building north we move west
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=3}] at @s run teleport ~ ~ ~-1');//for building east we move north
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="Corner"] vare 1');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vare=1..}] run function strct:base/movecorner');	
	clists.push({name:'movecorner',commands:cmdList,folder:'base'});
}

function buildNextBaseWallsCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players add @e[type=armor_stand,name="BuildingBase"] vard 1');
	cmdList.push('execute if entity @e[type=armor_stand,name="BuildingBase",scores={vard=1}] as @e[type=armor_stand,name="Corner"] at @s run schedule function strct:base/buildfirstbasewalls 10t');
	cmdList.push('execute if entity @e[type=armor_stand,name="BuildingBase",scores={vard=2}] as @e[type=armor_stand,name="Corner"] at @s run schedule function strct:base/buildsecondbasewalls 10t');
	cmdList.push('execute if entity @e[type=armor_stand,name="BuildingBase",scores={vard=3}] as @e[type=armor_stand,name="Corner"] at @s run schedule function strct:base/buildthirdbasewalls 10t');
	cmdList.push('execute if entity @e[type=armor_stand,name="BuildingBase",scores={vard=4}] as @e[type=armor_stand,name="Corner"] at @s run schedule function strct:base/buildforthbasewalls 10t');
	cmdList.push('execute if entity @e[type=armor_stand,name="BuildingBase",scores={vard=5}] as @e[type=armor_stand,name="Corner"] at @s run schedule function strct:base/baseend 30t');
	clists.push({name:'buildnextbasewalls',commands:cmdList,folder:'base'});
}

function buildFirstBaseWallsCmds(){
	var cmdList = [];
	//set up the length
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vara = @e[type=armor_stand,name="BuildingBase"] varc');
	//init our vars
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] run function strct:base/initlenvars');
	//build next direction
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=0}] at @s run function strct:base/buildbasesouth');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=1}] at @s run function strct:base/buildbasewest');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=2}] at @s run function strct:base/buildbasenorth');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=3}] at @s run function strct:base/buildbaseeast');
	clists.push({name:'buildfirstbasewalls',commands:cmdList,folder:'base'});
}

function buildSecondBaseWallsCmds(){
	var cmdList = [];
	//setup the width
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vara = @e[type=armor_stand,name="BuildingBase"] vara');
	//init our vars
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] run function strct:base/initlenvars');
	//build next direction
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=0}] at @s run function strct:base/buildbasewest');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=1}] at @s run function strct:base/buildbasenorth');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=2}] at @s run function strct:base/buildbaseeast');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=3}] at @s run function strct:base/buildbasesouth');
	clists.push({name:'buildsecondbasewalls',commands:cmdList,folder:'base'});
}

function buildThirdBaseWallsCmds(){
	var cmdList = [];
	//set up the length
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vara = @e[type=armor_stand,name="BuildingBase"] varc');
	//init our vars
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] run function strct:base/initlenvars');
	//build next direction
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=0}] at @s run function strct:base/buildbasenorth');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=1}] at @s run function strct:base/buildbaseeast');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=2}] at @s run function strct:base/buildbasesouth');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=3}] at @s run function strct:base/buildbasewest');
	clists.push({name:'buildthirdbasewalls',commands:cmdList,folder:'base'});
}

function buildForthBaseWallsCmds(){
	var cmdList = [];
	//setup the width
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vara = @e[type=armor_stand,name="BuildingBase"] vara');
	//init our vars
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] run function strct:base/initlenvars');
	//build next direction
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=0}] at @s run function strct:base/buildbaseeast');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=1}] at @s run function strct:base/buildbasesouth');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=2}] at @s run function strct:base/buildbasewest');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={dir=3}] at @s run function strct:base/buildbasenorth');
	clists.push({name:'buildforthbasewalls',commands:cmdList,folder:'base'});
}

function InitWallBuilder(){
	var cmdList = [];
	//a empty, b height, c current segment, d center seg, e remaining, f how many sec, g how many blocks in sec
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=0..}] at @s run summon armor_stand ~ ~ ~ {CustomName:\'"WallBuilder"\',CustomNameVisible:false,NoGravity:1,Invulnerable:1,NoBasePlate:1,ShowArms:0,Small:1,Invisible:1,DisabledSlots:2039552,Equipment:[{},{},{},{},{Damage:0,id:quartz_block}]}');
	//see if we are on the middle seg and if so then we need to add the remaing blocks to the width
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varc = @e[type=armor_stand,name="Corner"] varf'); 
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varc -= @e[type=armor_stand,name="Corner"] varc'); 
	cmdList.push('scoreboard players add @e[type=armor_stand,name="WallBuilder"] varc 1');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varc -= @e[type=armor_stand,name="Corner"] vard');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] vara = @e[type=armor_stand,name="Corner"] varg'); //set width
	cmdList.push('scoreboard players add @e[type=armor_stand,name="WallBuilder"] vara 1');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder",scores={varc=0}] vara += @e[type=armor_stand,name="Corner"] vare'); //add remainders if applicable
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="WallBuilder"] varb = @e[type=armor_stand,name="Corner"] varb'); //set height  
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varf 1'); //set count for height
	clists.push({name:'initwallbuilder',commands:cmdList,folder:'base'});
}

function ClearWallBuilder(){
	var cmdList = [];
	cmdList.push('kill @e[name="WallBuilder"]');
	cmdList.push('scoreboard players add @e[type=armor_stand,name="Corner"] varc 1'); 
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vara = @e[type=armor_stand,name="Corner"] varf');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vara -= @e[type=armor_stand,name="Corner"] varc');
	clists.push({name:'clearwallbuilder',commands:cmdList,folder:'base'});
}

function buildbasenorthCmds(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/initwallbuilder'); 
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varc 1'); //set direction
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] run function strct:wall/buildmultiwall');
	for(var i=2;i<=15;i++){
		cmdList.push('execute if entity @e[type=armor_stand,name="WallBuilder",scores={vara='+i.toString()+'}] as @e[type=armor_stand,name="Corner"] at @s run teleport ~ ~ ~-'+(i-1).toString());
	}
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/clearwallbuilder');
	//round northwest
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=-1}] at @s run teleport ~1 ~ ~-1');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=-1}] at @s run function strct:base/buildnextbasewalls');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=0..}] at @s run function strct:base/buildbasenorth');
	clists.push({name:'buildbasenorth',commands:cmdList,folder:'base'});
}

function buildbaseeastCmds(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/initwallbuilder'); 
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varc 2'); //set direction
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] run function strct:wall/buildmultiwall');
	for(var i=2;i<=15;i++){
		cmdList.push('execute if entity @e[type=armor_stand,name="WallBuilder",scores={vara='+i.toString()+'}] as @e[type=armor_stand,name="Corner"] at @s run teleport ~'+(i-1).toString()+' ~ ~');
	}
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/clearwallbuilder');
	//round northeast
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=-1}] at @s run teleport ~1 ~ ~1');	
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=-1}] at @s run function strct:base/buildnextbasewalls');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=0..}] at @s run function strct:base/buildbaseeast');
	clists.push({name:'buildbaseeast',commands:cmdList,folder:'base'});
}

function buildbasesouthCmds(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/initwallbuilder'); 
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varc 3'); //set direction
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] run function strct:wall/buildmultiwall');
	for(var i=2;i<=15;i++){
		cmdList.push('execute if entity @e[type=armor_stand,name="WallBuilder",scores={vara='+i.toString()+'}] as @e[type=armor_stand,name="Corner"] at @s run teleport ~ ~ ~'+(i-1).toString());
	}
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/clearwallbuilder');
	//round southeast
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=-1}] at @s run teleport ~-1 ~ ~1');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=-1}] at @s run function strct:base/buildnextbasewalls');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=0..}] at @s run function strct:base/buildbasesouth');
	clists.push({name:'buildbasesouth',commands:cmdList,folder:'base'});
}

function buildbasewestCmds(){
	var cmdList = [];
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/initwallbuilder');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="WallBuilder"] varc 0'); //set direction
	cmdList.push('execute as @e[type=armor_stand,name="WallBuilder"] run function strct:wall/buildmultiwall');
	for(var i=2;i<=15;i++){
		cmdList.push('execute if entity @e[type=armor_stand,name="WallBuilder",scores={vara='+i.toString()+'}] as @e[type=armor_stand,name="Corner"] at @s run teleport ~-'+(i-1).toString()+' ~ ~');
	}
	cmdList.push('execute as @e[type=armor_stand,name="Corner"] at @s run function strct:base/clearwallbuilder');
	//round southwest
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=-1}] at @s run teleport ~-1 ~ ~-1');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=-1}] at @s run function strct:base/buildnextbasewalls');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=0..}] at @s run function strct:base/buildbasewest');
	clists.push({name:'buildbasewest',commands:cmdList,folder:'base'});
}

function initlengthvarsCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] varg 4');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] varf 1');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner",scores={vara=9..}] varf 2');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=13..}] run function strct:base/initbyfour');
	cmdList.push('execute as @e[type=armor_stand,name="Corner",scores={vara=19..}] run function strct:base/initbysix');
	//f now holds how many sections we are doing
	//g now holds how many blocks are in each section
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] vard 2');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vare = @e[type=armor_stand,name="Corner"] varf');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vare /= @e[type=armor_stand,name="Corner"] vard');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vard = @e[type=armor_stand,name="Corner"] vare');
	//d now holds the center section
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vare = @e[type=armor_stand,name="Corner"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vare -= @e[type=armor_stand,name="Corner"] varg');
	cmdList.push('scoreboard players remove @e[type=armor_stand,name="Corner"] vare 1');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] vare %= @e[type=armor_stand,name="Corner"] varg');
	//e tells us how much bigger the middle section is, if its grater then 0 then we need to increase our  mid sec
	cmdList.push('scoreboard players add @e[type=armor_stand,name="Corner",scores={vare=1..}] vard 1');	
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] varc 1');//set current segment
	clists.push({name:'initlenvars',commands:cmdList,folder:'base'});
}

function initbysixCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] varg 7');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] varf = @e[type=armor_stand,name="Corner"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] varf -= @e[type=armor_stand,name="Corner"] varg');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] varg 6');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] varf /= @e[type=armor_stand,name="Corner"] varg');
	cmdList.push('scoreboard players add @e[type=armor_stand,name="Corner"] varf 1');
	clists.push({name:'initbysix',commands:cmdList,folder:'base'});
}
function initbyfourCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] varg 5');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] varf = @e[type=armor_stand,name="Corner"] vara');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] varf -= @e[type=armor_stand,name="Corner"] varg');
	cmdList.push('scoreboard players set @e[type=armor_stand,name="Corner"] varg 4');
	cmdList.push('scoreboard players operation @e[type=armor_stand,name="Corner"] varf /= @e[type=armor_stand,name="Corner"] varg');
	cmdList.push('scoreboard players add @e[type=armor_stand,name="Corner"] varf 1')	
	clists.push({name:'initbyfour',commands:cmdList,folder:'base'});
}

function buildBaseEndCmds(){
	var cmdList = [];
	cmdList.push('scoreboard players set @e[type=armor_stand,name="BuildingBase"] vard 0');
	cmdList.push('kill @e[type=armor_stand,name="Corner"]');
	cmdList.push('function strct:gen/buildroof');
	clists.push({name:'baseend',commands:cmdList,folder:'base'});
}

