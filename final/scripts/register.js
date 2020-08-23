/*
* Name: Gia Hy Nguyen
* Student ID: 101922778
* Target: register.html
* Purpose: Validate the application form in register.html
* Created: 17/06/2020
* Last updated: 18/06/2020
*/
"use strict";

//This function is to load the reference number passed by index.html and fill it in the form
function getReference(){
	if (typeof(Storage)!=="undefined"){									// if the browser support web storage
		if (localStorage.getItem("referenceNumber") !== null){			// if there is reference number stored in the local storage
			document.getElementById("referenceNumber").value = localStorage.getItem("referenceNumber");		//filled the reference number input
		}
	}
}

//This function is to validate the form inputs
function validate(){	//return true when all the inputs are passed so that the form can be submitted
	//local variables declaration
	var result = true;
	var errMsg = "";

	//get form data by using DOM
	var referenceNumber = document.getElementById("referenceNumber").value.trim();	//reference number
	var username = document.getElementById("username").value.trim();				//user name
	var phone = document.getElementById("phone").value.trim();						//phone number

	//Reference number validation
	if (referenceNumber == ""){							//Check if reference number is left empty
		errMsg += "Reference number cannot be left blank.\n";
		result = false;
	}
	else if (!referenceNumber.match(/^S\d{5}$/)){		//Check if matching regular expression for reference number
		errMsg += "Reference number must start with capital \"S\" and followed by 5 numbers.\n";
		result = false;
	}

	//Username validation
	if (username == ""){								//Check if username is left empty
		errMsg += "Username cannot be left blank.\n";
		result = false;
	}
	else if (!username.match(/^[a-zA-Z]{2,20}$/)){		//Check if matching regular expression for username
		errMsg += "Username can only contain 2-20 alpha characters.\n";
		result = false;
	}

	//Phone number validation
	if (phone == ""){									//Check if phone number is left empty
		errMsg += "Phone number cannot be left blank.\n";
		result = false;
	}
	else if (!phone.match(/^\d{10}$/)){			//Check if matching regular expression for phone number
		errMsg += "Phone number must be exactly 10 digits.\n";
		result = false;
	}

	if (errMsg != "")					//Display error message if there is any error
		alert(errMsg);

	return result;
}

function init(){							//This function gets triggered whenver the current page is loaded
	getReference();		//Get the reference number passed by index.html
	var form = document.getElementById("registrationForm");		//get form element by using DOM
	form.onsubmit = validate;		//call validate function to validate inputs once user clicks submit
}

window.onload = init;	//run init function