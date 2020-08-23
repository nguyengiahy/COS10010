<!-- Name: Gia Hy Nguyen
---- Student ID: 101922778
---- Title: COS10010 final exam
---- Created: 17/06/2020
---- Last updated: 18/06/2020-->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="description" content="Creating Web Applications Final Exam">
	<meta name="keywords"    content="COS10010 final">
	<meta name="author"      content="Gia Hy Nguyen">
	<title>Process</title>
	<link rel="stylesheet" type="text/css" href="styles/style.css">
</head>
<body>
	<!-- Header section -->
	<header>
		<p>		<!-- logo image-->
			<a href="index.html">
				<img src="images/logo.jpg" id="logo" alt="logo">
			</a>
		</p>		
		<h1>Seminars</h1>									<!-- page name -->
	</header>

	<!-- navigation bar -->
	<nav>
	<ul>
	  <li><a href="index.html" >Home</a></li>						<!-- menu item -->
	  <li><a href="register.html">Register</a></li>	<!-- menu item -->
	  <li><a href="manager.php">Manager</a></li>					<!-- menu item -->
	</ul>
	</nav>


	<?php
		if (!isset($_POST["username"])){
			header('location:register.php');		//redirect to register.php if attempted to access directly
		    exit;
		}
		//Sanitise input to avoid SQL injection
		function sanitise_input($data){
			$data = trim($data);				//remove spaces
			$data = stripslashes($data);		//remove backslashes in front of quotes
			$data = htmlspecialchars($data);	//convert HTML special characters to HTML code
			return $data;
		}

		$errMsg = "";		//Error message

		//Qualification validation
		if (!isset($_POST["qualification"])){
			$errMsg .= "<p class='alignCenter'>Please select your qualification.</p>\n";
		}
		else{		//Qualification and Role validation
			$qualification = $_POST["qualification"];
			$role = $_POST["role"];
			switch ($qualification){
				case "undergraduate":
					if ($role == "organiser"){
						$errMsg .= "<p class='alignCenter'>Undergraduates cannot be registered as organisers.</p>\n";
					}
					break;
			}
		}	
		


		//Seminar reference number validation
		$referenceNumber = sanitise_input($_POST["referenceNumber"]);
		if ($referenceNumber != "S29119" && $referenceNumber != "S00105"){
			$errMsg .= "<p class='alignCenter'>The seminar reference number does not match any of our seminars (S29119 or S00105).</p>\n";
		}

		if ($errMsg != ""){
			echo "$errMsg";
			echo "<p class='alignCenter'>Click <a href='register.html'>here</a> to fill the form again.</p>";
		}
		else{
			//Get form information
			$username = sanitise_input($_POST["username"]);
			$qualification = $_POST["qualification"];
			$email = $_POST["email"];
			$phone = $_POST["phone"];
			$role = $_POST["role"];

	        require_once('settings.php');		//Acquire connection to database
	        $conn = @mysqli_connect($host,$user,$pwd,$sql_db);	//connect to database

	        if ($conn){		//if successfully connected to the database
	        	//Query to create table
	        	$create_table = "CREATE TABLE IF NOT EXISTS registration (		
	        						id INT AUTO_INCREMENT PRIMARY KEY,
	        						reference_num VARCHAR(6) NOT NULL,
	        						username VARCHAR(22) NOT NULL,
	        						qualification VARCHAR(15) NOT NULL,
	        						email VARCHAR(50),
	        						phone VARCHAR(10) NOT NULL,
	        						role VARCHAR(20) NOT NULL
	        					);";
	        	$result = mysqli_query($conn, $create_table);				//execute the create table query and store the result into result pointer
	        	if ($result){		//if successfully executed the create table query
	        		//query to add new record
	        		$add_record = "INSERT INTO registration (reference_num, username, qualification, email, phone, role) VALUES ('$referenceNumber', '$username', '$qualification', '$email', '$phone',     																													 '$role');";
	        		$execute = mysqli_query($conn, $add_record);			//execute the add new record query and store the result into execute pointer
	        		if ($execute){		//if successfully executed the add new record query
	        			echo "<p class='alignCenter'>You are successfully registered!.</p>";
	        		}
	        		else{		//if failed to execute the add new record query
	        			echo "<p class='alignCenter'>Failed to add new record.</p>";
	        		}
	        	}
	        	else{		//if failed to execute the create table query
	        		echo "<p class='alignCenter'>Failed to create database table.</p>";
	        	}
	        	mysqli_close($conn);
	        }	
	        else{		//if failed to connect to the database
	        	echo "<p class='alignCenter'>Unable to connect to database.</p>";
	        }
		}
	?>
</body>
</html>