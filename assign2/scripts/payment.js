/*
* Author: Gia Hy Nguyen 
* Target: payment.html
* Purpose: Validate the payment details and fill up the pre-entered data, then send the data to server
* Created: 02/05/2020
* Last updated: 03/05/2020
*/

"use strict"

function getInfo(){
	if (typeof(Storage)!=="undefined"){									// the browser support web storage
		if (localStorage.getItem("firstName") !== null){				// there are some saved info in storage 

			//Personal details section
			document.getElementById("fullName").textContent = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
			document.getElementById("email").textContent = localStorage.getItem("email");
			document.getElementById("address").textContent = localStorage.getItem("address");
			document.getElementById("suburb").textContent = localStorage.getItem("suburb");
			document.getElementById("state").textContent = localStorage.getItem("state");
			document.getElementById("postCode").textContent = localStorage.getItem("postCode");
			document.getElementById("phone").textContent = localStorage.getItem("phone");
			document.getElementById("contact").textContent = localStorage.getItem("contact");

			//Enquiries section
			document.getElementById("enquire").textContent = localStorage.getItem("enquire");
			var ft = "";
			if (localStorage.getItem("feature1") == "true")   //if feature 1 was chosen
				ft = "feature 1";
			if (localStorage.getItem("feature2") == "true"){   //if feature 2 was chosen
				if (ft != "")
					ft += ", ";
				ft += "feature 2";
			}
			if (localStorage.getItem("feature3") == "true"){   //if feature 3 was chosen
				if (ft != "")
					ft += ", ";
				ft += "feature 3";
			}
			document.getElementById("feature").textContent = ft;
			document.getElementById("comment").textContent = localStorage.getItem("comment");

			//Purchase section
			var result = "";
			var sum = 0;
			if (localStorage.getItem("mercCheckbox") == "true"){			//Mercedes chosen
				result += displayProduct("merc");
				sum += costCalc("merc");
			}
			if (localStorage.getItem("audiCheckbox") == "true"){				//Audi chosen
				result += displayProduct("audi");
				sum += costCalc("audi");
			}
			if (localStorage.getItem("bmwCheckbox") == "true"){				//BMW chosen
				result += displayProduct("bmw");
				sum += costCalc("bmw");
			}
			if (localStorage.getItem("teslaCheckbox") == "true"){			//Tesla chosen
				result += displayProduct("tesla");
				sum += costCalc("tesla");
			}
			document.getElementById("purchases").innerHTML = result;
			document.getElementById("cost").textContent = sum + "$";


			//Hidden inputs filled up
			document.getElementById("firstNameSend").value = localStorage.getItem("firstName");	 
			document.getElementById("lastNameSend").value = localStorage.getItem("lastName");
			document.getElementById("emailSend").value = localStorage.getItem("email");
		}
	}
}

//Display chosen products data
function displayProduct(brand){
	var name = "";
	var quantity = "";
	var color = "";
	var model = "";
	var price = "";

	switch (brand){								//Get product's name
		case "merc":
			name = "Mercedes Benz E-class";
			break;
		case "audi":
			name = "Audi RS Serial Models";
			break;
		case "bmw":
			name = "BMW i-series";
			break;
		case "tesla":
			name = "Tesla Roadster";
			break;
	}

	var quantityKey = brand + "Quantity";
	var colorKey = brand + "Color";
	var modelKey = brand + "Model";
	var priceKey = brand + "Price";

	quantity = localStorage.getItem(quantityKey);	//get product's quantity
	color = localStorage.getItem(colorKey);			//get product's color
	model = localStorage.getItem(modelKey);			//get product's model
	price = localStorage.getItem(priceKey);			//get product's price

	//Display the product's information
	var result = 	`
					<div>                                                                    
                        <p>
                            <label>${name}</label>
                        </p>                                               
                        <ul class="extraOptions">                                           
                            <li>
                                <label for="${brand}Quantity">Quantity: </label>                
                                <input type="text" name="${brand}Quantity" id="${brand}Quantity" value="${quantity}" readonly>
                            </li>
                            <li>                                                            
                                <label for="${brand}Color">Color: </label>                
                                <input type="text" name="${brand}Color" id="${brand}Color" value="${color}" readonly>
                            </li>
                            <li>                                                            
                                <label for="${brand}Model">Model: </label>                
                                <input type="text" name="${brand}Model" id="${brand}Model" value="${model}" readonly>
                            </li>
                            <li>                                                            
                                <label for="${brand}Price">Price: </label>
                                <input type="text" name="${brand}Price" id="${brand}Price" value="${price}" readonly>
                            </li>
                        </ul>
                    </div>
					`;
	return result;
}

//Calculate cost of products
function costCalc(brand){
	var result = 0;
	var quantityKey = brand + "Quantity";
	var quantity = Number(localStorage.getItem(quantityKey));		//get the quantity
	switch (brand){
		case "merc":
			result = 130000 * quantity;
			break;
		case "audi":
			result = 99000 * quantity;
			break;
		case "bmw":
			result = 164000 * quantity;
			break;
		case "tesla":
			result = 245000 * quantity;
			break;	
	}
	return result;													//return the total cost
}

//Validate the payment details
function validatePayment(){

}

//Clear storage memory and redirect to home page
function clearStorage(){
	localStorage.clear();
	location.href="index.html";
}

function init(){
	getInfo();		//fill up the page with stored information
	var cancel = document.getElementById("cancelOrder");
	var form = document.getElementById("paymentForm");
	cancel.onclick = clearStorage;
	form.onsubmit = validatePayment;
}

window.onload = init;