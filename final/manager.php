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
	<title>Manager</title>
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
	  <li><a href="register.html">Register</a></li>					<!-- menu item -->
	  <li><a href="manager.php" class="active">Manager</a></li>	<!-- menu item -->
	</ul>
	</nav>

	<!-- Form for manager to make query -->
	<section>
		<h2 class="alignCenter">Manager Form</h2>
		<form method="post" action="manager.php" id="managerForm">
			<fieldset>
				<legend>Query options</legend>
            	<p>Choose query to display the table:</p>
            	<p>
            		<input type="radio" id="all" name="queryOption" value="all">
                    <label for="all">All registration records</label>
                </p>
                <p>
                	<input type="radio" id="onName" name="queryOption" value="onName"/>
                    <label for="onName">Registration records based on username</label>
                </p>
                <p>
                	<label for="name">Username (please check the option above first):</label>
                	<input type="text" name="username" id="name">
                </p>
			</fieldset>

			<div class="alignCenter">
				<input type="submit" name="Submit" class="button">
				<input type="reset" name="Reset" class="button">
			</div>
		</form>
		<br>
		<form method="post" action="manager.php" id="additionalForm">
			<fieldset>
				<legend>Additional Requirement Form</legend>
				<p>Choose query to display the table:</p>
				<p>
            		<input type="radio" id="dispOrganiser" name="additional" value="dispOrganiser">
                    <label for="dispOrganiser">List all organisers</label>
                </p>
                <p>
            		<input type="radio" id="dispParticipant" name="additional" value="dispParticipant">
                    <label for="dispParticipant">List all participants</label>
                </p>
                <p>
            		<input type="radio" id="ascSort" name="additional" value="ascSort">
                    <label for="ascSort">Sort username in ascending order</label>
                </p>
                <p>
            		<input type="radio" id="descSort" name="additional" value="descSort">
                    <label for="descSort">Sort username in descending order</label>
                </p>
                <div class="alignCenter">
					<input type="submit" name="Search" class="button">
					<input type="reset" name="Reset" class="button">
				</div>
			</fieldset>
		</form>
	</section>

	<?php
		//Sanitise input to avoid SQL injection
		function sanitise_input($data){
			$data = trim($data);				//remove spaces
			$data = stripslashes($data);		//remove backslashes in front of quotes
			$data = htmlspecialchars($data);	//convert HTML special characters to HTML code
			return $data;
		}

		//if manager form was submitted
		if (isset($_POST["Submit"])){
			if (!isset($_POST["queryOption"])){		//check if any search option was selected
				echo "<p class='alignCenter'>You have not chosen any search option.</p>";
			}
			else if ($_POST["queryOption"] == "onName" && $_POST["username"] == ""){	//check if search on username selected but no username entered
				echo "<p class='alignCenter'>Please enter username when you choose \"Registration records based on username\".</p>";
			}
			else{
				if ($_POST["queryOption"] == "all"){
					$query = "SELECT * FROM registration;";		//query get all records of the table
				}
				else{
					$name = sanitise_input($_POST["username"]);		//get the username input
					$query = "SELECT * FROM registration WHERE username='$name';";		//query to get the records that match with the entered username
				}

				require_once('settings.php');						//Acquire connection to database
		        $conn = @mysqli_connect($host,$user,$pwd,$sql_db);	//connect to database
		        if ($conn){											//if successfully connected to the database
		        	$result = mysqli_query($conn, $query);			//execute the search query and store the result into result pointer
		        	if ($result){									//if successfully executed the search query
		        		if (mysqli_num_rows($result) > 0){			//if the result is not empty
							echo "<h2 class='alignCenter'>Registration table</h2>";
							echo "<table>
									<tr>
										<th>ID</th>
										<th>Seminar Reference Number</th>
										<th>Username</th>
										<th>Qualification</th>
										<th>Email address</th>
										<th>Phone number</th>
										<th>Role</th>
									</tr>";
							while ($record = mysqli_fetch_assoc ($result) ){		//fetch all of the records in result
								echo "<tr>
										<td>{$record['id']}</td>
										<td>{$record['reference_num']}</td>
										<td>{$record['username']}</td>
										<td>{$record['qualification']}</td>
										<td>{$record['email']}</td>
										<td>{$record['phone']}</td>
										<td>{$record['role']}</td>
									  </tr>";
							}
							echo "</table>";
							mysqli_free_result($result);		//free the result variable
						}
						else{	//if the result is empty	
							echo "<p class='alignCenter'>The table is empty.</p>";
						}
		        	}
		        	else{		//if failed to execute the search query
		        		echo "<p class='alignCenter'>Failed to execute query.</p>";
		        	}
		        	mysqli_close($conn);		//close the connection to database
		        }
		        else{			//if failed to connect to the database
		        	echo "<p class='alignCenter'>Unable to connect to database.</p>";
		        }
		    }
		}

		//if additional requirement form was submitted
		if (isset($_POST["Search"])){
			if (!isset($_POST["additional"]))
			{
				echo "<p class='alignCenter'>You have not chosen any search option.</p>";
			}
			else{
				$query = "";
				$choice = $_POST["additional"];
				if ($choice == "dispOrganiser"){
					$query = "SELECT * FROM registration WHERE role='organiser';";
				}
				else if ($choice == "dispParticipant"){
					$query = "SELECT * FROM registration WHERE role='participant';";
				}
				else if ($choice == "ascSort"){
					$query = "SELECT * FROM registration ORDER BY username ASC;";
				}
				else if ($choice == "descSort"){
					$query = "SELECT * FROM registration ORDER BY username DESC;";
				}

				require_once('settings.php');						//Acquire connection to database
		        $conn = @mysqli_connect($host,$user,$pwd,$sql_db);	//connect to database
		        if ($conn){											//if successfully connected to the database
		        	$result = mysqli_query($conn, $query);			//execute the search query and store the result into result pointer
		        	if ($result){									//if successfully executed the search query
		        		if (mysqli_num_rows($result) > 0){			//if the result is not empty
							echo "<h2 class='alignCenter'>Registration table</h2>";
							echo "<table>
									<tr>
										<th>ID</th>
										<th>Seminar Reference Number</th>
										<th>Username</th>
										<th>Qualification</th>
										<th>Email address</th>
										<th>Phone number</th>
										<th>Role</th>
									</tr>";
							while ($record = mysqli_fetch_assoc ($result) ){		//fetch all of the records in result
								echo "<tr>
										<td>{$record['id']}</td>
										<td>{$record['reference_num']}</td>
										<td>{$record['username']}</td>
										<td>{$record['qualification']}</td>
										<td>{$record['email']}</td>
										<td>{$record['phone']}</td>
										<td>{$record['role']}</td>
									  </tr>";
							}
							echo "</table>";
							mysqli_free_result($result);		//free the result variable
						}
						else{	//if the result is empty	
							echo "<p class='alignCenter'>The table is empty.</p>";
						}
		        	}
		        	else{		//if failed to execute the search query
		        		echo "<p class='alignCenter'>Failed to execute query.</p>";
		        	}
		        	mysqli_close($conn);		//close the connection to database
		        }
		        else{			//if failed to connect to the database
		        	echo "<p class='alignCenter'>Unable to connect to database.</p>";
		        }
		    }
		}
	?>

	<!-- Footer -->
	<footer>
		<p> <a href="https://www.swinburne.edu.au">&copy; Swinburne University of Technology</a>
			<span>Mark up by: </span>
			<a href="mailto:101922778@student.swin.edu.au">Gia Hy Nguyen</a>
		</p>
	</footer>
</body>
</html>