var condensedtypes=[];
var smashtypes=[];
var colors = ['gray','light_gray','white','black','brown','red','orange','yellow','lime','green','cyan','light_blue','blue','purple','magenta','pink'];

function gettypeind(thetype){
	for(var s=0;s<smashtypes.length;s++){
		if(smashtypes[s].name==thetype){
			return s;
		}
	}
	return -1;
}
function getshortname(name){
	if(name=='dark_oak_log'){
		return 'darkoak_log';
	}else if(name=='nether_bricks'){
		return 'netherbrick';
	}else if(name=='cartography_table'){
		return 'crtgrph_tbl';
	}else if(name=='magenta_carpet'){
		return 'mgnta_carpt';
	}else if(name=='fletching_table'){
		return 'fltchng_tbl';
	}else if(name=='spruce_leaves'){
		return 'spruce_leaf';
	}else if(name=='red_terracotta'){
		return 'red_trrctta';
	}else if(name=='yellow_terracotta'){
		return 'ylw_trrctta';
	}else if(name=='yellow_concrete'){
		return 'ylw_concrt';
	}else if(name=='smithing_table'){
		return 'smthng_tbl';
	}else if(name=='light_blue_wool'){
		return 'lgt_bl_wool';
	}else if(name=='magenta_stained_glass_pane'){
		return 'mgta_gls_pn';
	}else if(name=='orange_stained_glass_pane'){
		return 'orng_gls_pn';
	}else if(name=='cyan_stained_glass_pane'){
		return 'cyan_gls_pn';
	}else if (name=='dark_oak_leaves'){
		return 'drkoak_leaf';
	}else if(name=='magenta_wool'){
		return 'magnta_wool';
	}else if(name=='green_concrete_powder'){
		return 'gr_ccrt_pdr';
	}else if(name=='enchanting_table'){
		return 'enchnt_tbl';
	}else{
		return name.replace('_',' ');
	}
}
function dosmashtypes(){
	smashtypes=[];
	var ind=-1;
	smashtypes.push({name:'dirt',count:0.0});           //0
	smashtypes.push({name:'stone',count:0.0});          //1
	smashtypes.push({name:'cobblestone',count:0.0});    //2
	smashtypes.push({name:'redstone',count:0.0});  //3
	smashtypes.push({name:'coal',count:0.0});           //4
	smashtypes.push({name:'iron_ingot',count:0.0});           //5
	smashtypes.push({name:'oak_log',count:0.0});        //6
	smashtypes.push({name:'birch_log',count:0.0});      //7
	smashtypes.push({name:'clay',count:0.0});           //8
	smashtypes.push({name:'granite',count:0.0});        //9
	smashtypes.push({name:'glass',count:0.0});          //10
	smashtypes.push({name:'nether_quartz',count:0.0});  //11
	smashtypes.push({name:'dark_oak_log',count:0.0});  //12
	smashtypes.push({name:'spruce_log',count:0.0});  //13
	smashtypes.push({name:'diorite',count:0.0});  //14
	smashtypes.push({name:'sandstone',count:0.0});  //15
	smashtypes.push({name:'brick',count:0.0});  //16
	smashtypes.push({name:'bookshelf',count:0.0});  //17
	smashtypes.push({name:'soul_soil',count:0.0});  //18
	smashtypes.push({name:'blackstone',count:0.0});  //19
	smashtypes.push({name:'andesite',count:0.0});  //20
	smashtypes.push({name:'jungle_log',count:0.0});  //21
	smashtypes.push({name:'nether_bricks',count:0.0});  //22
	smashtypes.push({name:'blaze_rod',count:0.0});  //23
	smashtypes.push({name:'white_wool',count:0.0});  //24
	smashtypes.push({name:'book',count:0.0});  //25
	smashtypes.push({name:'ink_sac',count:0.0});  //26
	smashtypes.push({name:'feather',count:0.0});  //27
	for(var b=0;b<condensedtypes.length;b++){
		var found = false;
		for(var s=0;s<smashtypes.length;s++){
			if(condensedtypes[b].name==smashtypes[s].name){
				smashtypes[s].count += condensedtypes[b].count;
				found = true;
				break;
			}
		}
		if(!found){
			if(condensedtypes[b].name=='iron_ore'){
				smashtypes[5].count += condensedtypes[b].count;
				smashtypes[4].count += condensedtypes[b].count / 8;
			}else if(condensedtypes[b].name=='cobweb'){
				smashtypes[24].count += (condensedtypes[b].count);
			}else if(condensedtypes[b].name=='jungle_wood'){
				smashtypes[21].count += (condensedtypes[b].count * 1.39);
			}else if(condensedtypes[b].name=='jungle_fence'){
				smashtypes[21].count += (condensedtypes[b].count * .375);
			}else if(condensedtypes[b].name=='sandstone_slab'){
				smashtypes[15].count += (condensedtypes[b].count / 2);
			}else if(condensedtypes[b].name=='redstone_wire'){
				smashtypes[3].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='oak_wall_sign'){
				smashtypes[6].count += condensedtypes[b].count * .541;
			}else if(condensedtypes[b].name=='spruce_wall_sign'){
				smashtypes[13].count += condensedtypes[b].count * .541;
			}else if(condensedtypes[b].name=='jungle_button'){
				smashtypes[21].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name=='dark_oak_button'){
				smashtypes[12].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name=='oak_button'){
				smashtypes[6].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name.indexOf('brewing_stand') >= 0){
				smashtypes[23].count += condensedtypes[b].count;
				smashtypes[2].count += condensedtypes[b].count *3;
			}else if(condensedtypes[b].name.indexOf('lever') >= 0){
				smashtypes[6].count += condensedtypes[b].count / 8 ;
				smashtypes[2].count += condensedtypes[b].count;				
			}else if(condensedtypes[b].name.indexOf('carpet') >= 0){
				for(let c=0;c<colors.length;c++){
					if(condensedtypes[b].name==colors[c]+'_carpet'){
						ind=gettypeind(colors[c]+'_wool');
						if(ind == -1){ind=smashtypes.push({name:colors[c]+'_wool',count:0.0});ind=smashtypes.length-1;}
						smashtypes[ind].count += condensedtypes[b].count * .66;
						break;
					}
				}	
			}else if(condensedtypes[b].name.indexOf('stained_glass_pane') >= 0){
				for(let c=0;c<colors.length;c++){
					if(condensedtypes[b].name==colors[c]+'_stained_glass'){
						ind=gettypeind(colors[c]+'_stained_glass');
						if(ind == -1){ind=smashtypes.push({name:colors[c]+'_stained_glass',count:0.0});ind=smashtypes.length-1;}
						smashtypes[ind].count += condensedtypes[b].count * .375;
						break;
					}
				}
			}else if(condensedtypes[b].name.indexOf('bed') >= 0){
				for(let c=0;c<colors.length;c++){
					if(condensedtypes[b].name==colors[c]+'_bed'){
						ind=gettypeind(colors[c]+'_wool');
						if(ind == -1){ind=smashtypes.push({name:colors[c]+'_wool',count:0.0});ind=smashtypes.length-1;}
						smashtypes[ind].count += condensedtypes[b].count * 1.5;
						smashtypes[6].count += condensedtypes[b].count *.75;
						break;
					}
				}
			}else if(condensedtypes[b].name.indexOf('banner') >= 0){
				for(let c=0;c<colors.length;c++){
					if(condensedtypes[b].name==colors[c]+'_banner'){
						ind=gettypeind(colors[c]+'_wool');
						if(ind == -1){ind=smashtypes.push({name:colors[c]+'_wool',count:0.0});ind=smashtypes.length-1;}
						smashtypes[ind].count += condensedtypes[b].count * 6;
						smashtypes[6].count += condensedtypes[b].count *.13;
						break;
					}
				}
			}else if(condensedtypes[b].name.indexOf('potted') >= 0){
				smashtypes[16].count += condensedtypes[b].count *3;
			}else if(condensedtypes[b].name=='grindstone'){
				smashtypes[6].count += condensedtypes[b].count / 2;
				smashtypes[6].count += condensedtypes[b].count / 8;
				smashtypes[1].count += (condensedtypes[b].count * 3) / 6;
			}else if(condensedtypes[b].name=='writable_book'){
				smashtypes[25].count += condensedtypes[b].count;
				smashtypes[26].count += condensedtypes[b].count;
				smashtypes[27].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='piston'){
				smashtypes[6].count += condensedtypes[b].count * 3;
				smashtypes[2].count += condensedtypes[b].count * 4;
				smashtypes[3].count += condensedtypes[b].count;
				smashtypes[5].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='nether_brick_fence'){
				smashtypes[22].count += (condensedtypes[b].count * .75);
			}else if(condensedtypes[b].name=='barrel'){
				smashtypes[6].count += (condensedtypes[b].count * 1.75);
			}else if(condensedtypes[b].name=='chain'){
				smashtypes[5].count += (condensedtypes[b].count * 1.22);
			}else if(condensedtypes[b].name=='lectern'){
				smashtypes[6].count += (condensedtypes[b].count);
				smashtypes[17].count += (condensedtypes[b].count);
			}else if(condensedtypes[b].name=='composter'){
				smashtypes[6].count += (condensedtypes[b].count * 7) / 8;
			}else if(condensedtypes[b].name=='anvil'){
				smashtypes[5].count += condensedtypes[b].count * 31;
			}else if(condensedtypes[b].name=='coal_ore' || condensedtypes[b].name=='deepslate_coal_ore'){
				smashtypes[4].count += condensedtypes[b].count * 3;
			}else if(condensedtypes[b].name=='smooth_stone'){
				smashtypes[1].count += condensedtypes[b].count;
				smashtypes[4].count += condensedtypes[b].count / 8;
			}else if(condensedtypes[b].name=='glass_pane'){
				smashtypes[10].count += (condensedtypes[b].count / 16) * 6;
			}else if(condensedtypes[b].name=='jungle_planks'){
				smashtypes[21].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name=='spruce_planks'){
				smashtypes[13].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name=='dark_oak_planks'){
				smashtypes[12].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name=='oak_planks'){
				smashtypes[6].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name=='oak_pressure_plate'){
				smashtypes[6].count += condensedtypes[b].count / 2;
			}else if(condensedtypes[b].name=='spruce_pressure_plate'){
				smashtypes[13].count += condensedtypes[b].count / 2;
			}else if(condensedtypes[b].name=='birch_pressure_plate'){
				smashtypes[7].count += condensedtypes[b].count / 2;
			}else if(condensedtypes[b].name=='birch_planks'){
				smashtypes[7].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name=='dark_oak_slab'){
				smashtypes[12].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='jungle_slab'){
				smashtypes[21].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='birch_slab'){
				smashtypes[7].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='spruce_slab'){
				smashtypes[13].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='cobblestone_slab'){
				smashtypes[2].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='nether_brick_slab'){
				smashtypes[22].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='stone_slab'){
				smashtypes[1].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='polished_andesite_slab'){
				smashtypes[20].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='andesite_slab'){
				smashtypes[20].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='polished_blackstone_slab'){
				smashtypes[1].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='oak_slab'){
				smashtypes[6].count += (condensedtypes[b].count / 24) * 3;
			}else if(condensedtypes[b].name=='iron_door'){
				smashtypes[5].count += (condensedtypes[b].count / 6) * 3;
			}else if(condensedtypes[b].name=='spruce_door'){
				smashtypes[13].count += (condensedtypes[b].count / 6) * 3;
			}else if(condensedtypes[b].name=='birch_door'){
				smashtypes[7].count += (condensedtypes[b].count / 6) * 3;
			}else if(condensedtypes[b].name=='dark_oak_door'){
				smashtypes[12].count += (condensedtypes[b].count / 6) * 3;
			}else if(condensedtypes[b].name=='oak_door'){
				smashtypes[6].count += (condensedtypes[b].count / 6) * 3;
			}else if(condensedtypes[b].name=='jungle_trapdoor'){
				smashtypes[21].count += (condensedtypes[b].count / 4) * 3;
			}else if(condensedtypes[b].name=='spruce_trapdoor'){
				smashtypes[13].count += (condensedtypes[b].count / 4) * 3;
			}else if(condensedtypes[b].name=='birch_trapdoor'){
				smashtypes[7].count += (condensedtypes[b].count / 4) * 3;
			}else if(condensedtypes[b].name=='oak_trapdoor'){
				smashtypes[6].count += (condensedtypes[b].count / 4) * 3;
			}else if(condensedtypes[b].name=='dark_oak_trapdoor'){
				smashtypes[12].count += (condensedtypes[b].count / 4) * 3;
			}else if(condensedtypes[b].name=='oak_fence'){
				smashtypes[6].count += (condensedtypes[b].count * .375);
			}else if(condensedtypes[b].name=='dark_oak_fence'){
				smashtypes[12].count += (condensedtypes[b].count * .375);
			}else if(condensedtypes[b].name=='spruce_fence'){
				smashtypes[13].count += (condensedtypes[b].count * .375);
			}else if(condensedtypes[b].name=='birch_fence'){
				smashtypes[7].count += (condensedtypes[b].count * .375);
			}else if(condensedtypes[b].name=='oak_fence_gate'){
				smashtypes[6].count += (condensedtypes[b].count / 4) * 3;
			}else if(condensedtypes[b].name=='spruce_fence_gate'){
				smashtypes[13].count += (condensedtypes[b].count / 4) * 3;
			}else if(condensedtypes[b].name=='ladder'){
				smashtypes[6].count += (condensedtypes[b].count / 168) * 7;
			}else if(condensedtypes[b].name=='spruce_stairs'){
				smashtypes[13].count += (condensedtypes[b].count / 8) * 3;
			}else if(condensedtypes[b].name=='oak_stairs'){
				smashtypes[6].count += (condensedtypes[b].count / 8) * 3;
			}else if(condensedtypes[b].name=='jungle_stairs'){
				smashtypes[21].count += (condensedtypes[b].count / 8) * 3;
			}else if(condensedtypes[b].name=='dark_oak_stairs'){
				smashtypes[12].count += (condensedtypes[b].count / 8) * 3;
			}else if(condensedtypes[b].name=='birch_stairs'){
				smashtypes[7].count += (condensedtypes[b].count / 8) * 3;
			}else if(condensedtypes[b].name=='wall_torch' || condensedtypes[b].name=='torch'){
				smashtypes[6].count += (condensedtypes[b].count / 8);
				smashtypes[4].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='soul_torch' || condensedtypes[b].name=='soul_wall_torch'){
				smashtypes[6].count += (condensedtypes[b].count / 32);
				smashtypes[4].count += (condensedtypes[b].count / 4);
				smashtypes[18].count += (condensedtypes[b].count / 4);
			}else if(condensedtypes[b].name=='repeater'){
				smashtypes[1].count += condensedtypes[b].count * 3;
				smashtypes[3].count += condensedtypes[b].count * 3;
				smashtypes[6].count += condensedtypes[b].count / 4;
			}else if(condensedtypes[b].name=='redstone_wall_torch'|| condensedtypes[b].name=='redstone_torch'){
				smashtypes[3].count += condensedtypes[b].count;
				smashtypes[6].count += condensedtypes[b].count / 8;
			}else if(condensedtypes[b].name=='polished_diorite'){
				smashtypes[14].count += condensedtypes[b].count;
				smashtypes[4].count += condensedtypes[b].count / 8;
			}else if(condensedtypes[b].name=='polished_granite'){
				smashtypes[9].count += condensedtypes[b].count;
				smashtypes[4].count += condensedtypes[b].count / 8;
			}else if(condensedtypes[b].name=='crafting_table'){
				smashtypes[6].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='chest'){
				smashtypes[6].count += condensedtypes[b].count * 2;
			}else if(condensedtypes[b].name=='detector_rail'){
				smashtypes[5].count += (condensedtypes[b].count/16) * 6;
				smashtypes[3].count += condensedtypes[b].count;
				smashtypes[1].count += condensedtypes[b].count * 2;
			}else if(condensedtypes[b].name=='minecart'){
				smashtypes[5].count += condensedtypes[b].count * 5;
			}else if(condensedtypes[b].name=='glass_bottle'){
				smashtypes[10].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name.indexOf('potion') >= 0){
				smashtypes[10].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='hopper_minecart'){
				smashtypes[5].count += condensedtypes[b].count * 10;
				smashtypes[6].count += condensedtypes[b].count * 2;
			}else if(condensedtypes[b].name=='rail'){
				smashtypes[5].count += (condensedtypes[b].count/16) * 6;
			}else if(condensedtypes[b].name=='iron_bars'){
				smashtypes[5].count += (condensedtypes[b].count/16) * 6;
			}else if(condensedtypes[b].name=='iron_trapdoor'){
				smashtypes[5].count += condensedtypes[b].count * 4;
			}else if(condensedtypes[b].name=='furnace'){
				smashtypes[2].count += condensedtypes[b].count * 8;
			}else if(condensedtypes[b].name=='dropper'){
				smashtypes[2].count += condensedtypes[b].count * 7;
				smashtypes[3].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='lantern'){
				smashtypes[4].count += condensedtypes[b].count;
				smashtypes[5].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='soul_lantern'){
				smashtypes[6].count += (condensedtypes[b].count / 32);
				smashtypes[4].count += (condensedtypes[b].count / 4);
				smashtypes[18].count += (condensedtypes[b].count / 4);
				smashtypes[5].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='comparator'){
				smashtypes[1].count += condensedtypes[b].count * 3;
				smashtypes[3].count += condensedtypes[b].count * 3;
				smashtypes[11].count += condensedtypes[b].count;
				smashtypes[6].count += (condensedtypes[b].count / 8) * 3;
			}else if(condensedtypes[b].name=='stonecutter'){
				smashtypes[1].count += condensedtypes[b].count * 3;
				smashtypes[5].count += condensedtypes[b].count;
			}else if(condensedtypes[b].name=='hopper'){
				smashtypes[6].count += condensedtypes[b].count * 2;
				smashtypes[5].count += condensedtypes[b].count * 5;
			}else if(condensedtypes[b].name=='campfire'){
				smashtypes[6].count += condensedtypes[b].count * 3;
				smashtypes[6].count += (condensedtypes[b].count / 24) *3;
				smashtypes[4].count += condensedtypes[b].count;
			}else{
				if(condensedtypes[b].name!='air'){
					smashtypes.push({name:condensedtypes[b].name,count:condensedtypes[b].count});
				}
			}
		}
	}
	condensedtypes = DeepCopy(smashtypes);
}
function translateblock(name){
	if(name=='grass_block'||name=='dirt_path'){
		return 'dirt';
	}else if(name=='smooth_bricks' || name=='stone_brick_wall'|| name=='chiseled_stone_bricks' || name=='infested_stone'){
		return 'stone';
	}else if(name=='polished_blackstone_wall' || name=='gilded_blackstone' || name=='blackstone_stairs' || name=='blackstone_wall'){
		return 'blackstone';
	}else if(name=='stone_bricks' || name=='stone_brick_stairs'){
		return 'stone';
	}else if(name=='granite_stairs'){
		return 'granite';
	}else if(name=='diorite_stairs'||name=='polished_diorite_stairs'||name=='polished_diorite'||name=='polished_diorite_wall'||name=='diorite_wall'){
		return 'diorite';
	}else if(name=='nether_brick_stairs'){
		return 'nether_bricks';
	}else if(name=='polished_andesite' || name=='polished_andesite_stairs'){
		return 'andesite';
	}else if(name=='stone_stairs' || name=='stone_button'){
		return 'stone';
	}else if(name=='stone_stairs'){
		return 'stone';
	}else if(name=='sandstone_stairs'){
		return 'sandstone';
	}else if(name=='cobblestone_stairs' || name=='cobblestone_wall'){
		return 'cobblestone';
	}else if(name=='stone_brick_slab' || name=='smooth_stone_slab'){
		return 'stone_slab';
	}else if(name=='cracked_stone_bricks'){
		return 'stone';
	}else if(name=='stripped_birch_wood'){
		return 'birch_log';
	}else if(name=='stripped_spruce_log'){
		return 'spruce_log';
	}else if(name=='stripped_spruce_wood'){
		return 'spruce_log';
	}else if(name=='stripped_oak_wood'){
		return 'oak_log';
	}else if(name=='stripped_oak_log'){
		return 'oak_log';
	}else if(name=='mossy_stone_bricks' || name=='mossy_cobblestone'){
		return 'stone';
	}else if(name=='coarse_dirt'){
		return 'dirt';
	}else if(name=='farmland'){
		return 'dirt';
	}else if (name=='tall_grass'){
		return 'grass';
	}else if(name=='petrified_oak_slab'){
		return 'oak_slab';
	}else if(name=='stripped_dark_oak_log'){
		return 'dark_oak_log';
	}else if(name=='sandstone_wall'){
		return 'sandstone';
	}else if(name=='chiseled_sandstone'){
		return 'sandstone';
	}else if(name=='water'){
		return 'water_bucket';
	}else if(name=='player_head'){
		return 'diamond';
	}else if(name=='lava'){
		return 'lava_bucket';
	}else if(name=='sweet_berry_bush'){
		return 'sweet_berries';
	}else if(name=='cut_sandstone'){
		return 'sandstone';
	}else{
		return name;
	}
}
function addCondensedType(Block){
	if(Block.name == ''){
		return;
	}
	let nm = translateblock(Block.name);
	for(var b=0;b<condensedtypes.length;b++){
		if(condensedtypes[b].name==nm){
			condensedtypes[b].count++;
			return;
		}
	}
	condensedtypes.push({name:nm,count:1});
}