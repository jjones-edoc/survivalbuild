function IsMobile(){
	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isMobile = true;
	}
	return isMobile;
}
function DeepCopy(TheArray){
	return JSON.parse(JSON.stringify(TheArray));
}
function generateGUID(){
	var d = new Date().getTime();
	if(window.performance && typeof window.performance.now === "function"){
		d += performance.now(); //use high-precision timer if available
	}
	var uuid = 'xxxxyxxxxxxxxxxxyxxxxxxxxxxxyxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid.toUpperCase();
}
function get(someelement){
	if(document.getElementById(someelement)){
		return document.getElementById(someelement);
	}
	return false;
}
function cleanurl(s){
    var i, returnString = "", c="";
    for (i = 0; i < s.length; i++){   
        c = s.charAt(i);
        if(c===" "){
            returnString += "%20";      
        }else if(c==="$"){
            returnString += "%24";
        }else if(c==="&"){
            returnString += "%26";
        }else if(c==="'"){
            returnString += "%27";
        }else if(c==="+"){
            returnString += "%2B";
        }else if(c===","){
            returnString += "%2C";
		}else if(c==="."){
            returnString += "%2E";
        }else if(c==="/"){
            returnString += "%2F";
        }else if(c===":"){
            returnString += "%3A";
        }else if(c===";"){
            returnString += "%3B";
        }else if(c==="="){
            returnString += "%3D";
        }else if(c==="?"){
            returnString += "%3F";
        }else if(c==="@"){
            returnString += "%40";
        }else if(c==='"'){
            returnString += "%22";
        }else if(c==='<'){
            returnString += "%3C";
        }else if(c==='>'){
            returnString += "%3E";
        }else if(c==='#'){
            returnString += "%23";
        }else if(c==='%'){
            returnString += "%25";
        }else if(c==='\n'){
            returnString += "%0A";
        }else if(c==='\r'){
            returnString += "%0D";
        }else{
            returnString += c;
        }
    }
    return returnString;
}
function PostToURL(URL,PARAMS){
	var form = document.createElement("form"), addField=null, key=null, i=0;
	form.setAttribute("method","post");
	form.setAttribute("action",URL);
	addField = function( key, value ){
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", value );
        form.appendChild(hiddenField);
    }; 
	for(key in PARAMS) {
        if(PARAMS.hasOwnProperty(key)) {
            if( PARAMS[key] instanceof Array ){
                for(i = 0; i < PARAMS[key].length; i++){
                    addField( key, PARAMS[key][i] );
                }
            }
            else{
                addField( key, PARAMS[key] ); 
            }
        }
    }
	document.body.appendChild(form);
	form.submit();
}
function f_clientWidth() {
	var myWidth = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
	//Non-IE
	myWidth = window.innerWidth;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	//IE 6+ in 'standards compliant mode'
	myWidth = document.documentElement.clientWidth;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	//IE 4 compatible
	myWidth = document.body.clientWidth;
	}
	return myWidth;
}
function f_clientHeight() {
	var myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
	//Non-IE
	myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	//IE 6+ in 'standards compliant mode'
	myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	//IE 4 compatible
	myHeight = document.body.clientHeight;
	}
	return myHeight;
}
function f_scrollLeft() {
	var scrOfX = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
	//Netscape compliant
	scrOfX = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
	//DOM compliant
	scrOfX = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	//IE6 standards compliant mode
	scrOfX = document.documentElement.scrollLeft;
	}
	return scrOfX;
}

function f_scrollTop() {
	var scrOfY = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
	//Netscape compliant
	scrOfY = window.pageYOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
	//DOM compliant
	scrOfY = document.body.scrollTop;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	//IE6 standards compliant mode
	scrOfY = document.documentElement.scrollTop;
	}
	return scrOfY;
}
function isHex(TheString){
	if(!TheString){return false;}
	if(TheString==''){return false;}
	var i=0;
	var Buffer= '';
	var ValidChars = '0123456789abcdefABCDEF';
	for(i=0; i < TheString.length; i++)
		if(ValidChars.indexOf(TheString.charAt(i))==-1){return false;}
	return true;	
}
function stringToHex(tmp) {
	if(tmp==''){return '';}
	var str = '',
	i = 0,
	tmp_len = tmp.length,
	c;
	for (; i < tmp_len; i += 1) {
		c = tmp.charCodeAt(i);
		str += d2h(c);
	}
	return str;
}
function hexToString(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
function d2h(d,padding) {
	var hex = Number(d).toString(16);
	padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
 
	while (hex.length < padding) {
		hex = "0" + hex;
	}
	return hex;
}
function h2d (h) {
	return parseInt(h, 16);
}