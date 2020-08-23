/*
* Author: Gia Hy Nguyen 101922778
* Target: register.html
* Purpose: Validate the input entered by users
* Created: 02/05/2020
* Last updated: 02/05/2020
*/
"use  strict";

//Validate the form, if returned value is false then the form is not gonna be submitted 
function validate(){
	var result = true;
	var errMsg = "";

	//first name validation
	var firstname = document.getElementById("firstname").value;
	if (!firstname.match(/^[a-zA-Z]+$/)){
		errMsg += "Your first name must only contain alpha characters.\n";
		result = false;
	}

	//last name validation
	var lastname = document.getElementById("lastname").value;
	if (!lastname.match(/^[a-zA-Z\-]+$/)){
		errMsg += "Your last name may only conatin alpha characters and hyphens.\n";
		result = false;
	}

	//age validation
	var age = document.getElementById("age").value;
	if (isNaN(age)){
		errMsg += "Your age must be a number.\n";
		result = false;
	}
	else if (age < 18){
		errMsg += "Your age nust be 18 or older.\n";
		result = false;
	}
	else if (age >= 10000){
		errMsg += "Your age nust be younger than 10000.\n";
		result = false;
	}
	else{
		var tempMsg = checkSpeciesAge(age);
		if (tempMsg != ""){
			errMsg += tempMsg;
			result = false;
		}
	}

	//Number of travellers validation
	var partySize = document.getElementById("partySize").value;
	if (partySize < 1 || partySize > 100){
		errMsg += "Number of travellers must be in between 1 and 100 inclusive.\n";
		result = false;
	}

	//Food dropdown validation
	if (document.getElementById("food").value == "none"){
		errMsg += "You must select a food preference.\n";
		result = false;
	}

	//Booking checkbox validation
	var is1day = document.getElementById("1day").checked;
	var is4day = document.getElementById("4day").checked;
	var is10day = document.getElementById("10day").checked;
	if (!(is1day || is4day || is10day)){
		errMsg += "Please select at least one trip.\n";
		result = false;
	}

	//Species checkbox validation
	var isHuman = document.getElementById("human").checked;
	var isDwarf = document.getElementById("dwarf").checked;
	var isElf = document.getElementById("elf").checked;
	var isHobbit = document.getElementById("hobbit").checked;
	if (!(isHuman || isDwarf || isElf || isHobbit)){
		errMsg += "Please select at least one species.\n";
		result = false;
	}

	//Beard length validation
	var beard = document.getElementById("beard").value;
	var tempMsg = checkSpeciesBeard(beard, age);
	if (tempMsg != ""){
		errMsg += tempMsg;
		result = false;
	}

	//Error message
	if (errMsg != ""){		//only display message if there is something to show
		alert(errMsg);
	}

	if (result){
		var species = getSpecies();
		storeBooking(firstname, lastname, age, species, is1day, is4day, is10day);
	}

	return result;			//if false, the form is not gonna be sent

}

//Return selected species as a string
function getSpecies(){
	var speciesName = "Unknown";
	var speciesArray = document.getElementById("species").getElementsByTagName("input");

	for (var i = 0; i < speciesArray.length; i++){
		if (speciesArray[i].checked)
			speciesName = speciesArray[i].value;
	}

	return speciesName;
}

//Validate age upon selected species
function checkSpeciesAge(age){
	var errMsg = "";
	var species = getSpecies();
	switch (species){
		case "Human":
			if (age > 120)
				errMsg = "You cannot be a Human and over 120.\n";
			break;
		case "Dwarf":
		case "Hobbit":
			if (age > 150)
				errMsg = "You cannot be a " + species + " and over 150.\n";
			break;	
		case "Elf":
			break;
		default:
			errMsg = "We don't allow your kind on our tours.\n";
	}

	return errMsg;
}

//Validate beard length upon selected species and age
function checkSpeciesBeard(beard, age){
	var errMsg = "";
	var species = getSpecies();
	switch (species){
		case "Human":
			break;
		case "Dwarf":
			if (age > 30 && beard <= 12)
				errMsg = "You cannot be a Dwarf older than 30 year olds with beard shorter than 12 inches\n";
			break;
		case "Hobbit":
		case "Elf":
			if (beard > 0)
				errMsg = "You cannot be a " + species + " with a beard\n";
			break;
		default:
			errMsg = "We don't allow your kind on our tours.\n";
	}

	return errMsg;
}

//Store form information
function storeBooking(firstname, lastname, age, species, is1day, is4day, is10day){
	var trip = "";
	if (is1day) trip = "1day";
	if (is4day){ 
		if (trip != "")
			trip += ", ";
		trip += "4day";
	}
	if (is10day){ 
		if (trip != "")
			trip += ", ";
		trip += "10day";
	}
	sessionStorage.trip = trip;
	sessionStorage.firstname = firstname;
	sessionStorage.lastname = lastname;
	sessionStorage.age = age;
    sessionStorage.species = species;
    sessionStorage.food = document.getElementById("food").value;
    sessionStorage.partySize = document.getElementById("partySize").value;
}

//Prefilled form
function prefill_form(){
	if (sessionStorage.firstname != undefined){		//if first name is not empty
		document.getElementById("firstname").value = sessionStorage.firstname;
		document.getElementById("lastname").value = sessionStorage.lastname;
		document.getElementById("species").value = sessionStorage.species;
		document.getElementById("age").value = sessionStorage.age;
		document.getElementById("trip").value = sessionStorage.trip;
		document.getElementById("food").value = sessionStorage.food;
		document.getElementById("partySize").value = sessionStorage.partySize;

		switch (sessionStorage.species){
			case "Human":
				document.getElementById("human").checked = true;
				break;
			case "Dwarf":
				document.getElementById("dwarf").checked = true;
				break;
			case "Elf":
				document.getElementById("elf").checked = true;
				break;
			case "Hobbit":
				document.getElementById("hobbit").checked = true;
				break;
		}
	}
}

//This function is called when the browser window loads
function init(){

	prefill_form();
	var regForm = document.getElementById("regform");		//get refto the HTMLelement
	regForm.onsubmit = validate;							//register the event listener 
}
window.onload = init;
