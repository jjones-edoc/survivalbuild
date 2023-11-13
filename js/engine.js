//version 7.2.0.13
url = document.location.href;
xend = url.lastIndexOf("/") + 1;
var base_url = url.substring(0, xend);
var ajax_get_error = false;
var getfile_url = '';
var IntervalT = 10000;
var rTimer = null, rItem;
var currenttxt = '';
var chkrqutcount = 0;

function checkrequest(){
	chkrqutcount = chkrqutcount +1;
	if(currenttxt != rItem.innerHTML){
		stopcheckrequest();
	}
	if(chkrqutcount==15){
		currenttxt = 'Waiting for response...';
		rItem.innerHTML = currenttxt;
		//ajax_do (getfile_url);
	}
	if(chkrqutcount==30){
		rItem.innerHTML = 'Request failed.  Please try again later.';
		stopcheckrequest();
	}
}

function stopcheckrequest(){
	clearInterval(rTimer);
}

function ajax_do (url) {
	// Does URL begin with http?
	if (url.substring(0, 4) != 'http') {
		url = base_url + url;
	}
	var randomnumber=Math.floor(Math.random()*1000)
	url = url+"&Random="+randomnumber;
	// Create new JS element
	var jsel = document.createElement('SCRIPT');
	jsel.type = 'text/javascript';
	jsel.src = url;

	// Append JS element (therefore executing the 'AJAX' call)
	document.body.appendChild (jsel);

	return true;
}

function ajax_do_relative (url) {
	var randomnumber=Math.floor(Math.random()*1000);
	url = url+"&Random="+randomnumber;
	// Create new JS element
	var jsel = document.createElement('SCRIPT');
	jsel.type = 'text/javascript';
	jsel.src = url;

	// Append JS element (therefore executing the 'AJAX' call)
	document.body.appendChild (jsel);

	return true;
}

function ajax_get (url, el) {
	// Has element been passed as object or id-string?
	if (typeof(el) == 'string') {
		el = document.getElementById(el);
	}

	// Valid el?
	if (el == null) { return false; }
	currenttxt = el.innerHTML;
	rItem = el;
	stopcheckrequest();
	rTimer = null;
	chkrqutcount = 0;
	

	// Does URL begin with http?
	if (url.substring(0, 4) != 'http') {
		url = base_url + url;
	}

	// Create getfile URL
	getfile_url = base_url + 'getfile.php?url=' + escape(url) + '&el=' + escape(el.id);
	
	rTimer=setInterval("checkrequest()",1000);

	// Do Ajax
	ajax_do (getfile_url);
	
	return true;
}
function ajaxRequest(){
	var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
	if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		for (var i=0; i<activexmodes.length; i++){
			try{
				return new ActiveXObject(activexmodes[i])
			}
			catch(e){
			//suppress error
			}
		}
	}
	else if (window.XMLHttpRequest) // if Mozilla, Safari etc
		return new XMLHttpRequest()
	else
		return false
}
function ajax_do_post(url, params){
	var mypostrequest=new ajaxRequest();
	mypostrequest.onreadystatechange=function(){
		if (mypostrequest.readyState==4){
			if (mypostrequest.status==200 || window.location.href.indexOf("http")==-1){
				//document.getElementById("result").innerHTML=mypostrequest.responseText;
				eval(mypostrequest.responseText);		
			}else{
				ShowError("An error has occured making the request");
			}
		}
	}
	mypostrequest.open("POST", url, true)
	mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	mypostrequest.send(params)
}
function post(path, params) {
    var method = "post"; 
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
         }
    }
    document.body.appendChild(form);
    form.submit();
}
function doRestCall(url, params, callback){
	DisableButtons();
	var mypostrequest=new ajaxRequest();
	mypostrequest.onreadystatechange=function(){
		if (mypostrequest.readyState==4){
			if (mypostrequest.status==200 || window.location.href.indexOf("http")==-1){
				EnableButtons();
				callback(mypostrequest.responseText);		
			}else{
				EnableButtons();
				callback('{"result":false,"error":"An error has occured making the request"}');
			}
		}
	}
	mypostrequest.open("POST", url, true);
	mypostrequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	// send the collected data as JSON
	mypostrequest.send(JSON.stringify(params));
	//mypostrequest.send(args)
}


