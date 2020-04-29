/*
* Author: Gia Hy Nguyen 101922778
* Target: clickme.html
* Purpose: 
* Created: 19/04/2020
* Last updated: 19/04/2020
*/
"use  strict";

//This function is for modifying text content of <span>
function writeMessage(){
	var message = document.getElementById("output");
	message.textContent = "You have now finished Task 1";
}

//This function is for changing the HTML content of <p>
function rewriteParagraph(userName){
	var message = document.getElementById("message");
	message.innerHTML = "Hi " + userName + ". If you can see this you have successfully overwritten the contents of this paragraph. Congratulations!!";
}

//This function is for asking and storing user's input
function promptName(){
	var sName = prompt("Enter your name.\nThis prompt should show up when the \nClick Me button is clicked.", "Your name");
	alert("Hi there " + sName + ". Alert boxes are a quick way to check the state\n of your variables when you are developing code.");
	rewriteParagraph(sName);
}

//This function is called when the browser window loads
function init(){
	var clickMe = document.getElementById("clickme");
	clickMe.onclick = promptName;
	var h1 = document.getElementsByTagName("h1");
	h1[0].onclick = writeMessage;
}
window.onload = init;
