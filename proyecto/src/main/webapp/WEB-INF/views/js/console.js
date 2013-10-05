// funcitoncom - Mayo 2007

// Properties
var screenHeight;
var leftbarHeight;
var rightbarHeight;
var resizing = false;
var isIE6 = /MSIE 6./.test(navigator.userAgent);

// Constants
var IMAGE_PATH = "images/";
var ICON_MIN = "min.png";
var ICON_MAX = "max.png";
var ICON_MIN_BAR = "minimizeBtn.png";
var ICON_MAX_BAR = "maximizeBtn.png";
var PANEL_MINIMIZED_HEIGHT = 28;
var PANELS_HEIGHT_DESIGN = 447;

function resizeBars(){
	if(!resizing){
		resizing = true;
		screenHeight = document.documentElement.clientHeight;
		leftbarHeight = (isIE6) ? (screenHeight - 69): ($("leftbar").innerHeight || $("leftbar").clientHeight);
		leftbarHeight -= 4;
		rightbarHeight = (isIE6) ? (screenHeight - 69): ($("rightbar").innerHeight || $("rightbar").clientHeight);
		var leftbarMiniContent = getElementById("content", $("leftbarmini"), "div");

		var leftPanels = getElementsByClass("panelContainer", $("leftbar"), "div");
		var lastOpened;
		var opened = [];
		
		for(var i=0, leftHeights=0;i<leftPanels.length;i++){
			var content = getElementById("content", leftPanels[i], "div");
			if(!content.$__height) content.$__height = content.style.height;
			if(content.$__isOpen == null) content.$__isOpen = true;	
			
			if(content.$__isOpen){
				var h = ( leftbarHeight * parseInt(content.$__height) ) / PANELS_HEIGHT_DESIGN;
				lastOpened = content;
				opened.push(content);
			}else{
				var h = PANEL_MINIMIZED_HEIGHT;
			}
			h = Math.max(PANEL_MINIMIZED_HEIGHT, (Math.round(h) - 36));
			leftHeights += h;
			content.style.height = h + "px";
		}
		if(lastOpened){
			leftHeights -= parseInt(lastOpened.style.height);
			lastOpened.style.height = (leftbarHeight - leftHeights - (opened.length * 36)) + "px";
		}
		
		var rightPanels = getElementsByClass("panelContainer", $("rightbar"), "div");
		lastOpened = null;
		var opened = [];
		for(var i=0, rightHeights=0;i<rightPanels.length;i++){
			var content = getElementById("content", rightPanels[i], "div");
			if(!content.$__height) content.$__height = content.style.height;
			if(content.$__isOpen == null) content.$__isOpen = true;		
			if(content.$__isOpen){
				var h = ( rightbarHeight * parseInt(content.$__height) ) / PANELS_HEIGHT_DESIGN;
				lastOpened = content;
				opened.push(content);
			}else{
				var h = PANEL_MINIMIZED_HEIGHT;
			}
			h = Math.max(PANEL_MINIMIZED_HEIGHT, (Math.round(h) - 36));
			rightHeights += h;
			content.style.height = h + "px";
		}
		if(lastOpened){
			rightHeights -= parseInt(lastOpened.style.height);
			lastOpened.style.height = (rightbarHeight - rightHeights - (opened.length * 36)) + "px";
		}

		// update minimized bar
		leftbarMiniContent.style.height = (rightbarHeight - 36) + "px";
		
		resizing = false;
	}
}

function initConsole(){
	resizeBars();
//	try{
//		fixPNG();
//	}catch(e){
//		// ...ignore
//	}
}

function switchPanel(ref){
	var icon = ref.firstChild;
	var iconSrc = icon.src || icon.style.src;
	iconSrc = iconSrc.split("/").reverse()[0];
	var panel = ref.parentNode;
	while(panel.id != "panel") panel = panel.parentNode;
	var content = getElementById("content", panel, "div");
	
	if(iconSrc == ICON_MIN){ // it's maximized
		if(icon.src){
			icon.src = IMAGE_PATH + ICON_MAX;
		}else{
			icon.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + IMAGE_PATH + ICON_MAX + "', sizingMethod='crop')";
			icon.style.src = IMAGE_PATH + ICON_MAX;
		}
		content.style.display = "none";
		content.$__isOpen = false;
	}else{ // it's minimized
		if(icon.src){
			icon.src = IMAGE_PATH + ICON_MIN;
		}else{
			icon.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + IMAGE_PATH + ICON_MIN + "', sizingMethod='crop')";
			icon.style.src = IMAGE_PATH + ICON_MIN;
		}
		content.style.display = "block";
		content.$__isOpen = true;
	}
	resizeBars();
}

function hideLeftBar(ref){
//	alert('entro a hideleftbar');
	var img = ref.firstChild;
	var leftbar = $("leftbar");
	var leftbarheader = $("leftbarheader");
	var rightbar = $("rightbar");
	var rightbarheader = $("rightbarheader");
	var cDisplay = leftbar.style.display;
	var leftbarMini = $("leftbarmini");

	if(cDisplay == "block" || cDisplay == ""){
		leftbar.style.display = "none";
		leftbarMini.style.display = "block";
		leftbarheader.style.width = "10%";
		rightbar.style.width = rightbarheader.style.width = "90%";
		rightbar.style.left = rightbarheader.style.left = "10%";
		img.src = IMAGE_PATH + ICON_MAX_BAR;
	}else{
		leftbar.style.display = "block";
		leftbarMini.style.display = "none";
		leftbarheader.style.width = "30%";
		rightbar.style.width = rightbarheader.style.width = "70%";
		rightbar.style.left = rightbarheader.style.left = "30%";
		img.src = IMAGE_PATH + ICON_MIN_BAR;
	}
	resizeBars();
}

function hideLeftBar_p(ref){
//	alert('entro a hideleftbar');
	var img = ref.firstChild;
	var leftbar = $("leftbar_p");
	var leftbarheader = $("leftbarheader_p");
	var rightbar = $("rightbar_p");
	var rightbarheader = $("rightbarheader_p");
	var cDisplay = leftbar.style.display;
	var leftbarMini = $("leftbarmini_p");

	if(cDisplay == "block" || cDisplay == ""){
		leftbar.style.display = "none";
		leftbarMini.style.display = "block";
		leftbarheader.style.width = "10%";
		rightbar.style.width = rightbarheader.style.width = "90%";
		rightbar.style.left = rightbarheader.style.left = "10%";
		img.src = IMAGE_PATH + ICON_MAX_BAR;
	}else{
		leftbar.style.display = "block";
		leftbarMini.style.display = "none";
		leftbarheader.style.width = "30%";
		rightbar.style.width = rightbarheader.style.width = "70%";
		rightbar.style.left = rightbarheader.style.left = "30%";
		img.src = IMAGE_PATH + ICON_MIN_BAR;
	}
	resizeBars();
}

function showDropDown(){
//	alert('dropdown');
	if($("dropdownmenu").style.display == "none" || $("dropdownmenu").style.display == ""){
		$("dropdownmenu").style.display = "block";
	}else{
		$("dropdownmenu").style.display = "none";
	}
}

function printPanel(ref){
	var tr = ref.parentNode;
	while(tr.nodeName.toLowerCase() != "tr") tr = tr.parentNode;
	
	var tr2 = tr.previousSibling;
	while(tr2.nodeName.toLowerCase() != "tr") tr2 = tr2.previousSibling;
	
	var td = tr2.firstChild;
	while(td.nodeName.toLowerCase() != "td") td = td.nextSibling;
	
	var content = td.firstChild;
	while(content.id != "content") content = content.nextSibling;
	
	var printWin = window.open();
	printWin.document.write(content.innerHTML);
	printWin.document.close();
	printWin.print();
	printWin.close();
}

function getElementById(id, node, tag){
	if(!node) node = document;
	if(!tag) tag = '*';
	var els = node.getElementsByTagName(tag);
	for(var i=0;i<els.length;i++){
		if(els[i].id == id){
			return els[i];
		}
	}
}

function getElementsByClass(searchClass, node, tag){
	if(!node) node = document;
	if(!tag) tag = '*';
	var els = node.getElementsByTagName(tag);
	for(var i=0, classElements = [];i<els.length;i++){
		if(els[i].className == searchClass){
			classElements.push(els[i]);
		}
	}
	return classElements;
}

/* .mm. Agregada 13 Ago 07 */

function contraer_desplegar(){
	var browser=navigator.appName;
	var isIE = browser.indexOf('Internet Explorer');
	//alert(isIE);
	var hijo = $("informinfo"); //primer hijo
	if(isIE!=-1){
		//alert(hijo);
		while(hijo.firstChild.firstChild.firstChild.nextSibling.id == 'panelcontroller'){
			switchPanel(hijo.firstChild.firstChild.firstChild.nextSibling);
			//alert("actual: "+hijo.id+" --  prox: "+hijo.nextSibling.id);
			if(hijo.id == hijo.parentNode.lastChild.id) break;
			else hijo = hijo.nextSibling;
		}
	}else{
		
		while(hijo.childNodes[1].childNodes[1].childNodes[1].nextSibling.id == 'panelcontroller'){
			switchPanel(hijo.childNodes[1].childNodes[1].childNodes[1].nextSibling);
			if(hijo.id == hijo.parentNode.lastChild.id) break;
			else hijo = hijo.nextSibling;
		}
	}
	return false;
}