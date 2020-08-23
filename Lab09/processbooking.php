<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="description" content="lab09"/>
	<meta name="keywords"    content="PHP, form validation, lab09"/>
	<meta name="author"      content="Hy Gia Nguyen"/>
	<title>Booking Confirmation</title>
</head>
<body>
	<h1>Rohirrim Tour Booking Confirmation</h1>
	<?php
		// Sanitising input method
		function sanitise_input($data){
			$data = trim($data);				//remove spaces
			$data = stripslashes($data);		//remove backslashes in front of quotes
			$data = htmlspecialchars($data);	//convert HTML special characters to HTML code
			return $data;
		}

		//Initial checking if the form was submitted properly
		if (isset($_POST["firstname"]))
			$firstname = sanitise_input($_POST["firstname"]);	//get firstname
		else{
			//Redirect to the form
			header("location: register.html");
		}

		if (isset($_POST["lastname"]))							
			$lastname = sanitise_input($_POST["lastname"]);		//get lastname
		if (isset($_POST["age"]))
			$age = sanitise_input($_POST["age"]);				//get age
		if (isset($_POST["food"]))
			$food = sanitise_input($_POST["food"]);				//get food
		if (isset($_POST["partySize"]))
			$partySize = sanitise_input($_POST["partySize"]);	//get partySize
		if (isset($_POST["species"]))
			$species = sanitise_input($_POST["species"]);		//get species
		else
			$species = "Unknown species";

		$tour = "";												//get tour selections
		if (isset($_POST["1day"])) 								//if only 1 day tour is chosen
			$tour = "one-day tour";

		if (isset($_POST["4day"])){ 							//if only 4 day tour is chosen
			$tour = "four-day tour";
			if (isset($_POST["1day"]))							//if 1 day, 4 day tours are chosen
				$tour = "one-day and four-day tours.";
		}
		if (isset($_POST["10day"])){									//if only 10 day tour is chosen
			$tour = "ten-day tour";
			if (isset($_POST["1day"])){									//if 1 day, 10 day tours are chosen
				$tour = "one-day and ten-day tours.";
				if (isset($_POST["4day"]))								//if 1 day, 4 day, 10 day tours are chosen
					$tour = "one-day, four-day and ten-day tours.";
			}
			elseif (isset($_POST["4day"]))								//if 4 day, 10 day tours are chosen
				$tour = "four-day and ten-day tours.";
		}

		//Form validation
		$errMsg = "";
		if ($firstname == "")		//first name validation
			$errMsg .= "<p>You must enter your first name.</p>";
		elseif (!preg_match("/^[a-zA-Z]*$/", $firstname))
			$errMsg .= "<p>Only alpha letters allowed in your first name.</p>";
		if ($lastname == "")		//last name validation
			$errMsg .= "<p>You must enter your last name.</p>";
		elseif (!preg_match("/^[a-zA-Z\-]*$/", $lastname))
			$errMsg .= "<p>Only alpha letters and hyphens are allowed in your last name.</p>";
		if (!is_numeric($age))		//age validation
			$errMsg .= "<p>You age must be a number.</p>";
		elseif ($age < 10 || $age > 10000)
			$errMsg .= "<p>Your age must be in between 10 and 10,000.</p>";
		if ($food == "none")		//food preferrence validation
			$errMsg .= "<p>Please select your meal preferrence.</p>";

		if ($errMsg != "")
			echo "<p>$errMsg</p>";
		else{
			echo "<p>Welcome $firstname $lastname !<br>
			 		 You are now booked on the $tour<br>
			 		 Species: $species<br>
					 Age: $age <br>
			 		 Meal preferrence: $food<br>
			 		 Number of travellers: $partySize</p>";
		}
		
	?>
</body>
</html>