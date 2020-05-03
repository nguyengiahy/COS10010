/*
* Author: Gia Hy Nguyen 
* Target: enquire.html
* Purpose: Validate the form in enquiry page and store form data in client-side storage
* Created: 02/05/2020
* Last updated: 03/05/2020
*/
"use strict";

//This function is to validate the form inputs
function validateEnquire(){								 //return true when all the inputs are passed so that the form can be submitted
	//local variables declaration
	var result = true;
	var errMsg = "";

	var state = document.getElementById("state").value;
	var postCode = document.getElementById("post_code").value.trim();
	var isMerc = document.getElementById("mercCheckbox").checked;
	var isAudi = document.getElementById("audiCheckbox").checked;
	var isBMW = document.getElementById("bmwCheckbox").checked;
	var isTesla = document.getElementById("teslaCheckbox").checked;
	var mercQuantity = document.getElementById("mercQuantity").value;
	var audiQuantity = document.getElementById("audiQuantity").value;
	var bmwQuantity = document.getElementById("bmwQuantity").value;
	var teslaQuantity = document.getElementById("teslaQuantity").value;
	var firstname = document.getElementById("first_name").value.trim();
	var lastname = document.getElementById("last_name").value.trim();
	var email = document.getElementById("email").value;
	var address = document.getElementById("address").value.trim();
	var suburb = document.getElementById("suburb").value.trim();
	var phone = document.getElementById("phone").value.trim();
	var enquire = document.getElementById("enquire_about").value;
	var comment = document.getElementById("cmt_text").value.trim();

	//State validation
	if (state == "none"){								//if state has not been selected
		errMsg += "You must select your state.\n";
		result = false;
	}
	//Post code validation
	if (!postCode.match(/^\d{4}$/)){					//Use regular expression to check the format of postcode
		errMsg += "Your postcode must be a 4-digit number.\n";
		result = false;
	}

	//Quantity check
	if (isNaN(mercQuantity) || isNaN(audiQuantity) || isNaN(bmwQuantity) || isNaN(teslaQuantity)){  //Quantity must be a number
		errMsg += "Quantity must be a number.\n";
		result = false;
	} 		
	else if (mercQuantity < 0 || audiQuantity < 0 || bmwQuantity < 0 || teslaQuantity < 0){		//Negative quantities are not allowed
		errMsg += "Quantity must be a positive number.\n";
		result = false;
	}
	else if (!checkInt(mercQuantity) || !checkInt(audiQuantity) || !checkInt(bmwQuantity) || !checkInt(teslaQuantity)){   //Quantity is not an integer
		errMsg += "Quantity must be an integer.\n";
		result = false;
	}

	//Product chosen validation
	if (!(isMerc || isAudi || isBMW || isTesla)){											//At least 1 product must be chosen to proceed 
		errMsg += "You have not chosen any product. Please select at least one.\n";
		result = false;
	}
	else if ((isMerc && mercQuantity == 0) || (isAudi && audiQuantity == 0) || 				//Quantities for selected products must be entered
			 (isBMW && bmwQuantity == 0) || (isTesla && teslaQuantity == 0)){
		errMsg += "Please enter quantity for all of your selected products.\n";
		result = false;
	}

	if (result){
		storeData(firstname, lastname, email, address, suburb, state, postCode, phone, getPreferredContact(), enquire, comment, isMerc, isAudi, isBMW, isTesla);
	}

	if (errMsg != "")
		alert(errMsg);

	return result;
}

//Get preferred contact method
function getPreferredContact(){
	var contactMethod = "Unknown";
	var methods = document.getElementById("contactMethod").getElementsByTagName("input");

	for (var i = 0; i < methods.length; i++){
		if (methods[i].checked)
			contactMethod = methods[i].value;
	}

	return contactMethod;
}

//Check if input is an integer
function checkInt(text){
	if (text != 0)
		if (parseInt(text, 10) !== Number(text))
			return false;
	return true;
}

function storeData(firstname, lastname, email, address, suburb, state, postCode, phone, contact, enquire, comment, isMerc, isAudi, isBMW, isTesla){

	if(typeof(Storage)!=="undefined"){  // if the browser support web storage

		//Personal information
		localStorage.setItem("firstName", firstname);
		localStorage.setItem("lastName", lastname);
		localStorage.setItem("email", email);
		localStorage.setItem("address", address);
		localStorage.setItem("suburb", suburb);
		localStorage.setItem("state", state);
		localStorage.setItem("postCode", postCode);
		localStorage.setItem("phone", phone);
		localStorage.setItem("contact", contact);
		localStorage.setItem("enquire", enquire);
		localStorage.setItem("comment", comment);
		//Product features checkbox
		var ft1=document.getElementById("ft1").checked;
		localStorage.setItem("feature1", ft1);
		var ft2=document.getElementById("ft2").checked;
		localStorage.setItem("feature2", ft2);
		var ft3=document.getElementById("ft3").checked;
		localStorage.setItem("feature3", ft3);

		//Purchases information
		localStorage.setItem("mercCheckbox", isMerc);
		localStorage.setItem("audiCheckbox", isAudi);
		localStorage.setItem("bmwCheckbox", isBMW);
		localStorage.setItem("teslaCheckbox", isTesla);
		if (isMerc)
			storeCarProperties("merc");
		if (isAudi)
			storeCarProperties("audi");
		if (isBMW)
			storeCarProperties("bmw");
		if (isTesla)
			storeCarProperties("tesla");
	}
}

function storeCarProperties(brand){			//if this car brand is selected, then properties of this brand will be stored
	var quantityID = brand + "Quantity";
	var colorID = brand + "Color";
	var modelID = brand + "Model";
	var priceID = brand + "Price";
	localStorage.setItem(quantityID, document.getElementById(quantityID).value);
	localStorage.setItem(colorID, document.getElementById(colorID).value);
	localStorage.setItem(modelID, document.getElementById(modelID).value);
	localStorage.setItem(priceID, document.getElementById(priceID).value);
}

function init(){
	var form = document.getElementById("enquireForm");
	form.onsubmit = validateEnquire;
}

window.onload = init;