<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="description" content="lab08">
	<meta name="keywords"    content="PHP, lab08">
	<meta name="author"      content="Hy Gia Nguyen">
	<title>Lab 08</title>
</head>
<body>
	<?php
        include ("mathfunctions.php");
    ?>
    <h1>Creating Web Applications - lab08</h1>
    <?php
        if (isset($_GET["number"])){
            $num = $_GET["number"];
            if (isPositiveInteger($num)){
                echo "<p>". $num, "! is ", factorial($num), ".</p>";
            } else {
                echo "<p>Please enter a positive integer.</p>";
            }
        }
        echo "<p><a href='factorial.html's>Return to the Entry Page</a></p>";
    ?>
</body>
</html>