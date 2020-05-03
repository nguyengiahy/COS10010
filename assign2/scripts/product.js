"use strict"

function move(){
	window.location = "enquire.html";
}


function init(){
	var btn = document.getElementsByClassName("buyBtn");
	for (var i = 0; i < btn.length; i++){
		btn[i].onclick = move;
	}
}

window.onload = init;