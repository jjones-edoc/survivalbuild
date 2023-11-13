var theforms=[];
var theHTML='';
var checkEnterFunction='';
var offset=0;
var uploadcallbackfunction='';
function findoffset(node){
// do some thing with the node here
	if(node.scrollTop > 0){offset=offset+node.scrollTop;}
	var nodes = node.childNodes;
	for (var i = 0; i <nodes.length; i++){
		if(!nodes[i]){
			continue;
		}

		if(nodes[i].childNodes.length > 0){
			findoffset(nodes[i]);
		}
	}
}
function DrawHeader(title,drawexit){
	theHTML+='<div class="header">';
		theHTML+='<div class="logo">&nbsp;</div>';
		theHTML+=title;
		if(drawexit){
			theHTML+='<div class="logout" onclick="Logout()">&nbsp;</div>';
		}else{
			theHTML+='<div class="nologout">&nbsp;</div>';
		}
	theHTML+='</div>';
}
function DrawFooter(){
	theHTML+='<div class="footer">';
		theHTML+='<div class="securelogo">Secured by eDOC Innovations, Inc.</div>';
	theHTML+='</div>';
}
function DivStart(classname,id){
	if(!id){id=classname;}
	theHTML+='<div class="'+classname+'" id="'+id+'">';
}
function DivEnd(){
	theHTML+='</div>';
}
function InitNewForm(enterFunction){
	theHTML='';
	checkEnterFunction=enterFunction;
}
function SetForm(FormName,ClassName,InnerHTML,ParentCell){
	//CheckToRefreshLiveSession();
	if(!ParentCell){ParentCell='content';}
	DeleteForm(FormName);
	theforms.push(FormName);
	var elemDiv = document.createElement("div");
	elemDiv.id=FormName;
	elemDiv.className=ClassName;
	get(ParentCell).appendChild(elemDiv);
	elemDiv.innerHTML=InnerHTML;
	elemDiv.zIndex=theforms.length;
}
function DeleteForm(FormName){
	for(var f=theforms.length-1;f>=0;f--){
		if(theforms[f]==FormName){
			var el=get(FormName);
			el.parentNode.removeChild(el);
			theforms.splice(f,1);
		}
	}
}
function DeleteAllForms(){
	if(IntTimer!=0){
		clearInterval(IntTimer);
		IntTimer = 0;
	}
	for(var f=theforms.length-1;f>=0;f--){
		var el=get(theforms[f]);
		el.parentNode.removeChild(el);
		theforms.splice(f,1);
	}
	get('content').innerHTML='';
}
function TtlTxt(Title){
	theHTML=theHTML+'<div class="title" id="titletxt">'+Title+'</div>';
}
function HiddenBox(Name,Value){
	theHTML=theHTML+'<input type="hidden" name="'+Name+'" id="'+Name+'" value="'+Value+'">';
}
function MemBox(Name,Value,PlaceHolder,Title){
	if(!PlaceHolder){PlaceHolder=Name;}
	if(!Title){Title=Name;}
	theHTML=theHTML+'<div class="wideitem">';
	theHTML=theHTML+'<textarea title="'+Title+'" name="'+Name+'" id="'+Name+'" placeholder="'+PlaceHolder+'">'+Value+'</textarea>';
	theHTML=theHTML+'</div>';
}
function InBox(Name,Type,Value,PlaceHolder,Title,Label,DataList){
	if(!Value){Value="";}
	if(!PlaceHolder){PlaceHolder=Name;}
	if(!Title){Title=Name;}
	if(!Type){Type="text";}
	if(!Label){Label=PlaceHolder;}
	theHTML=theHTML+'<div><label for="'+Name+'">'+Label+'</label>';
	theHTML=theHTML+'<input type="'+Type+'" ';
	if(DataList){
		theHTML=theHTML+'list="'+Name+'DL" ';
	}else if(checkEnterFunction!=''){
		theHTML=theHTML+'onkeyup="CheckForEnter(event,\''+checkEnterFunction+'\');" ';
	}
	theHTML=theHTML+'title="'+Title+'" name="'+Name+'" id="'+Name+'" placeholder="'+PlaceHolder+'" value="'+Value+'">';
	if(DataList){
		theHTML=theHTML+'<datalist id="'+Name+'DL">';
		for(var d=0; d<DataList.length; d++){
			if(DataList[d].id){
				theHTML=theHTML+'<option value="'+DataList[d].id+'">'+DataList[d].name;
			}else{
				theHTML=theHTML+'<option value="'+DataList[d]+'">';
			}
		}
		theHTML=theHTML+'</datalist>';
	}
	theHTML=theHTML+'</div>';
}
function SelBox(Name,Data,Default,OnChangeFunction,PlaceHolder,Title,NoneText){
	if(!PlaceHolder){PlaceHolder=Name;}
	if(!Title){Title=Name;}
	theHTML=theHTML+'<div><label for="'+Name+'">'+PlaceHolder+'</label>';
	theHTML=theHTML+'<select " ';
	if(OnChangeFunction){theHTML=theHTML+'onchange="'+OnChangeFunction+'();" ';}
	if(checkEnterFunction!=''){theHTML=theHTML+'onkeyup="CheckForEnter(event,\''+checkEnterFunction+'\');" ';}
	theHTML=theHTML+'title="'+Title+'" id="'+Name+'" name="'+Name+'" placeholder="'+PlaceHolder+'">';
	if(NoneText){theHTML=theHTML+'<option value="">'+NoneText;}
	for(var d=0; d < Data.length; d++){
		if(Data[d].name){
			theHTML=theHTML+'<option value='+Data[d].id;
			if(Default){
				if(Default==Data[d].id){theHTML=theHTML+' selected';}
			}
			theHTML=theHTML+'>'+Data[d].name;
		}else{
			theHTML=theHTML+'<option value='+Data[d];
			if(Default){
				if(Default==Data[d]){theHTML=theHTML+' selected';}
			}
			theHTML=theHTML+'>'+Data[d];
		}
	}
	theHTML=theHTML+'</select></div>';
}
function YorN(YesFunction,NoFunction,YesText,NoText,YesClass,NoClass){
	if(!YesClass){YesClass='edibtn navNext';}
	if(!NoClass){NoClass='edibtn navCancel';}
	if(!YesText){YesText='Yes';}
	if(!NoText){NoText='No';}
	var temp=[{type:'button',id:NoFunction,class:NoClass,text:NoText,function:NoFunction},{type:'button',id:YesFunction,class:YesClass,text:YesText,function:YesFunction}];
	ButtonRow(temp);
}
var uploadfile='';
var uploadcvrtfile='';
function uploadmsg(msg,theFile,CnvrtFile){
	if(msg==""){
		pleaseWait("");
		uploadfile=theFile;
		uploadcvrtfile=CnvrtFile;
		eval(uploadcallbackfunction+'();');
	}else{
		pleaseWait("");
		SetError(msg);
	}
}
function ButtonRow(ButtonData,className){
	if(!className){
		className="buttonrow";
	}
	theHTML=theHTML+'<div class="'+className+'">';
	for(var b=0; b<ButtonData.length; b++){
		if(ButtonData[b].type=='span'){
			theHTML=theHTML+'<span id="'+ButtonData[b].id+'" class="'+ButtonData[b].class+'">'+ButtonData[b].text+'</span>';
		}else if(ButtonData[b].type=='button'){
			theHTML=theHTML+'<input type="button" id="'+ButtonData[b].id+'" onclick="'+ButtonData[b].function+'()" value="'+ButtonData[b].text+'" class="'+ButtonData[b].class+'">';
		}else if(ButtonData[b].type=='dropdown'){
			SelBox(ButtonData[b].id,ButtonData[b].data,ButtonData[b].default,ButtonData[b].function);
		}else if(ButtonData[b].type=='div'){
			theHTML=theHTML+'<div id="'+ButtonData[b].id+'" class="'+ButtonData[b].class+'">'+ButtonData[b].text+'</div>';
		}else if(ButtonData[b].type=='uploadbutton'){
			theHTML+='<form id="'+ButtonData[b].id+'form" class="hidden" action="upload.php" method="post" enctype="multipart/form-data" target="upload_target">';
			theHTML+='<input id="SID" name="SID" value="'+SID+'" type="hidden">';
			theHTML+='<input class="hidden" name="'+ButtonData[b].id+'fu" id="'+ButtonData[b].id+'fu" onchange="pleaseWait(\'Uploading document...\');get(\''+ButtonData[b].id+'form\').submit();" accept=".jpg,.jpeg,.bmp,.tif,.png,.tiff,.gif" type="file">';
			theHTML+='</form>';
			theHTML+='<input type="button" id="'+ButtonData[b].id+'btn" onclick=\'uploadcallbackfunction="'+ButtonData[b].function+'";get("'+ButtonData[b].id+'fu").click();\' value="'+ButtonData[b].text+'" class="'+ButtonData[b].class+'">';
		}else{
			theHTML=theHTML+ButtonData[b].text;
		}
	}
	theHTML=theHTML+'</div>';
}

function TextRow(string){
	theHTML=theHTML+'<div>';
	theHTML=theHTML+string;
	theHTML=theHTML+'</div>';	
}

var ckdone=false;
var ckval=false;
function loopflip(node){
	if(node.nodeName=='INPUT'){
		if(!ckdone){
			ckdone=true;
			ckval=!node.checked;
		}
		node.checked=ckval;
	}
	if(node.childNodes){
		var nodes = node.childNodes;
		for (var i = 0; i <nodes.length; i++){
			loopflip(nodes[i]);
		}
	}
}
function flipitems(elid){
	ckdone=false;
	loopflip(get(elid));
}
function CkScrBx(CkBArray,CkdArray){
	var divnm='';
	if(CkBArray[0].id){
		divnm=CkBArray[0].id;
	}else{
		divnm=CkBArray[0].replace(/ /g,'');
	}
	theHTML=theHTML+'<div class="CkBxScrll" id="CBDIV'+divnm+'"><div onclick=flipitems("CBDIV'+divnm+'") style="cursor:pointer">Check/Uncheck ALL</div>';
	for(var c=0; c<CkBArray.length; c++){
		if(CkBArray[c].id){
			var ckd=false;
			for(var b=0;b<CkdArray.length;b++){
				if(CkdArray[b].id==CkBArray[c].id){
					ckd=true;
				}
			}
			CkBx('CB'+CkBArray[c].id,CkBArray[c].name,ckd);
		}else{
			CkBx('CB'+CkBArray[c].replace(/ /g,''),CkBArray[c],(CkdArray.indexOf(CkBArray[c])>-1));
		}
	}
	theHTML=theHTML+'</div>';
}
function CkBx(TheID,TheValue,Checked){
	theHTML=theHTML+'<div>';
	theHTML=theHTML+'<label class="containerCB">'+TheValue+'<input type="checkbox" id="'+TheID+'"';
	if(Checked){theHTML=theHTML+' checked';}
	theHTML=theHTML+'><span class="checkmark"></span></label>';
	theHTML=theHTML+'</div>';
}
function OkB(OKFunction,OkText,OkClass){
	if(!OkClass){OkClass='btn btn-primary';}
	if(!OkText){OkText='Ok';}
	theHTML=theHTML+'<div class="buttonrow">';
	theHTML=theHTML+'<input type="button" id="'+OKFunction+'" onclick="'+OKFunction+'()" value="'+OkText+'" class="'+OkClass+'">';
	theHTML=theHTML+'</div>';
}
function ResultItem(ID, Content1, Color){
	if(!Color){Color='#4CAF50';}
	theHTML=theHTML+'<div class="resultItem" id="'+ID+'" style="border-color:'+Color+';color:'+Color+';" title="'+Content1+'">'+Content1+'</div>';
}
function DivIt(SomeHTML, ClassName){
	theHTML=theHTML+'<div class="'+ClassName+'">'+SomeHTML+'</div>';
}
function CheckForEnter(TheEvent, RunFunction){
	var KeyCode = TheEvent.keyCode || TheEvent.which;
	if ((KeyCode == 13)){
		eval(RunFunction+'()');
	}
	return true;
}
var FocusTarget=null;
function ShowYorN(MSG,YesFun,NoFun){
	theHTML='';
	TtlTxt(MSG);
	YorN(YesFun,NoFun);
	SetForm('ErrorForm','msgForm',theHTML);
}
function SetError(Msg,FcTar){
	if(FcTar!=''){FocusTarget=get(FcTar);}else{FocusTarget=null;}
	theHTML='';
	TtlTxt(Msg);
	OkB('HideError');
	SetForm('ErrorForm','msgForm',theHTML);
}
function HideError(){
	DeleteForm('ErrorForm');
	if(FocusTarget){FocusTarget.focus();FocusTarget=null;}
}
function Spacer(){
	theHTML+='<div style="width:100%;height:10px">&nbsp;</div>';
}
function pleaseWait(msg){
	if(msg==''){
		DeleteForm('msgForm');
	}else{
		theHTML='';
		TtlTxt(msg);
		SetForm('msgForm','msgForm',theHTML);
	}
}
