var blockninty=[];

function turneast(sblocks){
	blockninty = [];
	for(var i=0;i<sblocks.length;i++){
		var tmpz = (sblocks[i].x)*-1;
		var tmpx = sblocks[i].z;
		blockninty.push(DeepCopy(sblocks[i]));
		blockninty[i].z = tmpz;
		blockninty[i].x = tmpx;
		var wasHex=false;
		if(isHex(blockninty[i].command)){blockninty[i].command=hexToString(blockninty[i].command);wasHex=true;}
		if(blockninty[i].command.indexOf('facing=west') >= 1){
			 blockninty[i].command = blockninty[i].command.replace("facing=west", "facing=south");
		}else if(blockninty[i].command.indexOf('facing=north') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=north", "facing=west");
		}else if(blockninty[i].command.indexOf('facing=east') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=east", "facing=north");
		}else if(blockninty[i].command.indexOf('facing=south') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=south", "facing=east");
		}
		if(blockninty[i].command.indexOf('shape=east_west') >= 1){
			blockninty[i].command = blockninty[i].command.replace("shape=east_west", "shape=north_south");
		}else if(blockninty[i].command.indexOf('shape=north_south') >= 1){
			blockninty[i].command = blockninty[i].command.replace("shape=north_south", "shape=east_west");
		}
		if(blockninty[i].command.indexOf('west=true') >= 1){
			blockninty[i].command = blockninty[i].command.replace("west=true", "west=false");
		}else if(blockninty[i].command.indexOf('west=false') >= 1){
			blockninty[i].command = blockninty[i].command.replace("west=false", "west=true");
		}
		if(blockninty[i].command.indexOf('north=true') >= 1){
			blockninty[i].command = blockninty[i].command.replace("north=true", "north=false");
		}else if(blockninty[i].command.indexOf('north=false') >= 1){
			blockninty[i].command = blockninty[i].command.replace("north=false", "north=true");
		}
		if(blockninty[i].command.indexOf('east=true') >= 1){
			blockninty[i].command = blockninty[i].command.replace("east=true", "east=false");
		}else if(blockninty[i].command.indexOf('east=false') >= 1){
			blockninty[i].command = blockninty[i].command.replace("east=false", "east=true");
		}
		if(blockninty[i].command.indexOf('south=true') >= 1){
			blockninty[i].command = blockninty[i].command.replace("south=true", "south=false");
		}else if(blockninty[i].command.indexOf('south=false') >= 1){
			blockninty[i].command = blockninty[i].command.replace("south=false", "south=true");
		}
		if(blockninty[i].command.indexOf('axis=x') >= 1){
			blockninty[i].command = blockninty[i].command.replace("axis=x", "axis=z");
		}else if(blockninty[i].command.indexOf('axis=z') >= 1){
			blockninty[i].command = blockninty[i].command.replace("axis=z", "axis=x");
		}
		if(blockninty[i].command.indexOf('rotation=4') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=4", "rotation=0");
		}else if(blockninty[i].command.indexOf('rotation=0') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=0", "rotation=12");
		}else if(blockninty[i].command.indexOf('rotation=12') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=12", "rotation=8");
		}else if(blockninty[i].command.indexOf('rotation=8') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=8", "rotation=4");
		}else if(blockninty[i].command.indexOf('rotation=2') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=2", "rotation=14");
		}else if(blockninty[i].command.indexOf('rotation=14') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=14", "rotation=10");
		}else if(blockninty[i].command.indexOf('rotation=10') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=10", "rotation=6");
		}else if(blockninty[i].command.indexOf('rotation=6') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=6", "rotation=2");
		}
		if(wasHex){blockninty[i].command=stringToHex(blockninty[i].command);}
	}	
}
function turnnorth(sblocks){
	blockninty = [];
	for(var i=0;i<sblocks.length;i++){
		var tmpx = (sblocks[i].x)*-1;
		var tmpz = (sblocks[i].z)*-1;
		blockninty.push(DeepCopy(sblocks[i]));
		blockninty[i].z = tmpz;
		blockninty[i].x = tmpx;
		var wasHex=false;
		if(isHex(blockninty[i].command)){blockninty[i].command=hexToString(blockninty[i].command);wasHex=true;}
		if(blockninty[i].command.indexOf('facing=west') >= 1){
			 blockninty[i].command = blockninty[i].command.replace("facing=west", "facing=east");
		}else if(blockninty[i].command.indexOf('facing=north') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=north", "facing=south");
		}else if(blockninty[i].command.indexOf('facing=east') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=east", "facing=west");
		}else if(blockninty[i].command.indexOf('facing=south') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=south", "facing=north");
		}
		if(blockninty[i].command.indexOf('rotation=4') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=4", "rotation=12");
		}else if(blockninty[i].command.indexOf('rotation=0') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=0", "rotation=8");
		}else if(blockninty[i].command.indexOf('rotation=12') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=12", "rotation=4");
		}else if(blockninty[i].command.indexOf('rotation=8') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=8", "rotation=0");
		}
		if(wasHex){blockninty[i].command=stringToHex(blockninty[i].command);}
	}
}
function turnwest(sblocks){
	blockninty = [];
	for(var i=0;i<sblocks.length;i++){
		var tmpz = (sblocks[i].x);
		var tmpx = (sblocks[i].z)*-1;
		blockninty.push(DeepCopy(sblocks[i]));
		blockninty[i].z = tmpz;
		blockninty[i].x = tmpx;
		var wasHex=false;
		if(isHex(blockninty[i].command)){blockninty[i].command=hexToString(blockninty[i].command);wasHex=true;}
		if(blockninty[i].command.indexOf('facing=west') >= 1){
			 blockninty[i].command = blockninty[i].command.replace("facing=west", "facing=north");
		}else if(blockninty[i].command.indexOf('facing=north') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=north", "facing=east");
		}else if(blockninty[i].command.indexOf('facing=east') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=east", "facing=south");
		}else if(blockninty[i].command.indexOf('facing=south') >= 1){
			blockninty[i].command = blockninty[i].command.replace("facing=south", "facing=west");
		}
		if(blockninty[i].command.indexOf('shape=east_west') >= 1){
			blockninty[i].command = blockninty[i].command.replace("shape=east_west", "shape=north_south");
		}else if(blockninty[i].command.indexOf('shape=north_south') >= 1){
			blockninty[i].command = blockninty[i].command.replace("shape=north_south", "shape=east_west");
		}
		if(blockninty[i].command.indexOf('west=true') >= 1){
			blockninty[i].command = blockninty[i].command.replace("west=true", "west=false");
		}else if(blockninty[i].command.indexOf('west=false') >= 1){
			blockninty[i].command = blockninty[i].command.replace("west=false", "west=true");
		}
		if(blockninty[i].command.indexOf('north=true') >= 1){
			blockninty[i].command = blockninty[i].command.replace("north=true", "north=false");
		}else if(blockninty[i].command.indexOf('north=false') >= 1){
			blockninty[i].command = blockninty[i].command.replace("north=false", "north=true");
		}
		if(blockninty[i].command.indexOf('east=true') >= 1){
			blockninty[i].command = blockninty[i].command.replace("east=true", "east=false");
		}else if(blockninty[i].command.indexOf('east=false') >= 1){
			blockninty[i].command = blockninty[i].command.replace("east=false", "east=true");
		}
		if(blockninty[i].command.indexOf('axis=x') >= 1){
			blockninty[i].command = blockninty[i].command.replace("axis=x", "axis=z");
		}else if(blockninty[i].command.indexOf('axis=z') >= 1){
			blockninty[i].command = blockninty[i].command.replace("axis=z", "axis=x");
		}
		if(blockninty[i].command.indexOf('south=true') >= 1){
			blockninty[i].command = blockninty[i].command.replace("south=true", "south=false");
		}else if(blockninty[i].command.indexOf('south=false') >= 1){
			blockninty[i].command = blockninty[i].command.replace("south=false", "south=true");
		}
		if(blockninty[i].command.indexOf('rotation=4') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=4", "rotation=8");
		}else if(blockninty[i].command.indexOf('rotation=0') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=0", "rotation=4");
		}else if(blockninty[i].command.indexOf('rotation=12') >= 1){
			console.log('Rotation 12 found');
			blockninty[i].command = blockninty[i].command.replace("rotation=12", "rotation=0");
		}else if(blockninty[i].command.indexOf('rotation=8') >= 1){
			blockninty[i].command = blockninty[i].command.replace("rotation=8", "rotation=12");
		}
		if(wasHex){blockninty[i].command=stringToHex(blockninty[i].command);}
	}
}