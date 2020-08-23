/*
* Name: Gia Hy Nguyen
* Student ID: 101922778
* Target: index.html
* Purpose: Pass the reference number to register.html
* Created: 22/06/2020
* Last updated: 22/06/2020
*/
"use strict";

function storeReferenceNumber1(){
	if(typeof(Storage)!=="undefined"){		// if the browser support web storage
		var string = "S29119";
		localStorage.setItem("referenceNumber", string);		// store reference number into local storage
	}
}

function storeReferenceNumber2(){
	if(typeof(Storage)!=="undefined"){		// if the browser support web storage
		var string = "S00105";
		localStorage.setItem("referenceNumber", string);		// store reference number into local storage
	}
}

function init(){							//This function gets triggered whenver the current page is loaded
	var sem1 = document.getElementById("applySem1");		//get seminar 1 apply now hyperlink
	sem1.onclick = storeReferenceNumber1;			//store the corresponding reference number 
	var sem2 = document.getElementById("applySem2");		//get seminar 2 apply now hyperlink
	sem2.onclick = storeReferenceNumber2;			//store the corresponding reference number 
}

window.onload = init;	//run init function